import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        {
          name: "vitest-chromium",
          browser: "chromium",
        },
      ],
    },
    // projects: [
    //   {
    //     extends: true,
    //     plugins: [
    //       // The plugin will run tests for the stories defined in your Storybook config
    //       // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
    //       storybookTest({
    //         configDir: path.join(dirname, ".storybook"),
    //       }),
    //     ],
    //     test: {
    //       name: "storybook",
    //       browser: {
    //         enabled: true,
    //         headless: true,
    //         provider: playwright({}),
    //         instances: [
    //           {
    //             name: "storybook-chromium",
    //             browser: "chromium",
    //           },
    //         ],
    //       },
    //       setupFiles: [".storybook/vitest.setup.ts"],
    //     },
    //   },
    // ],
  },
});
