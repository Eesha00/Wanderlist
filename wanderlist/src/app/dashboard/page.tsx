import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import { markAsComplete, deleteItem } from "@/app/actions/bucket-list"
import AddTripForm from "./AddTripForm" // <--- IMPORT THE NEW COMPONENT

function Tab({ label, count, active, href }: { label: string, count: number, active?: boolean, href: string }) {
  return (
    <Link 
      href={href}
      className={`pb-2 text-sm font-medium transition-colors relative ${active ? 'text-forest' : 'text-forest/40 hover:text-forest/70'}`}
    >
      {label} <span className="text-xs opacity-60 ml-1">({count})</span>
      {active && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-clay rounded-full"></div>}
    </Link>
  )
}

export default async function Dashboard(props: { searchParams: Promise<{ filter?: string }> }) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const params = await props.searchParams;
  const filter = params?.filter || 'DREAM'

  const items = await db.bucketListItem.findMany({
    where: { 
      userId: session.user.id,
      category: filter.toUpperCase() as any 
    },
    orderBy: { createdAt: 'desc' }
  })

  const dreamCount = await db.bucketListItem.count({ where: { userId: session.user.id, category: 'DREAM' as any } })
  const planCount = await db.bucketListItem.count({ where: { userId: session.user.id, category: 'PLANNED' as any } })
  const doneCount = await db.bucketListItem.count({ where: { userId: session.user.id, category: 'COMPLETED' as any } })
  
  const totalTrips = dreamCount + planCount + doneCount
  const completionPercentage = totalTrips > 0 ? Math.round((doneCount / totalTrips) * 100) : 0

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-end border-b border-sand pb-6 gap-6">
          <div className="w-full md:w-auto">
            <h1 className="font-serif text-4xl md:text-5xl text-forest mb-2">My Wanderlist</h1>
            <div className="mt-4 max-w-xs">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-forest/50 mb-1.5 font-medium">
                    <span>World Explorer Level</span>
                    <span>{doneCount} of {totalTrips} Completed</span>
                </div>
                <div className="h-1.5 w-full bg-sand/30 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-forest transition-all duration-1000 ease-out rounded-full" 
                        style={{ width: `${completionPercentage}%` }}
                    />
                </div>
            </div>
          </div>

          <form action={async () => {
            'use server'
            const { signOut } = await import("@/lib/auth")
            await signOut({ redirectTo: "/" })
          }}>
            <button className="text-xs text-clay hover:underline uppercase tracking-widest mb-1">Sign Out</button>
          </form>
        </header>

        {/* REPLACED THE OLD FORM WITH THIS NEW CLIENT COMPONENT */}
        <AddTripForm />

        {/* Filter Tabs */}
        <div className="flex gap-8 border-b border-sand/50 pt-4">
           <Tab label="Dreaming" count={dreamCount} active={filter === 'DREAM'} href="/dashboard?filter=DREAM" />
           <Tab label="Planning" count={planCount} active={filter === 'PLANNED'} href="/dashboard?filter=PLANNED" />
           <Tab label="Journal" count={doneCount} active={filter === 'COMPLETED'} href="/dashboard?filter=COMPLETED" />
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => {
            let cardStyle = "bg-white border-sand"
            if (item.category === 'PLANNED') cardStyle = "bg-[#FFFDF5] border-gold/30"
            if (item.category === 'COMPLETED') cardStyle = "bg-[#F0F7F4] border-forest/10 opacity-75 hover:opacity-100"

            return (
                <div 
                    key={item.id} 
                    className={`
                        group relative p-6 rounded-xl shadow-sm border hover:shadow-lg transition-all duration-500 hover:-translate-y-1 flex flex-col h-full animate-fade-in-up
                        ${cardStyle}
                    `}
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                
                <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-serif text-2xl ${item.isCompleted ? 'line-through text-forest/40' : 'text-forest'}`}>
                        {item.title}
                    </h3>
                    {item.category === 'PLANNED' && (
                        <span className="bg-gold/20 text-forest/80 text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-bold">Soon</span>
                    )}
                </div>
                
                <p className="text-xs text-forest/50 uppercase tracking-widest mb-4 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-clay/50"></span>
                    {item.country || "Unknown Location"}
                </p>
                
                {item.notes && (
                    <p className="text-forest/80 text-sm italic font-light mb-6 flex-grow leading-relaxed">
                        "{item.notes}"
                    </p>
                )}

                <div className="border-t border-black/5 my-4"></div>

                <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-auto translate-y-2 group-hover:translate-y-0">
                    {filter !== 'COMPLETED' && (
                        <form action={markAsComplete.bind(null, item.id)}>
                        <button className="text-xs font-bold text-forest hover:text-clay transition flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-forest/5">
                            <span className="text-lg leading-none">✓</span> MARK VISITED
                        </button>
                        </form>
                    )}
                    <form action={deleteItem.bind(null, item.id)} className="ml-auto">
                        <button className="text-forest/30 hover:text-red-500 transition text-xs uppercase tracking-wider px-2 py-1">
                            Delete
                        </button>
                    </form>
                </div>
                </div>
            )
          })}
        </div>
        
        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-20 opacity-60 animate-fade-in-up">
            <div className="text-4xl mb-4 grayscale opacity-50">🏔️</div>
            <p className="font-serif text-xl text-forest/60">
              {filter === 'COMPLETED' ? "Your journal is waiting for its first story." : "Your list is empty."}
            </p>
            <p className="text-sm mt-2 text-forest/40">Add a destination above to begin.</p>
          </div>
        )}
      </div>
    </div>
  )
}