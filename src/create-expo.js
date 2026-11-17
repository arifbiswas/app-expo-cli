import chalk from "chalk";
import { execa } from "execa";
import { getExecCommand, pmEnv } from "./utils/package-manager.js";

export async function createExpoApp(projectName, pm) {
  console.log(chalk.blue(`Creating latest Expo app (using ${chalk.bold(pm)})...`));

  const [cmd, args] = getExecCommand(pm, "create-expo-app@latest", [projectName]);

  await execa(cmd, args, {
    stdio: "inherit",
    env: pmEnv(pm),
  });
}
