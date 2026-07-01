import editableRegions from "@cloudcannon/editable-regions/astro-integration";
import { defineConfig } from "astro/config";

// Minimal Astro config wired for CloudCannon visual editing — mirrors the
// known-good integration setup from testing-rcc-v2, nothing else.
export default defineConfig({
  integrations: [editableRegions()],
});
