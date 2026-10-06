import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  output: "static",
  vite: { resolve: { noExternal: ["@gears-frontx/ui-kit"] } },
  trailingSlash: "always",
  devToolbar: { enabled: false },
});
