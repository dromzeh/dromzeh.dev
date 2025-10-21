"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useQuaverContext } from "./quaver-context-provider";
import { ScoreCard } from "./score-card";

const MAX_BEST_SCORES = 10;

export function QuaverBestScores() {
    const { bestScores, isLoading, error } = useQuaverContext();

    if (error) {
        return (
            <Card className="border-destructive/40 bg-destructive/5 text-destructive">
                <CardContent className="py-6 text-sm">
                    Failed to load scores: {error}
                </CardContent>
            </Card>
        );
    }

    const scores = bestScores.slice(0, MAX_BEST_SCORES);

    return (
        <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
                Top Scores
            </h3>
            <div className="grid gap-6 w-full">
                {isLoading && scores.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        Loading scores…
                    </p>
                ) : scores.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No scores available yet.
                    </p>
                ) : (
                    scores.map((score) => (
                        <ScoreCard key={score.id} score={score} />
                    ))
                )}
            </div>
        </div>
    );
}
