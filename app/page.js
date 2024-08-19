"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';

import { toast } from 'sonner';

export default function Home() {
  const [query, setQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (query === '') {
      toast.warning("Missing requirements", {
        description: "The search field cannot be empty"
      })
      setIsSubmitting(false);
    } else {
      router.push(`/query/${query}`);
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[400px] h-fit p-5 rounded-md border border-1 ring-neutral-500">
        <p className="text-sm mb-1 text-neutral-400">Amberly</p>
        <p className="text-2xl font-bold tracking-1 mb-5">Type your search below</p>
        <form onSubmit={handleSubmit}>
          <Input placeholder="What should we watch today?" className="mb-3" disabled={isSubmitting} value={query} onChange={(event) => { setQuery(event.target.value) }}></Input>
          <Button className="w-full" size="sm" disabled={isSubmitting}>Search</Button>
        </form>
      </div>
    </div>
  )
}