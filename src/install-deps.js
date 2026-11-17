import chalk from "chalk";
import { execa } from "execa";
import { getAddCommand, pmEnv } from "./utils/package-manager.js";

const EXTRA_DEPENDENCIES = [
  "expo-image-picker",
  "@reduxjs/toolkit",
  "react-redux",
  "@react-native-async-storage/async-storage",
  "axios",
  "react-native-svg",
  "formik",
  "yup",
  "react-native-otp-entry",
  "react-native-webview",
  "react-native-render-html",
];

export async function installDependencies(projectPath, pm) {
  console.log(chalk.green(`Installing extra dependencies with ${chalk.bold(pm)}...`));

  const [cmd, args] = getAddCommand(pm, EXTRA_DEPENDENCIES);

  await execa(cmd, args, {
    cwd: projectPath,
    stdio: "inherit",
    env: pmEnv(pm),
  });
}
