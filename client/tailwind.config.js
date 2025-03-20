// @ts-check
import { join } from "node:path";

// 1. Import the Skeleton plugin
import { skeleton } from "@skeletonlabs/tw-plugin";
// import * as themes from "@skeletonlabs/skeleton/themes";

/** @type {import('tailwindcss').Config} */
export default {
  // 2. Opt for dark mode to be handled via the class method
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    // 3. Append the path to the Skeleton package
    join(
      new URL(import.meta.resolve("@skeletonlabs/skeleton")).pathname,
      "../**/*.{html,js,svelte,ts}"
    ),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // 4. Append the Skeleton plugin (after other plugins)
    skeleton({
      themes: {
        // Register each theme within this array:
        preset: [ "skeleton", "modern", "crimson", "wintry", "seafoam", "sahara" ] 
      }
    })
    ],
};
