import { execa } from "execa";

const SUPPORTED = ["npm", "pnpm", "yarn", "bun"];

const FLAG_TO_PM = {
  "--use-npm": "npm",
  "--use-pnpm": "pnpm",
  "--use-yarn": "yarn",
  "--use-bun": "bun",
};

async function isAvailable(pm) {
  try {
    await execa(pm, ["--version"]);
    return true;
  } catch {
    return false;
  }
}

// Which package manager launched this CLI? (npx / pnpm dlx / yarn dlx / bunx all set this)
function fromUserAgent() {
  const ua = process.env.npm_config_user_agent || "";
  const name = ua.split(" ")[0]?.split("/")[0];
  return SUPPORTED.includes(name) ? name : null;
}

/**
 * Pick the package manager to use, in this order:
 *  1. explicit flag (--use-npm / --use-pnpm / --use-yarn / --use-bun)
 *  2. the package manager that launched the CLI (npx, pnpm dlx, yarn, bunx)
 *  3. npm (always shipped with Node), then any other one installed on the device
 */
export async function detectPackageManager(args = []) {
  const flag = args.find((a) => FLAG_TO_PM[a]);
  if (flag) {
    const pm = FLAG_TO_PM[flag];
    if (await isAvailable(pm)) return pm;
    throw new Error(`"${pm}" is not installed on this device.`);
  }

  const fromUA = fromUserAgent();
  if (fromUA && (await isAvailable(fromUA))) return fromUA;

  for (const pm of SUPPORTED) {
    if (await isAvailable(pm)) return pm;
  }

  throw new Error("No package manager found. Please install npm, pnpm, yarn or bun.");
}

// Command to run a package without installing it (npx / pnpm dlx / yarn dlx / bunx)
export function getExecCommand(pm, pkg, args = []) {
  switch (pm) {
    case "pnpm":
      return ["pnpm", ["dlx", pkg, ...args]];
    case "yarn":
      // npx works for both yarn classic and berry and ships with Node
      return ["npx", ["--yes", pkg, ...args]];
    case "bun":
      return ["bunx", [pkg, ...args]];
    default:
      return ["npx", ["--yes", pkg, ...args]];
  }
}

export function getAddCommand(pm, packages) {
  switch (pm) {
    case "npm":
      return ["npm", ["install", ...packages]];
    default:
      return [pm, ["add", ...packages]];
  }
}

export function getRunCommand(pm, script) {
  return [pm, ["run", script]];
}

export function getGlobalInstallHint(pm, pkgName) {
  switch (pm) {
    case "pnpm":
      return `pnpm add -g ${pkgName}@latest`;
    case "yarn":
      return `yarn global add ${pkgName}@latest`;
    case "bun":
      return `bun add -g ${pkgName}@latest`;
    default:
      return `npm install -g ${pkgName}@latest`;
  }
}

// Env for child processes so tools like create-expo-app install with the same package manager
export function pmEnv(pm) {
  return { ...process.env, npm_config_user_agent: `${pm}/0.0.0 node/${process.version}` };
}
