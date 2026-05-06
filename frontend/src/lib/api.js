import { readFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = path.resolve(process.cwd(), "..");
const apiRoot = path.join(repoRoot, "content", "live", "api");

async function readJson(...parts) {
  const target = path.join(apiRoot, ...parts);
  const raw = await readFile(target, "utf8");
  return JSON.parse(raw);
}

function ensureArray(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (!value) {
    return [];
  }
  return [value];
}

export async function fetchHealth() {
  return {
    message: "Local snapshot mode",
    environment: "filesystem",
    version: "captured-content",
  };
}

export function fetchContentSummary() {
  return readJson("summary.json");
}

export async function fetchSettings() {
  return readJson("web-settings.json");
}

export async function fetchHomepage() {
  return readJson("homepage-data.json");
}

export async function fetchProperties() {
  return ensureArray(await readJson("properties", "all.json"));
}

export async function fetchProperty(slug) {
  const items = await fetchProperties();
  return items.find((item) => item.slug_id === slug) || null;
}

export async function fetchProjects() {
  return ensureArray(await readJson("projects", "all.json"));
}

export async function fetchProject(slug) {
  const items = await fetchProjects();
  return items.find((item) => item.slug_id === slug) || null;
}

export async function fetchArticles() {
  return ensureArray(await readJson("articles", "all.json"));
}

export async function fetchArticle(slug) {
  const items = await fetchArticles();
  return items.find((item) => item.slug_id === slug) || null;
}

export async function fetchAgents() {
  return ensureArray(await readJson("agents", "all.json"));
}

export async function fetchAgent(slug) {
  const items = await fetchAgents();
  return items.find((item) => item.slug_id === slug) || null;
}

export async function fetchServices() {
  return ensureArray(await readJson("services", "all.json"));
}

export async function fetchMedia() {
  return ensureArray(await readJson("media", "all.json"));
}
