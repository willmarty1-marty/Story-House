"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = "cover" | "opening" | "reading";
type PageId = "opening" | "toc" | "ch1" | "ch2" | "ch3" | "ch4";
type AnimClass = "" | "animate-page-enter" | "animate-page-exit" | "animate-page-enter-back" | "animate-page-exit-back";

const PAGE_ORDER: PageId[] = ["opening", "toc", "ch1", "ch2", "ch3", "ch4"];

// ─── Demo ROI data ─────────────────────────────────────────────────────────────

const PROJECTS = [
  { name: "Screened Porch Addition",        contractor: "Smith Construction Co.",     amount: 24000, date: "Mar 2022", verified: "receipt" },
  { name: "Complete Bathroom Remodel",      contractor: "Lakeside Tile & Bath",       amount: 19500, date: "Aug 2021", verified: "receipt" },
  { name: "New Roof Replacement",           contractor: "Heritage Roofing Inc.",      amount: 12800, date: "Jun 2023", verified: "receipt" },
  { name: "HVAC System Replacement",        contractor: "Comfort Air Solutions",      amount: 7200,  date: "Jan 2020", verified: "receipt" },
  { name: "Kitchen Backsplash & Counters",  contractor: "Modern Stone Works",         amount: 4200,  date: "May 2021", verified: "homeowner" },
  { name: "Hardwood Floor Refinishing",     contractor: "Premier Floor Co.",          amount: 1900,  date: "Sep 2022", verified: "homeowner" },
  { name: "Deck Staining & Repair",         contractor: "Outdoor Living Pros",        amount: 1100,  date: "Apr 2023", verified: "homeowner" },
  { name: "Attic Insulation Upgrade",       contractor: "GreenHome Insulation",       amount: 1600,  date: "Nov 2020", verified: "receipt" },
  { name: "Landscaping & Grading",          contractor: "Green Valley Landscaping",   amount: 3900,  date: "Spring 2022", verified: "homeowner" },
  { name: "Electrical Panel Upgrade",       contractor: "Apex Electric",              amount: 3800,  date: "Feb 2021", verified: "receipt" },
];

// ─── Shared styles ─────────────────────────────────────────────────────────────

const PAGE_BG = "var(--cream)";
const PAGE_BORDER = "1px solid var(--border)";
const INK = "var(--ink)";
const INK_LIGHT = "var(--ink-light)";
const GOLD = "var(--gold)";
const PLAYFAIR = "'Playfair Display', Georgia, serif";
const LORA = "'Lora', Georgia, serif";

// ─── Page Components ──────────────────────────────────────────────────────────

function OpeningPage({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="relative flex-1 overflow-hidden">
        <img src="/demo/cover.png" alt="123 Maple Lane" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(26,18,6,0.75))" }} />
        <div className="absolute bottom-0 left-0 right-0 px-10 pb-10 flex flex-col gap-2">
          <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.9)", fontFamily: LORA }}>Home Story</p>
          <h1 className="text-5xl font-bold text-white leading-tight" style={{ fontFamily: PLAYFAIR }}>Welcome Home</h1>
          <p className="text-base" style={{ color: "rgba(255,255,255,0.7)", fontFamily: LORA }}>123 Maple Lane · Austin, TX 78701</p>
        </div>
      </div>
      <div className="flex items-center justify-between px-10 py-6" style={{ background: PAGE_BG, borderTop: PAGE_BORDER }}>
        <p className="text-sm italic" style={{ color: INK_LIGHT, fontFamily: LORA }}>A story from the family who called this home.</p>
        <button onClick={onNext} className="flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: GOLD, fontFamily: LORA }}>
          Table of Contents <span>→</span>
        </button>
      </div>
    </div>
  );
}

