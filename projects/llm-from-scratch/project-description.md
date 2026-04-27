---
title: Building a GPT-Style LLM from Scratch
startDate: 2025-04
endDate: 2025-05
organization: Personal Project
description: A ground-up PyTorch implementation journey for understanding GPT-style language models, covering tensor operations, autograd, neural network training loops, tokenization, byte-pair encoding, embedding construction, positional embeddings, causal self-attention, and multi-head attention.
githubUrl: https://github.com/wkdghdus/LLM
tags: [machine-learning, deep-learning, llm, transformer, gpt, pytorch, tokenization, embeddings, attention, neural-networks, nlp]
# coverImage: assets/llm-from-scratch-preview.jpg
---

## Overview

Building a GPT-Style LLM from Scratch is a personal deep learning project focused on implementing the core components of a modern decoder-only language model from first principles. The project follows the learning path of *Build a Large Language Model (From Scratch)* by Sebastian Raschka while translating each concept into working PyTorch code, dev-log explanations, and progressively more realistic model-building modules.

The goal was not simply to use an existing LLM API or fine-tune a pretrained model. Instead, the project was designed to answer a deeper engineering question: what actually happens inside an LLM before text becomes predictions?

Across the first development phase, I implemented and documented the foundational layers of the LLM stack:

- PyTorch tensor operations, computation graphs, autograd, datasets, dataloaders, and training loops.
- Text preprocessing through regex tokenization, vocabulary construction, token ID mapping, GPT-2 byte-pair encoding, and sliding-window sampling.
- Token embeddings and positional embeddings for converting text sequences into model-ready vectors.
- Self-attention, causal masking, and multi-head attention modules that form the backbone of GPT-style transformer blocks.

The result is a structured educational codebase and technical writing series that demonstrates how raw text is transformed into tensors, how neural networks learn from loss signals, and how attention mechanisms allow language models to build contextual representations.

## Motivation

This project started after reflecting on previous AI agent work. While LLM-based agents are powerful, they also have real limitations: token windows, latency, persistent state, structured reasoning, and cases where custom machine learning models can be more appropriate than prompt engineering alone.

That experience made me want to understand machine learning at a lower level. Instead of treating LLMs as black boxes, I wanted to rebuild the machinery layer by layer: tensors, gradients, tokenization, embeddings, attention, and eventually GPT-style generation.

The project became both a coding exercise and a learning journal. Each implementation was paired with a Medium dev log to explain what I built, what confused me, and what conceptual breakthrough came from writing the code directly.

## Problem

Large language models can feel abstract because many tutorials start from high-level APIs. That makes it hard to understand:

1. **How tensors, gradients, and optimizers actually interact during training.**
2. **How raw text becomes numerical input that a neural network can process.**
3. **Why transformers need token embeddings and positional embeddings.**
4. **How self-attention produces context-aware token representations.**
5. **Why causal masking is required for autoregressive GPT-style generation.**
6. **How multi-head attention allows a model to attend to multiple representation subspaces at once.**

The project addresses this by implementing the LLM pipeline as a sequence of small, inspectable modules rather than as one opaque model.

## My Role

I independently built, documented, and organized the project. My work included:

- Implementing PyTorch fundamentals, including tensor manipulation, computation graph experiments, gradient tracking, and neural network forward passes.
- Building a custom dataset and dataloader workflow for supervised neural network training exercises.
- Implementing a complete training loop with forward pass, loss calculation, backward propagation, optimizer updates, and gradient resets.
- Designing tokenizers that support encoding and decoding from text to token IDs and back.
- Extending simple tokenization with unknown-token handling and document-boundary tokens.
- Using GPT-2 byte-pair encoding through `tiktoken` to handle open-vocabulary text more realistically.
- Creating sliding-window input-target pairs for next-token prediction.
- Implementing token embeddings and positional embeddings to prepare text for transformer-style processing.
- Implementing self-attention manually with trainable query, key, and value matrices.
- Refactoring self-attention with `torch.nn.Linear` projection layers for cleaner PyTorch module design.
- Implementing causal attention with an upper-triangular mask so each token can only attend to current and previous tokens.
- Implementing multi-head attention with head splitting, scaled dot-product attention, causal masking, dropout, concatenation, and output projection.
- Writing public Medium dev logs that explain the reasoning, implementation details, and learning milestones behind each stage.

## System Architecture

At a high level, the project follows the early architecture of a GPT-style language model pipeline:

