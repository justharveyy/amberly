"use client"

import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Watch({params}) {
    const reqParams = useSearchParams();
    const [movieValid, setMovieValid] = useState(false);
    let url;

    if (reqParams.get('src') === 'vidsrc') {
        url = `https://vidsrc.xyz/embed/movie/${params.imdbId}`;
    }
    return (
        <div className="h-full w-full pt-10 pr-5 pl-5 pb-10">
            <div className="h-full w-full m-auto">
                <div className="mb-5">
                    <a href="/" className="px-2 py-1.5 bg-white text-black rounded-md">Return to main page</a>
                </div>
                <iframe src={url} className="w-full lg:h-[800px] md:h-[400px] h-[300px]"></iframe>
            </div>
        </div>
    )
}