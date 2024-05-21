// import MillionLint from "@million/lint";
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
    rsc: true,
};

// export default MillionLint.next(millionConfig)(nextConfig);

export default million.next(nextConfig, millionConfig);
