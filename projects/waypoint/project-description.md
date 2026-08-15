---

title: Waypoint
startDate: 2026-08
endDate: Present
organization: Personal Project
description: An adaptive self-learning curriculum platform that turns a learner's objective, constraints, and preferences into a resource-backed capability graph, a deterministic schedule of measurable tasks, and a versioned plan that can safely adapt to real progress and feedback.
githubUrl: https://github.com/wkdghdus/waypoint
tags: [ai, education-technology, adaptive-learning, curriculum-generation, nextjs, typescript, supabase, llm, deterministic-scheduling, playwright]

---

## Overview

Waypoint is an adaptive self-learning curriculum builder designed to turn an open-ended learning goal into a concrete, resource-backed plan that a learner can actually execute and revise over time.

The core product idea is simple: a learner describes what they want to become capable of doing, how much time they have, what they already know, and how they prefer to learn. Waypoint converts that input into a structured objective, helps the learner select appropriate external resources, builds a dependency-aware curriculum, schedules the unfinished work within real time constraints, tracks progress, and proposes safe adjustments when the original plan no longer matches reality.

The system is deliberately not designed as an AI tutor that invents complete lessons. Instead, it acts as a planning and adaptation layer around high-quality external learning resources. The product separates learning intent, curriculum structure, resources, milestones, scheduled tasks, activity, evidence of capability, and plan revisions so that checking off a task is never confused with actually reaching the learner's objective.

A major design principle is that the language model does not own the entire system. LLMs are used for semantic work such as interpreting goals, identifying missing information, evaluating resource fit, drafting curriculum nodes, and explaining tradeoffs. Deterministic application code remains responsible for authorization, graph validation, scheduling, date arithmetic, state transitions, versioning, and applying approved plan changes.

Waypoint is being built as a deliberately constrained MVP rather than a broad autonomous learning agent. The initial validated use case focuses on approximately **2-to-16-week technical-learning plans**, especially software-development goals where learning resources are structured and milestones can produce observable evidence such as repositories, deployed applications, tests, diagrams, or technical explanations.

## Problem

Self-directed learning is usually not limited by access to information. The harder problem is turning an ambiguous goal into the right sequence of capabilities, choosing resources that match the learner's level and constraints, allocating realistic time, and knowing how to respond when the original plan inevitably diverges from actual progress.

Most learning tools solve only one part of that workflow:

1. **Resource discovery tools** help users find courses, books, videos, or documentation, but they rarely convert those resources into an executable dependency-aware plan.
2. **Calendar and habit tools** schedule activity, but they generally do not understand prerequisites, learning evidence, or the distinction between task completion and mastery.
3. **AI tutors and chatbots** can generate explanations and study plans, but free-form plans can be difficult to validate, reproduce, version, or safely update.
4. **Static curricula** assume the original plan remains correct even when the learner misses time, progresses faster than expected, discovers a knowledge gap, or changes availability.

Waypoint is designed around the missing loop between these systems:

```text
objective
→ grounded resources
→ capability graph
→ measurable milestones
→ deterministic schedule
→ real progress
→ reviewed adjustment
→ new curriculum version
```

The central product problem is therefore not merely generating a convincing curriculum. It is preserving a trustworthy contract between the learner's intended capability, the resources used to reach it, the work scheduled, the evidence collected, and the changes made later.

## My Role

I am designing and building Waypoint end to end as a personal product and engineering project. My work spans product definition, system architecture, AI workflow design, data modeling, scheduling logic, security boundaries, testing strategy, and the web application itself.

My responsibilities include:

* Defining the product model around objectives, resources, curriculum nodes, milestones, tasks, progress events, adjustments, and immutable curriculum versions.
* Designing the MVP user flow from free-form goal intake through plan activation, execution, progress tracking, and safe replanning.
* Separating LLM responsibilities from deterministic business logic so that model output cannot directly control authorization, scheduling, database identity, or plan mutation.
* Designing grounded resource discovery with provenance, evidence quality, uncertainty, and explicit user confirmation.
* Specifying a dependency-aware curriculum graph with observable milestone evidence rather than activity-only completion.
* Designing a deterministic scheduling engine that respects prerequisites, weekly capacity, blocked dates, session limits, rest days, and user timezone.
* Designing a versioned adjustment workflow that previews changes before applying them and protects completed or locked work.
* Defining the Supabase/Postgres data model and row-level-security requirements for user isolation.
* Building the application with Next.js and TypeScript using small, testable domain services rather than a monolithic agent workflow.
* Establishing an AI-assisted engineering process where each coding session implements one coherent, reviewable milestone with explicit acceptance criteria.

