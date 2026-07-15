# WRF Protocol Specification

Version: 3.1

This document describes the WRF (Workflow Recovery Framework) file format and the behavior of WRF Deck. It is intended for developers who want to build tools that read or write WRF files.

---

## Overview

A WRF file is a single Markdown file with YAML frontmatter and named section blocks. It contains everything needed to resume, inspect, and continue a human-AI collaborative task:

- Project goal and summary
- Active step and overall progress
- Per-step intent, handoff state, and checkpoints
- Command ledger for safety auditing
- Human direction notes
- Evidence summaries

The design goal is **single-file portability**: a user should be able to close the file, email it, check it into git, or open it in another WRF-compatible tool without losing state.

---

## File format

A WRF file is UTF-8 Markdown. It has the following blocks:

1. **YAML frontmatter** — global metadata such as `title`, `version`, `docType`.
2. **`# SUMMARY`** — project goal, current scope, and guardrails.
3. **`# ACTIVE`** — execution metadata such as `activeStepId`.
4. **`# STEPS`** — an array of step objects, each with its own handoff, evidence, and checkpoints.
5. **`# CLOSURE`** — baseline and commit closure items.
6. **`# WORKSPACE-DRAFT`** — optional local workspace draft fields.

All human-readable prose lives in Markdown. All machine-readable state lives in the YAML blocks inside ` ```yaml ... ``` ` fences.

---

## The STEPS block

Each step has the following shape:

```yaml
- stepId: C-001
  title: "Understand the existing codebase"
  status: done | doing | todo
  summary: "One-sentence result of this step"
  updatedAt: "2026-07-10T12:00:00+08:00"
  userConfirmedAt: ""
  doneWhen:
    all: []           # list of explicit done conditions
  writeBack:
    status: done      # what the AI reports back
  evidence:
    summary: |
      Multi-line evidence or findings.
    humanDirectionNotes:
      - noteId: "hdn-abc123"
        recordedAt: "2026-07-10T12:00:00+08:00"
        noteHash: "fnv1a:deadbeef"
        notePreview: "User asked to avoid deleting files."
  updatedBy: tool
  handoff:
    step_intent: "What this step is trying to achieve"
    now_executing: "What the AI is currently doing"
    completed_checkpoints:
      - "Action — result"
    command_ledger:
      - command: "node scripts/wrf-doctor.mjs execution-track.wrf.md"
        risk: "safe"
        logged_at: "2026-07-10T12:00:00+08:00"
        status: "executed"
    next_handoff_action: "What should happen next"
    scope_adjustment: ""
    branch_tasks: []
    is_branch_active: false
    interrupted_at: ""
```

Key fields:

- `stepId` — stable identifier for the step.
- `status` — current execution status.
- `doneWhen.all` — list of machine-evaluable completion conditions (for example, `fileExists`, `textExists`, `testPassed`, `stepsCompleted`).
- `writeBack.status` — status the AI reports back after updating the step.
- `handoff.step_intent` — the purpose of the step.
- `handoff.now_executing` — what the active AI is working on right now.
- `handoff.completed_checkpoints` — append-only list of completed actions and results.
- `handoff.command_ledger` — append-only list of commands the AI has declared before running.
- `handoff.interrupted_at` — optional ISO 8601 timestamp recording when the step was paused.
- `handoff.next_handoff_action` — what the next action should be.
- `evidence.summary` — human-readable findings for this step.
- `evidence.humanDirectionNotes` — user-provided direction that should be preserved as authorship evidence.

---

## The ACTIVE block

```yaml
ACTIVE:
  activeStepId: "C-001"
  activeReason: ""
  switchedAt: ""
```

`activeStepId` must remain a main step ID while a step is in progress. It should only advance after explicit user confirmation or when the step meets its `doneWhen` conditions.

---

## Handoff and continuity

WRF supports two continuity patterns:

### 1. Direct file re-import (zero handoff)

The `.wrf.md` file contains the full state. Any WRF-compatible tool can read it, see the active step, and continue execution. This is the fastest way to resume work.

### 2. Copy Handoff

WRF Deck can copy structured handoff text to the clipboard:

- **Copy Step Handoff** — focused context for the active step.
- **Copy Full Handoff** — project-wide context, including goal, current status, completed steps, and next actions.

The copied text is a controlled context snapshot. It can be used whenever the developer wants an explicit context transfer: correcting course in the same tool after context drift, switching between parallel tasks, handing off to another AI tool, passing work to a teammate, or even sharing via email or chat. As long as the recipient reads the same `.wrf.md` file — either directly or by re-importing it into WRF Deck — the full execution state is immediately visible and visualized. The handoff buttons are a convenience for packaging context; the `.wrf.md` file itself remains the single source of truth.

---

## Command Ledger Law

Before executing any terminal command, file deletion, or system-mutating action, the AI tool must first append an entry to `steps[activeStepId].handoff.command_ledger` with:

- `command` — exact command string
- `risk` — protocol-defined level: `safe`, `caution`, or `dangerous`
- `logged_at` — ISO 8601 timestamp
- `status` — `pending`

Only after logging may the command run. The status is then updated to `executed`.

