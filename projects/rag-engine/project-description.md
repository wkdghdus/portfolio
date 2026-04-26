---
title: RAG Engine
date: 2025-06
description: A retrieval-augmented generation pipeline that indexes a document corpus with pgvector and serves grounded answers through a streaming Claude API integration.
tags: [python, postgresql, claude-api, fastapi]
---

## Overview

Indexes arbitrary PDF and Markdown documents into a PostgreSQL database with `pgvector` embeddings. At query time, retrieves the top-k most relevant chunks and passes them as context to Claude for grounded, citation-backed answers.

## Pipeline

1. **Ingest**: Parse documents → chunk at sentence boundaries → embed with `text-embedding-3-small` → upsert into `pgvector`
2. **Retrieve**: Embed query → cosine similarity search → return top-5 chunks with source metadata
3. **Generate**: Construct prompt with retrieved context → stream response from Claude Sonnet with citations

## API

FastAPI server with `/ingest`, `/query`, and `/sources` endpoints. Streaming responses via Server-Sent Events.