## Product Contract

Waypoint is built around a set of domain objects that remain intentionally separate:

| Object             | Meaning                                                                           |
| ------------------ | --------------------------------------------------------------------------------- |
| Objective          | What the learner wants to be able to do                                           |
| Curriculum         | What capabilities must be learned and in what dependency order                    |
| Resource           | An external course, book, documentation site, tutorial, video, or practice system |
| Resource segment   | A chapter, module, lesson, section, or other assignable part of a resource        |
| Milestone          | Observable evidence that a capability has been reached                            |
| Schedule           | When unfinished curriculum work is planned                                        |
| Task               | A concrete action for one learning session                                        |
| Progress event     | What the learner actually completed, skipped, deferred, or reported               |
| Adjustment         | A proposed change to unfinished curriculum work                                   |
| Curriculum version | An immutable snapshot of the plan at a meaningful point in time                   |

This separation is important because **activity is not mastery**. Finishing a reading task or watching a lesson can be useful progress, but the final objective should be supported by capability evidence rather than a collection of checked boxes.

## MVP User Flow

The MVP is designed around one complete golden path.

### 1. Describe the learning objective

The learner starts with natural language and optional structured constraints such as:

* Target duration.
* Weekly available time.
* Preferred study days.
* Preferred session length.
* Learning-media preferences.
* Budget.
* Existing experience.

Waypoint stores the learner's original input unchanged, then uses a schema-constrained LLM call to extract a structured objective.

The user reviews and edits fields such as subject, desired capability, final proof of success, current level, deadline or duration, weekly capacity, preferences, constraints, and assumptions.

The structured objective is not trusted until the learner explicitly confirms it.

### 2. Discover and select resources

Once the objective is confirmed, Waypoint retrieves candidate external learning resources through a replaceable server-side search provider.

Candidates are evaluated on dimensions such as:

* Objective alignment.
* Prerequisite fit.
* Authority.
* Structure and chunkability.
* Practical exercises.
* Recency where relevant.
* Estimated effort.
* Cost.
* Accessibility.
* Preference match.
* Evidence quality.

The system avoids unexplained universal quality scores. Each recommendation is expected to show why it was selected, what evidence supports its metadata, and what remains unknown.

The learner can accept, reject, replace, lock, or manually add resources. Waypoint does not begin curriculum generation until the user confirms the final resource set.

### 3. Generate a capability graph

The confirmed objective and resources become inputs to a curriculum-generation step.

The resulting plan is represented as an acyclic dependency graph rather than a flat list. Each curriculum node contains:

* Capability name.
* Description.
* Prerequisites.
* Estimated effort.
* Assigned resource segments.
* Completion evidence.
* Required or optional status.

Every required node must have a completion condition, and the curriculum must contain a final milestone that matches the confirmed objective.

### 4. Check feasibility and schedule the work

Waypoint then passes the validated graph into deterministic scheduling logic.

The scheduler considers estimated effort, required and optional scope, dependency edges, user timezone, available weekdays, weekly capacity, session limits, target duration, and break dates.

Plans are labeled along a spectrum such as:

* Comfortable.
* Achievable.
* Aggressive.
* Infeasible.

If a plan is infeasible, the product exposes the tradeoff rather than hiding it. The learner can extend the duration, increase weekly capacity, remove optional scope, or reduce the final objective.

### 5. Review and activate the plan

Before activation, the learner sees the objective, final evidence, total effort, weekly workload, milestones, selected resources, assumptions, risks, and a preview of the first week.

Activation requires explicit approval. The initial approved plan becomes an immutable curriculum version, and the MVP permits only one active curriculum per user at a time.

### 6. Execute today's work

The default learning dashboard is designed to immediately answer:

* What should I do today?
* How long should it take?
* Which resource section should I use?
* Why is this task required?
* What counts as done?
* What evidence should I provide?

A task can be recorded as completed, partially completed, not completed, deferred, intentionally skipped, or cancelled through an approved plan change.

Optional feedback includes actual minutes, difficulty, confidence, blockers, notes, and evidence links.

### 7. Observe progress

Waypoint distinguishes activity from capability evidence.

The progress area is designed to include:

