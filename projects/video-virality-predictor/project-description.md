---
title: Video Virality Predictor
startDate: 2025-10
endDate: 2026-03
organization: Western AI
description: A multimodal YouTube Shorts forecasting platform that collects short-form video data, generates video/audio/text embeddings, fuses modalities, trains leakage-resistant predictors, and serves 7-day and 30-day view forecasts through a conference-demoed web application.
tags: [machine-learning, multimodal-ai, forecasting, youtube-shorts, aws-s3, pytorch, scikit-learn, nlp, computer-vision, audio]
coverImage: assets/video-virality-predictor-preview.jpg
---

## Overview

Video Virality Predictor is an end-to-end multimodal machine learning system for forecasting the future performance of YouTube Shorts. The project was designed around a practical question: can early video, audio, text, and metadata signals be used to estimate how many views a short-form video will receive after fixed post-publish horizons?

The final system predicts YouTube Shorts view counts at **7-day** and **30-day** horizons using a reproducible pipeline that collects videos, extracts raw media artifacts, generates dense embeddings for each modality, fuses those embeddings into model-ready feature sets, trains multiple supervised regressors, evaluates model behavior across missing-modality slices, and exposes the result through a live web application for inference on uploaded MP4 files and metadata.

My work focused on redesigning the project from a weak early supervised-learning setup into a more rigorous multimodal forecasting system. The key change was introducing fixed forecasting horizons and stronger data-alignment contracts. Instead of training on inconsistent mixed-age targets, the redesigned pipeline labels each video at explicit post-publish ages, joins all modalities through a canonical `video_id`, and trains models against clear 7-day and 30-day targets.

The system was showcased at **CUCAI** through a co-authored paper and demo application.

## Problem

Short-form video virality is difficult to model because view counts are noisy, heavy-tailed, and heavily dependent on timing. A raw snapshot of a video's view count is not necessarily a fair label: a video with 5,000 views after one hour is very different from a video with 5,000 views after 30 days.

The original project faced three major issues:

1. **Temporal label inconsistency** — videos were being compared at different ages, producing noisy supervision.
2. **Multimodal alignment complexity** — metadata, downloaded video, extracted audio, transcripts, embeddings, and fused vectors all had to refer to the same item without silent mismatches.
3. **Missing modality behavior** — transcripts were not always available, and missing text needed to be represented explicitly instead of accidentally corrupting downstream models.

The redesigned project addresses these issues by making the entire pipeline `video_id`-native, horizon-labeled, restartable, and schema-locked.

## My Role

I contributed across the data engineering, machine learning, evaluation, and demo layers of the project. My work included:

- Redesigning the labeling framework around fixed **7-day** and **30-day** supervision horizons.
- Building and standardizing a multimodal data pipeline for metadata, video, audio, text, embeddings, fusion, training, and interpretation.
- Implementing leakage-resistant feature generation and model-evaluation workflows.
- Benchmarking neural, linear, tree-based, gated-fusion, and stacked-ensemble models.
- Adding slice-based evaluation for text-present and text-missing examples.
- Implementing out-of-fold stacked ensemble analysis across four selected base models.
- Supporting a web application capable of live 7-day and 30-day forecasting from uploaded video files and metadata.
- Contributing to a co-authored CUCAI paper and conference demo.

## System Architecture

At a high level, the system follows this pipeline:

```text
YouTube Shorts discovery
        ↓
Fixed-horizon metadata labels
        ↓
Video download
        ↓
Audio extraction
        ↓
Transcript collection / ASR
        ↓
Video, audio, and text embeddings
        ↓
Multimodal fusion
        ↓
Supervised model training
        ↓
Model evaluation and stacking
        ↓
Clustering and interpretation
        ↓
Web application inference
```

Each stage uses deterministic naming, per-stage state tracking, and canonical `video_id` joins so that data can be processed incrementally without losing alignment between modalities.

## Data Collection Pipeline

