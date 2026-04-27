type GitHubActor = {
  id: number;
  login: string;
  display_login?: string;
  gravatar_id: string;
  url: string;
  avatar_url: string;
};

type GitHubRepo = {
  id: number;
  name: string;
  url: string;
};

type GitHubOrg = {
  id: number;
  login: string;
  gravatar_id: string;
  url: string;
  avatar_url: string;
};

type GitHubUser = {
  login: string;
} & Record<string, unknown>;

type GitHubIssue = {
  number: number;
  title: string;
} & Record<string, unknown>;

type GitHubPullRequest = {
  number: number;
  title?: string | null;
  merged?: boolean;
} & Record<string, unknown>;

type GitHubRepositoryResource = {
  full_name: string;
} & Record<string, unknown>;

type GitHubRelease = {
  html_url: string;
  name: string | null;
  tag_name: string;
} & Record<string, unknown>;

type GitHubDiscussion = {
  html_url: string;
  title: string;
  number?: number;
} & Record<string, unknown>;

type BaseActivity<TType extends string, TPayload extends object> = {
  id: string;
  type: TType;
  actor: GitHubActor;
  repo: GitHubRepo;
  payload: TPayload;
  public: boolean;
  created_at: string;
  org?: GitHubOrg;
};

export type Activity =
  | BaseActivity<
      "CommitCommentEvent",
      {
        action: "created";
        comment: Record<string, unknown>;
      }
    >
  | BaseActivity<
      "CreateEvent",
      {
        ref: string | null;
        ref_type: "branch" | "tag" | "repository";
        full_ref: string;
        master_branch: string;
        description: string | null;
        pusher_type: string;
      }
    >
  | BaseActivity<
      "DeleteEvent",
      {
        ref: string;
        ref_type: "branch" | "tag";
        full_ref: string;
        pusher_type: string;
      }
    >
  | BaseActivity<
      "DiscussionEvent",
      {
        action: "created";
        discussion: GitHubDiscussion;
      }
    >
  | BaseActivity<
      "ForkEvent",
      {
        action: "forked";
        forkee: GitHubRepositoryResource;
      }
    >
  | BaseActivity<
      "GollumEvent",
      {
        pages: Array<{
          page_name: string;
          title: string;
          summary: string | null;
          action: "created" | "edited";
          sha: string;
          html_url: string;
        }>;
      }
    >
  | BaseActivity<
      "IssueCommentEvent",
      {
        action: "created";
        issue: GitHubIssue;
        comment: Record<string, unknown>;
      }
    >
  | BaseActivity<
      "IssuesEvent",
      {
        action: "opened" | "closed" | "reopened";
        issue: GitHubIssue;
        assignee?: GitHubUser;
        assignees?: GitHubUser[];
        label?: Record<string, unknown>;
        labels?: Array<Record<string, unknown>>;
      }
    >
  | BaseActivity<
      "MemberEvent",
      {
        action: "added";
        member: GitHubUser;
      }
    >
  | BaseActivity<"PublicEvent", Record<string, never>>
  | BaseActivity<
      "PullRequestEvent",
      {
        action:
          | "opened"
          | "closed"
          | "merged"
          | "reopened"
          | "assigned"
          | "unassigned"
          | "labeled"
          | "unlabeled";
        number: number;
        pull_request: GitHubPullRequest;
        assignee?: GitHubUser;
        assignees?: GitHubUser[];
        label?: Record<string, unknown>;
        labels?: Array<Record<string, unknown>>;
      }
    >
  | BaseActivity<
      "PullRequestReviewEvent",
      {
        action: "created" | "updated" | "dismissed";
        pull_request: GitHubPullRequest;
        review: Record<string, unknown>;
      }
    >
  | BaseActivity<
      "PullRequestReviewCommentEvent",
      {
        action: "created";
        pull_request: GitHubPullRequest;
        comment: Record<string, unknown>;
      }
    >
  | BaseActivity<
      "PushEvent",
      {
        repository_id: number;
        push_id: number;
        ref: string;
        head: string;
        before: string;
      }
    >
  | BaseActivity<
      "ReleaseEvent",
      {
        action: "published";
        release: GitHubRelease;
      }
    >
  | BaseActivity<
      "WatchEvent",
      {
        action: "started";
      }
    >;

export type ActivityArray = Activity[];
export type ActivityOf<TType extends Activity["type"]> = Extract<Activity, { type: TType }>;
