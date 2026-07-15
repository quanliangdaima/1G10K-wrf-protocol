/**
 * 💡 WRF (Workflow Recovery Framework) Light SDK
 * 
 * This is a zero-dependency, lightweight utility for reading and writing .wrf.md files.
 * It strictly preserves your Markdown structure, prose comments, and formatting.
 * Suitable for node, deno, bun, browser runtimes, or any custom CI/CD scripts.
 */

export interface WrfHeader {
  format: string;
  version: string;
  minParserVersion: string;
  docType: 'WRF-P' | 'WRF-C';
  docId: string;
  projectId: string;
  title: string;
  updatedAt: string;
  source: string;
  owner: string;
  locale: string;
  tags: string[];
}

export interface WrfSummary {
  goal: string;
  currentScope: string;
  guardrails: string;
}

export interface WrfActive {
  activeStepId: string;
  activeReason: string;
  switchedAt: string;
}

export interface WrfBranchTask {
  id: string;
  description: string;
  status: 'active' | 'done';
  started_at: string;
  completed_at: string | null;
  evidence: string;
}

export interface WrfCommandLedgerEntry {
  command: string;
  risk: 'safe' | 'caution' | 'dangerous';
  logged_at: string;
  status: 'pending' | 'executed' | 'blocked-by-user';
}

export interface WrfStep {
  stepId: string;
  title: string;
  status: 'todo' | 'doing' | 'done';
  summary: string;
  updatedAt: string;
  userConfirmedAt: string;
  doneWhen: {
    all: string[];
  };
  writeBack: {
    status: 'done' | string;
  };
  evidence: {
    summary: string;
    humanDirectionNotes: Array<{
      noteId: string;
      recordedAt: string;
      noteHash: string;
      notePreview: string;
    }>;
  };
  updatedBy: 'tool' | 'user';
  handoff: {
    step_intent: string;
    now_executing: string;
    completed_checkpoints: string[];
    command_ledger: WrfCommandLedgerEntry[];
    next_handoff_action: string;
    scope_adjustment: string;
    branch_tasks: WrfBranchTask[];
    is_branch_active: boolean;
  };
}

/**
 * Parses a simple, indentation-based YAML string into a basic JS object.
 * Designed to be zero-dependency, extremely lightweight, and deterministic.
 */
