"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import {cn} from "@/lib/utils"

interface StarRatingProps{
    value:number
    onChange?:(rating:number)=>void
    readonly?:boolean
    size?: "sm"|"md"|"lg"
}

export function StarRating({value, onChange,readonly=false, size="md"}:StarRatingProps){
    const [hovered, setHovered] = useState<number|null>(null)

    const iconSizes={
        sm:"w-3.5 h-3.5",
        md:"w-5 h-5",
        lg:"w-7 h-7"
    }

    return(
        <div className="flex items-center gap-1">
            {[1,2,3,4,5].map((star)=>{
                const isFilled = (hovered!==null ? hovered:value)>=star
                return(
                    <button key={star} type="button" disabled={readonly} onClick={()=>onChange?.(star)}
                    onMouseEnter={()=>!readonly && setHovered(star)}
                    onMouseLeave={()=>!readonly && setHovered(null)}
                    className={cn(
                        "transition-all transform duration-150 focus:outline-none",
                        !readonly && "hover:scale-125 cursor-pointer active:scale-95",
                        readonly && "cursor-default"
                    )}>
                        <Star className={cn(
                            iconSizes[size],
                            isFilled?"fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                            :"text-slate-300 dark:text-slate-700 fill-transparent"
                        )}></Star>
                    
                    </button>
                )
            })}
        </div>
    )
}