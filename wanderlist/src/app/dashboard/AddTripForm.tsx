'use client'

import { useState, useRef, useEffect } from 'react'
import { addToBucketList } from "@/app/actions/bucket-list"
import Image from "next/image"

// 1. LOCAL IMAGES (Robust & Crash-Proof)
const SUGGESTIONS = [
  { 
    id: 1, 
    name: "Santorini", 
    country: "Greece", 
    image: "/places/santorini.jpg" 
  },
  { 
    id: 2, 
    name: "Kyoto", 
    country: "Japan", 
    image: "/places/kyoto.jpg" 
  },
  { 
    id: 3, 
    name: "Banff", 
    country: "Canada", 
    image: "/places/banff.jpg" 
  },
  { 
    id: 4, 
    name: "Amalfi Coast", 
    country: "Italy", 
    image: "/places/amalfi.jpg" 
  },
  { 
    id: 5, 
    name: "Petra", 
    country: "Jordan", 
    image: "/places/petra.jpg" 
  },
]

export default function AddTripForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [category, setCategory] = useState('DREAM')
  
  const [title, setTitle] = useState('')
  const [country, setCountry] = useState('')
  
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const options = [
    { value: 'DREAM', label: 'Dreaming (Someday)' },
    { value: 'PLANNED', label: 'Planning (Soon)' }
  ]

  const selectedLabel = options.find(opt => opt.value === category)?.label

  return (
    <section className="glass-card p-6 md:p-8 rounded-2xl animate-fade-in-up shadow-sm hover:shadow-md transition-shadow duration-500 overflow-hidden">
      
      <div className="flex justify-between items-end mb-6">
        <h2 className="font-serif text-xl text-forest">Add a New Adventure</h2>
        <span className="text-xs text-forest/40 uppercase tracking-widest hidden md:block">Inspired by the world</span>
      </div>

      {/* THE INSPIRATION RAIL */}
      <div className="mb-8 -mx-6 px-6 md:-mx-8 md:px-8 overflow-x-auto pb-4 scrollbar-hide flex gap-4">
        {SUGGESTIONS.map((place) => (
          <button
            key={place.id}
            type="button"
            onClick={() => {
              setTitle(place.name)
              setCountry(place.country)
            }}
            className="group relative flex-shrink-0 w-40 h-28 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all active:scale-95"
          >
            {/* Local Image Loading */}
            <Image 
               src={place.image} 
               alt={place.name}
               fill
               sizes="(max-width: 768px) 100vw, 33vw"
               className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            <div className="absolute bottom-2 left-3 text-left">
               <p className="text-white font-medium text-sm leading-tight">{place.name}</p>
               <p className="text-white/70 text-[10px] uppercase tracking-wide">{place.country}</p>
            </div>
          </button>
        ))}
      </div>
      
      <form action={addToBucketList} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input 
            name="title" 
            placeholder="Destination Name" 
            className="input-underline" 
            required 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input 
            name="country" 
            placeholder="Country" 
            className="input-underline" 
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-20">
          <div className="relative" ref={dropdownRef}>
            <input type="hidden" name="category" value={category} />

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="input-underline text-left flex justify-between items-center w-full cursor-pointer group"
            >
              <span className={category ? "text-forest" : "text-forest/40"}>
                {selectedLabel}
              </span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className={`w-4 h-4 text-forest/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-sand overflow-hidden animate-fade-in-up z-50">
                {options.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setCategory(option.value)
                      setIsOpen(false)
                    }}
                    className={`
                      px-4 py-3 cursor-pointer text-sm transition-colors
                      ${category === option.value ? 'bg-forest/5 text-forest font-medium' : 'text-forest/70 hover:bg-background hover:text-forest'}
                    `}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <input 
            name="notes" 
            placeholder="Why do you want to go?" 
            className="input-underline" 
          />
        </div>

        <div className="flex justify-end mt-4">
          <button className="bg-forest text-white px-8 py-3 rounded-full hover:bg-forest/90 transition-all shadow-lg hover:shadow-xl active:scale-95 text-sm font-medium tracking-wide">
            Add to List
          </button>
        </div>
      </form>
    </section>
  )
}