```text
Raw text
   ↓
Tokenization
   ↓
Vocabulary / BPE token IDs
   ↓
Sliding-window input-target sampling
   ↓
Token embeddings
   ↓
Positional embeddings
   ↓
Self-attention
   ↓
Causal attention
   ↓
Multi-head attention
   ↓
Future GPT block / pretraining pipeline
```

The codebase is organized around learning stages:

```text
LLM/
├── pytorch_exercises/
│   ├── tensor_basics.py
│   ├── computation_graph_basics.py
│   ├── datasets_and_dataloaders.py
│   ├── multilayer_neural_network_forward.py
│   ├── training_loop.py
│   └── acceleration_compatibility.py
│
├── data_preparation_and_sampling/
│   ├── tokenizer_v1.py
│   ├── tokenizer_v2.py
│   ├── byte_pair_encoding.py
│   ├── tokens_to_token_id.py
│   ├── dataset.py
│   ├── data_sampling.py
│   └── positional_embedding.py
│
├── attention/
│   ├── self_attention.py
│   ├── self_attention_with_no_trainable_weight.py
│   ├── self_attention_practice.py
│   ├── causal_attention.py
│   └── multi_head_attention.py
│
├── README.md
├── requirements.txt
└── the-verdict.txt
```

## PyTorch Foundations

The first stage focused on understanding the mechanics of PyTorch before building any LLM-specific components.

### Tensor Operations

I explored scalar, vector, matrix, and 3D tensor representations and practiced common tensor operations such as:

- shape inspection
- reshaping
- transposition
- dtype conversion
- device movement
- NumPy-to-tensor memory sharing

This helped establish the mental model that almost every deep learning operation eventually becomes tensor algebra.

### Computation Graphs and Autograd

I implemented a small logistic regression-style computation to study how PyTorch tracks operations dynamically:

```text
z = x1 * w1 + b
a = sigmoid(z)
loss = binary_cross_entropy(a, y)
```

The goal was to understand how `.backward()` traverses the computation graph, computes gradients, and stores them on trainable parameters.

This was a key conceptual milestone because it connected the math of backpropagation to the actual PyTorch objects and `.grad` fields used during training.

### Datasets and Dataloaders

I implemented a custom `Dataset` class and wrapped it with PyTorch's `DataLoader` to practice the standard pattern used in model training:

```text
Dataset → DataLoader → Mini-batches → Model → Loss → Backward → Optimizer
```

This made the training pipeline feel more modular. Data loading, batching, model definition, loss calculation, and optimization each became separate responsibilities.

### Neural Network Forward Pass

I built a small multilayer perceptron using `torch.nn.Sequential` with linear layers and ReLU activations. This clarified how input tensors are transformed layer by layer into logits before loss calculation.

The exercise also made the meaning of weights, biases, activations, and logits more concrete.

### Training Loop

I implemented the standard PyTorch training loop:

```text
forward pass
loss calculation
backward pass
optimizer step
gradient reset
```

The training loop was one of the most important foundations for the project because every later LLM component depends on the same optimization cycle.

## Text-to-Tensor Pipeline

The second stage focused on the question: how does raw text become model input?

This stage implemented the early data pipeline needed for language modeling.

### Regex Tokenization

I first implemented a simple tokenizer that splits text into words and punctuation using regex rules. This tokenizer supported:

- `.encode(text)` to convert text into token IDs.
- `.decode(ids)` to reconstruct text from token IDs.

This made tokenization inspectable and easy to debug, even though it was limited to known vocabulary.

### Vocabulary Construction

After tokenizing the text, I built a vocabulary dictionary mapping unique tokens to integer IDs. This step showed why language models need a stable token-to-index mapping before embeddings can be learned.

The implementation also used reverse mappings so decoded outputs could be checked against the original text.

### Unknown Tokens and Document Boundaries

The second tokenizer version added special token support:

- `<|unk|>` for unknown vocabulary items.
- `<|endoftext|>` for document boundaries.

This improved robustness compared with the first tokenizer, but also highlighted why simple word-level tokenization does not scale well for open-vocabulary language modeling.

### Byte-Pair Encoding

To move beyond toy tokenization, I used the GPT-2 byte-pair encoding tokenizer through `tiktoken`.

BPE matters because it can represent unseen words by breaking them into known subword units instead of collapsing them into a generic unknown token. This is closer to how GPT-style models process real text.

### Sliding-Window Sampling

I implemented a `GPTDatasetV1` dataset that turns a long token stream into input-target pairs for next-token prediction.

For each window:

