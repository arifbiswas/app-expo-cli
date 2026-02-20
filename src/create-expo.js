import chalk from "chalk";
import { execa } from "execa";

export async function createExpoApp(projectName) {
  console.log(chalk.blue("Creating latest Expo app..."));

  await execa("bunx", ["create-expo-app", projectName], {
    stdio: "inherit",
  });
}
