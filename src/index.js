import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { copyDefaultFiles } from "./copy-template.js";
import { createExpoApp } from "./create-expo.js";
import { installDependencies } from "./install-deps.js";
import { logError } from "./utils/logger.js";
const projectName = process.argv[2];

if (!projectName) {
  logError("Please provide project name");
  process.exit(1);
}

// __dirname replacement for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function init() {
  try {
    const projectPath = path.join(process.cwd(), projectName);

    if (await fs.pathExists(projectPath)) {
      logError("Project already exists");
      process.exit(1);
    }

    await createExpoApp(projectName);

    await copyDefaultFiles(projectPath, __dirname);
    await installDependencies(projectPath);

    console.log("\n✅ Project ready 🚀");
  } catch (err) {
    logError(err.message);
  }
}

init();
