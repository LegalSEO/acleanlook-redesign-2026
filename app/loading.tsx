export default function Loading() {
  return (
    <div className="min-h-screen bg-background-light">
      {/* Hero skeleton */}
      <div className="bg-primary pt-32 pb-16">
        <div className="container-wide">
          <div className="h-4 w-48 bg-white/10 rounded-full mb-6 animate-pulse" />
          <div className="h-12 w-3/4 max-w-xl bg-white/10 rounded-xl mb-4 animate-pulse" />
          <div className="h-6 w-2/3 max-w-lg bg-white/10 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container-wide py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-white border border-gray-100 overflow-hidden"
            >
              <div className="h-40 bg-gray-100 animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-5 w-3/4 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-50 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-50 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
