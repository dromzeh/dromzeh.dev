import million from "million/compiler";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "cdn.discordapp.com" },
            { hostname: "i.scdn.co" },
            { hostname: "cdn.marcel.best" },
        ],
        unoptimized: true,
    },
    reactStrictMode: true,
    swcMinify: true,
    output: "export",
};

const millionConfig = {
    auto: {
        rsc: true,
    },
    rsc: true,
};

export default million.next(nextConfig, millionConfig);
