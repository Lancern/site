import { Octokit } from "octokit";

export type ActivityArray = Awaited<ReturnType<typeof listActivities>>;
export type Activity = ActivityArray[number];

export async function listActivities() {
  const octokit = new Octokit({
    auth: import.meta.env.GITHUB_TOKEN,
  });
  const octokitResponse = await octokit.rest.activity.listEventsForAuthenticatedUser({
    username: "Lancern",
    page: 1,
    per_page: 20,
  });
  const activities = octokitResponse.data;

  activities.sort((lhs, rhs) => {
    const lhsCreatedAt = lhs.created_at ? new Date(lhs.created_at) : new Date(0);
    const rhsCreatedAt = rhs.created_at ? new Date(rhs.created_at) : new Date(0);
    // We want to sort in creation time's descending order.
    return rhsCreatedAt.getTime() - lhsCreatedAt.getTime();
  });

  return activities;
}
