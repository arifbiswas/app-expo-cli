import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { copyDefaultFiles } from "./copy-template.js";
import { createExpoApp } from "./create-expo.js";
import { installDependencies } from "./install-deps.js";
import { logError } from "./utils/logger.js";
import {
  detectPackageManager,
  getGlobalInstallHint,
} from "./utils/package-manager.js";

// __dirname replacement for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct path to package.json
const pkgPath = path.join(__dirname, "..", "package.json");

// Files that may already exist in a folder before setting up in it with "."
const ALLOWED_EXISTING = new Set([
  ".git",
  ".gitignore",
  ".gitattributes",
  ".DS_Store",
  "Thumbs.db",
  ".idea",
  ".vscode",
  "LICENSE",
]);

async function getConflictingFiles(dir) {
  const entries = await fs.readdir(dir);
  return entries.filter((f) => !ALLOWED_EXISTING.has(f));
}

async function init() {
  // Read package.json
  let pkg;
  try {
    pkg = await fs.readJson(pkgPath);
  } catch (error) {
    logError("Could not find package.json.");
    process.exit(1);
  }

  const args = process.argv.slice(2);
  // Positional args (ignore --use-npm / --use-pnpm / --use-yarn / --use-bun)
  const positional = args.filter((a) => !/^--use-(npm|pnpm|yarn|bun)$/.test(a));

  // 1. Handle Version Flags
  if (
    args.includes("--version") ||
    args.includes("-v") ||
    args.includes("--v")
  ) {
    console.log(`${chalk.cyan(pkg.name)} version: ${chalk.green(pkg.version)}`);
    process.exit(0);
  }

  // 2. Handle Update Flags (-u or --update)
  if (args.includes("--update") || args.includes("-u")) {
    console.log(chalk.blue("Checking for updates from npm..."));

    try {
      // Fetch the latest version data directly from the official npm registry
      const response = await fetch(
        `https://registry.npmjs.org/${pkg.name}/latest`,
      );

      // Check if the response is valid
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const latestVersion = data.version;

      // Compare the local package.json version with the npm registry version
      if (latestVersion && latestVersion !== pkg.version) {
        console.log(
          chalk.yellow(
            `Update available: ${chalk.bold(latestVersion)}. You have ${chalk.bold(pkg.version)}.`,
          ),
        );
        console.log(
          chalk.gray(
            `Run ${chalk.cyan(getGlobalInstallHint(await detectPackageManager(args).catch(() => "npm"), pkg.name))} to update.`,
          ),
        );
      } else {
        console.log(chalk.green("You are using the latest version. ✅"));
      }
    } catch (error) {
      // Handle cases where the user is offline or npm is down
      console.log(
        chalk.red(
          "Failed to check for updates. Please check your internet connection.",
        ),
      );
    }

    process.exit(0);
  }

  // 3. Handle Help Flags (--help or -h)
  if (args.includes("--help") || args.includes("-h")) {
    console.log(`\n${chalk.bold.cyan(pkg.name.toUpperCase())} - CLI Tool\n`);
    console.log(chalk.bold("Usage:"));
    console.log(chalk.gray(`  npx ${pkg.name} <project-name>   ${chalk.dim("create in a new folder")}`));
    console.log(chalk.gray(`  npx ${pkg.name} .                ${chalk.dim("set up in the current folder")}\n`));
    console.log(chalk.bold("Options:"));
    console.log(`  -v, --version    ${chalk.gray("Show version number")}`);
    console.log(`  -u, --update     ${chalk.gray("Check for updates")}`);
    console.log(`  -h, --help       ${chalk.gray("Show help guide")}`);
    console.log(
      `  --use-npm | --use-pnpm | --use-yarn | --use-bun\n                   ${chalk.gray("Force a package manager (default: auto-detect)")}`,
    );
    process.exit(0);
  }

  // 4. Get Project Name (Argument check)
  const projectArg = positional[0];

  if (!projectArg) {
    logError(
      `Please provide a project name. Usage: npx ${pkg.name} <project-name>  (or "." for the current folder)`,
    );
    process.exit(1);
  }

  if (projectArg.startsWith("-")) {
    logError("Project name cannot start with a hyphen (-)");
    process.exit(1);
  }

  // "." (or "./") = set up inside the current folder
  const useCurrentDir = projectArg === "." || projectArg === "./";
  const projectPath = useCurrentDir
    ? process.cwd()
    : path.join(process.cwd(), projectArg);
  const projectName = path.basename(projectPath);

  const namePattern = /^[a-z0-9-_]+$/;
  if (!namePattern.test(useCurrentDir ? projectName : projectArg)) {
    if (useCurrentDir) {
      logError(
        `Current folder name "${projectName}" is not a valid project name. Rename the folder using only lowercase letters, numbers, hyphens, and underscores.`,
      );
    } else {
      logError(
        "Invalid project name! Use only lowercase letters, numbers, hyphens, and underscores.",
      );
    }
    console.log(chalk.yellow("Example: my-new-app or expo_project_1"));
    process.exit(1);
  }

  try {
    if (useCurrentDir) {
      const conflicts = await getConflictingFiles(projectPath);
      if (conflicts.length) {
        logError(
          `Current folder is not empty. Remove these first or use a new folder:\n  ${conflicts.join("\n  ")}`,
        );
        process.exit(1);
      }
    } else if (await fs.pathExists(projectPath)) {
      logError(`Directory "${projectName}" already exists.`);
      process.exit(1);
    }

    console.log(
      chalk.blue(
        `\nCreating a new Expo project in ${chalk.bold(projectPath)}...`,
      ),
    );

    // Step 0: Detect package manager (npm / pnpm / yarn / bun)
    const pm = await detectPackageManager(args);

    // Step 1: Create Expo App
    await createExpoApp(useCurrentDir ? "." : projectName, pm);

    // Step 2: Copy Template Files
    await copyDefaultFiles(projectPath, __dirname, pm);

    // Step 3: Install Dependencies
    await installDependencies(projectPath, pm);

    console.log("\n" + chalk.green.bold("✅ Project ready 🚀"));
    console.log(chalk.gray(`\nNext steps:`));
    if (!useCurrentDir) console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan(`  ${pm === "npm" ? "npm run" : pm} start`));
  } catch (err) {
    logError(err.message);
    process.exit(1);
  }
}

init();
