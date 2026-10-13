"use client"

import React, { useState, useEffect } from "react"
import { Book } from "@/lib/books"
import { fetchAllReviews, fetchBookReview, saveReviewToDB } from "@/lib/reviews"
import { StarRating } from "./StarRating"
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import { MessageSquare, Sparkles, User, Calendar, Send, CheckCircle2, Loader2 } from "lucide-react"
import { Review } from "@/lib/reviews"

interface BookDetailModalProps{
    book:Book|null
    isOpen:boolean
    onClose:()=>void
    onReviewAdded?:()=>void
}

export function BookDetailMode({book, isOpen, onClose, onReviewAdded}:BookDetailModalProps){
    const [reviews, setReviews] = useState<Review[]>([])
    const [loadingReview, setLoadingReview] = useState(false)
    const [rating, setRating] = useState<number>(5)
    const [comment, setComment] = useState("")
    const [reviewerName, setReviewerName] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    useEffect(()=>{
        if(book && isOpen){
            loadReviews(book.key)
            setSubmitted(false)
        }
    }, [book, isOpen])

    const loadReviews = async(bookKey:string)=>{
        setLoadingReview(true)
        const data = await fetchBookReview(bookKey)
        setReviews(data)
        setLoadingReview(false)
    }

    if(!book) return null

    const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : "https://via.placeholder.com/200x300?text=No+Cover"

    const totalReviews = reviews.length
    const avgRating = totalReviews>0
    ? Number((reviews.reduce((acc,r)=>acc+r.rating,0)/totalReviews).toFixed(1))
    : 0

    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault()
        if(!comment.trim()||rating===0) return

        setSubmitting(true)
        try{
            await saveReviewToDB({
                book_key:book.key,
                book_title:book.title,
                author_name:book.author_name?.join(","),
                book_cover:book.cover_i,
                rating,
                comment,
                reviewer_name:reviewerName.trim() || "Guest Reader",
            })

            await loadReviews(book.key)
            setComment("")
            setRating(5)
            setSubmitted(true)
            onReviewAdded?.()

            setTimeout(()=> setSubmitted(false),3000)
        }
        catch(error){
            console.log("Failed to submit the review: ", error)
        }
        finally{
            setSubmitting(false)
        }
    }

    return(
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-0">
                <DialogHeader className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <DialogTitle className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-500"></Sparkles>
                        Book Overview
                    </DialogTitle>
                </DialogHeader>

                <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-5 flex flex-col items-center text-center space-y-4">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                            <img src={coverUrl} alt={book.title} className="relative rounded-lg shadow-xl w-48 h-68 object-cover border border-slate-200 dark:border-slate-800" />                
                        </div>

                        <div>
                            <h2 className="text-xl font-bold leading-snug">
                                {book.title}
                            </h2>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                                {book.author_name?book.author_name.join(","):"Unknown Author"}
                            </p>
                        </div>

                        
                    </div>
                </div>

            </DialogContent>
        </Dialog> 
    )
} 