The data collection layer constructs the canonical dataset used by all downstream modeling stages. It discovers YouTube Shorts, labels them at fixed post-publish horizons, downloads raw videos, derives audio, and collects transcript text.

### Fixed-Horizon Metadata Labels

The most important redesign was replacing arbitrary view-count snapshots with fixed-horizon labels.

For each video, the pipeline records:

- `horizon_days`: either `7` or `30`
- `horizon_view_count`: the observed view count at the labeling time
- `horizon_label_type`: `views_at_age`
- `captured_at`: timestamp of the metadata capture
- canonical `video_id`

This turns the prediction task into a supervised regression problem with well-defined targets:

- **7-day forecast**: predict views at approximately 7 days after publish.
- **30-day forecast**: predict views at approximately 30 days after publish.

This change improved dataset quality because the model no longer had to learn from mixed-age labels where some videos were only hours old and others were weeks old.

### YouTube Shorts Discovery

The collector searches YouTube Shorts using broad seed queries and short-duration filters. For each run, it builds publish windows centered around `now - horizon_days` with a tolerance window, deduplicates discovered `video_id`s, fetches video and channel metadata, and appends horizon-labeled rows to the canonical metadata CSV.

Primary artifacts:

- `Data/raw/Metadata/shorts_metadata_horizon.csv`
- `Data/raw/Metadata/horizon_labels.sqlite`

The SQLite label store deduplicates `(video_id, horizon_days)` so that repeated runs do not repeatedly label the same video-horizon pair.

### Canonical Identity and Delta Processing

Every downstream stage uses `video_id` as the canonical identity. If a metadata row is missing a `video_id`, the pipeline can parse it from common YouTube URL formats such as:

- raw 11-character YouTube IDs
- `youtube.com/watch?v=...`
- `/shorts/...`
- `/embed/...`
- `/v/...`
- `youtu.be/...`

Each stage also computes a deterministic `source_hash`, normally from the normalized URL. This lets the system detect whether a video has already been processed, whether it needs to be retried, or whether it should be skipped as unchanged.

The delta-processing contract is:

- If an item has no prior state, process it.
- If its hash changed, process it again.
- If its previous status is non-terminal, retry it.
- If its previous status is terminal and unchanged, skip it.

This makes the pipeline restartable and avoids unnecessary recomputation.

### Video Download

The video downloader consumes metadata delta rows and materializes MP4 files keyed by `video_id`.

Output pattern:

```text
Data/raw/Video/raw_data/<video_id>.mp4
clipfarm/raw/video/<video_id>.mp4
```

The downloader includes retry logic and multiple `yt-dlp` fallback strategies. It also classifies terminal failures such as removed, private, unavailable, upcoming, age-restricted, and authentication-blocked videos.

### Audio Extraction

Audio is extracted from downloaded MP4 files using FFmpeg and normalized into a model-friendly waveform format:

```bash
ffmpeg -y -i input.mp4 -vn -ac 1 -ar 16000 -acodec pcm_s16le output.wav
```

The chosen audio format is:

- WAV container
- PCM 16-bit little-endian
- Mono channel
- 16 kHz sample rate

This standardization supports downstream ASR and Wav2Vec2 embedding generation.

Output pattern:

```text
Data/raw/Audio/raw_data/<video_id>.wav
clipfarm/raw/audio/<video_id>.wav
```

### Transcript Collection

The text stage attempts transcript generation using a caption-first strategy:

1. Try YouTube subtitles when available.
2. Fall back to ASR over the extracted WAV file.

The operational ASR backend is `whisper_cpp`. Each transcript is saved as a JSON file containing the final transcript, transcript source, language metadata, caption metadata, optional timestamps, and error/status information.

Output pattern:

```text
Data/raw/Text/raw_data/<video_id>.json
clipfarm/raw/text/<video_id>.json
```

The system also handles empty transcripts carefully. A first empty result is treated as retryable; a second consecutive empty result is promoted to a terminal empty-transcript status. This matters because fusion later uses terminal text failures to decide whether a zero text placeholder is valid.

