import { supabase } from "./supabase"

export interface Review{
    id:string,
    bookKey:string,
    bookTitle:string,
    bookCover?:number,
    authorName?:string,
    rating:number,
    comment:string,
    reviewerName:string,
    createdAt:string,
}

export async function fetchAllReviews(){
    const {data, error} = await supabase.from("reviews").select("*").order("created_at", {ascending:false})
    if(error){
        console.error("Error fetching reviews from database: ",error)
        return []
    }
    return data || []
}

export async function fetchBookReview(bookKey:string){
    const {data, error} = await supabase.from("reviews").select("*").eq("book_key", bookKey).order("created_at", {ascending:false})

    if(error){
        console.log("Error fetching book review: ", error)
        return []
    }
    return data || []
}

export async function saveReviewToDB(review:Review){
    const {data, error}=await supabase.from("reviews").insert([review]).select().single()
    if(error){
        console.log("Error saving review: ",error)
        throw error
    }
    return data
}