import { createHash, randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { parseArgs } from "node:util";

import { createServer } from "../src";

const args = parseArgs({
  options: {
    username: { type: "string", short: "u" },
    password: { type: "string", short: "p" },
    port: { type: "string", short: "P", default: "1080" },
    hostname: { type: "string", short: "H", default: "0.0.0.0" },
    noAuth: { type: "boolean" },
  },
});

function getDefaultPassword() {
  const source = join(homedir(), ".socksup-password");
  if (existsSync(source)) {
    return readFileSync(source).toString();
  }

  const hash = createHash("sha256").update(randomBytes(32)).digest("hex");
  writeFileSync(source, hash);
  return hash;
}

const username = args.values.username || "default";
const password = args.values.password || getDefaultPassword();
const port = Number(args.values.port) || 1080;
const hostname = args.values.hostname;

const server = createServer({
  auth: args.values.noAuth
    ? undefined
    : {
        username,
        password,
      },
});

server.listen(port, hostname, () => {
  console.info(`Socks server is listening on ${hostname}:${port}`);
  if (!args.values.noAuth) {
    console.info(`Username: ${username}`);
    console.info(`Password: ${password}`);
  }
});