```text
input:  [token_0, token_1, token_2, ..., token_n]
target: [token_1, token_2, token_3, ..., token_n+1]
```

This creates the supervised training signal used in autoregressive language modeling: predict the next token from the previous context.

The dataset supports configurable:

- `max_length`
- `stride`
- `batch_size`
- `shuffle`
- `drop_last`
- `num_workers`

This made the data pipeline flexible enough to experiment with overlapping and non-overlapping sequence windows.

## Embeddings

After creating token IDs, I implemented the embedding layer logic needed to turn discrete symbols into dense vectors.

### Token Embeddings

Token IDs are not meaningful by themselves; they are integer indexes. I used `torch.nn.Embedding` to map each token ID into a learnable vector.

This helped me understand that embeddings are not magic semantic objects at initialization. They are trainable lookup-table rows that become useful through optimization.

### Positional Embeddings

Transformers do not naturally know token order. Without positional information, a sequence can behave too much like an unordered collection of tokens.

To solve this, I implemented positional embeddings and added them to token embeddings. This gives each token representation both:

- identity information from the token embedding
- order information from the positional embedding

The combined representation becomes the input to later transformer modules.

## Attention Mechanisms

The third stage implemented the core mechanism that makes transformer language models powerful: attention.

### Self-Attention with Manual Weights

I first implemented self-attention using manually defined trainable matrices:

- `W_query`
- `W_key`
- `W_value`

The forward pass projected input tokens into query, key, and value vectors, computed scaled dot-product attention scores, applied softmax, and used the resulting attention weights to compute context vectors.

This implementation helped clarify the role of each projection:

- queries represent what a token is looking for
- keys represent what each token offers
- values represent the information that gets aggregated

### Self-Attention with Linear Layers

After implementing the manual version, I refactored the same logic using `torch.nn.Linear`.

This made the module cleaner and closer to production-style PyTorch code while preserving the same conceptual structure:

```text
input embeddings
   ↓
query/key/value projections
   ↓
attention scores
   ↓
softmax weights
   ↓
weighted value aggregation
   ↓
context vectors
```

### Causal Attention

For GPT-style language modeling, normal self-attention is not enough. If a token can attend to future tokens during training, the model can leak information from the answer it is supposed to predict.

I implemented causal attention using an upper-triangular mask. Positions above the diagonal are filled with negative infinity before softmax, forcing each token to attend only to itself and earlier tokens.

This is a core requirement for autoregressive generation because the model must learn to predict the next token from past context only.

### Multi-Head Attention

I then implemented multi-head attention by splitting the projected representation into multiple heads.

The implementation includes:

- query, key, and value projections
- head dimension calculation
- reshaping into `[batch, heads, tokens, head_dim]`
- scaled dot-product attention per head
- causal masking
- dropout on attention weights
- weighted value aggregation
- concatenation of heads
- final output projection

Multi-head attention lets the model learn multiple attention patterns in parallel. Instead of relying on one attention distribution, each head can specialize in different relationships between tokens.

## Technical Highlights

### From Fundamentals to Transformer Components

The project intentionally starts with PyTorch fundamentals before moving into transformer architecture. This makes the later attention implementation easier to reason about because the underlying tensor operations, gradients, modules, and dataloaders are already understood.

### Inspectable LLM Data Pipeline

The text pipeline is implemented step by step, from simple regex tokenization to GPT-2 BPE. This makes the transition from human-readable text to training-ready tensors transparent.

### Next-Token Prediction Dataset

The custom dataset produces shifted input-target pairs, matching the core self-supervised objective used by GPT-style models.

### Positional Encoding Through Learnable Embeddings

The project implements positional embeddings as learnable vectors added directly to token embeddings, giving the model sequence-order information before attention layers process the input.

### Attention Built from Scratch

Self-attention, causal attention, and multi-head attention are implemented manually in PyTorch. This demonstrates the mechanics behind transformer blocks instead of relying on high-level framework abstractions.

### Autoregressive Masking

The causal attention module registers a fixed upper-triangular mask as a model buffer. This keeps the mask attached to the module without making it a trainable parameter.

### Public Learning Documentation

Each major stage is paired with a Medium dev log. The writing explains not only what was implemented, but also the intuition, confusion points, and conceptual breakthroughs behind the implementation.

## Development Logs

The project is documented through a public technical writing series.

### Week 1: PyTorch Foundations

The first dev log focused on the groundwork for building a GPT-style LLM:

