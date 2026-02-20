import chalk from "chalk";
import { execa } from "execa";

export async function installDependencies(projectPath) {
  console.log(chalk.green("Installing extra dependencies..."));

  await execa(
    "bun",
    [
      "install",
      "@reduxjs/toolkit",
      "react-redux",
      "@react-native-async-storage/async-storage",
      "axios",
    ],
    {
      cwd: projectPath,
      stdio: "inherit",
    },
  );
}