## Embedding Pipeline

The embedding stage converts raw media artifacts into dense modality-specific vectors. Each modality is processed independently as a delta job against the current metadata horizon CSV and its own state database.

### Video Embeddings

Video embeddings are generated using a VideoMAE model.

Key details:

- Model class: `transformers.VideoMAEModel`
- Default model: `MCG-NJU/videomae-base`
- Input: `clipfarm/raw/video/<video_id>.mp4`
- Output: `clipfarm/embeddings/video/<video_id>.npy`
- Frame sampling: uniformly sample a fixed number of frames, defaulting to 16
- Vector extraction: CLS token from the model output
- Normalization: L2-normalized `float32` vector
- Expected default dimension: 768

The frame sampling logic is deterministic for a fixed decode order. If a video has fewer frames than required, the final frame is repeated to pad the sequence.

### Audio Embeddings

Audio embeddings are generated using Wav2Vec2.

Key details:

- Model class: `transformers.Wav2Vec2Model`
- Default model: `facebook/wav2vec2-base-960h`
- Input: `clipfarm/raw/audio/<video_id>.wav`
- Output: `clipfarm/embeddings/audio/<video_id>.npy`
- Sample rate: 16 kHz
- Max duration: 90 seconds by default for memory safety
- Pooling: mean-pooling over the final hidden states
- Normalization: L2-normalized `float32` vector
- Expected default dimension: 768

### Text Embeddings

Text embeddings combine metadata text and transcript text.

Key details:

- Model class: `sentence_transformers.SentenceTransformer`
- Default model: `all-MiniLM-L6-v2`
- Input: transcript JSON plus metadata row
- Output: `clipfarm/embeddings/text/<video_id>.npy`
- Metadata text fields: title, description, and query joined with `[SEP]`
- Transcript field: final transcript text
- Embedding construction: concatenate metadata embedding and transcript embedding
- Normalization: L2-normalized final vector
- Expected default dimension: 768, from two 384-dimensional MiniLM vectors

This design lets the text representation capture both creator-provided context and spoken/captioned content.

## Multimodal Fusion

The fusion stage converts per-modality embeddings into one model-ready fused representation per `video_id`. It emits sharded `.npz` vector files, a Parquet manifest, and a schema lock file.

Primary script:

```text
Data/common/fuse_embeddings_delta.py
```

Supported fusion strategies:

- `concat`
- `sum_pool`
- `max_pool`

### Missing-Modality Policy

The project assumes that video and audio embeddings are required. Text is conditionally optional because some Shorts have no usable captions or speech.

The fusion policy is:

- Missing video embedding → skip as missing required modality.
- Missing audio embedding → skip as missing required modality.
- Text present → perform full fusion.
- Text missing with approved terminal text status → use a zero text vector and set `text_present = 0`.
- Text missing with non-terminal text status → defer fusion.

This avoids silently mixing rows with different feature semantics. The `text_present` mask is appended to fused vectors so downstream models can explicitly learn from missing-text behavior.

### Fusion Strategies

Let:

- `v` = video vector
- `a` = audio vector
- `t` = text vector or zero placeholder
- `m` = text-present mask

The implemented strategies are:

```text
concat:   fused = [v || a || t || m]
sum_pool: fused = [pad(v) + pad(a) + pad(t) || m]
max_pool: fused = [elementwise_max(pad(v), pad(a), pad(t)) || m]
```

With default 768-dimensional video, audio, and text embeddings, the fused dimensions are:

| Strategy | Dimension |
|---|---:|
| `concat` | 2305 |
| `sum_pool` | 769 |
| `max_pool` | 769 |

The production fusion stage intentionally avoids randomly initialized learned projections. This keeps fusion deterministic, stable across daily runs, and compatible with historical model checkpoints.

### Schema Locking

Each fusion strategy writes a `schema.json` file containing:

