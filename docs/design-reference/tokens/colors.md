# Design Tokens — Colors

**Primary sources:** `PsycheFoundation/nousnet/website/frontend/src/colors.ts:1` (palette arrays, snapshot) · `NousResearch/hermes-agent/web/src/index.css:4-11` (semantic token layer, snapshot) · `portfolio/app/globals.css:4-15` (current portfolio custom properties)

---

## Source Snapshot Map

| Concern | Source |
|---|---|
| Palette literals | `PsycheFoundation/nousnet/website/frontend/src/colors.ts:1` |
| Hermes semantic tokens | `NousResearch/hermes-agent/web/src/index.css:4-11` |
| Portfolio semantic tokens | `portfolio/app/globals.css:4-15` |

The nousnet palette file was retrieved as a single-line raw source snapshot, so the palette literals are cited at `:1`.

---

## Full Palettes

All values below are captured from the nousnet palette snapshot.

### Slate — 11 shades (index 0–10)

| Palette | Index | Hex | Description | Source |
|---|---|---|---|---|
| `slate` | 0 | `#fcfdfc` | Near-white, brightest foreground | `colors.ts:1` |
| `slate` | 1 | `#f7f8f7` | Off-white | `colors.ts:1` |
| `slate` | 2 | `#ecf0eb` | Light surface (light theme bg) | `colors.ts:1` |
| `slate` | 3 | `#dfe3de` | Light border | `colors.ts:1` |
| `slate` | 4 | `#b9beb6` | Disabled / placeholder | `colors.ts:1` |
| `slate` | 5 | `#90968d` | Muted mid-tone | `colors.ts:1` |
| `slate` | 6 | `#676d64` | Secondary muted | `colors.ts:1` |
| `slate` | 7 | `#464b44` | Dark surface tint | `colors.ts:1` |
| `slate` | 8 | `#313630` | Dark border | `colors.ts:1` |
| `slate` | 9 | `#20241e` | Near-black surface | `colors.ts:1` |
| `slate` | 10 | `#0c100a` | Deepest dark | `colors.ts:1` |

### Forest — 7 shades (index 0–6)

| Palette | Index | Hex | Description | Source |
|---|---|---|---|---|
| `forest` | 0 | `#dcf4de` | Lightest forest tint | `colors.ts:1` |
| `forest` | 1 | `#c0edc0` | Light forest | `colors.ts:1` |
| `forest` | 2 | `#90d596` | Mid forest | `colors.ts:1` |
| `forest` | 3 | `#4b9551` | Active/success green | `colors.ts:1` |
| `forest` | 4 | `#396a3d` | Dark forest (SVG pattern fill) | `colors.ts:1` |
| `forest` | 5 | `#2a462d` | Deep forest (dark theme bg) | `colors.ts:1` |
| `forest` | 6 | `#1f3320` | Deepest forest (tag border) | `colors.ts:1` |

### Gold — 6 shades (index 0–5)

| Palette | Index | Hex | Description | Source |
|---|---|---|---|---|
| `gold` | 0 | `#faecc6` | Lightest gold tint | `colors.ts:1` |
| `gold` | 1 | `#fcde92` | Light gold | `colors.ts:1` |
| `gold` | 2 | `#f6c955` | Mid gold | `colors.ts:1` |
| `gold` | 3 | `#ecae13` | Primary gold (nousnet accent) | `colors.ts:1` |
| `gold` | 4 | `#c49212` | Dark gold | `colors.ts:1` |
| `gold` | 5 | `#956f0e` | Deepest gold | `colors.ts:1` |

### Lime — 6 shades (index 0–5)

| Palette | Index | Hex | Description | Source |
|---|---|---|---|---|
| `lime` | 0 | `#e6ffd1` | Lightest lime | `colors.ts:1` |
| `lime` | 1 | `#cdffa3` | Light lime | `colors.ts:1` |
| `lime` | 2 | `#90f53d` | Bright lime (funding status) | `colors.ts:1` |
| `lime` | 3 | `#61cb0b` | Mid lime | `colors.ts:1` |
| `lime` | 4 | `#4b970c` | Dark lime | `colors.ts:1` |
| `lime` | 5 | `#2f5e08` | Deepest lime | `colors.ts:1` |

### Success — 6 shades (index 0–5)

| Palette | Index | Hex | Description | Source |
|---|---|---|---|---|
| `success` | 0 | `#e3fcfc` | Lightest success tint | `colors.ts:1` |
| `success` | 1 | `#c2f0f0` | Light success | `colors.ts:1` |
| `success` | 2 | `#6ed8d8` | Mid success | `colors.ts:1` |
| `success` | 3 | `#23b3b3` | Base success | `colors.ts:1` |
| `success` | 4 | `#188181` | Dark success | `colors.ts:1` |
| `success` | 5 | `#0c5555` | Deepest success | `colors.ts:1` |

### Error — 6 shades (index 0–5)

| Palette | Index | Hex | Description | Source |
|---|---|---|---|---|
| `error` | 0 | `#feede7` | Lightest error tint | `colors.ts:1` |
| `error` | 1 | `#fdcebe` | Light error | `colors.ts:1` |
| `error` | 2 | `#f7906e` | Mid error | `colors.ts:1` |
| `error` | 3 | `#dd5c31` | Base error | `colors.ts:1` |
| `error` | 4 | `#a5360d` | Dark error | `colors.ts:1` |
| `error` | 5 | `#5e2308` | Deepest error | `colors.ts:1` |

---

## Semantic Mapping

How palette values are mapped into semantic roles across the Nous-derived systems represented in this repo.

| Role | CSS Variable | Dark Theme | Light Theme | Palette Ref | Source |
|---|---|---|---|---|---|
| Background | `--background` | `#041c1c` (portfolio/hermes) | `#ecf0eb` | slate[2] | `index.css:4-11`, `globals.css:4-15` |
| Foreground | `--foreground` | `#fcfdfc` | `#0c100a` | slate[0] / slate[10] | `index.css:4-11`, `colors.ts:1` |
| Primary text | `--midground` | `#ffe6cb` | `#2a462d` | forest[5] in light-mode analog | `index.css:4-11` |
| Accent | `--accent` | `#ffbd38` / `#ecae13` | `#ecae13` | gold[3] | `globals.css:4-15`, `colors.ts:1` |
| Surface | `--surface` | 4% cream over `#041c1c` | `#f7f8f7` | slate[1] | `globals.css:4-15`, `colors.ts:1` |
| Tag bg | `--forest-surface` | `#0e1f0e` | `#dcf4de` analog | forest[0] | `globals.css:4-15`, `colors.ts:1` |
| Active status | — | `#4b9551` | same | forest[3] | `colors.ts:1` |
| Warning | `--warning` / accent usage | `#ffbd38` | same | gold family | `index.css:11`, `globals.css:9-10` |
| Destructive | `--destructive` | `#fb2c36` | same | — | `index.css:11` |

---

## Usage Notes

- Use palette rows when you need exact upstream color literals.
- Use semantic tokens when styling this portfolio; that is the layer the current app actually consumes.
- Gold remains the only interactive accent. Forest is for structure and surfaces, not CTA emphasis.
- Do not use pure `#000000` or `#ffffff` in implementation work here; use the semantic layer instead.
