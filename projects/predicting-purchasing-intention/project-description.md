---
title: Predicting Online Shoppers’ Purchasing Intention
startDate: 2025-10
endDate: 2025-11
organization: Western University
description: An end-to-end supervised machine learning pipeline for predicting purchase intent across 12.3K e-commerce sessions using behavioral feature engineering, leakage-safe preprocessing, class-imbalance-aware evaluation, and tuned linear, tree-based, and ensemble classifiers.
githubUrl: https://github.com/wkdghdus/Predicting-Purchasing-Intention
tags: [machine-learning, data-science, classification, ecommerce, feature-engineering, scikit-learn, xgboost, random-forest, logistic-regression, model-evaluation]
# coverImage: assets/purchasing-intention-preview.jpg
---

## Overview

**Predicting Online Shoppers’ Purchasing Intention** is a supervised machine learning project focused on forecasting whether an e-commerce browsing session will end in a purchase. The project uses the UCI Online Shoppers Purchasing Intention Dataset to model customer conversion behavior from session-level signals such as page visits, time spent on different page categories, bounce rate, exit rate, visitor type, month, operating system, browser, traffic type, and proximity to special shopping days.

The core goal was not only to build an accurate classifier, but also to understand **which behavioral signals explain purchase intent**. In an e-commerce setting, this type of model can help teams identify high-intent shoppers, improve customer targeting, prioritize remarketing resources, and design more effective conversion strategies.

The project followed an end-to-end data science workflow: exploratory data analysis, feature engineering, preprocessing, feature selection, model training, hyperparameter tuning, evaluation, and interpretation. The final modeling comparison showed that ensemble tree-based methods, especially Random Forest, provided the strongest overall performance across key classification metrics while preserving useful interpretability through feature importance analysis.

## Project Highlights

- Designed and implemented an end-to-end supervised ML pipeline for purchase-intent prediction on **12,330 e-commerce sessions**, covering EDA, feature engineering, multicollinearity filtering, preprocessing, model training, tuning, evaluation, and interpretation.
- Built a **leakage-safe preprocessing workflow** by fitting scaling parameters on the training set only and applying the same transformations consistently across validation and test data.
- Engineered behavior-focused features such as `Total_Time` and `Is_SpecialDay` to convert raw session activity into interpretable signals for engagement intensity and holiday-proximity effects.
- Addressed the dataset’s **15.5% positive-class imbalance** using class-imbalance-aware metrics, cross-validated model selection, and class-weighted Random Forest training.
- Benchmarked Logistic Regression variants, Decision Tree, Random Forest, and XGBoost using **F1-score, ROC-AUC, PR-AUC, precision, recall, and accuracy** rather than relying on accuracy alone.
- Improved generalization through regularization, hyperparameter tuning, redundancy reduction, and a consistent train/validation/test evaluation protocol.
- Identified `ProductRelated_Duration`, `BounceRates`, and `Total_Time` as the strongest behavioral indicators of purchasing behavior, connecting model performance to actionable e-commerce insight.

## Project Motivation

E-commerce platforms generate large volumes of behavioral data every time a visitor interacts with a website. Each session contains clues about user intent: whether the visitor explores product pages, how long they remain engaged, whether they bounce quickly, whether they arrive near a holiday, and whether they behave like a returning or new visitor.

However, purchase intention is difficult to predict using simple business rules. User behavior is noisy, class imbalance is common, and different types of engagement features interact in nonlinear ways. For example, a long session can indicate deep purchase consideration, but it can also reflect confusion or indecision. A low bounce rate may indicate meaningful engagement, but it must be considered alongside product-page duration, page category, visitor history, and session context.

This project approached the problem as a binary classification task:

- **Input:** structured behavioral and contextual features from an online shopping session
- **Output:** whether the session resulted in a purchase (`Revenue = 1`) or did not result in a purchase (`Revenue = 0`)

The project was designed around two complementary goals:

1. **Prediction:** compare multiple machine learning models and identify the strongest classifier for purchase-intent forecasting.
2. **Interpretability:** identify the features most associated with conversion so the model could support actionable business insights rather than only output predictions.

## Dataset

The project uses the **Online Shoppers Purchasing Intention Dataset** from the UCI Machine Learning Repository. The dataset contains session-level records describing how users interacted with an e-commerce website.

### Dataset characteristics

- **12,330 shopping sessions**
- **Binary target variable:** `Revenue`
  - `1`: the session ended in a purchase
  - `0`: the session did not end in a purchase
