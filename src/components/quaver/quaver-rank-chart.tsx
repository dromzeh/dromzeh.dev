"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "~/components/ui/chart";
import { useQuaverContext } from "./quaver-context-provider";

const chartConfig = {
    rank: {
        label: "Global Rank",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

const formatTick = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
    });
};

const formatTooltipValue = (value: number | string) => {
    if (typeof value !== "number") {
        return value;
    }
    return `#${value.toLocaleString()}`;
};

export function QuaverRankChart() {
    const { user, rankHistory, isLoading, error } = useQuaverContext();

    const defaultMode = user?.misc_information?.default_mode;
    const statsForMode =
        defaultMode === 2
            ? (user?.stats_keys7 ?? user?.stats_keys4)
            : (user?.stats_keys4 ?? user?.stats_keys7);
    const currentGlobalRank = statsForMode?.ranks?.global;

    const historicalData = rankHistory.map((entry) => ({
        timestamp: entry.timestamp,
        rank: entry.rank,
    }));

    const data = [...historicalData];
    if (currentGlobalRank !== undefined && user) {
        const latestHistoricalTimestamp =
            historicalData.length > 0
                ? new Date(
                      historicalData[historicalData.length - 1].timestamp,
                  ).getTime()
                : 0;
        const currentTimestamp = new Date().toISOString();

        if (new Date(currentTimestamp).getTime() > latestHistoricalTimestamp) {
            data.push({
                timestamp: currentTimestamp,
                rank: currentGlobalRank,
            });
        }
    }

    const ranks = data
        .map((entry) => entry.rank)
        .filter((rank): rank is number => Number.isFinite(rank));

    const bestRank = ranks.length > 0 ? Math.min(...ranks) : undefined;
    const worstRank = ranks.length > 0 ? Math.max(...ranks) : undefined;

    const anchorRankCandidates = [bestRank, currentGlobalRank].filter(
        (value): value is number => value !== undefined,
    );
    const anchorRank =
        anchorRankCandidates.length > 0
            ? Math.min(...anchorRankCandidates)
            : undefined;

    const paddedTop =
        anchorRank !== undefined ? Math.max(1, anchorRank - 100) : undefined;
    const roundedTop =
        paddedTop !== undefined
            ? Math.max(1, Math.floor(paddedTop / 100) * 100)
            : undefined;
    const roundedBottom =
        worstRank !== undefined ? Math.ceil(worstRank / 100) * 100 : undefined;

    let rankDomain: [number, number] | undefined;
    let rankTicks: number[] | undefined;

    if (roundedTop !== undefined && roundedBottom !== undefined) {
        const top = Math.max(1, roundedTop);
        let bottom = Math.max(top, roundedBottom);

        if (bottom === top) {
            bottom = top + 100;
        }

        rankDomain = [bottom, top];

        const ticks: number[] = [];
        for (let tick = top; tick <= bottom; tick += 100) {
            ticks.push(tick);
        }

        rankTicks = ticks;
    }

    return (
        <div className="w-full">
            <h3 className="text-lg font-semibold text-foreground mb-1">
                Rank Progression
            </h3>
            {error ? (
                <p className="text-sm text-destructive">
                    Failed to load rank data :(
                </p>
            ) : data.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    {isLoading
                        ? "Loading rank data…"
                        : "No rank history available."}
                </p>
            ) : (
                <ChartContainer config={chartConfig} className="h-64 w-full">
                    <AreaChart
                        data={data}
                        margin={{ left: 0, right: 12, top: 12, bottom: 12 }}
                    >
                        <defs>
                            <linearGradient
                                id="rank-gradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop offset="0%" stopOpacity={0.4} />
                                <stop offset="100%" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="timestamp"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={formatTick}
                        />
                        <YAxis
                            dataKey="rank"
                            tickLine={false}
                            axisLine={false}
                            width={60}
                            tickFormatter={(value) =>
                                `#${value.toLocaleString()}`
                            }
                            ticks={rankTicks}
                            domain={rankDomain}
                            reversed
                        />
                        <ChartTooltip
                            cursor={{ strokeDasharray: "3 3" }}
                            content={
                                <ChartTooltipContent
                                    indicator="dot"
                                    hideLabel
                                    formatter={(value) => [
                                        formatTooltipValue(value as number),
                                    ]}
                                />
                            }
                        />
                        <Area
                            dataKey="rank"
                            type="monotone"
                            fill="url(#rank-gradient)"
                            stroke="#86efac"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ChartContainer>
            )}
        </div>
    );
}
