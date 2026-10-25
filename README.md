# Fill Vehicle Data

Populate selected Figma layers with vehicle data from the configured Google Sheet. The plugin can fill text fields, format vehicle features, and insert vehicle images.

## Development

Use Node 26.12.1 and pnpm 12.15.0:

```sh
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm build
pnpm watch
```

Import this repository's `manifest.json` as a development plugin in Figma. `code.ts` compiles to `code.js`; `ui.html` supplies the plugin interface. Figma injects the `figma` runtime global, so the unrelated npm `figma` package is unnecessary and has been removed. The existing manifest identity and network permissions are preserved.

## Upgrade verification

TypeScript 7.0.2 handles checking and compilation through explicit package paths. TypeScript 6.0.3 remains for the typed ESLint compiler API and supported peer range. A global TypeScript installation is unnecessary.

Frozen installation, peer checks, lint, typecheck, build, and dependency audits pass. Local checks of the emitted JavaScript with a simulated Figma host cover startup, vehicle-field insertion, font/style preservation, record cycling, feature formatting, and empty selection. These checks do not replace verification in the actual Figma application. Community publication and live image/Google Sheet requests were not performed. No runtime performance gain is claimed.
