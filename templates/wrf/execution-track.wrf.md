---
format: WRF
version: 3.1
minParserVersion: 3.0
docType: WRF-C
docId: wrf-c-execution-track
projectId: project-id-placeholder
title: ""
updatedAt: ""
source: template
owner: tool-generated
locale: en
tags: []
---

# ── WRF SYSTEM RUNTIME SAFEGUARD ──
# ✗ DO NOT RENAME THIS FILE. It MUST remain exactly "execution-track.wrf.md".
# ✗ DO NOT change the ".wrf.md" extension. 
# Changing the filename will break the browser's live sync channel and CLI tools.

> Tool instructions: Fill SUMMARY with the current execution goal, scope, and guardrails. Set ACTIVE.activeStepId to the first step you are working on. Fill each step's handoff block as you execute. When a step is done, stop and report completion to the user — wait for explicit user confirmation before advancing ACTIVE.activeStepId to the next step.
>
> WRITE PROTECTION — Only modify the fields listed below. Do not add, rename, or delete any YAML keys. Do not change indentation or structure.
>
> Writable fields:
>   SUMMARY: goal · currentScope · guardrails
>   ACTIVE: activeStepId · activeReason · switchedAt
>   steps[n]: title · status · summary · updatedAt · evidence.summary
>   steps[n].handoff: step_intent · now_executing · next_handoff_action · scope_adjustment · is_branch_active
>   steps[n].handoff.completed_checkpoints — append only, never remove existing items
>   steps[n].handoff.command_ledger — append only; log every command (with risk level) BEFORE executing it
>   steps[n].handoff.branch_tasks — append only, never remove existing items
>   steps[] array — append only: new step objects must copy the exact structure of existing steps
>
> All other keys are structural READ-ONLY. Do not modify them.
>
> BRANCH TASK PROTOCOL — When the user requests work outside the current step's scope:
>
>   1. Set steps[activeStepId].handoff.is_branch_active: true
>   2. Append to steps[activeStepId].handoff.branch_tasks:
>        id:           "B-<short-description>"   (kebab-case, unique within the step)
>        description:  "<task description>"
>        status:       "active"
>        started_at:   "<ISO 8601 timestamp>"
>        completed_at: null
>        evidence:     ""
>   3. Execute the branch task.
>   4. When done, update the branch task entry:
>        status:       "done"
>        completed_at: "<ISO 8601 timestamp>"
>        evidence:     "<one-sentence result summary>"
>   5. When all branch tasks in this step are done, set is_branch_active: false.
>   6. Return to the main step and resume from where you left off.
>
>   branch_tasks is append-only. Never remove or overwrite existing entries.
>
> COMMAND LEDGER PROTOCOL — Before executing ANY terminal/shell command, file deletion, or
> system-mutating action, you MUST FIRST append it to steps[activeStepId].handoff.command_ledger
> with fields:
>     - command:   "<exact command string>"
>       risk:      "safe | caution | dangerous"
>       logged_at: "<ISO 8601 timestamp>"
>       status:    "pending | executed | blocked-by-user"
>   Classify risk honestly; destructive patterns (rm -rf, del /f /s, format, mkfs, dd,
>   DROP TABLE, git reset --hard) MUST be "dangerous". A dangerous command must be logged,
>   surfaced to the user, and explicitly confirmed BEFORE execution.
>   command_ledger is append-only. Log-before-execute is mandatory — never execute an
>   unlogged command.

# SUMMARY

```yaml
goal: |

currentScope: |

guardrails: |

```

# ACTIVE

```yaml
activeStepId: C-001
activeReason: ""
switchedAt: ""
```

# CLOSURE

```yaml
closure:
  baseline:
    required: false
    status: open
    scope: current-step
    note: ""
  commit:
    required: false
    status: open
    scope: current-step
    note: ""
```

# STEPS

```yaml
steps:
  - stepId: C-001
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
  - stepId: C-002
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
  - stepId: C-003
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
  - stepId: C-004
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
  - stepId: C-005
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
  - stepId: C-006
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
  - stepId: C-007
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
  - stepId: C-008
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
  - stepId: C-009
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
  - stepId: C-010
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
  - stepId: C-011
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
  - stepId: C-012
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
  - stepId: C-013
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
  - stepId: C-014
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
  - stepId: C-015
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
  - stepId: C-016
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
  - stepId: C-017
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
  - stepId: C-018
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
  - stepId: C-019
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
  - stepId: C-020
    title: ""
    status: todo
    summary: ""
    updatedAt: ""
    userConfirmedAt: ""
    doneWhen:
      all: []
    writeBack:
      status: done
    evidence:
      summary: ""
      humanDirectionNotes: []
    updatedBy: tool
    handoff:
      step_intent: ""
      now_executing: ""
      completed_checkpoints: []
      command_ledger: []
      next_handoff_action: ""
      scope_adjustment: ""
      branch_tasks: []
      is_branch_active: false
```

<!-- 
WRF (Workflow Recovery Framework) Protocol v3.1 — Execution Track Template
Created by the 1G10K team on 2026-05-28.
© 2026 1G10K. The WRF protocol specification and this template are licensed
under the Apache License, Version 2.0. You may use, modify, and redistribute
this template under the terms of that license.
See the LICENSE file or http://www.apache.org/licenses/LICENSE-2.0.

WRF™, WRF Deck™, and 1G10K™ are trademarks of 1G10K.
Originality and prior-art evidence for this master template are preserved
in the 1G10K Safe Vault and anchored in the Bitcoin blockchain via
OpenTimestamps.
SHA-256 of this file: see execution-track.wrf.md.sha256
-->

