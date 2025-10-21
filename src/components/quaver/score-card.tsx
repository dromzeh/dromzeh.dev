"use client";

import { formatDistanceToNow } from "date-fns";
import type { QuaverScore } from "./quaver-context-provider";
import Link from "next/link";

function formatAccuracy(accuracy: number) {
    return `${accuracy.toFixed(2)}%`;
}

function formatPerformance(performance: number) {
    return `${performance.toFixed(2)} PR`; // Performance rating shorthand
}

function formatTimestamp(timestamp: string) {
    try {
        const date = new Date(timestamp);
        if (Number.isNaN(date.getTime())) {
            return "Unknown date";
        }
        return `${formatDistanceToNow(date, {
            addSuffix: true,
        })}`;
    } catch {
        return timestamp;
    }
}

type ScoreCardProps = {
    score: QuaverScore;
};

export function ScoreCard({ score }: ScoreCardProps) {
    const {
        map,
        accuracy,
        performance_rating,
        grade,
        timestamp,
        total_score,
        max_combo,
    } = score;

    const formattedAccuracy = formatAccuracy(accuracy);
    const formattedPerformance = formatPerformance(performance_rating);
    const formattedTimestamp = formatTimestamp(timestamp);

    const backgroundImageUrl = `https://cdn.quavergame.com/mapsets/${map.mapset_id}.jpg`;

    return (
        <div>
            <Link
                href={`https://quavergame.com/mapset/map/${map.id}`}
                target="_blank"
            >
                <div className="border rounded-t-lg overflow-hidden relative group hover:cursor-pointer">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url(${backgroundImageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-md group-hover:bg-black/50 group-hover:backdrop-blur-sm transition-all duration-300" />
                    <div className="relative p-4">
                        <div className="pb-2">
                            <h3 className="text-base font-semibold text-white">
                                {map.title}
                                <span className="text-gray-300 block text-xs font-normal">
                                    {map.artist}
                                </span>
                            </h3>
                        </div>
                        <div className="grid gap-2">
                            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                                <span className="font-medium text-white">
                                    {map.difficulty_name}
                                </span>
                                <span className="text-white">
                                    {formattedTimestamp}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between p-4 bg-secondary/20 rounded-b-lg border border-t-0 font-semibold">
                    <span className="text-muted-foreground bg-secondary/40 rounded-lg px-2 py-1">
                        {formattedAccuracy}
                    </span>
                    <span className="text-[#9d4edd] bg-[#9d4edd]/10 rounded-lg px-2 py-1">
                        {formattedPerformance}
                    </span>
                    <span className="text-muted-foreground bg-secondary/40 rounded-lg px-2 py-1">
                        {total_score.toLocaleString()}
                    </span>
                </div>
            </Link>
        </div>
    );
}