function TocPage({ onChapter, onPrev }: { onChapter: (p: PageId) => void; onPrev: () => void }) {
  const chapters: { id: PageId; num: string; title: string; subtitle: string }[] = [
    { id: "ch1", num: "I",   title: "Welcome Home",        subtitle: "The family behind this home" },
    { id: "ch2", num: "II",  title: "Our Favorite Story",  subtitle: "The fireplace & holiday traditions" },
    { id: "ch3", num: "III", title: "Built to Last",       subtitle: "10 projects · $80,000 invested" },
    { id: "ch4", num: "IV",  title: "Neighborhood Stories", subtitle: "Coffee shops & Saturday mornings" },
  ];
  return (
    <div className="flex flex-col h-full" style={{ background: PAGE_BG }}>
      <div className="flex-1 overflow-y-auto px-10 py-10 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <p className="text-xs uppercase tracking-widest" style={{ color: GOLD, fontFamily: LORA }}>Home Story</p>
          <h2 className="text-3xl font-bold" style={{ fontFamily: PLAYFAIR, color: INK }}>Table of Contents</h2>
          <p className="text-sm" style={{ color: INK_LIGHT, fontFamily: LORA }}>123 Maple Lane · Austin, TX 78701</p>
        </div>

        <div className="border-t" style={{ borderColor: "var(--border)" }} />

        <div className="flex flex-col gap-0 divide-y" style={{ borderColor: "var(--border)" }}>
          {chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => onChapter(ch.id)}
              className="flex items-center gap-5 py-5 text-left group hover:bg-amber-50 transition-colors px-2 -mx-2 rounded-lg"
            >
              <span className="text-2xl font-bold w-8 text-right flex-shrink-0 group-hover:text-amber-700 transition-colors"
                style={{ fontFamily: PLAYFAIR, color: GOLD }}>
                {ch.num}
              </span>
              <div className="flex-1">
                <div className="text-lg font-semibold group-hover:text-amber-900 transition-colors" style={{ fontFamily: PLAYFAIR, color: INK }}>{ch.title}</div>
                <div className="text-sm mt-0.5" style={{ fontFamily: LORA, color: INK_LIGHT }}>{ch.subtitle}</div>
              </div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm" style={{ color: GOLD }}>→</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between px-10 py-5" style={{ borderTop: PAGE_BORDER, background: PAGE_BG }}>
        <button onClick={onPrev} className="text-sm hover:opacity-70 transition-opacity flex items-center gap-1.5" style={{ color: INK_LIGHT, fontFamily: LORA }}>
          ← Cover
        </button>
        <button onClick={() => onChapter("ch1")} className="text-sm font-semibold flex items-center gap-1.5 hover:opacity-70 transition-opacity" style={{ color: GOLD, fontFamily: LORA }}>
          Begin Reading →
        </button>
      </div>
    </div>
  );
}

function StoryChapter({
  chapterNum, title, imageSrc, text, onPrev, onNext, nextLabel, prevLabel,
}: {
  chapterNum: string; title: string; imageSrc: string; text: string;
  onPrev: () => void; onNext: () => void; nextLabel?: string; prevLabel?: string;
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: PAGE_BG }}>
      <div className="relative overflow-hidden" style={{ height: "52%" }}>
        <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(250,246,238,0.6))" }} />
      </div>
      <div className="flex-1 overflow-y-auto px-10 py-7 flex flex-col gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: GOLD, fontFamily: LORA }}>Chapter {chapterNum}</p>
          <h2 className="text-3xl font-bold leading-tight" style={{ fontFamily: PLAYFAIR, color: INK }}>{title}</h2>
        </div>
        <div className="border-t" style={{ borderColor: "var(--border)" }} />
        <div className="text-sm leading-relaxed whitespace-pre-line" style={{ fontFamily: LORA, color: INK_LIGHT }}>{text}</div>
      </div>
      <div className="flex items-center justify-between px-10 py-5" style={{ borderTop: PAGE_BORDER, background: PAGE_BG }}>
        <button onClick={onPrev} className="text-sm hover:opacity-70 transition-opacity flex items-center gap-1.5" style={{ color: INK_LIGHT, fontFamily: LORA }}>
          ← {prevLabel ?? "Back"}
        </button>
        <button onClick={onNext} className="text-sm font-semibold flex items-center gap-1.5 hover:opacity-70 transition-opacity" style={{ color: GOLD, fontFamily: LORA }}>
          {nextLabel ?? "Next Chapter"} →
        </button>
      </div>
    </div>
  );
}