- LLM development lifecycle
- tensors
- autograd
- computation graphs
- forward and backward propagation
- gradient descent
- custom datasets and dataloaders
- multilayer neural networks
- GPU and Apple MPS acceleration checks

This stage established the basic training vocabulary and PyTorch mechanics needed for later transformer work.

### Week 2: Text to Tensors

The second dev log focused on the LLM input pipeline:

- tokenization
- vocabulary construction
- token IDs
- unknown-token handling
- GPT-2 byte-pair encoding
- embedding layers
- positional embeddings
- sliding-window input-target sampling

This stage connected raw text processing to the tensors that enter an LLM.

### Week 3: Attention Mechanisms

The third dev log focused on attention:

- self-attention without trainable weights
- trainable query/key/value projections
- scaled dot-product attention
- causal masking
- dropout in attention weights
- multi-head attention
- context vectors for autoregressive language modeling

This stage implemented the core computation that allows transformer models to build context-aware token representations.

## Challenges

### Moving from API Usage to First Principles

Before this project, it was easy to understand embeddings and LLMs as high-level concepts. The challenge was turning those concepts into code and seeing how every tensor shape, projection, and target sequence had to line up exactly.

### Debugging Tensor Shapes

Attention mechanisms require careful handling of dimensions. Moving from `[tokens, dim]` to `[batch, tokens, dim]` and then to `[batch, heads, tokens, head_dim]` made tensor shape discipline one of the most important skills in the project.

### Understanding Causality

The causal mask was conceptually simple but implementation-critical. The model must never use future tokens when learning next-token prediction. Implementing the upper-triangular mask made this constraint concrete.

### Tokenization Tradeoffs

Simple tokenization is easy to understand but brittle. BPE is more robust but less intuitive. Implementing both made the tradeoff clear: educational transparency versus real-world vocabulary coverage.

### Bridging Theory and Code

Concepts like autograd, positional embeddings, and scaled dot-product attention are easier to describe than to implement correctly. Writing the modules forced me to reconcile the textbook equations with PyTorch operations.

## What I Learned

This project taught me that LLMs are built from understandable pieces. The full system is complex, but each layer has a clear job:

- tensors represent data
- computation graphs track operations
- losses define the learning signal
- optimizers update parameters
- tokenizers convert text into IDs
- embeddings convert IDs into vectors
- positional embeddings inject order
- attention creates context-aware representations
- causal masking preserves autoregressive training constraints
- multi-head attention expands the model's ability to learn different token relationships

Most importantly, I learned that building from scratch changes how you debug and reason about models. Instead of seeing an LLM as a black box, I can now trace the path from raw text to token IDs, embeddings, attention scores, context vectors, loss, gradients, and parameter updates.

## Technologies Used

- Python
- PyTorch
- torch.nn
- torch.utils.data
- Autograd
- NumPy
- tiktoken
- GPT-2 byte-pair encoding
- Tokenization
- Embedding layers
- Positional embeddings
- Self-attention
- Causal attention
- Multi-head attention
- Markdown technical writing
- Medium dev logs
- GitHub

## Results Summary

The project produced a working early-stage LLM-from-scratch codebase with public documentation.

Key outcomes:

- Implemented PyTorch exercises for tensors, autograd, datasets, dataloaders, multilayer networks, and training loops.
- Built text preprocessing modules for regex tokenization, vocabulary mapping, unknown-token handling, and GPT-2 BPE.
- Created a next-token prediction dataset using sliding-window input-target pairs.
- Implemented token embeddings and positional embeddings.
- Built self-attention from manual trainable matrices and then refactored it with `torch.nn.Linear`.
- Implemented causal attention with an autoregressive mask.
- Implemented multi-head attention with head splitting, masking, dropout, concatenation, and output projection.
- Published dev logs explaining the project progression and learning milestones.
- Organized the codebase into clear learning modules that mirror the progression from PyTorch fundamentals to transformer components.

## Future Improvements

Potential next steps include:

- Implement a full transformer block with layer normalization, residual connections, feed-forward layers, and dropout.
- Assemble the transformer blocks into a minimal GPT-style architecture.
- Add a configurable training script for pretraining on a larger text corpus.
- Implement text generation with temperature, top-k sampling, and nucleus sampling.
- Add checkpointing, validation loss tracking, and training curves.
- Improve repository documentation with diagrams and per-module usage examples.
- Add unit tests for tokenizer round-trips, dataset shape contracts, causal masks, and attention output dimensions.
- Benchmark CPU, CUDA, and Apple MPS performance.
- Experiment with fine-tuning on custom instruction-style data.
