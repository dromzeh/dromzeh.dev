import million from "million/compiler";
// import { withHydrationOverlay } from "@builder.io/react-hydration-overlay/next"

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "cdn.discordapp.com" },
            { hostname: "i.scdn.co" },
        ],
    },
};

const millionConfig = {
    auto: true,
    // if you're using RSC:
    // auto: { rsc: true },
};

// export default withHydrationOverlay({
//     appRootSelector: "main",
// })(million.next(nextConfig, millionConfig));

export default million.next(nextConfig, millionConfig);
