---
role: Data Engineer Intern
organization: AI Platform @ TD Bank
startDate: 2026-01
endDate: 2026-04
description: Maintained and enhanced production AI ETL, RAG ingestion, Azure infrastructure, model deployment, and observability systems for enterprise document intelligence workflows.
tags: [azure, ai-etl, azure-sql, azure-databricks, azure-machine-learning, azure-openai, datadog, ci-cd, llmops]
---

## Overview

TD Bank is a major Canadian financial institution delivering banking, lending, and enterprise technology services across multiple lines of business. As a Data Engineer Intern on the AI Platform team, I worked on production-grade AI data infrastructure supporting document ingestion, embedding generation, RAG retrieval, model endpoint migration, Azure resource management, monitoring, and greenfield AI system design.

## Work

- Maintained a production-grade AI ETL pipeline on Azure spanning Azure SQL, Data Lake Storage, Azure Machine Learning, Azure Databricks, and Azure OpenAI.
- Supported ingestion cycles processing 2,500–3,000 unstructured documents, including HTML, PDF, and SharePoint content, across multiple lines of business with distinct business rules and processing configurations.
- Configured and validated ingestion workflows by adjusting pipeline endpoints, verifying chunk-level embedding quality, and executing end-to-end data loads into Azure SQL after each deployment.
- Deployed an enterprise-developed embedding model across the RAG query engine and ingestion pipeline, replacing the Azure OpenAI embedding endpoint.
- Improved retrieval accuracy from 95% to 98% while reducing provisioned throughput from 285 PTUs to 150 PTUs through embedding model migration and infrastructure optimization.
- Executed model endpoint migrations using GitHub Actions CI/CD pipelines and manual VM deployments, selecting the appropriate rollout method based on release state to maintain zero-downtime data ingestion across environments.
- Managed Azure OpenAI PTU and TPM allocation by right-sizing provisioned throughput quotas, optimizing cost-latency tradeoffs, rolling out updated language models, and configuring spillover rules to maintain stability under variable production workloads.
- Built Datadog monitoring dashboards and observability panels across DEV/SIT, PAT, and PROD environments.
- Wrote custom Datadog queries against Azure OpenAI, SQL Database, and VM telemetry to monitor token usage, latency, rate limits, embedding-model memory utilization, SQL DTU consumption, storage availability, ETL defect alerts, service logs, Application Gateway traffic, and VM I/O metrics.
- Established the team's primary source for pipeline health monitoring and incident triage through centralized observability dashboards.
- Designed and configured full infrastructure for a greenfield AI project, defining component topology, connectivity, and resource provisioning from scratch.
- Authored architecture blueprints documenting each component's attributes, dependencies, and deployment requirements to support reproducible infrastructure setup and stakeholder handoffs.
- Placed 2nd out of 19 teams at the TD x Google Gemini Hackathon by designing an agentic multimodal AI copilot using Gemini.
- Built a hackathon prototype that classifies mortgage documents, extracts key data, and performs cross-document reasoning to detect income discrepancies.
- Proposed a workflow reducing conditions review time from 1–2 weeks to under 2 minutes per file across an estimated 1,200 daily renewal files, earning an invitation to pitch to TD's CIO, SVPs, and product owners for potential production deployment.

## Stack

Azure SQL, Azure Data Lake Storage, Azure Machine Learning, Azure Databricks, Azure OpenAI, Azure VMs, Application Gateway, Datadog, GitHub Actions, CI/CD, RAG, embedding models, LLMOps, Azure PTU and TPM management, document ingestion, Gemini, multimodal AI agents.
