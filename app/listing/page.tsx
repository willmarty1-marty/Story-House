"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Mobile photo carousel ─────────────────────────────────────────────────────

const SLIDES = [
  { type: "image" as const, src: "/demo/cover.png",              alt: "Front of home"  },
  { type: "story" as const },
  { type: "image" as const, src: "/demo/built-to-last-porch.png", alt: "Screened porch" },
];

function StorySlide() {
  return (
    <Link
      href="/story"
      className="flex flex-col items-center justify-center w-full h-full gap-3"
      style={{ background: "#FAFAF7" }}
    >
      <p className="uppercase tracking-widest" style={{ color: "#A8834A", fontFamily: "'Lora', serif", fontSize: "9px", letterSpacing: "0.22em" }}>
        Home Story
      </p>
      <div className="w-8 h-px" style={{ background: "rgba(168,131,74,0.4)" }} />
      <p className="font-bold text-center leading-snug px-8" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#242018", fontSize: "1.15rem" }}>
        This home has<br />a deeper story.
      </p>
      <p className="text-xs text-center px-8 leading-relaxed" style={{ fontFamily: "'Lora', serif", color: "#5A5044" }}>
        Explore the family's chapter-by-chapter account of life in this home.
      </p>
      <div className="flex items-center gap-1.5 px-5 py-2.5 rounded-full font-semibold animate-cta-glow-pulse"
        style={{ color: "#fff", fontFamily: "'Lora', serif", fontSize: "13px", background: "#F97316" }}>
        <span>Read the Story</span>
        <span>→</span>
      </div>
    </Link>
  );
}