- **Imbalanced target distribution:** only about **15.5%** of sessions are positive purchase cases
- **No missing values**, so imputation was not required
- Mixture of numerical, categorical, and boolean features
- Behavioral metrics covering page visit counts, page durations, bounce rates, exit rates, page values, traffic source, visitor type, region, browser, operating system, weekend indicator, and special-day proximity

### Representative raw features

| Feature group | Examples | Purpose |
|---|---|---|
| Page-count features | `Administrative`, `Informational`, `ProductRelated` | Capture how many pages of each type a visitor viewed |
| Duration features | `Administrative_Duration`, `Informational_Duration`, `ProductRelated_Duration` | Capture time spent in different content areas |
| Engagement metrics | `BounceRates`, `ExitRates`, `PageValues` | Capture browsing quality and likelihood of leaving |
| Contextual features | `Month`, `SpecialDay`, `Weekend` | Capture seasonality and shopping-period effects |
| Technical/session features | `OperatingSystems`, `Browser`, `Region`, `TrafficType` | Capture platform and acquisition-channel variation |
| Visitor attributes | `VisitorType` | Distinguish new, returning, and other visitor categories |

## Problem Framing

The task was framed as a **binary supervised classification problem**. Each shopping session was represented as a feature vector, and the model learned to classify the session as either purchase or non-purchase.

This framing required particular care because the positive class was relatively rare. A naïve model could achieve high accuracy by predicting most sessions as non-purchases, but such a model would be practically weak because it would fail to identify the high-value minority class. For that reason, model evaluation considered not only accuracy but also precision, recall, F1-score, ROC-AUC, and PR-AUC.

## System Architecture

The pipeline was organized into four major stages:

```text
Raw session data
      ↓
Data ingestion and exploratory analysis
      ↓
Feature engineering and preprocessing
      ↓
Modeling layer: Logistic Regression, Decision Tree, Random Forest, XGBoost
      ↓
Evaluation, comparison, and model selection
```

### 1. Data ingestion and EDA

The project began by loading the shopping-session dataset and exploring feature distributions, target balance, correlations, and relationships between behavioral metrics and purchase outcomes.

Key findings from EDA included:

- The target variable was highly imbalanced, with purchase sessions representing only about 15.5% of the dataset.
- Engagement features such as product-page duration, bounce rate, and total time were strongly relevant to purchase behavior.
- Several numerical features were highly correlated, requiring redundancy checks before modeling.
- Categorical variables such as `Month`, `VisitorType`, and `Region` needed encoding before they could be used by machine learning models.

### 2. Feature engineering and preprocessing

The raw dataset was transformed into a model-ready design matrix using a consistent preprocessing workflow.

### 3. Modeling layer

The project compared both linear and nonlinear classification models:

- Logistic Regression baseline
- L1-regularized Logistic Regression
- L2-regularized Logistic Regression
- Decision Tree
- Random Forest
- XGBoost

This model suite allowed the project to compare interpretable linear approaches, shallow tree baselines, bagged tree ensembles, and boosted tree ensembles.

### 4. Evaluation and selection

All models were evaluated using consistent train/validation/test procedures and a shared set of metrics. Random Forest achieved the strongest overall performance across accuracy, F1-score, and ROC-AUC, making it the best-performing model in the final comparison.

## Exploratory Data Analysis

The EDA stage focused on understanding the dataset before modeling. Because the project involved human behavior and imbalanced outcomes, EDA was critical for avoiding misleading conclusions.

### Class imbalance

Only about **15.5%** of sessions resulted in purchases. This class imbalance shaped the model-selection process because accuracy alone could overstate model quality. The project therefore emphasized metrics that better reflect minority-class detection, such as F1-score, ROC-AUC, and PR-AUC.

### Correlation analysis

A correlation heatmap was used to identify relationships among numerical variables. This analysis revealed high correlation between several page-count and duration-based variables. The strongest redundancy issue was between `ExitRates` and `BounceRates`, which were correlated at approximately **r = 0.91**. To reduce redundancy, `ExitRates` was removed during correlation-based filtering.

### Behavioral interpretation

The EDA supported a key project insight: purchase intent is strongly tied to engagement quality. Sessions with stronger product-related engagement, lower bounce behavior, and meaningful time spent across the site were more likely to result in conversion.

Rather than treating all page views equally, the project distinguished between:

- broad navigation behavior,
- product-focused exploration,
- quick abandonment signals,
- total session engagement,
- and contextual shopping-period effects.

This helped guide feature engineering and later interpretation.

## Feature Engineering

Feature engineering was used to make behavioral signals more meaningful and easier for models to learn.

