"use client";

import { useState } from "react";
import { searchBooks, Book } from "@/lib/books";
import { Search, Loader2, Star, BookOpenCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function Home(){
  const [query, setQuery] = useState("")
  const [books, setbooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async(e:React.FormEvent)=>{
    e.preventDefault()
    if(!query.trim()) return

    setLoading(true)
    setHasSearched(true)
    const results = await searchBooks(query)
    setbooks(results)
    setLoading(false)
  }

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Kitaab Sathi</h1>
        <p className="text-slate-600 dark:text-slate-400 tex">
          Where you can build your reading list...
        </p>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-md max-auto pt-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2 h-4 w-4 text-slate-400"></Search>
            <Input type="text" placeholder="Search by title,author,genre..." value={query} onChange={(e)=>setQuery(e.target.value)} className="pl-12"></Input>
          </div>

          <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            {loading ? <Loader2 className="h-4 w-4 animate-spin"></Loader2>: "Search"}
          </Button>
        </form>
      </div>

      {loading? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-6 pt-4">
          {[...Array(8)].map((_,i)=>(
            <div key={i} className="h-72 bg-slate-200 dark:bg-slate-800 rounded-lg animte-pulse"></div>
          ))}
        </div>
      ): hasSearched && books.length ===0?(
        <div className="text-center py-16 text-slate-500">
          <BookOpenCheck className="w-12 h-12 mx-auto mb-3 opacity-40"></BookOpenCheck>
          <p className="text-lg font-medium">No books found matching &quot;{query}&qout;</p>
          <p className="text-sm">Try searching for something else...</p>
        </div>
      )
      :(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book)=>{
            const coverUrl = book.cover_i?`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`: "https://via.placeholder.com/150x220?text=No+Cover"
          
          return (
            <Card key={book.key} className="flex flex-col justify-between overflow-hidden hover:shadow-lg transition-shadow">
            <div>
              <div className="h-48 w-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                <img src={coverUrl} alt={book.title} className="h-full object-contain py-2"></img>
              </div>

              <CardHeader className="p-4 pb-2">
                <h3 className="font-semi-bold text-base line-clamp-1">{book.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {book.author_name ? book.author_name.join(","):"Unknown Author"}
                </p>
              </CardHeader>
            </div>
            
            <CardFooter className="p-4 pt-0 flex-justify-between items-center text-xs text-slate-500">
              <span>{book.publication_year || "N/A"}</span>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                View & Review
              </Button>
            </CardFooter>

            </Card>
          )
          })}
        </div>
      )}
    </div>
  )
}