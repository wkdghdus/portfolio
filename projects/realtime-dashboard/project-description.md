---
title: Realtime Analytics Dashboard
date: 2025-08
description: A WebSocket-driven analytics dashboard built with Next.js and D3. Streams live event data from a Kafka topic and renders time-series charts with sub-second latency.
tags: [nextjs, typescript, d3, kafka]
---

## Overview

End-to-end pipeline from raw event ingestion to browser visualization. Kafka consumers aggregate events server-side; a WebSocket gateway pushes deltas to connected clients without polling.

## Stack

- **Frontend**: Next.js App Router, D3 v7 for SVG charts, Tailwind for layout
- **Backend**: Node.js WebSocket server, Kafka consumer group via `kafkajs`
- **Infra**: Docker Compose for local dev (Kafka + Zookeeper + app)

## Features

- Live time-series line charts with rolling 5-minute window
- Event rate histogram updated every 500ms
- Graceful reconnect on WebSocket drop