* Weekly planned-versus-actual time.
* Milestone progress.
* Activity history.
* Planned rest days.
* Recent evidence.
* A contribution-style activity grid that is explicitly not presented as a mastery score.

The system can also update future effort estimates using a deterministic pace ratio derived from recent actual-versus-estimated completion times. The MVP deliberately uses a simple median-based rule with minimum sample size and clamping rather than introducing an unnecessary machine-learning model.

### 8. Request and approve adjustments

When the plan stops matching reality, the learner can request an adjustment in natural language.

Examples include missing several study days, material taking longer than expected, difficulty mismatches, already knowing a topic, disliking a resource, availability changes, deadline changes, or wanting more practice.

Waypoint interprets the request, identifies affected nodes and dependencies, protects completed and locked items, generates candidate changes, re-runs deterministic scheduling, and produces a before-and-after preview.

The preview does not mutate the active plan.

Only after the learner approves the proposal does the system apply the change transactionally and create a new immutable curriculum version.

## System Architecture

Waypoint intentionally uses a small architecture suitable for rapid AI-assisted development without sacrificing clear system boundaries.

```text
Next.js web application
        ↓
Authenticated server actions / API routes
        ↓
Domain services
├── objective intake
├── resource discovery
├── curriculum graph validation
├── deterministic scheduling
├── progress tracking
└── adjustment/versioning
        ↓
Supabase Auth + Postgres
        ↓
Versioned persistence and row-level security

External server-side adapters
├── LLM provider
└── resource search provider
```

The workflow is intentionally split into separate idempotent steps:

```text
extract objective
→ confirm objective
→ search resources
→ confirm resources
→ generate graph
→ validate graph
→ schedule plan
→ approve plan
```

This avoids a single giant agent call that is difficult to debug, recover, test, or constrain.

## Objective Intake and Structured Extraction

The objective-intake layer preserves the original user message before any model transformation.

The LLM interprets the learner's intent and produces a versioned structured envelope. Application code validates the result against a strict runtime schema before any generated data is treated as valid domain state.

```json
{
  "schemaVersion": "1",
  "data": {},
  "assumptions": [],
  "warnings": [],
  "confidence": "low | medium | high"
}
```

Invalid model output is rejected rather than partially persisted as trusted data. User-edited structured values take precedence over later inference so the model cannot silently overwrite information the learner explicitly provided.

Prompt versions are source-controlled, and generation runs are designed to record information such as model identifier, prompt version, latency, usage, validation result, and errors without exposing secrets or unnecessarily logging sensitive raw intake text.

## Resource Discovery and Evidence

Resource discovery is designed as an explicit pipeline rather than an opaque research agent.

### Search query construction

The confirmed objective, current level, preferences, budget, time limits, and domain configuration are used to construct a bounded search request.

The model may help propose search terms, but application code controls how many searches occur and which provider is called.

### Provider abstraction

Resource search is accessed behind a replaceable interface so the domain layer is not coupled to one vendor's response format.

```ts
interface ResourceSearchProvider {
  search(input: ResourceSearchInput): Promise<ResourceSearchResult[]>;
}
```

### Normalization and deduplication

Candidate URLs, domains, titles, providers, and formats are normalized before evaluation. Duplicate resources are removed using canonical URLs and obvious title/provider matches.

### Provenance and uncertainty

Waypoint is designed to avoid fabricated resource facts. Ratings, prices, duration, review counts, chapter information, and similar metadata must either have evidence or be displayed as unknown.

Evidence records distinguish official provider claims from independent sources and record retrieval dates. User-supplied resources are labeled separately from system-discovered resources.

### Copyright-safe storage

The MVP stores metadata and references rather than redistributing entire books, paid lessons, videos, or protected transcripts. Resource segments identify assignable sections without treating external content as product-owned material.

## Curriculum Graph

The curriculum layer converts the structured objective and confirmed resources into a capability graph.

The graph must satisfy deterministic invariants before it can be scheduled:

* It must be acyclic.
* Every required node must define completion evidence.
* Every resource-backed node must reference a confirmed resource segment.
* Assessment or project nodes must be explicitly identified when they do not correspond to a resource segment.
* Dependency edges cannot cross curricula.
* The final milestone must represent the confirmed target capability.

This makes the model a proposal generator rather than the final authority on curriculum integrity.

## Deterministic Scheduling

Scheduling is treated as application logic rather than an LLM task.