- `fusion_strategy`
- `video_dim`
- `audio_dim`
- `text_dim`
- `fused_dim`
- `mask_appended`
- `updated_at`

If a future run produces vectors with incompatible dimensions, the stage fails instead of silently creating train/serve skew.

## Supervised Training Pipeline

The training stage builds supervised virality predictors from two inputs:

1. Horizon-labeled metadata.
2. Fused embedding pointers and shards.

Primary script:

```text
Super_Predict/train_suite_from_horizon.py
```

For each `(fusion_strategy, target_horizon_days)` pair, the training pipeline reconstructs vectors from fused shards, joins them with horizon-labeled metadata, creates train/validation/test splits, trains several model families, and writes snapshot artifacts to S3.

### Target Definition

The supervised target is:

```text
target_raw = horizon_view_count
target_log = log1p(target_raw)
```

The log transform is important because view counts are heavy-tailed. Training and primary evaluation happen in log space, while raw-scale metrics are still computed for interpretability.

### Leakage Prevention

The training pipeline explicitly excludes target-leaking features such as:

- `horizon_view_count`
- `horizon_days`
- `horizon_label_type`
- current/post-outcome counters such as `view_count`, `like_count`, and `comment_count`
- rate-derived columns such as `views_per_day`
- `age_days`
- `virality_score`

A hard leakage assertion fails training if any disallowed columns survive feature selection.

This was a major reliability improvement because virality forecasting can easily become inflated by accidental access to post-outcome metadata.

### Splitting Strategy

The implemented split is a deterministic random split:

- 70% train
- 15% validation
- 15% test

A split manifest is saved with each run so the exact data partition can be audited later.

One limitation is that this is not a strict chronological holdout. The pipeline prevents direct feature leakage and duplicate-video leakage, but not all forms of temporal leakage that could occur from nearby capture times. This is documented as a future improvement.

## Model Families

The project benchmarks multiple model families to compare linear, tree-based, neural, and multimodal-gated approaches.

### Concat MLP

The `concat_mlp` model consumes:

- strategy-specific fused vector
- standardized numeric metadata
- categorical metadata embeddings

Architecture:

- input assembly: fused vector + numeric features + categorical embeddings
- MLP hidden layers: 1024 → 512 → 256
- activation: GELU
- dropout: 0.20
- output: scalar log-view prediction

This model is directly affected by fusion strategy because it consumes the fused vector.

### Gated Fusion MLP

The `gated_fusion_mlp` model consumes separate video, audio, and text vectors instead of the already fused vector.

Architecture:

- separate modality towers for video, audio, and text
- each tower maps to a shared 256-dimensional space
- a metadata-conditioned gate predicts softmax weights over modalities
- the weighted modality sum is passed into a prediction head with metadata and missing-text context

This model explicitly models modality reliability and text missingness. It is more expressive but operationally heavier than simpler baselines.

### Ridge Regression

The ridge baseline uses:

- median-imputed and standardized numeric features
- one-hot categorical features
- fused vector dimensions
- `RidgeCV` over a regularization grid

This provides a strong linear baseline and helps identify whether gains come from nonlinear modeling or simply from better feature construction.

### GBDT with Neural Projection

The best-performing base model in the March 6 snapshot was a hybrid projected-GBDT model.

It works in two stages:

1. Train a neural projector that maps the high-dimensional fused vector into a lower-dimensional latent representation.
2. Train a `HistGradientBoostingRegressor` on the projected latent features plus metadata.

The projector uses:

- `Linear(fused_dim → 256)`
- GELU
- dropout
- `Linear(256 → projector_dim)`

The GBDT model uses early stopping and tree-based nonlinear modeling over the reduced representation.

## Model Evaluation

The project evaluates models using both log-space and raw-space metrics.

Primary log-space metrics:

- `mae_log`
- `rmse_log`
- `r2_log`

Raw-scale metrics:

- `mae_raw`
- `rmse_raw`

Slice metrics:

- `text_present = 1`
- `text_present = 0`

