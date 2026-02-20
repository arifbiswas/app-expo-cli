import chalk from "chalk";

export function logError(message) {
  console.log(chalk.red("❌ " + message));
}

export function logSuccess(message) {
  console.log(chalk.green("✅ " + message));
}

export function logWarning(message) {
  console.log(chalk.yellow("⚠️ " + message));
}

export function logInfo(message) {
  console.log(chalk.blue("i️ " + message));
}

export function logDebug(message) {
  console.log(chalk.gray("🐛 " + message));
}

export function logTest(message) {
  console.log(chalk.magenta("🧪 " + message));
}

export function logDone(message) {
  console.log(chalk.green("✔️ " + message));
}
