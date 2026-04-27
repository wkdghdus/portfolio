---
title: Deep Concept Model (DCM)
startDate: 2026-03
endDate: Present
organization: Independent Research Proposal
description: A proposed neuro-symbolic AI research programme for building a formal concept algebra over mathematics, using dependent type theory, Lean 4, Mathlib, ontology graphs, hyperbolic embeddings, and verified concept generation to explore reasoning beyond natural language.
githubUrl:
tags: [research, neuro-symbolic-ai, knowledge-representation, ontology, type-theory, lean4, mathlib, theorem-proving, concept-generation, ai-for-mathematics, compositional-reasoning]
# coverImage: assets/deep-concept-model-preview.jpg
---

## Overview

Deep Concept Model (DCM) is a research proposal for building a formal system that reasons directly over concepts rather than over natural language tokens. The central idea is that concepts can be represented as compositional mathematical structures, generated from primitive elements, verified through formal proof tools, and registered into an expanding ontology.

The proposal argues that language may be a bottleneck for machine reasoning. Current large language models operate primarily through token prediction, which means their reasoning is mediated by linguistic sequences. DCM explores a different route: define concepts formally, compose them through algebraic and type-theoretic operations, verify whether the resulting structures are meaningful, and use the verified results to grow a computable ontology.

The first target domain is formal mathematics, especially elementary number theory, because mathematical concepts are naturally compositional and can be verified using proof assistants. Lean 4 and Mathlib provide the formal infrastructure: definitions, theorems, proof dependencies, type checking, and a large existing library of verified mathematical knowledge.

The project is scoped as a research programme with five conceptual layers:

1. Philosophical foundation.
2. Ontological structure.
3. Concept generation and verification.
4. Model training and architecture.
5. Curriculum traversal and reasoning evaluation.

The current proposal focuses on Layers 0 through 2: defining what a concept is, extracting and structuring a mathematical ontology, and building a verified combine-verify-register loop for generating new concepts.

## Research Motivation

The motivation behind DCM comes from a question about the future of AI reasoning:

**What if meaningful machine reasoning should not be forced to happen only through language?**

Large language models have achieved impressive results, but their core training objective remains linguistic: predict the next token. This gives them broad fluency, but it also ties their reasoning process to the expressive limits of language. Inspired by Wittgenstein's claim that the limits of language shape the limits of thought, DCM asks whether AI systems could reason more fundamentally at the level of concepts themselves.

The proposal also draws inspiration from observations about systems such as AlphaGo, where powerful strategies emerged that were effective but difficult for humans to interpret. If future AI systems develop reasoning pathways that do not map cleanly onto human linguistic categories, then a concept-native system may be better suited for representing and studying those forms of reasoning.

A second motivation comes from creativity research. Many novel ideas arise from combining previously separate concepts. DCM formalizes this intuition as a computational mechanism:

```text
existing concepts
      ↓
composition operators
      ↓
candidate concepts
      ↓
formal verification
      ↓
ontology registration
      ↓
future concept generation
```

In this view, creativity is not random invention. It is structured concept combination followed by validation.

## Problem

Modern AI systems are strong at generating language, but less transparent about the conceptual structures underlying their outputs. This creates several problems:

1. **Language dependence** - Reasoning is expressed through words even when the underlying structure may be mathematical, logical, spatial, or conceptual.
2. **Weak concept boundaries** - Embeddings can capture similarity, but they do not always provide explicit definitions, compositional structure, or verification guarantees.
3. **Limited verifiability** - Token-level models can generate plausible statements without proving that the underlying concept is well-formed or meaningful.
4. **Opaque novelty** - LLMs can suggest new combinations of ideas, but there is no built-in mechanism to check whether those combinations are valid, non-trivial, or useful.
5. **Combinatorial explosion** - If concepts can be freely combined, the search space grows rapidly unless generation is guided by type constraints, ontology structure, and interestingness metrics.

DCM addresses these problems by grounding concept generation in formal mathematics, where well-formedness and verification can be handled by Lean's type checker and proof infrastructure.

## Core Thesis

The central thesis of DCM is:

**A concept can be represented as a type in dependent type theory, and new concepts can be generated by composing existing types through formally defined operations.**

Under this framing:

- Concepts are types.
- Axioms and primitive definitions form the atomic conceptual layer.
- Composition is type construction.
- Verification is type checking and proof checking.
- The ontology is a graph of definitions, theorems, dependencies, and typed conceptual relationships.
- Concept generation is a repeated combine-verify-register process.

This makes DCM different from embedding-only approaches. It does not treat a concept as just a vector or sentence representation. Instead, a concept has a formal identity, a type-theoretic definition, provenance in an ontology, and a verification status.

## Relationship to Existing Work

### Meta's Large Concept Model