The scheduler follows a predictable sequence:

1. Validate the curriculum graph.
2. Topologically sort required nodes.
3. Place optional nodes after required scope.
4. Convert node effort into session-sized tasks.
5. Reserve planning buffer.
6. Allocate tasks across available dates.
7. Respect daily and weekly capacity.
8. Ensure prerequisites precede dependent work.
9. Add milestone checkpoints.
10. Calculate feasibility and return warnings.

Required invariants include:

* No dependent task appears before its prerequisite.
* No task appears on a blocked date.
* Weekly planned minutes remain within accepted capacity unless a warning is explicitly shown.
* Completed tasks are never rescheduled.
* Rest days are represented intentionally.
* User timezone is used for local schedule dates.

The scheduler is designed to be unit-tested against linear graphs, branching graphs, cycles, blocked periods, timezone boundaries, infeasible plans, optional nodes, and replanning with completed work.

## Progress Model

Waypoint records task execution as append-style progress events rather than treating a task's current status as the entire history.

Each progress event can capture:

* Event type.
* Actual minutes.
* Difficulty.
* Confidence.
* Notes.
* Evidence.
* Creation timestamp.

This lets the system distinguish what was planned from what actually happened and supports later pace analysis without rewriting historical estimates.

The contribution-style activity grid is deliberately scoped as an activity visualization. Milestone completion and capability evidence are shown separately so that consistency is not presented as equivalent to mastery.

## Adjustment and Versioning System

Safe replanning is one of Waypoint's core differentiators.

An adjustment follows a controlled state machine:

```text
draft → proposed → approved → applied
                  ↘ rejected
                  ↘ expired
```

A proposal records the curriculum version it was generated against. The proposed change is immutable, and editing it creates a new proposal.

The replanning sequence is:

```text
interpret request
→ identify affected nodes
→ determine downstream dependencies
→ protect completed and locked items
→ generate candidate changes
→ validate graph
→ run deterministic scheduler
→ calculate diff
→ show human-readable preview
→ wait for approval
→ apply transactionally
→ create new immutable version
```

The system does not silently remove difficult required material merely because the learner struggled with it. Instead, it can propose smaller tasks, prerequisite review, additional practice, a different resource, reduced optional scope, or a deadline extension.

Required capabilities remain required unless the objective itself changes.

## LLM Responsibilities and Boundaries

Waypoint uses LLMs where semantic interpretation is useful, but it establishes hard boundaries around trusted operations.

### The LLM may

* Interpret natural-language goals.
* Identify missing information.
* Draft clarification questions.
* Summarize resource evidence.
* Propose resource rankings.
* Draft curriculum nodes and dependencies.
* Draft milestone and task descriptions.
* Interpret adjustment requests.
* Explain tradeoffs.

### The LLM may not directly

* Authorize a user.
* Decide which database rows are accessible.
* Execute SQL.
* Create trusted database IDs.
* Perform final date arithmetic.
* Apply a curriculum adjustment.
* Modify completed history.
* Bypass locked objects.
* Fetch arbitrary private URLs.
* Treat instructions found on external pages as system instructions.
* Persist unvalidated structured output.
* Declare unsupported resource facts without provenance.

This boundary is central to the architecture: probabilistic reasoning proposes; deterministic code validates and applies.

## Data Model

The conceptual data model includes the following main tables:

```text
profiles
curricula
intake_messages
objectives
resources
resource_evidence
curriculum_resources
resource_segments
curriculum_nodes
node_dependencies
node_resource_segments
milestones
tasks
progress_events
adjustment_requests
adjustment_proposals
curriculum_versions
generation_runs
```

Important constraints include:

* Every curriculum belongs to exactly one user.
* User-owned tables are protected by row-level security.
* Only one curriculum may be active per user in the MVP.
* Dependency edges cannot connect nodes from different curricula.
* Tasks, nodes, and milestones must belong to the same curriculum.
* Version numbers are unique per curriculum.
* Applied adjustment proposals record both source and resulting versions.
* Completed task history is preserved during replanning.

## Security and Reliability

Because Waypoint stores user goals, progress, and generated plans while interacting with LLM and search providers, security boundaries are part of the core design rather than a later hardening step.

### Authorization

Supabase row-level security is required for all user-owned data. Server-side mutations independently verify ownership instead of trusting hidden UI controls or client-provided user identifiers.

