import million from "million/compiler";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.discordapp.com", "i.scdn.co"],
    },
};

const millionConfig = {
    auto: true,
    // if you're using RSC:
    // auto: { rsc: true },
};

export default million.next(nextConfig, millionConfig);
