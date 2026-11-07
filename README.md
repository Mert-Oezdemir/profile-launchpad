# Profile Launchpad

Draft a GitHub profile README in the browser. Preview your name, introduction, selected work and optional website as you type. Copy the Markdown or download `README.md`.

Open `index.html` in a modern browser. No installation, account sign-in, or API access is needed. The app leaves publication to you. GitHub displays a profile README when you put it in a public repository that shares your username.

This project takes its broad profile README idea from [the YildizDikme profile repository](https://github.com/YildizDikme/yildizdikme). The editor, design, and output format were written independently. The upstream author's profile text, images, and personal details are absent.

## Local server and agent connection

Install Node 22 or newer and Git. From this repository run:

```sh
npm ci
npm start
```

Open the loopback URL printed by the command. The runtime is pinned to a specific revision of [Project Agent Bridge](https://github.com/Mert-Oezdemir/project-agent-bridge).

To connect an MCP-compatible agent, run `npm run mcp:config --silent` and add its `mcpServers` entry to your host. Run `npm run doctor` to see local project and account configuration.

Chrome or Edge is needed for agent browser controls. You can set `CHROME` in `.env`, or run `npx playwright install chromium` to install a browser.

Copy `.env.example` to `.env` before adding account settings. Keep `.env` local. Restart the runtime after changing it.
