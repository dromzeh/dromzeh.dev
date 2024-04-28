import million from "million/compiler";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "cdn.discordapp.com" },
            { hostname: "i.scdn.co" },
        ],
    },
    reactStrictMode: true,
    swcMinify: true,
};

const millionConfig = {
    auto: {
        rsc: true,
    },
    rsc: true,
};

export default million.next(nextConfig, millionConfig);