function RoiChapter({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  const total = PROJECTS.reduce((s, p) => s + p.amount, 0);
  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: PAGE_BG }}>
      <div className="overflow-y-auto flex-1">
        {/* Photos */}
        <div className="grid gap-0.5" style={{ gridTemplateColumns: "2fr 1fr", height: "210px" }}>
          <img src="/demo/built-to-last-porch.png" alt="Screened porch" className="w-full h-full object-cover" />
          <div className="grid grid-rows-2 gap-0.5">
            <img src="/demo/built-to-last-bath-before.png" alt="Before" className="w-full h-full object-cover" />
            <img src="/demo/built-to-last-bath-after.png" alt="After" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="px-8 py-7 flex flex-col gap-6">
          {/* Header */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: GOLD, fontFamily: LORA }}>Chapter III</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: PLAYFAIR, color: INK }}>Built to Last</h2>
          </div>

          {/* Stat chips */}
          <div className="grid grid-cols-3 gap-3">
            {[
              ["10", "Projects Completed"],
              ["5", "Years of Investment"],
              [`$${(total / 1000).toFixed(0)}K`, "Total Invested"],
            ].map(([val, label]) => (
              <div key={label} className="flex flex-col items-center justify-center rounded-xl py-4 text-center"
                style={{ background: "var(--cream-dark)", border: PAGE_BORDER }}>
                <span className="text-2xl font-bold" style={{ fontFamily: PLAYFAIR, color: GOLD }}>{val}</span>
                <span className="text-xs mt-1 leading-snug" style={{ fontFamily: LORA, color: INK_LIGHT }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Project Registry */}
          <div>
            <h3 className="text-sm uppercase tracking-widest mb-3" style={{ fontFamily: LORA, color: INK_LIGHT }}>Project Registry</h3>
            <div className="rounded-xl overflow-hidden" style={{ border: PAGE_BORDER }}>
              <table className="w-full text-xs" style={{ fontFamily: LORA }}>
                <thead>
                  <tr style={{ background: "var(--cream-dark)", color: INK_LIGHT }}>
                    <th className="text-left px-3 py-2.5 font-medium">Project</th>
                    <th className="text-left px-3 py-2.5 font-medium hidden sm:table-cell">Contractor</th>
                    <th className="text-right px-3 py-2.5 font-medium">Amount</th>
                    <th className="text-left px-3 py-2.5 font-medium hidden sm:table-cell">Date</th>
                    <th className="text-center px-3 py-2.5 font-medium">Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {PROJECTS.map((p, i) => (
                    <tr key={p.name} style={{ background: i % 2 === 0 ? PAGE_BG : "var(--cream-dark)", borderTop: `1px solid var(--border)` }}>
                      <td className="px-3 py-2.5" style={{ color: INK }}>{p.name}</td>
                      <td className="px-3 py-2.5 hidden sm:table-cell" style={{ color: INK_LIGHT }}>{p.contractor}</td>
                      <td className="px-3 py-2.5 text-right font-semibold" style={{ color: INK }}>
                        ${p.amount.toLocaleString()}
                      </td>
                      <td className="px-3 py-2.5 hidden sm:table-cell" style={{ color: INK_LIGHT }}>{p.date}</td>
                      <td className="px-3 py-2.5 text-center">
                        {p.verified === "receipt" ? (
                          <span className="inline-flex items-center gap-1 text-green-700 font-semibold">
                            <span>✓</span><span className="hidden sm:inline">Receipt</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-semibold" style={{ color: GOLD }}>
                            <span>✓</span><span className="hidden sm:inline">Owner</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ background: "var(--ink)", color: "var(--cream)" }}>
                    <td className="px-3 py-3 font-semibold" colSpan={2}>Total Investment</td>
                    <td className="px-3 py-3 text-right font-bold text-base">${total.toLocaleString()}</td>
                    <td className="px-3 py-3" colSpan={2} />
                  </tr>
                </tfoot>
              </table>
            </div>
            <p className="text-xs mt-2 italic" style={{ color: INK_LIGHT, fontFamily: LORA }}>
              ✓ Receipt Verified = invoice or permit on file · ✓ Owner Verified = homeowner attestation
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-8 py-5" style={{ borderTop: PAGE_BORDER, background: PAGE_BG }}>
        <button onClick={onPrev} className="text-sm hover:opacity-70 transition-opacity flex items-center gap-1.5" style={{ color: INK_LIGHT, fontFamily: LORA }}>
          ← Our Favorite Story
        </button>
        <button onClick={onNext} className="text-sm font-semibold flex items-center gap-1.5 hover:opacity-70 transition-opacity" style={{ color: GOLD, fontFamily: LORA }}>
          Neighborhood Stories →
        </button>
      </div>
    </div>
  );
}

// ─── Book Cover ────────────────────────────────────────────────────────────────

function BookCover({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center"
      style={{ background: "radial-gradient(ellipse at center, #2A1E0E 0%, #120D05 70%)" }}>

      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)" }} />

      <div className="relative flex flex-col items-center gap-8 z-10">
        {/* The Book */}
        <div className="animate-fade-up" style={{ animationDelay: "0s" }}>
          <div className="relative flex" style={{
            width: "min(300px, 52vw)",
            height: "min(420px, 73vw)",
            filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.75)) drop-shadow(0 8px 20px rgba(0,0,0,0.5))",
          }}>
            {/* Spine */}
            <div className="flex-shrink-0 relative overflow-hidden"
              style={{ width: "28px", background: "linear-gradient(to right, #080601, #1A1208, #0E0A03)", borderRadius: "5px 0 0 5px", borderRight: "1px solid rgba(0,0,0,0.6)" }}>
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.04), transparent 30%, transparent 70%, rgba(255,255,255,0.02))" }} />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs tracking-widest whitespace-nowrap"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg) translate(50%, 50%)", color: "rgba(212,175,55,0.35)", fontFamily: LORA, fontSize: "9px", letterSpacing: "0.18em" }}>
                HOME STORY
              </span>
            </div>

            {/* Cover face — photo with overlay */}
            <div className="flex-1 relative overflow-hidden" style={{ borderRadius: "0 4px 4px 0" }}>
              {/* Photo */}
              <img src="/demo/cover.png" alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
              {/* Dark overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,7,2,0.45) 0%, rgba(10,7,2,0.2) 40%, rgba(10,7,2,0.7) 75%, rgba(10,7,2,0.88) 100%)" }} />
              {/* Gold border inset */}
              <div className="absolute inset-2.5 pointer-events-none" style={{ border: "1px solid rgba(212,175,55,0.3)", borderRadius: "2px" }} />

              {/* Text content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                {/* Top: tagline */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px" style={{ background: "rgba(212,175,55,0.4)" }} />
                    <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(212,175,55,0.7)", fontFamily: LORA, fontSize: "9px" }}>Home Story</span>
                    <div className="flex-1 h-px" style={{ background: "rgba(212,175,55,0.4)" }} />
                  </div>
                </div>

                {/* Bottom: title + address */}
                <div className="flex flex-col gap-2">
                  <h1 style={{ fontFamily: PLAYFAIR, color: "#F0E0A0", fontSize: "clamp(1.4rem, 5vw, 2rem)", lineHeight: 1.15, fontWeight: 700, textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>
                    Welcome<br />Home
                  </h1>
                  <div className="w-8 h-px" style={{ background: "rgba(212,175,55,0.5)" }} />
                  <p style={{ color: "rgba(220,200,150,0.7)", fontFamily: LORA, fontSize: "11px", letterSpacing: "0.04em" }}>
                    123 Maple Lane · Austin, TX
                  </p>
                </div>
              </div>

              {/* Page-edge highlight */}
              <div className="absolute right-0 inset-y-0 w-px" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.15), rgba(255,255,255,0.05))" }} />
            </div>

            {/* Page edges (right side) */}
            <div className="absolute -right-2 inset-y-1 flex flex-col gap-px" style={{ width: "8px" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex-1" style={{ background: `rgba(240,230,210,${0.12 - i * 0.015})`, borderRadius: "0 1px 1px 0" }} />
              ))}
            </div>
          </div>
        </div>

        {/* Open button */}
        <button
          onClick={onOpen}
          className="animate-fade-up group flex items-center gap-3 transition-all hover:gap-4"
          style={{ animationDelay: "0.35s", fontFamily: LORA, color: "rgba(212,175,55,0.75)" }}
        >
          <div className="h-px w-8 transition-all group-hover:w-12" style={{ background: "rgba(212,175,55,0.4)" }} />
          <span className="text-sm tracking-widest uppercase" style={{ fontSize: "11px", letterSpacing: "0.2em" }}>Open the Story</span>
          <div className="h-px w-8 transition-all group-hover:w-12" style={{ background: "rgba(212,175,55,0.4)" }} />
        </button>

        {/* Back link */}
        <Link
          href="/listing"
          className="animate-fade-up text-xs transition-opacity hover:opacity-60"
          style={{ animationDelay: "0.5s", color: "rgba(212,175,55,0.25)", fontFamily: LORA, letterSpacing: "0.05em" }}
        >
          ← Back to Listing
        </Link>
      </div>
    </div>
  );
}

