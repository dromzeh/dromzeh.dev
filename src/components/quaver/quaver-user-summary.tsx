"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useQuaverContext } from "./quaver-context-provider";

export function QuaverUserSummary() {
    const { user, isLoading, error } = useQuaverContext();

    if (error) {
        return (
            <Card className="border-destructive/40 bg-destructive/5 text-destructive">
                <CardContent className="py-6 text-sm">
                    Failed to load Quaver profile: {error}
                </CardContent>
            </Card>
        );
    }

    if (isLoading && !user) {
        return (
            <Card>
                <CardContent className="py-6 text-sm text-muted-foreground">
                    Loading profile…
                </CardContent>
            </Card>
        );
    }

    if (!user) {
        return null;
    }

    const activeStats = user.stats_keys4 ?? user.stats_keys7;
    const globalRank = activeStats?.ranks?.global;
    const countryRank = activeStats?.ranks?.country;
    const performance = activeStats?.overall_performance_rating;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4 space-y-0">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-border/60">
                    <Image
                        src={user.avatar_url}
                        alt={`${user.username}'s avatar`}
                        fill
                        sizes="64px"
                        className="object-cover"
                    />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-foreground">
                        {user.username}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Registered{" "}
                        {new Date(user.time_registered).toLocaleDateString()}
                    </p>
                </div>
            </div>
            <div>
                <div className="flex flex-row gap-4">
                    <div className="rounded-lg border border-border/60 bg-muted/30 px-4 py-3 w-full">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Global Rank
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                            {globalRank
                                ? `#${globalRank.toLocaleString()}`
                                : "N/A"}
                        </p>
                    </div>
                    <div className="rounded-lg border border-border/60 bg-muted/30 px-4 py-3 w-full">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Country Rank
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                            {countryRank
                                ? `#${countryRank.toLocaleString()}`
                                : "N/A"}
                        </p>
                    </div>
                    <div className="rounded-lg border border-border/60 bg-muted/30 px-4 py-3 w-full">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Rating
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                            {performance ? performance.toFixed(2) : "N/A"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
