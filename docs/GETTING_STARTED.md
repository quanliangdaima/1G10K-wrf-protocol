# Getting Started with WRF Deck

The fastest way to understand WRF Deck is to [watch the demo](https://1g10k.dev).

---

## 1. Get the template

1. Open [WRF Deck](https://1g10k.dev/workflow-recovery).
2. Click **Start → Get Templates**.
3. Save the downloaded [execution-track.wrf.md](cci:7://file:///D:/1G10k/wrf-protocol-1G10K/templates/wrf/execution-track.wrf.md:0:0-0:0) to your project folder.

---

## 2. Ask your AI to fill in the plan

Tell your AI where [execution-track.wrf.md](cci:7://file:///D:/1G10k/wrf-protocol-1G10K/templates/wrf/execution-track.wrf.md:0:0-0:0) is saved on your disk, and describe the task, for example:
> "I want to add dark mode to my React app. Fill in the WRF protocol template with a step-by-step plan, starting with understanding the current theme setup."

The AI fills in the plan directly in the local `.wrf.md` file. Once done, it is ready to import into WRF Deck.

---

## 3. Import into WRF Deck

Click **Start → Import to Start** in [WRF Deck](https://1g10k.dev/workflow-recovery).

The left panel shows the step roadmap; the middle panel shows the Focus View (current step context, checkpoints, and next action); the right panel is the Proof Trail.

Grant browser permission when asked so WRF Deck can read the local .wrf protocol file. All data stays on your device; nothing is uploaded to 1G10K.

---

## 4. Run a step

1. Click **Copy Next Step Command**.
2. Paste it into your AI tool.
3. The AI executes the step and writes the result back to `.wrf.md`.

> WRF Deck never edits the `.wrf.md` file itself. All writes come from your AI tool.

For full details, refer to the README or [watch the demo](https://1g10k.dev).

---

## 5. Mark a step done

Your AI tool updates `.wrf.md` on your disk after each step. 

For full details, refer to the README or [watch the demo](https://1g10k.dev).

---

## 6. Hand off context at any time

Click to copy:

- **Copy Step Handoff** 
- **Copy Full Handoff**

The copied text is a controlled context snapshot. It can be used whenever the developer wants an explicit context transfer: correcting course in the same tool after context drift, switching between parallel tasks, handing off to another AI tool, passing work to a teammate, or even sharing via email or chat. As long as the recipient reads the same .wrf.md file — either directly or by re-importing it into WRF Deck — the full execution state is immediately visible and visualized. The handoff buttons are a convenience for packaging context; the .wrf.md file itself remains the single source of truth.




---

## 7. Use Sentry safely

Sentry scans your local `.wrf.md` file whenever it is loaded or re-synced into WRF Deck.

For full details, refer to the README or [watch the demo](https://1g10k.dev).

---

## 8. Export evidence

Click **Start → Export Human-AI Contribution Evidence**. WRF Deck downloads a ZIP containing the original `.wrf.md` and a `Human-AI Contribution Chronology Report` (`authorship-summary.html`).

If you want a local timestamp, drag the ZIP into the Proof Trail panel.

For full details, refer to the README or [watch the demo](https://1g10k.dev).

---

## Next steps

- Read the full [WRF Protocol Specification](SPEC.md).
- See the [README](../README.md) for project overview and links.
- [Watch the demo](https://1g10k.dev) to see the full workflow in action.