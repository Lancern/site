#!/usr/bin/env python3

from argparse import ArgumentParser
from datetime import date as Date
import os
from pathlib import Path
import re
import sys


def main():
    args = _parse_args()

    if "handler" not in args:
        print("No subcommand specified.", file=sys.stderr)
        sys.exit(1)

    args.handler(args)


def _parse_args():
    parser = ArgumentParser(description="Site maintainance utilities")
    subparsers = parser.add_subparsers(help="subcommands")

    new_parser = subparsers.add_parser("new", help="Create a new post")
    new_parser.add_argument("-d", "--date", metavar="DATE", help="Post creation date")
    new_parser.add_argument(
        "--no-mdx",
        action="store_true",
        help="Create plain markdown post instead of MDX post",
    )
    new_parser.add_argument("slug", help="Post slug")
    new_parser.set_defaults(handler=_new)

    return parser.parse_args()


def _new(args):
    if "date" in args:
        try:
            date = Date.fromisoformat(args.date)
        except ValueError:
            print("Invalid date format", file=sys.stderr)
            sys.exit(1)
    else:
        date = Date.today()

    if len(args.slug) == 0:
        print("Post slug cannot be empty", file=sys.stderr)
        sys.exit(1)

    if re.fullmatch(r"[a-zA-Z0-9-]+", args.slug) is None:
        print("Post slug can only contain English letters, digits, and dashes")
        sys.exit(1)

    post_file_ext = ".md" if args.no_mdx else ".mdx"
    post_file_name = args.slug + post_file_ext
    post_path = Path(
        os.path.dirname(__file__),
        "src",
        "pages",
        "posts",
        "{:04d}".format(date.year),
        "{:02d}".format(date.month),
        post_file_name,
    )
    post_dir = post_path.parent

    if post_path.exists():
        print(
            f"A post with the same computed file path already exists: {post_path}",
            file=sys.stderr,
        )
        sys.exit(1)

    try:
        post_dir.mkdir(parents=True, exist_ok=True)
    except OSError as err:
        print(
            "Cannot create directory {}: {} ({})".format(
                post_dir, err.strerror, err.errno
            )
        )
        sys.exit(1)

    try:
        post_fp = open(post_path, "w")
    except OSError as err:
        print(
            "Cannot open post file {}: {} ({})".format(
                post_path, err.strerror, err.errno
            )
        )
        sys.exit(1)

    with post_fp:
        print("---", file=post_fp)
        print('layout: "@layouts/PostLayout.astro"', file=post_fp)
        print("title: {}".format(args.slug), file=post_fp)
        print(
            "date: {:%Y-%m-%d}".format(date),
            file=post_fp,
        )
        print("category:", file=post_fp)
        print("tags: []", file=post_fp)
        print("---", file=post_fp)

    print(f"Create at {post_path}")


main()
