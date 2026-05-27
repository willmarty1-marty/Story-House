import Link from "next/link";

export default function ListingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#fff", color: "#1a1a1a", fontFamily: "sans-serif" }}>
      {/* Nav */}
      <nav className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold" style={{ color: "#006AFF" }}>zillow</span>
          <span className="text-xs text-gray-400 ml-3 hidden sm:block">Demo Listing · Not a real property</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="cursor-pointer hover:text-gray-900">Buy</span>
          <span className="cursor-pointer hover:text-gray-900">Rent</span>
          <span className="cursor-pointer hover:text-gray-900">Sell</span>
          <div className="w-px h-4 bg-gray-200" />
          <Link href="/builder" className="hover:text-gray-900 transition-colors">Builder</Link>
          <Link href="/story" className="px-3 py-1.5 rounded text-xs font-semibold text-white hover:opacity-80 transition-opacity" style={{ background: "#B8960C" }}>Story →</Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-8">

        {/* Photo Grid */}
        <div className="grid grid-cols-4 grid-rows-2 gap-1.5 rounded-xl overflow-hidden" style={{ height: "440px" }}>
          {/* Main large photo */}
          <div className="col-span-2 row-span-2 relative">
            <img src="/demo/cover.png" alt="Front of home" className="w-full h-full object-cover" />
          </div>
          {/* Thumbnails */}
          <div className="relative">
            <img src="/demo/welcome-home.png" alt="Backyard" className="w-full h-full object-cover" />
          </div>
          <Link href="/story" className="relative flex flex-col items-center justify-center gap-3 group cursor-pointer overflow-hidden"
            style={{ background: "radial-gradient(ellipse at center, #2E2008 0%, #120D05 100%)" }}>
            {/* Subtle shimmer overlay on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)" }} />
            {/* Content */}
            <div className="relative flex flex-col items-center gap-2.5 px-4 text-center">
              <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.6)", fontFamily: "'Lora', serif", letterSpacing: "0.22em", fontSize: "9px" }}>
                Home Story
              </p>
              <div className="w-8 h-px" style={{ background: "rgba(212,175,55,0.35)" }} />
              <p className="font-bold leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#F0E0A0", fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)" }}>
                This home has<br />a deeper story.
              </p>
              <p className="text-xs leading-relaxed" style={{ fontFamily: "'Lora', serif", color: "rgba(220,200,150,0.55)", fontSize: "11px" }}>
                Explore the family's chapter-by-chapter account of life in this home.
              </p>
              <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all"
                style={{ color: "rgba(212,175,55,0.8)", fontFamily: "'Lora', serif" }}>
                <span>Read the Story</span>
                <span>→</span>
              </div>
            </div>
          </Link>
          <div className="relative">
            <img src="/demo/built-to-last-porch.png" alt="Screened porch" className="w-full h-full object-cover" />
          </div>
          <div className="relative">
            <img src="/demo/built-to-last-bath-after.png" alt="Bathroom" className="w-full h-full object-cover" />
            <button className="absolute bottom-3 right-3 bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm border border-gray-200 hover:bg-gray-50">
              See all photos
            </button>
          </div>
        </div>

        {/* Price + Details Row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="text-4xl font-bold text-gray-900">$460,000</div>
            <div className="flex items-center gap-3 mt-1 text-gray-700 text-sm">
              <span><strong className="text-gray-900">4</strong> bds</span>
              <span className="text-gray-300">|</span>
              <span><strong className="text-gray-900">3</strong> ba</span>
              <span className="text-gray-300">|</span>
              <span><strong className="text-gray-900">2,340</strong> sqft</span>
              <span className="text-gray-300">|</span>
              <span className="text-green-600 font-semibold">For Sale</span>
            </div>
            <div className="text-gray-500 text-sm mt-1">123 Maple Lane, Austin, TX 78701</div>
          </div>
          <div className="flex flex-col gap-2 items-start sm:items-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors">
              Request a Tour
            </button>
            <div className="text-xs text-gray-400">Listed by Sarah Mitchell · Demo Real Estate Group</div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Details + Story Teaser row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Overview */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">About this home</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                A beautifully maintained craftsman home with thoughtful upgrades throughout. Set on a quiet, tree-lined street
                with easy access to local coffee shops, parks, and dining. The backyard is an entertainer's dream, complete
                with a screened porch addition and fire pit. The current owners have invested over $80,000 in improvements
                over the past five years — from a complete bathroom remodel to a new roof. This home is ready for its next chapter.
              </p>
            </div>

            {/* Key facts */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                ["Year Built", "2002"],
                ["Lot Size", "0.28 acres"],
                ["Parking", "2-car garage"],
                ["Heating", "Central / Forced Air"],
                ["Cooling", "Central Air"],
                ["School District", "Austin ISD"],
              ].map(([label, value]) => (
                <div key={label} className="bg-gray-50 rounded-lg px-3 py-2.5">
                  <div className="text-xs text-gray-400 uppercase tracking-wide">{label}</div>
                  <div className="text-sm font-semibold text-gray-800 mt-0.5">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Story Teaser Card */}
          <div className="flex flex-col gap-0 rounded-2xl overflow-hidden shadow-md border border-amber-100"
            style={{ background: "linear-gradient(160deg, #FAF6EE 0%, #F0E6CC 100%)" }}>
            <div className="relative h-40 overflow-hidden">
              <img src="/demo/welcome-home.png" alt="Backyard" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(44,36,22,0.6))" }} />
              <div className="absolute bottom-3 left-4 text-white text-xs uppercase tracking-widest font-semibold opacity-80"
                style={{ fontFamily: "'Lora', serif" }}>
                Home Story
              </div>
            </div>
            <div className="flex flex-col gap-3 p-4">
              <p className="text-base font-semibold leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#2C2416" }}>
                This home has a deeper story.
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "#5C4F3A", fontFamily: "'Lora', serif" }}>
                The family who lived here for 8 years left behind something more than square footage — they left behind memories, projects, and a home built to last.
              </p>
              <Link
                href="/story"
                className="mt-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-opacity hover:opacity-80"
                style={{ background: "#B8960C", color: "#FAF6EE", fontFamily: "'Lora', serif" }}
              >
                Explore the Story →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