The text slice evaluation is important because the system intentionally supports both full multimodal examples and examples where transcript text is missing but terminally explainable.

## March 6 Model Snapshot

A detailed March 6, 2026 snapshot compared 24 configurations across:

- 4 model families: `concat_mlp`, `gated_fusion_mlp`, `gbdt`, `ridge`
- 3 fusion strategies: `concat`, `sum_pool`, `max_pool`
- 2 horizons: 7 days and 30 days

The snapshot evaluated 18,492 prediction rows across both horizons.

### Main Findings

The strongest base model was **GBDT with concat fusion**.

Key findings:

- GBDT won every strategy/horizon comparison in test MAE(log).
- The 7-day horizon was easier than the 30-day horizon for all model families.
- GBDT was much more robust from 7-day to 30-day forecasting than the neural and linear baselines.
- Ridge was the weakest overall baseline, especially at the 30-day horizon.
- Text-missing examples were harder for all model families, but GBDT was least sensitive to missing text.

Best base configurations:

| Horizon | Best Base Model | Strategy | MAE(log) | RMSE(log) | R²(log) |
|---|---|---|---:|---:|---:|
| 7 days | GBDT | concat | 1.1127 | 1.3695 | 0.4122 |
| 30 days | GBDT | concat | 1.2264 | 1.6212 | 0.7173 |

The 30-day R² was higher despite a larger MAE because the 30-day target distribution had more explainable variance in log space.

## Stacked Ensemble Evaluation

After benchmarking the base models, I implemented an out-of-fold stacking workflow to evaluate whether a learned ensemble could outperform the strongest single model.

The selected four base learners were:

1. `gbdt + concat`
2. `concat_mlp + max_pool`
3. `gated_fusion_mlp + concat`
4. `ridge + sum_pool`

The stacking dataset was built from aligned residual-analysis outputs. For each horizon, the pipeline pivots base predictions into a wide matrix:

```text
X = [base_model_1_pred_log, base_model_2_pred_log, base_model_3_pred_log, base_model_4_pred_log]
y = y_true_log
```

The stacker is trained on base predictions, not on residuals. Residuals are used for diagnostics and evaluation.

### OOF Protocol

The ensemble search used repeated K-fold out-of-fold prediction:

- 5 folds
- 3 repeats
- fixed seed
- train on fold complements
- predict held-out fold
- average OOF predictions per row across repeats

This reduces optimistic bias because each scored prediction comes from a model that did not train on that row.

Candidate meta-models included:

- Linear Regression
- RidgeCV
- LassoCV
- ElasticNetCV
- HuberRegressor
- RandomForestRegressor
- HistGradientBoostingRegressor

### Stacking Results

The learned stacker improved RMSE(log) at both horizons.

| Horizon | Best Base RMSE(log) | Best Stack | Best Stack RMSE(log) | RMSE Gain vs Base |
|---|---:|---|---:|---:|
| 7 days | 1.3695 | Linear stacker | 1.3584 | +0.0111 / 0.81% |
| 30 days | 1.6212 | ElasticNetCV stacker | 1.6005 | +0.0207 / 1.28% |

Portfolio-scale practical impact from the ensemble improvements:

- The 7-day stack improved RMSE(log) by the raw-scale equivalent of approximately **42,780 views**.
- The 30-day stack improved RMSE(log) by the raw-scale equivalent of approximately **130,973 views**.

The gains were modest relative to the best base model but meaningful because they reduced larger misses and improved calibration behavior. At 30 days, the stacker reduced high-target tail risk and improved bias from a noticeable underprediction pattern to near zero.

## Clustering and Latent-Space Analysis

The project also includes an unsupervised clustering and latent-space interpretation workflow. This helps analyze whether groups of Shorts share similar multimodal style patterns.

The clustering pipeline loads fused vectors from S3, reconstructs them from manifest pointers, applies dimensionality reduction, evaluates cluster candidates, and writes cluster assignments.

### Dimensionality Reduction

