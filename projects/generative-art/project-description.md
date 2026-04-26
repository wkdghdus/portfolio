---
title: Generative Art System
date: 2025-03
description: A constraint-based generative art engine written in TypeScript. Produces high-resolution prints by composing noise fields, Voronoi diagrams, and flow-line algorithms on an HTML Canvas.
tags: [typescript, canvas, generative]
---

## Overview

Rule-driven visual system with no randomness at render time — each piece is fully deterministic from a seed. The seed encodes layout decisions, palette selection, and algorithm weights, making every output reproducible and shareable by URL.

## Algorithms

- **Flow lines**: Euler-integrated particle paths through a curl-noise vector field
- **Voronoi hatching**: Lloyd-relaxed cells with density-modulated line fill
- **Stippling**: Weighted Voronoi stippling via iterative centroid relaxation

## Output

Exports SVG for large-format print (up to A0 at 300 DPI) or PNG for web. Series of 50 unique pieces generated for a limited print run.