### `Total_Time`

A new `Total_Time` feature was created by summing the duration spent across administrative, informational, and product-related pages:

```text
Total_Time = Administrative_Duration
           + Informational_Duration
           + ProductRelated_Duration
```

This feature provides a single continuous measure of total engagement intensity during a session. Instead of forcing the model to infer total session duration from three separate columns, `Total_Time` exposes a direct behavioral summary.

### `Is_SpecialDay`

The original `SpecialDay` variable encoded proximity to a holiday or special shopping period as a continuous value between 0 and 1. To improve interpretability, it was converted into a binary feature:

```text
Is_SpecialDay = 1 if SpecialDay > 0
Is_SpecialDay = 0 otherwise
```

This transformation made it easier to distinguish sessions occurring near special shopping periods from ordinary sessions.

### Impact of derived features

The two derived features increased the feature set from 18 to 20 pre-encoding features and introduced higher-level behavioral representations. These features improved the interpretability of the modeling workflow while preserving the original information in a more useful form.

## Preprocessing Pipeline

The preprocessing workflow was designed to be reproducible and consistent across all models.

### Categorical encoding

Categorical variables were transformed using one-hot encoding. This allowed models to use variables such as month, visitor type, and region without imposing false ordinal relationships.

### Boolean encoding

Boolean features such as `Weekend` and `Revenue` were encoded as `0` and `1`.

### Numerical scaling

Numerical features were standardized using **training-set statistics only**:

```text
x_scaled = (x - mean_train) / std_train
```

This prevented information from the validation or test sets from leaking into preprocessing. The same fitted scaler was then applied consistently across validation and held-out test data, which made cross-model comparisons fairer and more reproducible. This step was especially important for Logistic Regression, since linear models are sensitive to feature scale.

### Missing data

The dataset contained no missing values, so no imputation was required.

### Variance filtering

A variance threshold of `0.0` was applied to detect constant features. No features were removed at this stage.

### Correlation filtering

Highly correlated features were reviewed using a threshold of `|r| >= 0.90`. `ExitRates` was removed because it was highly correlated with `BounceRates` at approximately `r = 0.91`. This reduced redundancy while preserving a closely related engagement signal.

## Models Implemented

The project compared a diverse set of classifiers to evaluate tradeoffs between interpretability, nonlinear learning capacity, and predictive performance.

## Logistic Regression

Logistic Regression served as the main linear baseline. It provided a useful starting point because coefficients can be interpreted directly after preprocessing.

Three Logistic Regression variants were trained:

### Baseline Logistic Regression

- Penalty: none
- `max_iter`: 2000

### Ridge Logistic Regression

- Penalty: L2
- `C`: 0.01
- `max_iter`: 2000

L2 regularization was used to stabilize the model and reduce overfitting by shrinking coefficients.

### LASSO Logistic Regression

- Penalty: L1
- `C`: 0.1
- `max_iter`: 2000

L1 regularization performed embedded feature selection, retaining 17 of 38 encoded features. This made the model more compact and helped identify which variables were most predictive in a linear setting.

## Decision Tree

A shallow Decision Tree was trained as an interpretable nonlinear baseline.

Tuned configuration:

- Criterion: entropy
- `max_depth`: 4
- `min_samples_split`: 2

The tree was intentionally constrained to maintain interpretability. While deeper trees may fit more complex relationships, shallow trees are easier to explain and can reveal simple decision rules in user behavior.

## Random Forest

Random Forest was used as the primary bagged ensemble model. It combines many decision trees to reduce variance and capture nonlinear feature interactions.

Tuned configuration:

- `n_estimators`: 300
- `max_depth`: None
- `min_samples_split`: 10
- `class_weight`: balanced
- `random_state`: 42
- Tuning objective: ROC-AUC

The use of `class_weight='balanced'` was important because purchase sessions were the minority class. This helped the model account for imbalanced labels during training.

Random Forest achieved the strongest overall results across accuracy, F1-score, and ROC-AUC. It also supported feature-importance analysis, making it useful for both prediction and interpretation.

## XGBoost

XGBoost was included as a boosted tree ensemble capable of capturing nonlinear interactions through sequential error correction.

Tuned configuration:

- `n_estimators`: 100
- `max_depth`: 3
- `learning_rate`: 0.1
- `subsample`: 1.0
- `colsample_bytree`: 1.0
- `eval_metric`: logloss
- `random_state`: 42

XGBoost provided a strong nonlinear benchmark against Random Forest and helped evaluate whether boosting improved purchase-intent classification compared with bagging.

## Training and Evaluation Protocol

