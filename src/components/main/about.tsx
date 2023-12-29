"use client";
import Link from "next/link";

import * as React from "react";

// const ageDateTimestamp = 1156118401000;
// const fallBackAge = 17;

export function About() {
    return (
        <div>
            <h2 className="text-neutral-100 mb-2">About</h2>
            <div className="flex flex-col space-y-2">
                <p>
                    Hi, I&apos;m Marcel - a full-stack developer focused within
                    serverless computing and backend development.
                </p>
                <p>
                    I&apos;m the creator of{" "}
                    <Link
                        href="https://wanderer.moe/"
                        target="_blank"
                        className="text-neutral-100 hover:text-neutral-500 transition-all duration-150"
                    >
                        wanderer.moe
                    </Link>{" "}
                    - a site that hosts thousands of assets from various games
                    with ~300,000 monthly users. We&apos;re also{" "}
                    <Link
                        href="https://git.wanderer.moe/"
                        target="_blank"
                        className="text-neutral-100 hover:text-neutral-500 transition-all duration-150"
                    >
                        open-source
                    </Link>
                    .
                </p>
                <p>
                    All of my projects & contributions,{" "}
                    <Link
                        href="https://github.com/dromzeh/dromzeh.dev"
                        target="_blank"
                        className="text-neutral-100 hover:text-neutral-500 transition-all duration-150"
                    >
                        including this site
                    </Link>{" "}
                    are
                    {` `}
                    <Link
                        href="https://github.com/dromzeh"
                        target="_blank"
                        className="text-neutral-100 hover:text-neutral-500 transition-all duration-150"
                    >
                        available on GitHub
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}
