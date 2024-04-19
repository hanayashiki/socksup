import { createHash } from "node:crypto";
import { statSync } from "node:fs";
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
  const createdAt = statSync(__filename).birthtimeMs;

  return createHash("sha256").update(createdAt.toString()).digest("hex");
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