// ─── Main Story Controller ─────────────────────────────────────────────────────

export default function StoryPage() {
  const [phase, setPhase] = useState<Phase>("cover");
  const [pageIdx, setPageIdx] = useState(0);
  const [animClass, setAnimClass] = useState<AnimClass>("");
  const [coverClass, setCoverClass] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  function openBook() {
    setCoverClass("animate-book-open");
    setTimeout(() => {
      setPhase("reading");
      setAnimClass("animate-page-enter");
    }, 950);
    setTimeout(() => setAnimClass(""), 1600);
  }

  function navigate(targetIdx: number) {
    if (isAnimating) return;
    setIsAnimating(true);
    const isForward = targetIdx > pageIdx;
    const exitClass: AnimClass = isForward ? "animate-page-exit" : "animate-page-exit-back";
    const enterClass: AnimClass = isForward ? "animate-page-enter" : "animate-page-enter-back";
    setAnimClass(exitClass);
    setTimeout(() => {
      setPageIdx(targetIdx);
      setAnimClass(enterClass);
    }, 320);
    setTimeout(() => {
      setAnimClass("");
      setIsAnimating(false);
    }, 900);
  }

  function goNext() { navigate(Math.min(pageIdx + 1, PAGE_ORDER.length - 1)); }
  function goPrev() { navigate(Math.max(pageIdx - 1, 0)); }
  function goTo(id: PageId) { navigate(PAGE_ORDER.indexOf(id)); }

  const currentPage = PAGE_ORDER[pageIdx];

  if (phase === "cover") {
    return <BookCover onOpen={openBook} />;
  }

  const STORY_TEXTS = {
    ch1: `We have poured our hearts into this home for the past eight years. Every corner holds a memory — the kids' laughter echoing across the backyard, fire pit gatherings with friends who became family, and early mornings watching the sunrise from the garden.\n\nThis home raised three incredible children. We taught them to ride bikes in this driveway, watched them grow up in these rooms, and made more memories than we could ever count.\n\nLife is pulling us toward a new chapter. My husband's career has brought an opportunity we cannot pass up — a return to the city where we both grew up, where our family has deep roots. Saying goodbye to this home is one of the hardest things we've done.\n\nWe hope the next family loves it as deeply as we have.`,
    ch2: `If we had to name one feature that defined us as a family, it would be the wood-burning fireplace.\n\nEvery November, as soon as the temperatures dropped, we lit the first fire of the season. The holidays here were magical — the kids waking up early on Christmas morning, the fire already crackling, the smell of oak filling the living room. We gathered around that hearth for every celebration, every hard conversation, and every quiet evening in between.\n\nWe are leaving behind several cords of seasoned oak firewood, already split and ready to burn. Consider it our first gift to you.`,
    ch4: `Saturday mornings were sacred in this house.\n\nAfter a slow breakfast, we would make our way on foot or by bike to one of the several independent coffee shops within easy reach. The walkability of this neighborhood was something we discovered in week one and never stopped appreciating.\n\nSummer mornings especially — the kids riding bikes, grabbing pastries, taking the long way home through the park. It became a weekly ritual, and the community around those coffee shops became people we knew by name.`,
  };

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: "#1C1408" }}>
      {/* Book chrome */}
      <div className="flex items-center justify-between px-6 py-3 flex-shrink-0"
        style={{ background: "rgba(28,20,8,0.95)", borderBottom: "1px solid rgba(212,175,55,0.12)" }}>
        <Link href="/listing" className="text-xs hover:opacity-60 transition-opacity flex items-center gap-1.5"
          style={{ color: "rgba(212,175,55,0.5)", fontFamily: LORA }}>
          ← Listing
        </Link>
        <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(212,175,55,0.4)", fontFamily: LORA }}>
          Home Story · 123 Maple Lane
        </span>
        <span className="text-xs" style={{ color: "rgba(212,175,55,0.3)", fontFamily: LORA }}>
          {pageIdx + 1} / {PAGE_ORDER.length}
        </span>
      </div>

      {/* Book body */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden">
        <div
          className={`relative w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl ${animClass}`}
          style={{
            height: "min(82vh, 720px)",
            background: PAGE_BG,
            boxShadow: "0 30px 80px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(217,206,184,0.4)",
          }}
        >
          {currentPage === "opening" && <OpeningPage onNext={goNext} />}
          {currentPage === "toc" && <TocPage onChapter={goTo} onPrev={goPrev} />}
          {currentPage === "ch1" && (
            <StoryChapter
              chapterNum="I" title="Welcome Home"
              imageSrc="/demo/welcome-home.png"
              text={STORY_TEXTS.ch1}
              onPrev={goPrev} onNext={goNext}
              prevLabel="Table of Contents" nextLabel="Our Favorite Story"
            />
          )}
          {currentPage === "ch2" && (
            <StoryChapter
              chapterNum="II" title="Our Favorite Story"
              imageSrc="/demo/our-favorite-story.png"
              text={STORY_TEXTS.ch2}
              onPrev={goPrev} onNext={goNext}
              prevLabel="Welcome Home" nextLabel="Built to Last"
            />
          )}
          {currentPage === "ch3" && <RoiChapter onPrev={goPrev} onNext={goNext} />}
          {currentPage === "ch4" && (
            <StoryChapter
              chapterNum="IV" title="Neighborhood Stories"
              imageSrc="/demo/neighborhood.png"
              text={STORY_TEXTS.ch4}
              onPrev={goPrev} onNext={() => goTo("toc")}
              prevLabel="Built to Last" nextLabel="Back to Contents"
            />
          )}
        </div>
      </div>

      {/* Page dots */}
      <div className="flex items-center justify-center gap-2 pb-4 flex-shrink-0">
        {PAGE_ORDER.map((id, i) => (
          <button
            key={id}
            onClick={() => !isAnimating && navigate(i)}
            className="rounded-full transition-all"
            style={{
              width: i === pageIdx ? "20px" : "6px",
              height: "6px",
              background: i === pageIdx ? "rgba(212,175,55,0.8)" : "rgba(212,175,55,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
