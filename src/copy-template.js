import { confirm, intro, log, outro, spinner } from "@clack/prompts";

import degit from "degit";

import chalk from "chalk";
import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import { getRunCommand, pmEnv } from "./utils/package-manager.js";

export async function copyDefaultFiles(projectPath, __dirname, pm = "npm") {
  intro(chalk.bgCyan.black(" CONFIGURING PROJECT ARCHITECTURE "));

  const s = spinner();
  const templateSrcPath = path.resolve(__dirname, "../template/src");
  const destSrcPath = path.join(projectPath, "src");
  const newAppPath = path.join(destSrcPath, "app");

  // 1. Reset project logic
  s.start("Resetting project structure");
  try {
    const [runCmd, runArgs] = getRunCommand(pm, "reset-project");
    await execa(runCmd, runArgs, {
      cwd: projectPath,
      env: pmEnv(pm),
      stdio: ["pipe", "inherit", "inherit"],
      input: "n\n",
    });
    s.stop("Project structure reset complete");
  } catch (error) {
    s.stop(chalk.red("Reset failed, continuing..."));
  }

  // 2. Copy Base Folders (lib, hooks, etc.)
  s.start("Copying core folders");
  const baseFolders = ["hooks", "redux", "utils", "components"];
  await fs.ensureDir(destSrcPath);

  for (const folder of baseFolders) {
    const src = path.join(templateSrcPath, folder);
    const dest = path.join(destSrcPath, folder);
    if (await fs.pathExists(src)) {
      await fs.copy(src, dest, { overwrite: true });
    }
  }
  s.stop("Core folders copied");

  // 3. Add lib folder (always) — template screens import from src/lib (tailwind, buttons, inputs...)
  s.start("Downloading lib components from GitHub");
  const targetLibPath = path.join(destSrcPath, "lib");
  try {
    await fs.ensureDir(targetLibPath);
    try {
      // degit downloads a tarball: no git needed, no .git folder
      const emitter = degit("arifbiswas/lib", { cache: false, force: true });
      await emitter.clone(targetLibPath);
    } catch {
      // Fallback: git clone, then strip git metadata
      const tempGitPath = path.join(projectPath, "temp_git_lib");
      await fs.remove(tempGitPath);
      await execa("git", [
        "clone",
        "--depth",
        "1",
        "https://github.com/arifbiswas/lib.git",
        tempGitPath,
      ]);
      await fs.copy(tempGitPath, targetLibPath, { overwrite: true });
      await fs.remove(tempGitPath);
    }
    for (const junk of [".git", ".github", ".DS_Store"]) {
      await fs.remove(path.join(targetLibPath, junk));
    }
    s.stop("lib folder added (src/lib)");
  } catch (error) {
    s.stop(chalk.red("Could not download lib folder"));
    log.warn(
      "Template screens need src/lib. Add it manually later:\n  npx degit arifbiswas/lib src/lib",
    );
  }

  // 4. Organize 'app' folder and copy specific files
  // Older Expo templates use /app, newer ones (SDK 54+) already use /src/app
  const oldAppPath = path.join(projectPath, "app");
  if (await fs.pathExists(oldAppPath)) {
    await fs.move(oldAppPath, newAppPath, { overwrite: true });
  }
  await fs.ensureDir(newAppPath);

  // --- NEW: Copy _layout and index files from template/src/app ---
  const rootFiles = ["_layout.tsx", "index.tsx", "demo.tsx"];
  for (const file of rootFiles) {
    const srcFile = path.join(templateSrcPath, "app", file);
    const destFile = path.join(newAppPath, file);

    if (await fs.pathExists(srcFile)) {
      await fs.copy(srcFile, destFile, { overwrite: true });
      log.step(`File ${file} updated from template`);
    }
  }

  // Copy app sub-folders
  const appSubFolders = ["auth", "common", "modals", "settings"];
  for (const sub of appSubFolders) {
    const src = path.join(templateSrcPath, "app", sub);
    const dest = path.join(newAppPath, sub);
    if (await fs.pathExists(src)) {
      await fs.copy(src, dest, { overwrite: true });
      log.step(`Added ${sub} to src/app`);
    }
  }

  // 5. Interactive Tabs and Drawer
  const needTabs = await confirm({
    message: "Do you need Bottom Tabs navigation?",
    initialValue: true,
  });

  if (needTabs === true) {
    const tabsSrc = path.join(templateSrcPath, "app/home/tabs/");
    const tabsDest = path.join(newAppPath, "home/(tabs)");
    if (await fs.pathExists(tabsSrc)) {
      await fs.copy(tabsSrc, tabsDest, { overwrite: true });
      log.success("Tabs navigation added");
    }
  }

  const needDrawer = await confirm({
    message: "Do you need Drawer navigation?",
    initialValue: false,
  });

  if (needDrawer === true) {
    const drawerSrc = path.join(templateSrcPath, "app/home/drawer/");
    const drawerDest = path.join(newAppPath, "home/(drawer)");
    if (await fs.pathExists(drawerSrc)) {
      await fs.copy(drawerSrc, drawerDest, { overwrite: true });
      log.success("Drawer navigation added");
    }
  }

  // 6. Copy assets folder fonts icon and image folder just index file

  const assetsSrcPath = path.resolve(__dirname, "../template/");

  const assetsSrc = path.join(assetsSrcPath, "assets");
  const assetsDest = path.join(projectPath, "assets");
  if (await fs.pathExists(assetsSrc)) {
    await fs.copy(assetsSrc, assetsDest, {
      overwrite: false,
    });

    log.step("Assets folder copied");
  }

  // 7. Copy tailwind.config.js

  // Define the source path for the config file
  const tailwindSrc = path.resolve(__dirname, "../tailwind.config.js");

  // Define the destination path including the filename
  const tailwindDest = path.join(projectPath, "tailwind.config.js");

  try {
    if (await fs.pathExists(tailwindSrc)) {
      await fs.copy(tailwindSrc, tailwindDest, {
        overwrite: true,
      });
      console.log(chalk.green("✔ tailwind.config.js copied to project root"));
    } else {
      console.log(chalk.red("✘ tailwind.config.js not found in template"));
    }
  } catch (err) {
    console.error(chalk.red("Error copying tailwind config:"), err.message);
  }

  outro(chalk.green.bold("✨ Architecture setup complete!"));
}
