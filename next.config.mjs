/** @type {import('next').NextConfig} */
export default {
    images: {
        remotePatterns: [
            { hostname: "cdn.discordapp.com" },
            { hostname: "i.scdn.co" },
            { hostname: "cdn.marcel.best" },
        ],
        unoptimized: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    reactStrictMode: true,
    output: "export",
};