Meta FAIR's Large Concept Model moved from token-level modeling to sentence-level modeling by predicting sentence embeddings in the SONAR representation space. DCM accepts the broad intuition that reasoning should operate above individual tokens, but argues that sentence embeddings are still language-derived representations.

DCM pushes the idea further by defining concepts independently from sentences. In DCM, a concept is not just a compressed sentence; it is a formally constructed and verifiable object.

### Conceptual Spaces

Peter Gärdenfors' theory of conceptual spaces represents concepts as geometric regions in quality spaces. This is useful for perceptual concepts, similarity, and graded categories. DCM borrows the intuition that concepts can have geometric structure, especially for embedding and clustering the ontology, but its primary formal representation is type-theoretic rather than purely geometric.

### Type Theory and Formal Mathematics

Dependent type theory provides the formal foundation for DCM. In proof assistants such as Lean 4, propositions can be treated as types and proofs as programs. This makes it possible to represent mathematical concepts in a way that is both compositional and machine-checkable.

Lean 4's Mathlib serves as the starting knowledge base. Rather than constructing a mathematical ontology from scratch, DCM proposes extracting, annotating, and augmenting a subgraph of Mathlib.

### Library Learning and Program Synthesis

DreamCoder provides an important analogy. It learns reusable program abstractions through a wake-sleep process: solve problems, discover patterns, compress them into reusable library elements, and use those elements in future search.

DCM proposes a similar loop for concepts:

```text
compose candidate concept
verify it
register it
reuse it in later generation
```

The difference is that DCM targets mathematical concepts and formal ontologies rather than program libraries alone.

## Proposed Architecture

The DCM architecture is organized into layered stages.

```text
Layer 0: Philosophical foundation
        ↓
Layer 1: Ontological structure
        ↓
Layer 2: Concept generation and verification
        ↓
Layer 3: Concept-native model training
        ↓
Layer 4: Curriculum traversal and reasoning evaluation
```

The current research proposal focuses on Layers 0 through 2.

## Layer 0: Philosophical Foundation

Layer 0 defines the theoretical commitments of the system.

The main deliverable is a position paper that specifies:

- what counts as a concept
- why concepts are represented as types
- what counts as a primitive concept
- which composition operators are allowed
- how this framing compares to conceptual spaces, description logics, and embedding-based models
- why formal mathematics is the appropriate initial domain

The target proof-of-concept domain is elementary number theory. The proposal suggests curating 20-50 primitive concepts, such as definitions and basic lemmas around natural numbers, divisibility, primality, factorization, and the Euclidean algorithm.

These primitives become the initial conceptual atoms from which later candidate concepts can be composed.

## Layer 1: Ontological Structure

Layer 1 builds the computable ontology.

The proposed starting point is the dependency subgraph of the Fundamental Theorem of Arithmetic from Lean 4's Mathlib. This theorem is a strong initial target because it is conceptually rich but still bounded: it involves natural numbers, primes, divisibility, products, uniqueness, and factorization.

The ontology construction process has three stages.

### Extraction

Use Lean metaprogramming and LeanDojo-style extraction tools to extract a dependency subgraph from Mathlib.

Expected output:

```text
Mathlib definitions and theorems
        ↓
dependency subgraph
        ↓
50-100 concept nodes
        ↓
Lean-linked ontology seed
```

Each node remains connected to its original Lean object, preserving formal traceability.

### Curation and Annotation

Raw dependency graphs show which definitions and lemmas depend on others, but they do not fully describe conceptual structure. DCM proposes augmenting the graph with typed relationships:

- `is-a` - hierarchical subsumption
- `depends-on` - prerequisite dependency
- `composed-from` - constructive origin
- `maps-to` - functional or transformation relationship

The intended representation is a labelled property graph using tools such as NetworkX.

### Embedding and Clustering

After annotation, the graph can be embedded into hyperbolic space using Poincare embeddings. Hyperbolic geometry is useful because mathematical ontologies often have tree-like or hierarchical structure.

Community detection methods such as Louvain or spectral clustering can then identify coherent conceptual subregions of the ontology.

This creates two complementary views:

1. A formal symbolic graph linked to Lean definitions.
2. A geometric embedding useful for clustering, visualization, and novelty estimation.

## Layer 2: Concept Generation and Verification

Layer 2 is the central technical contribution of the proposal: a system that can generate new candidate concepts by composing existing ones and verifying the results.

The proposed pipeline is:

```text
select concepts
      ↓
choose composition operator
      ↓
construct candidate type expression
      ↓
check well-formedness in Lean
      ↓
attempt inhabitedness proof or witness construction
      ↓
check non-triviality against existing concepts
      ↓
score interestingness
      ↓
register verified concept in ontology
```

### Component Selection

The system selects two or more existing concepts from the ontology.

