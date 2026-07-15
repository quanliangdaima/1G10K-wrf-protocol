# Changelog

All notable changes to the WRF protocol and WRF Deck reference implementation are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [3.1.0] - 2026-06-30

### Added

- **Human-AI contribution tracking and export** — human creative direction, constraints, and corrections are stored separately in `humanDirectionNotes`. Click **Export Human-AI Contribution Evidence** in the Start menu to download a ZIP containing the full `.wrf.md` and a `Human-AI Contribution Chronology Report` (`authorship-summary.html`).

### Changed

- README, `README.zh-CN.md`, and `docs/GETTING_STARTED.md` polished for the first public GitHub release; UI labels aligned with WRF Deck (`Import to Start`, `Export Human-AI Contribution Evidence`, `Lock Sentry Evidence`).
- Project structure documented with all shipped files, including README screenshots and the template checksum.

## Earlier releases

The following WRF Deck and protocol features were built and iterated on before the first public GitHub release:

- **Single-file WRF protocol template** (`templates/wrf/execution-track.wrf.md`) — created on 2026-05-28. See [`docs/PROVENANCE.md`](docs/PROVENANCE.md) for the Bitcoin blockchain evidence. A portable Markdown + YAML format that captures full execution state, roadmap, active step, checkpoints, and handoff context.
- WRF Deck visual workspace
- Step-aware command generation and branch task handling
- Multi-AI tool handoff (`Copy Step Handoff`, `Copy Full Handoff`)
- Sentry dual-layer dangerous command detection and one-click evidence lock
- Proof Trail evidence panel with SHA-256 hashing and OpenTimestamps support
