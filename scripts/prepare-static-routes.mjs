#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist", "client");
const index = path.join(output, "index.html");

const routes = [
  "registry",
  "runtime",
  "observe",
  "solutions",
  "security",
  "docs",
  "pricing",
  "company",
  "contact",
  "demo",
  "signin",
  "news/tiphub-allocation",
];

if (!existsSync(index)) throw new Error(`Missing Vite build output: ${index}`);

for (const route of routes) {
  const routeDirectory = path.join(output, route);
  mkdirSync(routeDirectory, { recursive: true });
  copyFileSync(index, path.join(routeDirectory, "index.html"));
}

console.log(`Prepared static entry points for ${routes.length} application routes.`);
