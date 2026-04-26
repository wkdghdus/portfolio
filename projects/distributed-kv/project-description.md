---
title: Distributed Key-Value Store
date: 2024-12
description: A leaderless, eventually-consistent key-value store implementing a simplified version of the Dynamo paper. Written in Go with consistent hashing, vector clocks, and gossip-based failure detection.
tags: [go, distributed-systems]
---

## Overview

Educational implementation of Amazon Dynamo's core mechanisms: consistent hashing for partitioning, vector clocks for causality tracking, sloppy quorum reads/writes, and a gossip protocol for cluster membership.

## Architecture

- **Partitioning**: 256-slot consistent hash ring with virtual nodes for load balance
- **Replication**: Configurable N/R/W quorum (default N=3, R=2, W=2)
- **Conflict resolution**: Vector clock versioning with last-write-wins fallback
- **Failure detection**: SWIM-inspired gossip with indirect probing

## Status

Single-datacenter topology. Multi-region replication and read repair are on the roadmap.