The pipeline standardizes fused vectors and applies PCA:

- cluster-space PCA up to 50 dimensions
- visualization PCA to 2 dimensions
- optional UMAP for clustering and visualization

### Cluster Selection

For each fusion strategy and each `k` in a configured range, the pipeline evaluates KMeans candidates across multiple random seeds.

The selection score combines:

- silhouette score
- seed stability via adjusted Rand index
- tiny-cluster penalty

Composite scoring:

```text
0.55 * silhouette + 0.35 * stability - 0.10 * tiny_cluster_penalty
```

The final KMeans run uses deterministic seeding and canonical label remapping so that cluster IDs remain stable for fixed inputs.

### Cluster Outputs

Main outputs:

- `Unsup_Cluster/cluster_results.csv`
- `Unsup_Cluster/cluster_diagnostics.json`
- PCA/UMAP latent-space artifacts
- visualization-ready 2D projections

This workflow made the embedding space more interpretable and supported qualitative analysis of what kinds of Shorts the model was grouping together.

## Interpretation Pipeline

The interpretation stage converts cluster assignments into human-auditable style attributes.

For each clustered video, it joins the canonical URL and computes lightweight media features such as:

- `motion_mean`
- `cut_rate_per_min`
- `audio_rms_mean`
- `audio_rms_std`
- `visual_density`

These features are intentionally lightweight and scalable. They are not meant to be a full cinematic analysis system; instead, they provide practical signals for comparing cluster profiles.

The output includes availability flags so missing media does not get confused with truly low motion or low audio energy.

Main output:

```text
Interpretation/interpretation.csv
```

## Web Application Demo

The final system was integrated into a web application for live inference. The app allowed users to upload an MP4 file and provide metadata, then generated 7-day and 30-day forecast outputs using the trained multimodal models.

The demo system mirrored the training pipeline as closely as possible:

1. Extract media-derived inputs from the uploaded video.
2. Generate or load the required modality embeddings.
3. Apply the same fusion strategy and schema expectations used during training.
4. Run selected model checkpoints.
5. Return forecasted view counts for 7-day and 30-day horizons.
6. Display uncertainty-style ranges based on robust model prediction intervals.

This application was showcased at CUCAI as part of the project presentation and co-authored paper.

## Technical Highlights

### End-to-End Multimodal Pipeline

The project processes raw YouTube Shorts into model-ready features across video, audio, text, and metadata. Each modality has its own extraction and embedding path, but all stages join through a shared `video_id` identity contract.

### Fixed-Horizon Forecasting

The redesigned labeling framework introduced explicit 7-day and 30-day targets. This eliminated inconsistent mixed-age labels and made the forecasting task clearer, more defensible, and easier to evaluate.

### Restartable Daily Processing

Each stage uses per-stage SQLite state and deterministic source hashing. This means processing can resume after interruption, skip unchanged items, and retry only unresolved failures.

### AWS S3 Artifact Backbone

S3 stores raw media, embeddings, fused shards, manifests, model snapshots, and state databases. This enables the pipeline to scale beyond local files while keeping artifacts discoverable and reproducible.

### Schema-Locked Fusion

Fusion writes schema locks so vector dimensions and mask behavior cannot silently change between runs. This reduces train/serve skew risk and catches upstream drift early.

### Leakage-Resistant Training

The supervised pipeline explicitly removes target and post-outcome columns, deduplicates videos, stores split manifests, and evaluates both aggregate performance and missing-text slices.

### Model Breadth

The project compares neural networks, gated multimodal architectures, linear models, projected tree models, deterministic blends, and learned stacked ensembles.

### Interpretability Workflows

The clustering and interpretation stages add qualitative insight into the embedding space by combining PCA/UMAP projections, KMeans clusters, URL joins, and human-auditable motion/audio/visual-density features.

## Scale

The project was designed for daily incremental data growth.

Notable scale points:

