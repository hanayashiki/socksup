# Socksup

<div style="text-align: center">
  Use `npx socksup` to spin up a socks5 proxy server immediately.
</div>

<br />

<div style="text-align: center">
  <img src="Logo.png">
</div>

## Running

For NPM users:

```bash
npx socksup
```

For PNPM Users:

```bash
pnpx socksup
```

```
Socks server is listening on 0.0.0.0:1080
Username: <Username>
Password: <Password>
```

## Options

```
--username, -u // The username to the server. By default, "default"
--password, -p // The password to the client. By default, a random 32 byte hex value stored at your home.
--port, -P     // The listening port. By default, "1080"
--hostname, -H // The listening hostname. By default, "0.0.0.0"
--noAuth       // Dangerously disable authentication.
```

## Contributing

To install all dependencies, with pnpm installed, run

```
pnpm install
```

To develop the script using unbundled TypeScript, run

```
pnpm dev
```

To build the bundle, run

```
pnpm build
```

## Attributions

This codebase is mostly copied from https://github.com/PondWader/node-socks5-server.

This script is mostly a CLI wrapper on it.
