export interface Book{
    key:string;
    title:string;
    author_name?:string[];
    cover_i?:number;
    publication_year?:number;
    subject?:string[];
}

export async function searchBooks(query:string){
    if(!query.trim()) return[];

    try{
        const response=await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
        const data=await response.json();
        return data.docs || [];
    }
    catch(error){
        console.error("Failed to fetch books: ", error);
        return [];
    }
}