export function parseYaml(yaml: string): any {
  const lines = yaml.split(/\r?\n/);
  const result: any = {};
  let currentKey = '';
  let inLiteralBlock = false;
  let literalBlockLines: string[] = [];
  let literalIndent = 0;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Skip empty lines and comments when not in a multi-line block
    if (!inLiteralBlock && (trimmed === '' || trimmed.startsWith('#'))) {
      continue;
    }

    // Handle multiline literal blocks (started with | or >)
    if (inLiteralBlock) {
      const matchIndent = rawLine.match(/^(\s*)/);
      const currentLineIndent = matchIndent ? matchIndent[1].length : 0;
      if (currentLineIndent >= literalIndent && trimmed !== '') {
        literalBlockLines.push(rawLine.slice(literalIndent));
        continue;
      } else {
        result[currentKey] = literalBlockLines.join('\n').trim();
        inLiteralBlock = false;
        literalBlockLines = [];
        if (trimmed === '') continue;
      }
    }

    // Check for inline arrays (e.g. tags: [a, b])
    const arrayMatch = rawLine.match(/^\s*([\w]+)\s*:\s*\[(.*)\]\s*$/);
    if (arrayMatch) {
      const key = arrayMatch[1];
      const items = arrayMatch[2].split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
      result[key] = items;
      continue;
    }

    // Check for key-value pairs
    const kvMatch = rawLine.match(/^\s*([\w]+)\s*:\s*(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1];
      const val = kvMatch[2].trim();

      if (val === '|') {
        inLiteralBlock = true;
        currentKey = key;
        const nextLine = lines[i + 1];
        const nextIndentMatch = nextLine ? nextLine.match(/^(\s*)/) : null;
        literalIndent = nextIndentMatch ? nextIndentMatch[1].length : 2;
        continue;
      }

      // Parse basic types
      if (val === 'true') result[key] = true;
      else if (val === 'false') result[key] = false;
      else if (val === 'null') result[key] = null;
      else if (/^-?\d+(\.\d+)?$/.test(val)) result[key] = Number(val);
      else {
        // Strip wrapper quotes if any
        result[key] = val.replace(/^['"]|['"]$/g, '');
      }
    }
  }

  if (inLiteralBlock && literalBlockLines.length > 0) {
    result[currentKey] = literalBlockLines.join('\n').trim();
  }

  return result;
}

/**
 * Stringifies a simple object into YAML format with strict indentation.
 */
export function stringifyYaml(obj: any, indentLevel = 0): string {
  const pad = '  '.repeat(indentLevel);
  let result = '';

  for (const key of Object.keys(obj)) {
    const val = obj[key];

    if (val === null) {
      result += `${pad}${key}: null\n`;
    } else if (typeof val === 'boolean' || typeof val === 'number') {
      result += `${pad}${key}: ${val}\n`;
    } else if (Array.isArray(val)) {
      if (val.length === 0) {
        result += `${pad}${key}: []\n`;
      } else if (val.every(item => typeof item === 'string')) {
        result += `${pad}${key}:\n`;
        for (const item of val) {
          result += `${pad}  - "${item.replace(/"/g, '\\"')}"\n`;
        }
      } else {
        result += `${pad}${key}:\n`;
        for (const item of val) {
          result += `${pad}  - \n${stringifyYaml(item, indentLevel + 2)}`;
        }
      }
    } else if (typeof val === 'object') {
      result += `${pad}${key}:\n${stringifyYaml(val, indentLevel + 1)}`;
    } else if (typeof val === 'string') {
      if (val.includes('\n')) {
        const lines = val.split('\n');
        result += `${pad}${key}: |\n`;
        for (const line of lines) {
          result += `${pad}  ${line}\n`;
        }
      } else {
        result += `${pad}${key}: "${val.replace(/"/g, '\\"')}"\n`;
      }
    }
  }

  return result;
}

/**
 * Extract a specific YAML code block from Markdown.
 */
export function extractYamlBlock(content: string, sectionHeader: string): string | null {
  const regex = new RegExp(`${sectionHeader}[\\s\\S]*?\`\`\`yaml\\r?\\n([\\s\\S]*?)\\r?\\n\`\`\``);
  const match = content.match(regex);
  return match ? match[1] : null;
}

/**
 * Replace a specific YAML code block in Markdown.
 */
export function replaceYamlBlock(content: string, sectionHeader: string, newYaml: string): string {
  const regex = new RegExp(`(${sectionHeader}[\\s\\S]*?\`\`\`yaml\\r?\\n)([\\s\\S]*?)(\\r?\\n\`\`\`)`);
  return content.replace(regex, `$1${newYaml.trim()}$3`);
}

/**
 * Helper to extract YAML blocks for STEPS where the entire block is an array of steps.
 * Performs precision parsing to extract and re-serialize step updates.
 */
export function parseStepsYaml(yaml: string): WrfStep[] {
  // A simplistic steps array parser for compliant formatting
  const rawSteps = yaml.split(/\r?\n\s*-\s+stepId:/);
  const steps: WrfStep[] = [];

  for (let i = 0; i < rawSteps.length; i++) {
    let part = rawSteps[i].trim();
    if (i === 0) {
      if (part.startsWith('steps:')) {
        part = part.slice(6).trim();
      }
      if (!part) continue;
    } else {
      part = `stepId: ${part}`;
    }

    const stepObj = parseYaml(part);
    if (stepObj && stepObj.stepId) {
      // Re-parse complex child blocks if needed, but for general updates, flat property mutation is enough
      steps.push(stepObj as WrfStep);
    }
  }
  return steps;
}
