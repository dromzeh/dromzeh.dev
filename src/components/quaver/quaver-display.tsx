"use client";

import { QuaverContextProvider } from "./quaver-context-provider";
import { QuaverBestScores } from "./quaver-best-scores";
import { QuaverRankChart } from "./quaver-rank-chart";
import { QuaverUserSummary } from "./quaver-user-summary";

export function QuaverDisplay() {
    return (
        <QuaverContextProvider>
            <div className="space-y-8">
                <QuaverUserSummary />
                <QuaverRankChart />
                <QuaverBestScores />
            </div>
        </QuaverContextProvider>
    );
}
