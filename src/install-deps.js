import chalk from "chalk";
import { execa } from "execa";

export async function installDependencies(projectPath) {
  console.log(chalk.green("Installing extra dependencies..."));

  await execa(
    "bun",
    [
      "install",
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
    ],
    {
      cwd: projectPath,
      stdio: "inherit",
    },
  );
}
