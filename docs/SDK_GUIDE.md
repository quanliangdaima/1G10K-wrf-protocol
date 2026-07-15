# WRF Light SDK Integration Guide

The WRF Light SDK is a zero-dependency, lightweight utility file designed for automated scripts, CLI tools, IDE extension developers, and Agentic frameworks. It provides robust reading and writing functionality for `.wrf.md` files while guaranteeing that non-metadata content (prose comments, Markdown documentation, and structural layouts) remains completely unaltered.

---

## 📦 File Placement

Simply download and copy the `wrf-sdk.ts` (or convert to `wrf-sdk.js`) directly into your project's runtime source directory:

```bash
# Copy wrf-sdk into your project
cp path/to/wrf-protocol/wrf-sdk.ts ./src/utils/wrf-sdk.ts
```

---

## 🚀 API References & Code Examples

### 1. Read Metadata and Step States

Parse any standard WRF file and query metadata, project goals, or active steps:

```typescript
import * as fs from 'fs';
import { extractYamlBlock, parseYaml } from './wrf-sdk';

const fileContent = fs.readFileSync('execution-track.wrf.md', 'utf-8');

// Extract and parse the ACTIVE block
const activeYaml = extractYamlBlock(fileContent, '# ACTIVE');
if (activeYaml) {
  const activeState = parseYaml(activeYaml);
  console.log('Active Step ID:', activeState.activeStepId); // e.g., "C-001"
}

// Extract and parse the SUMMARY block
const summaryYaml = extractYamlBlock(fileContent, '# SUMMARY');
if (summaryYaml) {
  const summary = parseYaml(summaryYaml);
  console.log('Project Goal:', summary.goal);
}
```

### 2. Update Active Step and Progress

Modify execution states and write changes safely back to the Markdown file without touching other human-readable descriptions:

```typescript
import * as fs from 'fs';
import { extractYamlBlock, parseYaml, stringifyYaml, replaceYamlBlock } from './wrf-sdk';

let fileContent = fs.readFileSync('execution-track.wrf.md', 'utf-8');

const activeYaml = extractYamlBlock(fileContent, '# ACTIVE');
if (activeYaml) {
  const activeState = parseYaml(activeYaml);
  
  // Transition step
  activeState.activeStepId = 'C-002';
  activeState.switchedAt = new Date().toISOString();
  
  // Generate strict, compliant YAML
  const newActiveYaml = stringifyYaml(activeState);
  
  // Replace only the ACTIVE block inside the markdown fence
  fileContent = replaceYamlBlock(fileContent, '# ACTIVE', newActiveYaml);
  
  // Persist back to disk
  fs.writeFileSync('execution-track.wrf.md', fileContent, 'utf-8');
}
```

### 3. Register Commands into the Safety Ledger (Log-Before-Execute)

Enforce strict compliance by appending commands to the append-only ledger block under the active step before running them:

```typescript
import { WrfStep, stringifyYaml } from './wrf-sdk';

// Append command entry to step schema object
function appendLedgerCommand(step: WrfStep, cmdStr: string, riskLevel: 'safe' | 'caution' | 'dangerous') {
  step.handoff.command_ledger.push({
    command: cmdStr,
    risk: riskLevel,
    logged_at: new Date().toISOString(),
    status: 'pending'
  });
}
```

---

## 🎨 Advantages of Using WRF SDK

- **Zero Runtime Overhead**: Written in vanilla TypeScript with no external NPM package requirements.
- **Visual Ecosystem Access**: By formatting your tool execution pipeline using standard `.wrf.md`, your users can immediately leverage the rich **[1G10K Visual Workspace](https://1g10k.dev)** to inspect execution metrics, manage states, and track compliance audit logs out of the box with zero additional development cost on your end.
