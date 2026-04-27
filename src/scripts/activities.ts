import { Octokit } from "octokit";
import type { ActivityArray } from "@scripts/github-types";

export const GITHUB_API_VERSION = "2026-03-10";

export async function listActivities() {
  const auth = import.meta.env.GITHUB_TOKEN;
  const octokit = new Octokit({
    ...(auth ? { auth } : {}),
    request: {
      headers: {
        accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": GITHUB_API_VERSION,
      },
    },
  });
  const octokitResponse = await octokit.request("GET /users/{username}/events", {
    username: "Lancern",
    page: 1,
    per_page: 20,
  });
  const activities = octokitResponse.data as ActivityArray;

  activities.sort((lhs, rhs) => {
    const lhsCreatedAt = new Date(lhs.created_at);
    const rhsCreatedAt = new Date(rhs.created_at);
    // We want to sort in creation time's descending order.
    return rhsCreatedAt.getTime() - lhsCreatedAt.getTime();
  });

  return activities;
}
