import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Preserve the catalogue entry; never copy public/ recursively into its output.
export default defineConfig({ plugins: [react()], build: { copyPublicDir: false } });
