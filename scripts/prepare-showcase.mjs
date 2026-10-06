import { copyFileSync } from "node:fs";
// Vite rewrites the favicon under its base. Other public handoffs stay at root.
copyFileSync(new URL("../public/favicon.svg", import.meta.url), new URL("../public/showcase/favicon.svg", import.meta.url));
