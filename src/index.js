import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import updateNotifier from "simple-update-notifier";
import { fileURLToPath } from "url";
import { copyDefaultFiles } from "./copy-template.js";
import { createExpoApp } from "./create-expo.js";
import { installDependencies } from "./install-deps.js";
import { logError } from "./utils/logger.js";

// __dirname replacement for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct path to package.json
const pkgPath = path.join(__dirname, "..", "package.json");

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
    const notifier = updateNotifier({ pkg });

    // Check if update exists (notifier returns info if update is available)
    if (notifier && notifier.update) {
      console.log(
        chalk.yellow(
          `Update available: ${chalk.bold(notifier.update.latest)}. You have ${chalk.bold(pkg.version)}.`,
        ),
      );
      console.log(
        chalk.gray(
          `Run ${chalk.cyan(`npm install -g ${pkg.name}`)} to update.`,
        ),
      );
    } else {
      console.log(chalk.green("You are using the latest version. ✅"));
    }
    process.exit(0);
  }

  // 3. Handle Help Flags (--help or -h)
  if (args.includes("--help") || args.includes("-h")) {
    console.log(`\n${chalk.bold.cyan(pkg.name.toUpperCase())} - CLI Tool\n`);
    console.log(chalk.bold("Usage:"));
    console.log(chalk.gray(`  npx ${pkg.name} <project-name>\n`));
    console.log(chalk.bold("Options:"));
    console.log(`  -v, --version    ${chalk.gray("Show version number")}`);
    console.log(`  -u, --update     ${chalk.gray("Check for updates")}`);
    console.log(`  -h, --help       ${chalk.gray("Show help guide")}`);
    process.exit(0);
  }

  // 4. Get Project Name (Argument check)
  const projectName = args[0];

  if (!projectName) {
    logError(
      `Please provide project name. Usage: npx ${pkg.name} <project-name>`,
    );
    process.exit(1);
  }

  if (projectName.startsWith("-")) {
    logError("Project name cannot start with a hyphen (-)");
    process.exit(1);
  }

  const namePattern = /^[a-z0-9-_]+$/;
  if (!namePattern.test(projectName)) {
    logError(
      "Invalid project name! Use only lowercase letters, numbers, hyphens, and underscores.",
    );
    console.log(chalk.yellow("Example: my-new-app or expo_project_1"));
    process.exit(1);
  }

  try {
    const projectPath = path.join(process.cwd(), projectName);

    if (await fs.pathExists(projectPath)) {
      logError(`Directory "${projectName}" already exists.`);
      process.exit(1);
    }

    console.log(
      chalk.blue(
        `\nCreating a new Expo project in ${chalk.bold(projectPath)}...`,
      ),
    );

    // Step 1: Create Expo App
    await createExpoApp(projectName);

    // Step 2: Copy Template Files
    await copyDefaultFiles(projectPath, __dirname);

    // Step 3: Install Dependencies
    await installDependencies(projectPath);

    console.log("\n" + chalk.green.bold("✅ Project ready 🚀"));
    console.log(chalk.gray(`\nNext steps:`));
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan(`  bun start`));
  } catch (err) {
    logError(err.message);
    process.exit(1);
  }
}

init();