The MVP includes a two-user isolation requirement: one user's curriculum must not be readable or mutable by another user.

### Secrets

Provider keys, service-role keys, and other secrets remain server-side and are loaded from environment variables. They must never appear in browser bundles, generated logs, screenshots, or the repository.

### Prompt injection and untrusted content

External pages, resource snippets, files, and model-generated text are treated as untrusted data.

Resource-analysis workflows are intentionally low privilege. Retrieved content cannot invoke privileged tools, execute code, alter authorization decisions, expose secrets, or replace system instructions.

### Data minimization

Waypoint stores information needed to construct and execute a curriculum but avoids inferring unrelated sensitive traits. The product plan includes curriculum deletion and an account-deletion process before public release.

### Failure recovery

Async workflows are expected to expose loading, success, empty, failure, and retry states. Model or search failures should not destroy previously confirmed objective or curriculum state.

## Engineering Approach

Waypoint is also an experiment in disciplined AI-assisted software development.

Instead of asking a coding agent to generate the whole product in one pass, the project is divided into focused, pull-request-sized sessions. Each session implements one coherent milestone with explicit allowed scope, acceptance criteria, verification commands, and a stop condition.

The build sequence progresses from repository constitution and application scaffold through authentication, persistence, objective extraction, resource discovery, graph generation, scheduling, activation, progress, replanning, versioning, and final end-to-end hardening.

Each development session is expected to verify, when applicable:

* Type checking.
* Linting.
* Production build.
* Unit tests.
* Integration tests.
* Targeted end-to-end tests.
* Database migration behavior.
* Row-level security.
* Documentation updates.
* Security boundaries.

This process is intended to prevent common vibe-coding failures such as stack drift, schema drift, fake placeholder logic, giant untestable prompts, broad unrelated refactors, UI-first mock implementations, unvalidated model output, and authorization implemented only in the frontend.

## Technical Architecture

The planned MVP stack is intentionally small:

* **Next.js** for the web application and server boundaries.
* **TypeScript** for end-to-end application types.
* **Tailwind CSS** for styling.
* **Accessible component primitives / shadcn-style UI composition** for reusable interface components.
* **Supabase Auth** for authentication.
* **Supabase Postgres** for persistence.
* **PostgreSQL Row Level Security** for user isolation.
* **Zod** for runtime schema validation.
* **Vitest** for unit-level domain testing.
* **Playwright** for golden-path and isolation end-to-end tests.
* **One server-side LLM provider adapter** for semantic generation tasks.
* **One server-side resource-search provider adapter** for external resource discovery.
* **Versioned prompts and generation-run logging** for reproducibility and debugging.

The MVP explicitly avoids adding a queue, vector database, event bus, microservices, fine-tuning pipeline, general multi-agent framework, or autonomous browser layer before a concrete requirement justifies the complexity.

## Technical Highlights

### Resource-Backed Planning

Waypoint treats external learning resources as first-class inputs to the plan. Curriculum nodes point to concrete resource segments instead of relying on the model to invent all instructional material.

### Capability Evidence

Milestones are defined around observable evidence. Reading and watching can support progress, but the final milestone must demonstrate the target capability through an artifact, project, assessment, explanation, or other explicit proof.

### Deterministic Scheduling

Calendar arithmetic and feasibility are handled in pure application logic, making the schedule testable and reproducible across model changes.

### Human Approval Boundaries

The learner confirms the objective, selected resources, initial plan, and any major adjustment. The system can propose changes but cannot silently redefine the learning commitment.

### Immutable Version History

Meaningful plan changes create new curriculum versions instead of overwriting the past. This preserves the relationship between historical tasks, completed work, evidence, and the plan that existed when the work was performed.

### Explicit AI Contracts

Structured LLM responses are versioned, schema-validated, and logged through generation runs. Trusted IDs, ownership, dates, and state transitions remain under deterministic code control.

### Security-First Multi-Tenant Design

User isolation is enforced in the database through row-level security and verified through two-user tests, reducing reliance on frontend routing or hidden buttons as security mechanisms.

### Vibe-Code Guardrails

The repository is designed so AI coding agents operate within explicit product, architecture, dependency, testing, and scope boundaries. This turns AI-assisted implementation into a series of reviewable engineering steps rather than an uncontrolled code-generation process.

## Current Build Status

Waypoint is currently an **in-progress MVP**. The product contract, architecture, data model, LLM boundaries, scheduling rules, security requirements, test strategy, and milestone-by-milestone implementation plan have been specified in detail.