- Daily ingestion target: approximately **1,000 videos per day**.
- Collection scale: approximately **50,000 YouTube Shorts**.
- Downstream fused dataset scale: approximately **10,000 fused multimodal records**.
- Snapshot evaluation scale: **18,492 prediction rows** across 7-day and 30-day horizons.
- Multimodal file scale: **150,000+ files** across raw media, transcripts, embeddings, manifests, and derived artifacts.

## Results Summary

The project improved from an initially weak supervised-learning setup into a reproducible multimodal forecasting system with clear labels, stronger model comparisons, and a working inference demo.

Most important outcomes:

- Introduced fixed 7-day and 30-day forecasting targets.
- Standardized metadata, video, audio, text, embedding, fusion, training, clustering, and interpretation stages.
- Built a schema-locked multimodal fusion pipeline with explicit missing-text handling.
- Benchmarked 24 model/fusion/horizon configurations in a March 6 snapshot.
- Identified GBDT with concat fusion as the strongest base model.
- Built OOF stacked ensembles that improved RMSE(log) at both horizons.
- Reduced the 7-day RMSE(log) by a raw-scale equivalent of about 42,780 views.
- Reduced the 30-day RMSE(log) by a raw-scale equivalent of about 130,973 views.
- Delivered a live web application for conference demonstration.
- Co-authored a paper presented at CUCAI.

## Challenges

### Heavy-Tailed Targets

YouTube view counts are extremely skewed. A few very large videos can dominate raw-scale metrics. The project addresses this by optimizing and ranking primarily in log space while still reporting raw-scale metrics for interpretability.

### Missing Text

Not all Shorts have usable transcripts. Instead of dropping these videos or silently filling text with zeros, the pipeline uses terminal text-state statuses and an explicit `text_present` mask.

### Data Alignment

The system must align metadata rows, video files, audio files, transcripts, embeddings, fused vectors, labels, and model predictions. The canonical `video_id` contract and manifest-based pointer system were central to making this reliable.

### Train/Serve Consistency

The demo application needs to reproduce training-time preprocessing. Schema locks, explicit model snapshots, fusion strategy metadata, and stored preprocessing configuration reduce the risk of train/serve skew.

### Reproducibility vs. External APIs

Some parts of the pipeline depend on external systems such as YouTube search results, video availability, model hub artifacts, and cloud storage timing. The pipeline controls what it can through deterministic naming, state databases, run IDs, stored configs, and artifact snapshots.

## What I Learned

This project taught me how much real-world machine learning performance depends on data contracts, labeling quality, and evaluation design. The modeling architecture mattered, but the largest improvements came from making the target definition precise, preventing leakage, making modality alignment reliable, and evaluating failure cases explicitly.

I also learned how to design ML systems that are not just notebooks, but reproducible pipelines: restartable ingestion, schema-locked feature generation, model snapshotting, slice evaluation, and deployment-aware inference workflows.

## Technologies Used

- Python
- PyTorch
- scikit-learn
- pandas / NumPy
- Transformers
- SentenceTransformers
- VideoMAE
- Wav2Vec2
- Whisper.cpp
- FFmpeg
- yt-dlp
- PyAV
- SQLite
- Parquet
- AWS S3
- GitHub Actions
- KMeans / PCA / UMAP
- HistGradientBoostingRegressor
- RidgeCV / ElasticNetCV / LassoCV
- Multimodal fusion
- Out-of-fold stacking
- Web application inference

## Future Improvements

Potential next steps include:

- Replace random train/validation/test splits with strict chronological holdouts.
- Add bootstrap confidence intervals for model comparisons.
- Pin exact model artifact revisions for every embedding model.
- Add a formal model registry binding `run_id`, model checkpoint, fusion strategy, preprocessing version, and horizon.
- Improve raw-scale metrics with robust denominator clipping or median percentage-error variants.
- Add deeper content interpretation features such as scene changes, object density, speech rate, music/speech classification, and visual style embeddings.
- Expand the web app with explanations, confidence intervals, and cluster-based content insights.