Candidate selection strategies include:

- random sampling as a baseline
- similarity-based selection using graph or embedding proximity
- analogy-based selection using structurally similar roles across subdomains
- gap-filling selection for concepts that appear related but are not yet connected

### Composition Operators

Composition is not treated as one generic operation. In type theory, there are several composition mechanisms:

- product types
- function types
- dependent pairs
- inductive definitions
- predicate restrictions

These operators allow the system to construct candidate concepts from existing types.

### Verification Levels

The proposal defines four levels of verification.

#### 1. Well-formedness

The first check asks whether the candidate type expression is syntactically and semantically valid in Lean.

This can often be checked quickly using Lean's type checker.

#### 2. Inhabitedness

The next check asks whether the concept has at least one object satisfying it. A concept may be well-formed but empty.

The system can attempt to construct witnesses using Lean tactics, examples, or existing lemmas.

#### 3. Non-triviality

A generated concept should not simply duplicate an existing concept. Non-triviality checking compares the candidate against existing ontology entries and attempts to detect equivalence, redundancy, or direct collapse into a known definition.

#### 4. Interestingness

The hardest criterion is whether the concept is mathematically meaningful. DCM proposes proxy metrics such as:

- proof-shortening: does the new concept simplify existing proofs?
- structural bridging: does it connect distant parts of the ontology?
- embedding novelty: does it occupy a distinct region in concept space?
- reuse potential: does it become useful in later generated concepts or proofs?

### Registration

If a candidate passes the required checks, it is registered as a new ontology node.

The registered concept stores:

- deterministic concept ID
- Lean type expression
- source component concepts
- composition operator
- verification status
- proof or witness artifact when available
- ontology edges
- embedding position
- interestingness scores

Once registered, the concept becomes available for future rounds of generation.

## Managing Combinatorial Explosion

A naive system would try every possible pair of concepts with every possible operator. With `N` concepts and `k` operators, binary composition alone creates `k * N^2` candidates per generation step.

DCM proposes several pruning strategies:

### Type-Directed Search

Lean's type system naturally rejects incompatible compositions. The search can use type signatures to avoid generating candidates that are unlikely to type-check.

### Analogy-Driven Generation

Instead of composing randomly, the system can look for structural analogies. If one part of the ontology contains a useful composition pattern, the system can attempt a similar construction in another region.

### Curriculum-Guided Generation

Generated concepts can be introduced gradually by depth. Concepts verified at one depth become inputs for the next generation round, preventing uncontrolled recursive explosion.

### Neural-Guided Search

A lightweight learned model can be trained to predict which candidate compositions are likely to pass verification or score highly on interestingness metrics.

This is inspired by the use of heuristic search in neural theorem proving systems.

## Asynchronous Concept Generation

One distinctive idea in the proposal is asynchronous concept generation. The combine-verify-register loop could run continuously, independently of any immediate user query or downstream reasoning task.

This resembles:

- DreamCoder's sleep phase
- experience replay in reinforcement learning
- background world-model refinement
- automated theorem-proving search

The ontology would grow over time, accumulating verified concepts that could later support reasoning, theorem proving, curriculum design, or concept-aware model training.

## Expected Contributions

If successful, the first phase of DCM would produce four main contributions.

### 1. Formal Concept Algebra for Mathematics

The project would define a rigorous concept algebra where concepts are types, primitive definitions serve as domain-level axioms, and composition is expressed through type construction.

### 2. Computable Mathematical Ontology

The project would produce an annotated, embedded ontology derived from a bounded Mathlib subgraph, with relationship types beyond raw dependency edges.

### 3. Verified Concept Generation Pipeline

The project would implement a working system that composes mathematical candidate concepts and verifies them through Lean.

### 4. Empirical Study of Machine-Generated Concepts

The project would evaluate whether generated concepts are well-formed, inhabited, non-trivial, and interesting. This would provide early evidence about whether automated concept generation can produce meaningful mathematical abstractions.

## Milestones

### Phase 1: Foundation

Planned deliverables:

- formal definition of concept in the type-theoretic framing
- comparison against conceptual spaces, description logics, and embedding-based concept models
- annotated reading notes on DCM-related literature
- curated primitive concept list for elementary number theory
- working Lean 4 and Mathlib proficiency

### Phase 2: Ontology Construction

Planned deliverables:

- extracted Mathlib dependency subgraph around the Fundamental Theorem of Arithmetic
- graph schema for typed ontology relationships
- manually curated evaluation subset
- NetworkX ontology graph
- Poincare embeddings
- community detection and visualization

### Phase 3: Concept Generation and Evaluation

Planned deliverables:

- concept composition prototype
- Lean-based well-formedness checking
- inhabitedness checking or witness construction
- non-triviality comparison against ontology entries
- at least one interestingness metric
- empirical report on generated concept statistics
- research paper draft for AI, knowledge representation, or neuro-symbolic AI venues