The WRF protocol defines a dangerous-command pattern library. Destructive patterns such as `rm -rf`, `shutdown`, `dd`, `mkfs`, `git reset --hard`, and similar must be recorded as `dangerous`. The AI applies these protocol rules when filling in the ledger. If a command is logged as `dangerous` with `status: pending`, the AI must stop and wait for explicit user confirmation. WRF Deck's Sentry scanner independently validates these declarations; see the Sentry section below for the scanning mechanism.

---

## Sentry

Sentry is a dual-layer safety scanner in WRF Deck.

### Layer 1: raw pattern scanning

When a WRF file is loaded or re-synced, Sentry scans the raw source text with regex patterns for dangerous CLI commands (for example, `rm -rf`, `shutdown`). If a match is found, a flashing red alert banner is shown.

### Layer 2: ledger scanning

Sentry also inspects `command_ledger` entries. If an entry has `risk: dangerous` and `status: pending`, it triggers an alert. The command ledger declares the risk level of each logged command according to the protocol; Sentry validates this declaration when the file is loaded or re-synced.

### Lock Evidence

When an alert appears, the user can click the **Lock Evidence** button. This packages the current WRF source text together with a Sentry incident summary — including the intercepted command, the line number, and an impact analysis — as a virtual file, computes a SHA-256 hash, and registers a local timestamp record in the Proof Trail panel. It is an optional audit convenience, not a core workflow requirement.

---

## Human direction notes

When a user marks a note as a human contribution, the AI tool must append an entry to `steps[activeStepId].evidence.humanDirectionNotes` with:

- `noteId` — stable ID
- `recordedAt` — ISO 8601 timestamp
- `noteHash` — hash of the note text, typically `fnv1a:` prefix
- `notePreview` — short preview of the note

These notes are rendered separately from AI checkpoints in WRF Deck and in the exported evidence chronology report.

---

## Proof Trail

The Proof Trail panel in WRF Deck allows a user to drag files or evidence packages into the workspace to generate a local timestamp record. Each record contains:

- `timestamp` — ISO 8601 time
- `files` — file metadata including SHA-256 hashes
- `combinedHash` — combined SHA-256 of all files and the summary
- `timestampProof` — local signature, not a third-party certificate
- `blockchainProof` — optional OpenTimestamps upgrade path

Proof Trail is an optional convenience for users who want a local audit trail. It is not required to use WRF.

---

## Version history

- **v3.1** — current version. Adds structured handoff metadata, command ledger, and Sentry.

---

## Writing WRF-compatible tools

This section is for developers building tools, IDE plugins, agent frameworks, or scripts that read or write `.wrf.md` files and want to stay interoperable with WRF Deck and other WRF-compatible tools.

### What WRF Deck expects

WRF Deck parses the YAML frontmatter and the following named sections: `# SUMMARY`, `# ACTIVE`, `# STEPS`, `# CLOSURE`, and `# WORKSPACE-DRAFT`. A compatible tool should preserve all of these sections, even if it only reads or modifies a subset of them.

Inside `# STEPS`, the following keys are part of the stable protocol surface:

- `stepId`, `title`, `status`, `summary`, `updatedAt`, `doneWhen`, `writeBack`, `evidence`
- `handoff.step_intent`, `handoff.now_executing`, `handoff.completed_checkpoints`, `handoff.next_handoff_action`, `handoff.scope_adjustment`, `handoff.branch_tasks`, `handoff.is_branch_active`, `handoff.interrupted_at`, `handoff.command_ledger`
- `evidence.summary`, `evidence.humanDirectionNotes`

Renaming or dropping these keys may cause WRF Deck to miss state or fail to import the file. You may add custom keys or sections for your own tool, but WRF Deck will ignore them unless the protocol later adopts them.

### Read contract

A WRF-compatible reader should:

1. Parse the YAML frontmatter.
2. Recognize the known `#` section blocks and leave unknown sections untouched.
3. Treat keys it does not understand as opaque; do not assume they are safe to remove.

### Write contract

A WRF-compatible writer should:

1. Keep existing frontmatter keys and section blocks intact.
2. Only change values for keys it understands. Renaming keys or section headers breaks round-trip compatibility with WRF Deck.
3. Update `steps[activeStepId].handoff.now_executing` and `steps[activeStepId].updatedAt` while work is in progress, so other tools see live state.
4. Append to `completed_checkpoints`, `command_ledger`, and `evidence.humanDirectionNotes`. Do not truncate or overwrite these arrays; they are the audit trail.
5. Before executing any terminal command, file deletion, or system-mutating action, append an entry to `command_ledger` with `risk: dangerous` and `status: pending`, then update it to `executed` after completion.
6. Add `humanDirectionNotes` entries when the user authorizes a note as human creative contribution.

### Reference implementation conventions

The WRF Deck reference implementation generates step commands that instruct the AI to run a structural validator (`wrf-doctor`) before closing each step. This is a convenience built into the generated command, not a protocol requirement for every compatible tool. Your own tool does not need to bundle or call `wrf-doctor` to be WRF-compatible.

---

## See also

- [GETTING_STARTED.md](GETTING_STARTED.md) — tutorial for first-time users
- [../README.md](../README.md) — project overview