All models were trained using the same standardized, leakage-safe protocol to ensure a fair comparison.

### Data split

The dataset was split into:

- **70% training**
- **15% validation** through internal cross-validation
- **15% held-out testing**

### Evaluation metrics

The project evaluated each model using:

- Accuracy
- Precision
- Recall
- F1-score
- ROC-AUC
- PR-AUC

Using multiple metrics was important because of class imbalance. Accuracy alone could be misleading when only 15.5% of sessions were positive purchase cases, so F1-score and PR-AUC were especially relevant for understanding performance on the minority purchase class.

### Cross-validated tuning

Hyperparameters were selected using validation performance and cross-validation where appropriate. Regularized Logistic Regression models controlled coefficient magnitude, the shallow Decision Tree was tuned for interpretability, Random Forest was optimized with ROC-AUC scoring and class-weighted learning, and XGBoost was tuned as a boosted-tree benchmark.

### Model comparison

The final comparison showed that **Random Forest** achieved the strongest overall performance across accuracy, F1-score, and ROC-AUC. This result aligned with the project’s hypothesis that purchase intent depends on nonlinear interactions between engagement features, session context, and visitor attributes. Its class-weighted training setup also made it better suited to the imbalanced target distribution than models that optimized only for overall accuracy.

## Key Findings

### Engagement features were the strongest predictors

The most important predictors were behavioral engagement metrics, especially:

- `ProductRelated_Duration`
- `BounceRates`
- `Total_Time`

These features helped capture whether a visitor was meaningfully engaging with products or leaving quickly.

### Product-focused behavior mattered more than generic browsing

The project showed that not all engagement is equally valuable. Time spent on product-related pages was especially important because it more directly reflects shopping intent than general navigation.

### Bounce and exit behavior were strong negative signals

High bounce or exit behavior often indicates that users are disengaged, unable to find what they need, or unlikely to complete a purchase. The correlation analysis also showed that bounce and exit behavior overlap heavily, motivating the removal of `ExitRates` to reduce redundancy.

### Tree-based ensembles handled nonlinear behavior effectively

The best results came from Random Forest, suggesting that conversion behavior is not purely linear. Interactions between page duration, visitor type, traffic source, month, and engagement quality likely play an important role in purchase prediction.

### Interpretability remained central

The project was designed to go beyond model accuracy. By analyzing feature importance and engineered features, the workflow produced insights that could inform marketing and product decisions.

## Technical Challenges

### Handling class imbalance

The positive purchase class represented only a small portion of the dataset. This made it necessary to evaluate models using metrics beyond accuracy and to use class-balancing strategies for ensemble models.

### Preventing misleading feature redundancy

Several engagement features were correlated. Without correlation filtering, redundant features could distort interpretation and lead to unnecessary complexity. The project addressed this by removing `ExitRates` due to its high correlation with `BounceRates`.

### Balancing interpretability and predictive power

Linear models and shallow decision trees were easier to explain, but ensemble models achieved stronger predictive performance. The project therefore compared both model families and selected Random Forest as the best overall model because it provided strong performance while still supporting feature-importance analysis.

### Designing features that reflect behavior

Raw page counts and durations do not always map directly to purchase intent. The derived `Total_Time` and `Is_SpecialDay` features helped convert raw session attributes into more interpretable behavioral signals.

## What I Built

For this project, I helped design and implement an end-to-end supervised machine learning workflow for predicting online purchase intention from e-commerce session behavior. My work emphasized reproducibility, fair model comparison, and interpretable business insight.

Key contributions included:

- Designed the full supervised learning pipeline for **12.3K shopping sessions**, from raw data analysis through model selection and final reporting.
- Performed EDA to identify class imbalance, feature distributions, correlation structure, and feature-target relationships.
- Engineered behavioral features including `Total_Time` and `Is_SpecialDay` to represent total engagement and holiday-proximity effects.
- Built a leakage-safe preprocessing flow by encoding categorical variables, converting booleans, and standardizing numerical features using training-set statistics only.
- Applied variance filtering and correlation-based redundancy removal, including removing `ExitRates` due to its high correlation with `BounceRates`.
- Trained and evaluated Logistic Regression variants, Decision Tree, Random Forest, and XGBoost classifiers under a consistent split and metric framework.
- Used regularization, class-weighted learning, and cross-validated hyperparameter tuning to improve generalization on an imbalanced classification task.
- Evaluated models with accuracy, precision, recall, F1-score, ROC-AUC, and PR-AUC to avoid overvaluing majority-class performance.
- Interpreted model behavior through feature importance, identifying product-page duration, bounce behavior, and total session time as the strongest purchase-intent signals.
- Produced a reproducible academic-style report and repository structure with notebooks for EDA, feature engineering, model training, and final documentation.

