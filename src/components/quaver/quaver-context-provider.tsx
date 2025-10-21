"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    useEffect,
    type ReactNode,
} from "react";

const QUAVER_USER_ENDPOINT = "https://api.quavergame.com/v2/user/52916";
const QUAVER_BEST_SCORES_ENDPOINT =
    "https://api.quavergame.com/v2/user/52916/scores/1/best?page=0";
const QUAVER_RANK_HISTORY_ENDPOINT =
    "https://api.quavergame.com/v1/users/graph/rank?id=52916&mode=1";

interface QuaverRanks {
    global: number;
    country: number;
    total_hits: number;
}

interface QuaverStats {
    ranks: QuaverRanks;
    total_score: number;
    ranked_score: number;
    overall_accuracy: number;
    overall_performance_rating: number;
    play_count: number;
    fail_count: number;
    max_combo: number;
    total_marvelous: number;
    total_perfect: number;
    total_great: number;
    total_good: number;
    total_okay: number;
    total_miss: number;
    count_grade_x: number;
    count_grade_ss: number;
    count_grade_s: number;
    count_grade_a: number;
    count_grade_b: number;
    count_grade_c: number;
    count_grade_d: number;
}

interface QuaverUser {
    id: number;
    steam_id: string;
    username: string;
    time_registered: string;
    allowed: boolean;
    privileges: number;
    usergroups: number;
    latest_activity: string | null;
    country: string;
    avatar_url: string;
    discord_id: string | null;
    misc_information: {
        discord?: string;
        twitter?: string;
        default_mode?: number;
    };
    stats_keys4: QuaverStats;
    stats_keys7: QuaverStats;
}

interface QuaverMap {
    id: number;
    mapset_id: number;
    md5: string;
    creator_id: number;
    creator_username: string;
    game_mode: number;
    ranked_status: number;
    artist: string;
    title: string;
    source: string;
    difficulty_name: string;
    length: number;
    bpm: number;
    difficulty_rating: number;
    count_hitobject_normal: number;
    count_hitobject_long: number;
    long_note_percentage: number;
    max_combo: number;
}

interface QuaverScore {
    id: number;
    user_id: number;
    map_md5: string;
    replay_md5: string;
    mode: number;
    timestamp: string;
    is_personal_best: boolean;
    performance_rating: number;
    modifiers: number;
    failed: boolean;
    total_score: number;
    accuracy: number;
    max_combo: number;
    count_marvelous: number;
    count_perfect: number;
    count_great: number;
    count_good: number;
    count_okay: number;
    count_miss: number;
    grade: string;
    scroll_speed: number;
    is_donator_score: boolean;
    tournament_game_id: number;
    clan_id: number | null;
    map: QuaverMap;
}

interface QuaverUserResponse {
    user: QuaverUser;
}

interface QuaverBestScoresResponse {
    scores: QuaverScore[];
}

interface QuaverRankStatistic {
    rank: number;
    timestamp: string;
}

interface QuaverRankHistoryResponse {
    status: number;
    statistics: QuaverRankStatistic[];
}

type QuaverContextValue = {
    user: QuaverUser | null;
    bestScores: QuaverScore[];
    rankHistory: QuaverRankStatistic[];
    isLoading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
};

const QuaverContext = createContext<QuaverContextValue | null>(null);

async function fetchJson<T>(
    input: RequestInfo | URL,
    init?: RequestInit,
): Promise<T> {
    const response = await fetch(input, {
        cache: "no-store",
        ...init,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${response.url}: ${response.status}`);
    }

    return response.json() as Promise<T>;
}

export function QuaverContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<QuaverUser | null>(null);
    const [bestScores, setBestScores] = useState<QuaverScore[]>([]);
    const [rankHistory, setRankHistory] = useState<QuaverRankStatistic[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (signal?: AbortSignal) => {
        setIsLoading(true);
        setError(null);

        try {
            const [userResponse, bestScoresResponse, rankHistoryResponse] =
                await Promise.all([
                    fetchJson<QuaverUserResponse>(QUAVER_USER_ENDPOINT, {
                        signal,
                    }),
                    fetchJson<QuaverBestScoresResponse>(
                        QUAVER_BEST_SCORES_ENDPOINT,
                        {
                            signal,
                        },
                    ),
                    fetchJson<QuaverRankHistoryResponse>(
                        QUAVER_RANK_HISTORY_ENDPOINT,
                        {
                            signal,
                        },
                    ),
                ]);

            setUser(userResponse.user);
            setBestScores(bestScoresResponse.scores ?? []);
            setRankHistory(
                rankHistoryResponse.statistics
                    ?.filter(({ rank }) => Number.isFinite(rank))
                    .sort(
                        (a, b) =>
                            new Date(a.timestamp).getTime() -
                            new Date(b.timestamp).getTime(),
                    ) ?? [],
            );
        } catch (err) {
            if ((err as Error).name === "AbortError") {
                return;
            }

            setError((err as Error)?.message ?? "Failed to fetch Quaver data");
            setUser(null);
            setBestScores([]);
            setRankHistory([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const refresh = useCallback(async () => {
        const controller = new AbortController();
        try {
            await fetchData(controller.signal);
        } finally {
            controller.abort();
        }
    }, [fetchData]);

    useEffect(() => {
        const controller = new AbortController();

        fetchData(controller.signal);

        return () => {
            controller.abort();
        };
    }, [fetchData]);

    const contextValue = useMemo<QuaverContextValue>(
        () => ({ user, bestScores, rankHistory, isLoading, error, refresh }),
        [user, bestScores, rankHistory, isLoading, error, refresh],
    );

    return (
        <QuaverContext.Provider value={contextValue}>
            {children}
        </QuaverContext.Provider>
    );
}

export function useQuaverContext() {
    const context = useContext(QuaverContext);

    if (context === null) {
        throw new Error(
            "useQuaverContext must be used within a QuaverContextProvider",
        );
    }

    return context;
}

export type {
    QuaverUser,
    QuaverScore,
    QuaverMap,
    QuaverStats,
    QuaverRankStatistic,
};
