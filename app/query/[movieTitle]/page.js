"use client"

import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function MovieQuery({ params }) {
    const [resultsList, setResults] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await axios(
                    `https://v3.sg.media-imdb.com/suggestion/x/${params.movieTitle}.json?includeVideos=0`,
                    {
                        method: 'get'
                    }
                );
                const resultsImdbJson = res.data;
                const newResults = [];

                for (let i = 0; i < resultsImdbJson.d.length; i++) {
                    let current = resultsImdbJson.d[i];
                    if (current.id.startsWith("tt") && current.qid === "movie" && current.i != undefined) {
                        newResults.push({
                            movieName: current.l,
                            imdbId: current.id,
                            thumbnail: current.i.imageUrl,
                            height: current.i.height,
                            width: current.i.width,
                        });
                    }
                }

                setResults(newResults);
            } catch (error) {
                console.error(error)
                toast.error('Unable to reach IMDB\'s API. Reload the page to try again.');
            }
        };

        fetchResults();
    }, [params.movieTitle]); // Only runs when `params.movieTitle` changes

    return (
        <div className="w-full h-full p-5 container">
            <div className="mt-10 mb-10">
                <p className="tracking-tight text-2xl font-bold">Querying</p>
                <p className="text-sm text-neutral-500">Showing results for "{params.movieTitle.replace('%20', ' ')}"</p>
            </div>
            {resultsList.length === 0 && <p>Getting results...</p>}
            {resultsList.length !== 0 && (
                <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1">
                    {resultsList.map((movie, index) => (
                        <div key={index} className="w-full p-5">
                            <Image 
                                src={movie.thumbnail}
                                height={movie.height}
                                width={movie.width}
                                className="w-full h-auto mb-5"
                            />
                            <p className="text-lg font-semibold">{movie.movieName}</p>
                            <p className="text-sm text-neutral-500 mb-5">{movie.imdbId}</p>
                            <p className="text-sm text-neutral-500 mb-3">Select a source to watch</p>
                            <a href={`/watch/${movie.imdbId}?src=vidsrc`} className="py-1.5 px-2 bg-indigo-600 rounded hover:bg-indigo-700">VidSrc</a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