function MobileCarousel() {
  const [idx, setIdx] = useState(0);
  const total = SLIDES.length;
  const slide = SLIDES[idx];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "260px" }}>
      {slide.type === "image" ? (
        <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" />
      ) : (
        <StorySlide />
      )}

      {/* Left arrow */}
      {idx > 0 && (
        <button
          onClick={() => setIdx(idx - 1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full shadow-md hover:opacity-80 transition-opacity"
          style={{ width: 34, height: 34, background: "rgba(255,255,255,0.92)" }}
        >
          <span className="text-gray-800 font-light" style={{ fontSize: "20px", lineHeight: 1, marginTop: "-1px" }}>‹</span>
        </button>
      )}

      {/* Right arrow */}
      {idx < total - 1 && (
        <button
          onClick={() => setIdx(idx + 1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full hover:scale-110 transition-transform animate-glow-pulse"
          style={{ width: 46, height: 46, background: "#F97316" }}
        >
          <span className="text-white font-bold" style={{ fontSize: "26px", lineHeight: 1, marginLeft: "3px" }}>›</span>
        </button>
      )}

      {/* Counter pill */}
      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium"
        style={{ background: "rgba(0,0,0,0.48)", color: "#fff", fontSize: "11px" }}>
        {idx + 1} / {total}
      </div>
    </div>
  );
}

// ─── Mobile view ───────────────────────────────────────────────────────────────

function MobileView() {
  return (
    <div className="flex flex-col bg-white" style={{ fontFamily: "sans-serif", minHeight: "100%" }}>
      <MobileCarousel />

      {/* Price block */}
      <div className="px-4 pt-4 pb-2 flex flex-col gap-1 border-b border-gray-100">
        <div className="text-2xl font-bold text-gray-900">$460,000</div>
        <div className="flex items-center gap-2 text-sm text-gray-700 flex-wrap mt-0.5">
          <span><strong className="text-gray-900">4</strong> bds</span>
          <span className="text-gray-300">|</span>
          <span><strong className="text-gray-900">3</strong> ba</span>
          <span className="text-gray-300">|</span>
          <span><strong className="text-gray-900">2,340</strong> sqft</span>
          <span className="text-green-600 font-semibold text-xs">For Sale</span>
        </div>
        <div className="text-xs text-gray-500 mt-0.5">123 Maple Lane, Austin, TX 78701</div>
      </div>

      {/* CTA */}
      <div className="px-4 py-3 border-b border-gray-100">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
          Request a Tour
        </button>
      </div>

      {/* About */}
      <div className="px-4 py-4 flex flex-col gap-3 border-b border-gray-100">
        <h2 className="text-sm font-bold text-gray-900">About this home</h2>
        <p className="text-xs text-gray-600 leading-relaxed">
          A beautifully maintained craftsman home with thoughtful upgrades throughout. The current owners have invested over $80,000 in improvements — from a complete bathroom remodel to a new roof.
        </p>
      </div>

      {/* Key facts */}
      <div className="px-4 py-4 grid grid-cols-2 gap-2 border-b border-gray-100">
        {[
          ["Year Built", "2002"],
          ["Lot Size", "0.28 acres"],
          ["Parking", "2-car garage"],
          ["Heating", "Central / Forced Air"],
        ].map(([label, value]) => (
          <div key={label} className="bg-gray-50 rounded-lg px-3 py-2">
            <div className="text-xs text-gray-400 uppercase tracking-wide" style={{ fontSize: "10px" }}>{label}</div>
            <div className="text-xs font-semibold text-gray-800 mt-0.5">{value}</div>
          </div>
        ))}
      </div>

      <div className="text-center text-gray-400 py-5" style={{ fontSize: "10px" }}>
        Listed by Sarah Mitchell · Demo Real Estate Group
      </div>
    </div>
  );
}

// ─── Desktop view ──────────────────────────────────────────────────────────────

function DesktopView() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-8">

      {/* Photo Grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-1.5 rounded-xl overflow-hidden" style={{ height: "440px" }}>
        <div className="col-span-2 row-span-2 relative">
          <img src="/demo/cover.png" alt="Front of home" className="w-full h-full object-cover" />
        </div>
        <div className="relative">
          <img src="/demo/welcome-home.png" alt="Backyard" className="w-full h-full object-cover" />
        </div>
        <Link href="/story" className="relative flex flex-col items-center justify-center gap-3 group cursor-pointer overflow-hidden"
          style={{ background: "#FAFAF7", borderLeft: "1px solid #E8E4DC" }}>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: "rgba(168,131,74,0.04)" }} />
          <div className="relative flex flex-col items-center gap-2.5 px-4 text-center">
            <p className="text-xs uppercase tracking-widest" style={{ color: "#A8834A", fontFamily: "'Lora', serif", letterSpacing: "0.22em", fontSize: "9px" }}>
              Home Story
            </p>
            <div className="w-8 h-px" style={{ background: "rgba(168,131,74,0.4)" }} />
            <p className="font-bold leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#242018", fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)" }}>
              This home has<br />a deeper story.
            </p>
            <p className="text-xs leading-relaxed" style={{ fontFamily: "'Lora', serif", color: "#5A5044", fontSize: "11px" }}>
              Explore the family's chapter-by-chapter account of life in this home.
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all"
              style={{ color: "#A8834A", fontFamily: "'Lora', serif" }}>
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

      <div className="border-t border-gray-100" />

      {/* Details + Story Teaser row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        <div className="flex flex-col gap-0 rounded-2xl overflow-hidden shadow-md border border-stone-200"
          style={{ background: "linear-gradient(160deg, #F8F6F2 0%, #EDE9E1 100%)" }}>
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
              style={{ background: "#A8834A", color: "#F8F6F2", fontFamily: "'Lora', serif" }}
            >
              Explore the Story →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ListingPage() {
  const [view, setView] = useState<"desktop" | "mobile">("mobile");

  return (
    <div className={`min-h-screen ${view === "mobile" ? "bg-white md:bg-[#E5E5E5]" : "bg-white"}`} style={{ color: "#1a1a1a", fontFamily: "sans-serif" }}>

      {/* Nav */}
      <nav className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold" style={{ color: "#006AFF" }}>zillow</span>
          <span className="text-xs text-gray-400 ml-3 hidden sm:block">Demo Listing · Not a real property</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {view === "desktop" && (
            <>
              <span className="cursor-pointer hover:text-gray-900">Buy</span>
              <span className="cursor-pointer hover:text-gray-900">Rent</span>
              <span className="cursor-pointer hover:text-gray-900">Sell</span>
              <div className="w-px h-4 bg-gray-200" />
              <Link href="/builder" className="hover:text-gray-900 transition-colors">Builder</Link>
              <Link href="/story" className="px-3 py-1.5 rounded text-xs font-semibold text-white hover:opacity-80 transition-opacity" style={{ background: "#A8834A" }}>Story →</Link>
              <div className="w-px h-4 bg-gray-200" />
            </>
          )}
          {/* View toggle */}
          <div className="flex items-center rounded-lg overflow-hidden border border-gray-200 text-xs font-medium">
            <button
              onClick={() => setView("desktop")}
              className={`px-3 py-1.5 transition-colors ${view === "desktop" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900 bg-white"}`}
            >
              Desktop
            </button>
            <button
              onClick={() => setView("mobile")}
              className={`px-3 py-1.5 transition-colors ${view === "mobile" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900 bg-white"}`}
            >
              Mobile
            </button>
          </div>
        </div>
      </nav>

      {view === "desktop" ? (
        <DesktopView />
      ) : (
        <>
          {/* Real mobile device — no frame, full bleed */}
          <div className="block md:hidden">
            <MobileView />
          </div>

          {/* Desktop browser — phone frame simulation */}
          <div className="hidden md:flex justify-center py-10">
            <div
              className="relative overflow-hidden"
              style={{
                width: 390,
                borderRadius: "44px",
                border: "10px solid #1C1C1E",
                boxShadow: "0 40px 80px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.2)",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              {/* Status bar */}
              <div className="flex items-center justify-between px-6 pt-3 pb-1 bg-white sticky top-0 z-10"
                style={{ fontSize: "12px", fontWeight: 600 }}>
                <span className="text-gray-900">9:41</span>
                <div className="w-20 h-5 bg-black rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-1" />
                <div className="flex items-center gap-1 text-gray-900">
                  <span>●●●</span>
                </div>
              </div>
              <MobileView />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
