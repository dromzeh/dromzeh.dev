"use client";

import { Song } from "~/types/music";
import { SongItem } from "./music-item";

interface MusicContainerProps {
    music?: Song[];
}

export function MusicContainer({
    music = [
        {
            title: "Color Your Night",
            artist: "ATLUS GAME MUSIC",
            url: "https://open.spotify.com/track/4pjFNyjGaoKgLTnndISP6V",
            coverArtUrl:
                "https://i.scdn.co/image/ab67616d0000b273e59bdb7ca29ddfcb23ec4bf6",
        },
        {
            title: "Locals (Girls like us)",
            artist: "underscores, gabby start",
            url: "https://open.spotify.com/track/0MK6lVnmhVulpP62vkZBWV",
            coverArtUrl:
                "https://i.scdn.co/image/ab67616d0000b27347b648a27c23040d19a045e9",
        },
        {
            title: "Under Your Spell",
            artist: "Snow Strippers",
            url: "https://open.spotify.com/track/3iRoXGFrF8O0jTul6LAmus",
            // the actual cover art for this is somewhat suggestive, so using the artist image instead
            coverArtUrl:
                "https://i.scdn.co/image/ab6761610000f1782949c67f381d533010389d6a",
        },
        {
            title: "Swinging in His Cell",
            artist: "Sewerslvt",
            url: "https://open.spotify.com/track/0lrLj6Uu6niiOezZbsDoS6",
            coverArtUrl:
                "https://i.scdn.co/image/ab67616d0000b273647e8069c98c7b23b6c80648",
        },
        {
            title: "Damone (MX Hidden)",
            artist: "Deftones",
            url: "https://open.spotify.com/track/0CSZ1DMvRZH0WLB5V0WSom",
            coverArtUrl:
                "https://i.scdn.co/image/ab67616d0000b2730b1129853982ea17845d4eb6",
        },
        {
            title: "黒キ桜ハ愛∴其ノ死ヲ乞ウ",
            artist: "Imperial Circus Dead Decadence",
            url: "https://open.spotify.com/track/1le8OhLHXTdOdb0rLCydtq",
            coverArtUrl:
                "https://i.scdn.co/image/ab67616d0000b273b7b55d090d6b465130691a73",
        },
        {
            title: "Altars of Apostasy",
            artist: "Heaven Pierce Her",
            url: "https://open.spotify.com/track/3TcArgDnTVihS8I1FHF0ns",
            coverArtUrl:
                "https://i.scdn.co/image/ab67616d0000b273ad6359a4ef56eefa9be4b5f3",
        },
        {
            title: "Screaming",
            artist: "Loathe",
            url: "https://open.spotify.com/track/611WshW3yQKLCQ2pTCOii4",
            coverArtUrl:
                "https://i.scdn.co/image/ab67616d0000b273101232ffd5af0e3c37e2c528",
        },
    ],
}: MusicContainerProps) {
    return (
        <div>
            <h2 className="text-foreground font-bold text-lg mb-2">
                Favourite Tracks
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {music?.map((song: Song) => (
                    <SongItem key={song.title} {...song} />
                ))}
            </div>
        </div>
    );
}