## Repository Structure

The GitHub repository is organized around the major stages of the data science workflow:

```text
Predicting-Purchasing-Intention/
├── EDA/
│   ├── Project - EDA.ipynb
│   ├── correlation.ipynb
│   ├── dataSummary.ipynb
│   └── visualExploration.ipynb
├── Feature engineering/
│   ├── DS3000_feature_eng_encoding_scaling.ipynb
│   ├── creatingDerivedFeatures.ipynb
│   └── feature_selection.ipynb
├── Model/
│   ├── Logistic regression model/
│   ├── Random forest model/
│   ├── XGBoost Model/
│   └── train_test_split_code.ipynb
├── report/
│   ├── IEEEtran.cls
│   ├── correlation_heatmap.png
│   └── main.tex
├── out/
│   └── final_report.pdf
├── online_shoppers_intention_data.csv
├── processed_online_shoppers_data.csv
└── README.md
```

This organization separates analysis, feature processing, modeling, and reporting into clear stages, making the project easier to review and reproduce.

## Skills Demonstrated

### Machine learning

- Binary classification
- Model benchmarking
- Logistic Regression
- Decision Trees
- Random Forest
- XGBoost
- Hyperparameter tuning
- Class-imbalance-aware evaluation

### Data science

- Exploratory data analysis
- Feature engineering
- Feature scaling
- One-hot encoding
- Feature selection
- Correlation analysis
- Model interpretation

### Evaluation and reproducibility

- Train/validation/test splitting
- Cross-validation-based tuning
- ROC-AUC and PR-AUC analysis
- Consistent preprocessing across models
- Reproducible notebooks and report artifacts

### Business analytics

- Purchase-intent modeling
- Behavioral segmentation
- Conversion-rate analysis
- High-intent shopper identification
- Marketing and remarketing insight generation

## Business Impact

A model like this can help an e-commerce platform make more intelligent decisions about customer engagement. By identifying sessions that are more likely to convert, businesses can:

- prioritize high-intent shoppers for personalized offers,
- reduce wasted advertising spend on low-intent visitors,
- improve remarketing campaigns,
- understand which behaviors precede purchases,
- optimize page flows and product discovery,
- and use behavioral analytics to support conversion-rate optimization.

The project’s interpretability component is especially important because it connects model output to actionable product and marketing decisions. Rather than simply predicting whether a user will buy, the model helps explain which session behaviors are most associated with buying.

## Lessons Learned

This project reinforced several important machine learning lessons:

1. **Accuracy is not enough for imbalanced classification.** A model can appear strong while still failing to identify the minority purchase class.
2. **Feature engineering can improve both learning and interpretation.** `Total_Time` and `Is_SpecialDay` made raw behavioral signals easier to understand.
3. **Correlation filtering matters for interpretability.** Removing highly redundant features helps clarify which signals are actually driving model behavior.
4. **Tree ensembles are strong for behavioral prediction.** Random Forest performed well because it could capture nonlinear relationships between engagement metrics and conversion outcomes.
5. **Business value comes from explanation, not just prediction.** The most useful output was not only the predicted label, but also the identification of behavioral features that indicate shopper intent.

## Future Improvements

Several extensions could make this project more production-ready:

- Add calibration analysis so predicted probabilities better reflect true conversion likelihood
- Use threshold tuning to optimize for business-specific objectives such as recall, precision, or expected revenue
- Compare resampling strategies such as SMOTE or undersampling for handling class imbalance
- Add SHAP or permutation importance for deeper model interpretation
- Build a lightweight dashboard for exploring predicted purchase probability by session segment
- Package the preprocessing and model pipeline into a reusable inference script
- Add experiment tracking for model configurations and metrics
- Evaluate temporal generalization by splitting sessions across time rather than randomly
- Test cost-sensitive learning strategies that reflect the business cost of false positives and false negatives

## Summary

This project demonstrates a complete applied machine learning workflow for e-commerce purchase-intent prediction. It combines behavioral analytics, careful preprocessing, feature engineering, model benchmarking, and interpretability to classify shopping sessions as purchase or non-purchase.

The final results showed that Random Forest delivered the strongest overall classification performance, while feature analysis highlighted product-page engagement, bounce behavior, and total session time as key predictors of conversion. The project shows how machine learning can transform raw web-session data into actionable insight for customer targeting and conversion optimization.