## Evaluation Plan

The evaluation should measure both formal correctness and research value.

Possible metrics include:

| Evaluation Area | Example Metric |
|---|---|
| Well-formedness | percentage of generated candidates accepted by Lean's type checker |
| Inhabitedness | percentage of well-formed concepts with constructed witnesses |
| Non-triviality | percentage not equivalent to existing ontology concepts |
| Interestingness | proof-shortening, graph-bridging, or embedding-novelty score |
| Ontology quality | consistency of typed relationships and cluster interpretability |
| Scalability | generation throughput and pruning efficiency |
| Reuse | number of later candidates or proofs that use a generated concept |

The most important question is not simply whether the system can generate valid types. The stronger research question is whether it can generate concepts that help organize or simplify mathematical reasoning.

## Risks and Mitigations

### Trivial Concept Generation

The system may generate concepts that are technically valid but mathematically uninteresting.

Mitigation:

- prioritize interestingness metrics
- use analogy-driven search
- measure proof-shortening and ontology-bridging value
- include human review for a small evaluation set

### Lean Integration Complexity

Lean metaprogramming and Mathlib extraction can be technically difficult.

Mitigation:

- start with LeanDojo extraction tools
- keep the first ontology small
- build custom Lean tooling only after the extraction workflow is stable

### Manual Annotation Burden

Typed ontology relationships may require manual curation.

Mitigation:

- auto-extract dependencies where possible
- manually annotate only the evaluation subset
- design schemas that can support gradual enrichment

### Scaling Beyond a Toy Domain

A 50-100 node proof-of-concept may not scale directly to thousands of concepts.

Mitigation:

- design the pipeline around graph modularity
- evaluate pruning efficiency early
- report scaling limits transparently
- expand gradually from elementary number theory to broader Mathlib regions

## Technical Stack

Planned or relevant technologies include:

- Lean 4
- Mathlib
- LeanDojo
- Python
- NetworkX
- PyTorch
- Graph neural networks
- Hyperbolic embeddings
- Poincare embeddings
- Louvain community detection
- Spectral clustering
- Type theory
- Dependent types
- Formal verification
- Theorem proving
- Ontology engineering
- Knowledge graphs
- Neuro-symbolic AI

## Future Directions

Layers 3 and 4 extend the proposal beyond ontology construction and concept generation.

### Layer 3: Concept-Native Model Training

Once the ontology exists, a model could be trained to reason over concept structures directly.

Possible architectures include:

- a concept augmentation module attached to an LLM
- a graph neural network over the concept ontology
- a hyperbolic neural network for hierarchical reasoning
- a transformer trained on next-concept prediction rather than next-token prediction
- a hybrid theorem-proving model that combines neural guidance with formal verification

### Layer 4: Curriculum Traversal

The ontology can also define a natural learning curriculum. Given a target theorem or reasoning problem, the system could identify prerequisite concepts and construct a traversal path through the ontology.

This could support:

- theorem-proving curricula
- adaptive tutoring systems
- concept prerequisite discovery
- proof planning
- interpretable reasoning traces

Potential evaluation targets include formal mathematics benchmarks such as miniF2F and PutnamBench.

## What This Research Could Demonstrate

The strongest version of DCM would demonstrate that machine-generated concepts can be more than linguistic paraphrases. They can be formal objects with definitions, dependencies, proofs, and reusable roles in a growing ontology.

Even a modest proof of concept would be valuable if it shows that:

- concepts can be represented as type-theoretic objects
- Mathlib can be transformed into a structured concept ontology
- new candidate concepts can be generated through composition
- Lean can verify well-formedness and support deeper checks
- interestingness metrics can filter useful generated concepts from trivial ones
- the resulting ontology can support future reasoning systems

## Current Status

DCM is currently at the research proposal stage. The proposal defines the philosophical motivation, theoretical framing, related work, methodology, milestones, risks, and planned implementation strategy.

The immediate next step is to move from proposal to prototype:

1. select the elementary number theory target subdomain
2. identify primitive concept candidates
3. extract a small Mathlib dependency graph
4. annotate typed ontology relationships
5. implement the first Lean-backed composition and verification loop

## Summary

Deep Concept Model is a proposal for a concept-native AI system grounded in formal mathematics. Instead of treating concepts as sentence embeddings or natural language descriptions, DCM represents them as types in dependent type theory, composes them through formal operators, verifies them with Lean, and registers successful candidates into an expanding ontology.

The project sits at the intersection of neuro-symbolic AI, type theory, theorem proving, ontology engineering, concept algebra, and AI for mathematics. Its long-term goal is to explore whether machine reasoning can move beyond language by operating directly on formally verified conceptual structures.