The current development phase is focused on establishing the application foundation and moving through the MVP build plan incrementally. The complete adaptive-learning loop described above is the target product contract; individual capabilities should be considered implemented only as their corresponding build milestones are completed and verified.

The project is considered MVP-complete only when the full golden path works end to end:

```text
learner states objective
→ objective is confirmed
→ grounded resources are selected
→ capability graph is validated
→ deterministic schedule is generated
→ plan is approved and activated
→ real progress is recorded
→ adjustment is previewed
→ approved adjustment creates a new version
→ completed history is preserved
→ cross-user access is blocked
```

## Challenges

### Separating a Useful AI Experience from an Unreliable Agent

The product needs language-model flexibility without allowing probabilistic output to control trusted state. The architecture solves this by using LLMs for interpretation and drafting while relying on runtime schemas and deterministic services for validation and mutation.

### Grounding Resource Recommendations

Resource discovery is vulnerable to fabricated ratings, outdated prices, invented chapter structures, or unsupported quality claims. Waypoint therefore makes provenance, evidence type, retrieval date, and unknown states part of the resource model.

### Modeling Learning Without Equating Activity with Mastery

A simple checklist is easy to build but creates misleading signals. Waypoint separates tasks, progress events, milestone evidence, and target capabilities so the product can show consistency without pretending that time spent equals competence.

### Scheduling Around Real Life

A generated curriculum is only useful if it fits the learner's actual availability. Scheduling must respect prerequisites, weekly capacity, break dates, local date boundaries, and session constraints while still exposing when the desired objective is unrealistic for the available time.

### Replanning Without Destroying Trust

Automatic adaptation is valuable only if the learner understands what changed. Completed work, locked resources, and existing evidence need to survive replanning, while proposed changes require a visible diff and explicit approval.

### Preventing Scope Explosion During AI-Assisted Development

The product itself is broad enough to attract premature features such as tutor chat, calendar integration, reminders, social features, vector search, and multi-agent orchestration. The MVP intentionally excludes these until the core planning-and-adjustment loop is trustworthy.

## What I Am Learning

Waypoint is teaching me how to design AI products where the most important engineering work happens around the model rather than inside the prompt.

A useful learning-planning system needs strong domain contracts, provenance, state machines, schemas, security, deterministic scheduling, version history, and failure recovery. The model can make semantic parts of the experience dramatically more flexible, but reliability comes from deciding exactly where model authority ends.

The project is also an opportunity to refine a disciplined workflow for coding with AI agents. Breaking the build into narrow milestones, giving the coding agent explicit repository context, constraining dependency changes, requiring verification, and preventing unrelated refactors makes rapid implementation more sustainable than trying to generate a complete application in one shot.

## Technologies Used

* Next.js
* TypeScript
* React
* Tailwind CSS
* Accessible UI component primitives
* Supabase Auth
* Supabase Postgres
* PostgreSQL Row Level Security
* Zod
* Vitest
* Playwright
* LLM APIs
* Structured output validation
* Prompt versioning
* Resource search APIs
* Deterministic graph validation
* Topological sorting
* Deterministic scheduling
* Immutable curriculum versioning
* Transactional plan updates
* GitHub Actions / CI

## Future Improvements

The MVP deliberately excludes features that can be added after the core loop is reliable. Potential extensions include:

* Calendar integration once the internal scheduling model is stable.
* Email, push, or in-app reminders tied to the existing task schedule.
* Richer assessment mechanisms for specific learning domains.
* Better resource-reputation signals and provider-specific metadata adapters.
* Optional chronological or spaced-repetition scheduling strategies.
* More sophisticated workload forecasting after enough real progress data exists.
* Additional learning domains beyond the initial technical-learning focus.
* Multiple simultaneously active curricula after conflict-resolution rules are defined.
* Mentor or reviewer workflows for milestone evidence.
* Sharing or publishing completed curricula without exposing private progress data.
* A resource marketplace or community recommendation layer only after provenance and moderation requirements are defined.
* Deeper analytics comparing planned effort, actual effort, milestone completion, and adjustment patterns.

The project intentionally postpones these ideas until Waypoint can reliably preserve its core contract: turn a learner's objective into a grounded, executable plan; record what actually happened; and adapt unfinished work without silently changing the learner's goal or erasing their history.
