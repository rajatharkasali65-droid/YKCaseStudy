import image_manav_ from '@/imports/manav_.jpeg'
import { useState, useEffect } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import heroImage from "@/imports/Home_Page_v1.png";
import mobileImage from "@/imports/Home_Page_Mobile.png";
import { ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

const METRICS = [
  { value: "+52%", label: "Search-to-purchase\nconversion" },
  { value: "−22pp", label: "Checkout\nabandonment" },
  { value: "+34%", label: "Add-to-cart from\nlisting pages" },
  { value: "−68%", label: "Order-status\nsupport tickets" },
  { value: "91%",  label: "Task success rate\n(usability lab)" },
  { value: "NPS+41", label: "Post-launch Net\nPromoter Score" },
];

const PAIN_POINTS = [
  { num: "01", icon: "🔍", title: "Unfindable Products",  stat: "71%",  statLabel: "category nav failure rate",       desc: "Carpentry, plumbing, tiles and painting were buried inconsistently. Users defaulted to search for items two clicks away." },
  { num: "02", icon: "📱", title: "Poor Mobile UX",       stat: "58%",  statLabel: "mobile bounce rate on PLPs",       desc: "70%+ of YouKraft traffic is mobile-first. Yet the site had no native app experience and no responsive PLP." },
  { num: "03", icon: "🛒", title: "Cart Abandonment",     stat: "76%",  statLabel: "abandoned at delivery step",       desc: "Surprise delivery charges revealed late, no tracking, no guest checkout — customers left for competitor platforms." },
  { num: "04", icon: "📦", title: "No Order Tracking",    stat: "4.2×", statLabel: "more support tickets vs competitors", desc: "The app offered ordering but zero real-time tracking — a critical gap for contractors with site deadlines." },
];

const PERSONAS = [
  {
    name: "Arjun, 41", tag: "Civil Contractor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
    quote: "I need materials on-site by 8am. Don't make me call support to find out where my order is.",
    needs: ["Bulk orders with GST invoices", "Real-time delivery tracking to site", "Reorder past SKUs in one tap"],
    frustrations: ["No contractor pricing tier", "Can't split delivery to multiple sites", "No CSV upload for BOQ orders"],
  },
  {
    name: "Sneha, 32", tag: "DIY Homeowner",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&auto=format",
    quote: "I'm renovating my kitchen for the first time — just tell me what I actually need.",
    needs: ["Guided selection by room/project", "Comparison between tile ranges", "Clear return and warranty policy"],
    frustrations: ["Jargon-heavy product descriptions", "Can't visualise tiles in a room", "No 'complete the room' bundles"],
  },
  {
    name: "Preethi, 36", tag: "Interior Designer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&auto=format",
    quote: "My clients trust my recommendations. I need a platform that makes me look professional.",
    needs: ["Save & share product mood boards", "Bulk pricing and trade account", "Curated collections by style"],
    frustrations: ["No wishlist or project folders", "Stock shown only after add-to-cart", "No dedicated B2B account manager"],
  },
];

const DECISIONS = [
  { tag: "Navigation",  title: "Category-led Mega Menu",      impact: "−41% time-to-product",  before: "Single-level text dropdown, no visual hierarchy across 6 categories",                       after: "Two-level mega menu with photography, product counts, and 'New Arrivals' rail per category" },
  { tag: "Mobile App",  title: "Live Order Tracking",         impact: "−68% support tickets",   before: "Static text label only — Processing / Shipped. No map, no ETA.",                            after: "Real-time map tracking with driver location, ETA window, and one-tap support escalation" },
  { tag: "Product Cards", title: "Contextual Micro-info",     impact: "+34% add-to-cart",       before: "Static cards — name and price only, no stock signal",                                        after: "Stock badge, primary spec, quick-add on hover; image swaps for multi-variant SKUs" },
  { tag: "Trust",       title: "Inline Delivery Estimator",   impact: "−22pp abandonment",      before: "Delivery cost revealed at checkout step 3 only",                                             after: "PIN-code delivery estimate on every product page, updating in real time below price" },
  { tag: "Search",      title: "Predictive Visual Search",    impact: "+52% search conversion", before: "Text autocomplete — names only, no thumbnails",                                              after: "Live panel: thumbnail, price, availability, category chip shortcuts above results" },
  { tag: "Homepage",    title: "Category Storefronts",        impact: "+28% depth per session", before: "Generic banner + undifferentiated product grid",                                             after: "6 dedicated storefronts (Carpentry, Hardware, Painting, Tiles, Plumbing, Interiors)" },
];

const PROCESS = [
  { num: "01", title: "Discovery",  desc: "Stakeholder interviews with Manav Goel (CEO) & Rajib Saha (COO), heuristic eval, competitor teardown of Infra.Market, JSW One MSME and ArisInfra." },
  { num: "02", title: "Research",   desc: "Moderated usability testing (n=14) across Bengaluru & Pune, card sorting, and 5,800 Hotjar session recordings analysed." },
  { num: "03", title: "Define",     desc: "Affinity mapping, 3 primary personas (contractor, homeowner, interior designer), ranked opportunity matrix." },
  { num: "04", title: "Ideate",     desc: "2-day design sprint → 60+ sketches → 9 directions → mid-fi prototypes validated with real YouKraft customers in 48 hrs." },
  { num: "05", title: "Design",     desc: "Hi-fi screens for web + iOS/Android in Figma. Atomic component library of 160+ elements, 4 rounds of iteration." },
  { num: "06", title: "Handoff",    desc: "Annotated specs, motion guide, design token file synced to Storybook. Separate packages for web and mobile engineers." },
];

export default function App() {
  const [activeNav, setActiveNav] = useState(false);

  useEffect(() => {
    const onScroll = () => setActiveNav(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── NAV ──────────────────────────────────────────────────── */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        activeNav ? "bg-white/95 backdrop-blur-md border-b border-black/8 shadow-sm" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <span className="font-extrabold text-[#0D0D0D] text-lg tracking-tight" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            You<span className="text-[#E07B39]">Kraft</span>
          </span>
          <div className="hidden md:flex gap-8">
            {["overview", "research", "process", "design", "results"].map(id => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-xs uppercase tracking-[0.15em] text-[#6B6B7A] hover:text-[#0D0D0D] transition-colors">
                {id}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen bg-white flex flex-col justify-center overflow-hidden">
        {/* Orange left accent bar */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#E07B39]" />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "radial-gradient(circle, #0D0D0D 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />

        {/* Warm glow */}
        <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-[700px] h-[500px] bg-[#E07B39]/7 blur-[130px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-8 lg:px-14 py-24 pt-28 w-full">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-10">
            <span className="w-8 h-px bg-[#E07B39]" />
            <span className="text-[#E07B39] text-xs font-bold tracking-[0.25em] uppercase">UI / UX Case Study — 2022</span>
          </div>

          {/* Giant title */}
          <h1
            className="text-[18vw] sm:text-[15vw] lg:text-[13vw] font-black text-[#0D0D0D] leading-[0.88] tracking-tight mb-10"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            You<span className="text-[#E07B39]">Kraft</span>
          </h1>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-t border-black/10 pt-10">
            <p className="text-[#6B6B7A] text-lg max-w-xl leading-relaxed">Redesigning India's home improvement marketplace web and mobile from browsing carpentry and tiles to tracking a delivery in real time on the YouKraft app.</p>
            <div className="flex flex-wrap gap-8 shrink-0">
              {[
                { label: "Role",     value: "UI/UX Designer" },
                { label: "Timeline", value: "10 Weeks" },
                { label: "Platform", value: "Web + iOS / Android" },
                { label: "Year",     value: "2022" },
              ].map(m => (
                <div key={m.label}>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#AAAABC] mb-1">{m.label}</div>
                  <div className="text-[#0D0D0D] font-semibold text-sm" style={{ fontFamily: "'Satoshi', sans-serif" }}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll nudge */}
        <div className="absolute bottom-8 right-10 flex items-center gap-3 text-[#AAAABC] text-xs uppercase tracking-widest">
          <span>Scroll</span>
          <ChevronDown size={14} className="animate-bounce" />
        </div>
      </section>

      {/* ── DESIGN PREVIEW ───────────────────────────────────────── */}
      <section className="bg-[#F7F7F9] py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="w-8 h-px bg-[#E07B39]" />
            <span className="text-[#E07B39] text-xs font-bold tracking-[0.25em] uppercase">Final Designs</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-end">

            {/* Desktop browser */}
            <div className="flex-1 min-w-0">
              <div className="rounded-2xl overflow-hidden border border-black/8 shadow-xl">
                <div className="bg-[#EAEAEE] px-5 py-3 flex items-center gap-3 border-b border-black/8">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 mx-3 bg-white rounded px-3 py-1 text-[11px] text-[#6B6B7A] border border-black/8">
                    youkraft.in
                  </div>
                </div>
                <div className="overflow-y-auto" style={{ maxHeight: 520, scrollbarWidth: "none" } as React.CSSProperties}>
                  <ImageWithFallback src={heroImage} alt="YouKraft desktop homepage" className="w-full object-top object-cover" />
                </div>
              </div>
              <p className="text-center text-xs text-[#AAAABC] mt-3 uppercase tracking-widest">Desktop · youkraft.in</p>
            </div>

            {/* Mobile phone */}
            <div className="shrink-0 mx-auto lg:mx-0" style={{ width: 220 }}>
              <div className="relative">
                <div className="bg-[#2A2A35] rounded-[2.5rem] p-2.5 border-2 border-black/20 shadow-2xl">
                  <div className="relative bg-black rounded-[2.1rem] overflow-hidden">
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-10 border border-white/10" />
                    <div className="bg-[#1A2340] px-4 pt-5 pb-1 flex justify-between items-center">
                      <span className="text-white text-[8px] font-bold">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="flex gap-0.5 items-end h-2.5">
                          {[2, 3, 4, 4].map((h, i) => (
                            <div key={i} className={cn("w-0.5 rounded-sm", i < 3 ? "bg-white" : "bg-white/30")} style={{ height: h * 2 }} />
                          ))}
                        </div>
                        <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                          <path d="M1 3.5C2.2 2 7.8 2 9 3.5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                          <path d="M2.8 5.2C3.6 4.2 6.4 4.2 7.2 5.2" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                          <circle cx="5" cy="6.5" r="0.7" fill="white"/>
                        </svg>
                        <div className="w-4 h-2 border border-white/70 rounded-sm relative">
                          <div className="absolute inset-[1px] right-[2px] bg-white/80 rounded-[1px]" />
                        </div>
                      </div>
                    </div>
                    <div className="overflow-y-auto" style={{ maxHeight: 440, scrollbarWidth: "none" } as React.CSSProperties}>
                      <ImageWithFallback src={mobileImage} alt="YouKraft mobile app" className="w-full object-top object-cover" />
                    </div>
                    <div className="bg-white flex justify-center py-2">
                      <div className="w-16 h-1 bg-black/20 rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="absolute -right-1 top-20 w-1 h-10 bg-black/15 rounded-r-full" />
                <div className="absolute -left-1 top-16 w-1 h-7 bg-black/15 rounded-l-full" />
                <div className="absolute -left-1 top-28 w-1 h-7 bg-black/15 rounded-l-full" />
              </div>
              <p className="text-center text-xs text-[#AAAABC] mt-4 uppercase tracking-widest">iOS & Android</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── METRICS BAND (orange) ─────────────────────────────────── */}
      <section className="bg-[#E07B39]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="flex items-center gap-4 mb-14">
            <span className="w-8 h-px bg-white/50" />
            <span className="text-white/70 text-xs font-bold tracking-[0.25em] uppercase">Results — 90 days post-launch</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-white/20">
            {METRICS.map(m => (
              <div key={m.value} className="px-6 first:pl-0 last:pr-0 py-2">
                <div className="text-4xl xl:text-5xl font-black text-white leading-none mb-2" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  {m.value}
                </div>
                <div className="text-white/60 text-xs leading-relaxed whitespace-pre-line">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ─────────────────────────────────────────────── */}
      <section id="overview" className="bg-white py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left sticky panel */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-[#E07B39]" />
                  <span className="text-[#E07B39] text-xs font-bold tracking-[0.25em] uppercase">Overview</span>
                </div>
                <h2 className="text-5xl font-black text-[#0D0D0D] leading-tight mb-10" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  About<br />the<br />project
                </h2>

                <div className="border border-black/8 rounded-xl overflow-hidden">
                  {[
                    { label: "Company",    value: "YouKraft" },
                    { label: "Founded",    value: "2018 · Bengaluru" },
                    { label: "Funding",    value: "$10M Seed" },
                    { label: "CEO",        value: "Manav Goel" },
                    { label: "COO",        value: "Rajib Saha" },
                    { label: "Co-Founder", value: "Torun Mathias" },
                    { label: "Competitors",value: "133 active" },
                    { label: "Platform",   value: "Web · iOS · Android" },
                  ].map((f, i) => (
                    <div key={f.label} className={cn("flex justify-between items-center px-4 py-3 text-sm", i % 2 === 0 ? "bg-white" : "bg-[#F7F7F9]")}>
                      <span className="text-[#6B6B7A]">{f.label}</span>
                      <span className="font-semibold text-[#0D0D0D]" style={{ fontFamily: "'Satoshi', sans-serif" }}>{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right content */}
            <div className="lg:col-span-8 space-y-10">
              <div>
                <h3 className="text-3xl lg:text-4xl font-black text-[#0D0D0D] leading-tight mb-6" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  India's home improvement market needed a better front door
                </h3>
                <div className="space-y-5 text-[#4A4A5A] leading-relaxed text-lg">
                  <p>
                    YouKraft is an online marketplace for home improvement products — carpentry,
                    hardware, painting, tiles, plumbing, and interior furnishings. Founded in 2018
                    by <strong className="text-[#0D0D0D]">Manav Goel, Rajib Saha, and Torun Mathias</strong>,
                    the company has raised <strong className="text-[#0D0D0D]">$10M in seed funding</strong> and
                    operates a mobile app on both iOS and Android for ordering, tracking, and delivery.
                  </p>
                  <p>
                    Competing against 133 active rivals — including Infra.Market, JSW One MSME, and
                    ArisInfra — YouKraft's legacy site was converting at just{" "}
                    <strong className="text-[#E07B39]">1.4%</strong>, against a 4.2% category benchmark.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-[#F7F7F9] border border-black/8 rounded-2xl p-7">
                  <div className="text-[#E07B39] text-xs font-bold tracking-widest uppercase mb-4">The Brief</div>
                  <p className="text-[#4A4A5A] text-sm leading-relaxed">
                    Redesign the web marketplace and mobile app to improve conversion, reduce
                    cart abandonment, and introduce real-time order tracking — positioning
                    YouKraft ahead of competitors on customer experience.
                  </p>
                </div>
                <div className="bg-[#E07B39] rounded-2xl p-7">
                  <div className="text-white/70 text-xs font-bold tracking-widest uppercase mb-4">Conversion Target</div>
                  <div className="text-white font-black text-5xl mb-1" style={{ fontFamily: "'Satoshi', sans-serif" }}>3.5%</div>
                  <p className="text-white/70 text-sm leading-relaxed">Within 90 days of launch — 2.5× the pre-project baseline of 1.4%.</p>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#AAAABC] mb-4">Product Categories</div>
                <div className="flex flex-wrap gap-3">
                  {[["🪵","Carpentry"],["🔩","Hardware"],["🎨","Painting"],["🪟","Tiles"],["🚿","Plumbing"],["🛋️","Interiors"]].map(([icon, name]) => (
                    <div key={name} className="flex items-center gap-2 border-2 border-[#0D0D0D] rounded-full px-4 py-2 text-sm font-semibold text-[#0D0D0D]" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                      <span>{icon}</span><span>{name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Founders */}
              <div className="border-t border-black/8 pt-8">
                <div className="text-xs font-bold uppercase tracking-widest text-[#AAAABC] mb-5">Founders</div>
                <div className="flex flex-wrap gap-6">
                  {[
                    { name: "Manav Goel",    role: "Founder & CEO",    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=56&h=56&fit=crop&auto=format" },
                    { name: "Rajib Saha",    role: "Co-Founder & COO", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop&auto=format" },
                    { name: "Torun Mathias", role: "Co-Founder",        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=56&h=56&fit=crop&auto=format" },
                  ].map(f => (
                    <div key={f.name} className="flex items-center gap-3">
                      
                      <div>
                        <div className="font-semibold text-sm text-[#0D0D0D]" style={{ fontFamily: "'Satoshi', sans-serif" }}>{f.name}</div>
                        <div className="text-xs text-[#6B6B7A]">{f.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESEARCH ─────────────────────────────────────────────── */}
      <section id="research" className="bg-[#F7F7F9] py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-[#E07B39]" />
            <span className="text-[#E07B39] text-xs font-bold tracking-[0.25em] uppercase">Research & Discovery</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-20">
            <h2 className="text-5xl lg:text-7xl font-black text-[#0D0D0D] leading-[0.9] max-w-xl" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              Four<br />friction<br />points
            </h2>
            <p className="text-[#6B6B7A] text-base max-w-sm leading-relaxed">
              From 14 moderated sessions, 5,800 Hotjar recordings, and a full heuristic evaluation against competitor platforms.
            </p>
          </div>

          {/* Pain point cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-24">
            {PAIN_POINTS.map((p, i) => (
              <div key={p.num}
                className={cn(
                  "group relative rounded-2xl p-8 overflow-hidden border transition-all duration-300 hover:shadow-lg",
                  i === 0 ? "bg-[#E07B39] border-transparent" : "bg-white border-black/8 hover:border-[#E07B39]/30"
                )}
              >
                {/* Ghost number */}
                <div
                  className={cn("absolute -bottom-4 -right-2 text-[7rem] font-black leading-none select-none pointer-events-none", i === 0 ? "text-white/10" : "text-black/[0.04]")}
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  {p.num}
                </div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-3xl">{p.icon}</span>
                    <div className="text-right">
                      <div className={cn("text-4xl font-black leading-none", i === 0 ? "text-white" : "text-[#E07B39]")} style={{ fontFamily: "'Satoshi', sans-serif" }}>{p.stat}</div>
                      <div className={cn("text-xs mt-0.5", i === 0 ? "text-white/60" : "text-[#6B6B7A]")}>{p.statLabel}</div>
                    </div>
                  </div>
                  <h3 className={cn("text-xl font-bold mb-3", i === 0 ? "text-white" : "text-[#0D0D0D]")} style={{ fontFamily: "'Satoshi', sans-serif" }}>{p.title}</h3>
                  <p className={cn("text-sm leading-relaxed", i === 0 ? "text-white/70" : "text-[#6B6B7A]")}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Personas */}
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-[#E07B39]" />
            <span className="text-[#E07B39] text-xs font-bold tracking-[0.25em] uppercase">User Personas</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0D0D0D] leading-tight mb-14" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            Three buyer archetypes
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {PERSONAS.map((p, i) => (
              <div key={p.name}
                className={cn(
                  "rounded-2xl p-7 flex flex-col gap-6 border",
                  i === 1 ? "bg-[#E07B39] border-transparent" : "bg-white border-black/8"
                )}
              >
                <div className="flex items-center gap-4">
                  
                  <div>
                    <div className={cn("font-black text-lg", i === 1 ? "text-white" : "text-[#0D0D0D]")} style={{ fontFamily: "'Satoshi', sans-serif" }}>{p.name}</div>
                    <div className={cn("text-xs font-bold uppercase tracking-wider mt-0.5", i === 1 ? "text-white/70" : "text-[#E07B39]")}>{p.tag}</div>
                  </div>
                </div>
                <blockquote className={cn("text-sm italic leading-relaxed border-l-2 pl-4", i === 1 ? "border-white/40 text-white/80" : "border-[#E07B39]/40 text-[#4A4A5A]")}>
                  "{p.quote}"
                </blockquote>
                <div>
                  <div className={cn("text-[10px] font-bold uppercase tracking-widest mb-2", i === 1 ? "text-white/60" : "text-[#22C55E]")}>Needs</div>
                  <ul className="space-y-1.5">
                    {p.needs.map(n => (
                      <li key={n} className={cn("text-xs flex gap-2", i === 1 ? "text-white/70" : "text-[#4A4A5A]")}>
                        <span className={i === 1 ? "text-white/50" : "text-[#22C55E]"}>+</span>{n}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className={cn("text-[10px] font-bold uppercase tracking-widest mb-2", i === 1 ? "text-white/60" : "text-[#FF5F57]")}>Frustrations</div>
                  <ul className="space-y-1.5">
                    {p.frustrations.map(f => (
                      <li key={f} className={cn("text-xs flex gap-2", i === 1 ? "text-white/70" : "text-[#4A4A5A]")}>
                        <span className={i === 1 ? "text-white/50" : "text-[#FF5F57]"}>−</span>{f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────── */}
      <section id="process" className="bg-white py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-[#E07B39]" />
            <span className="text-[#E07B39] text-xs font-bold tracking-[0.25em] uppercase">Design Process</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-[#0D0D0D] leading-[0.9] p-[0px] mx-[0px] mt-[0px] mb-[80px]" style={{ fontFamily: "'Satoshi', sans-serif" }}>6 phases.<br />10 weeks.<br />0 shortcuts.</h2>

          <div className="relative">
            <div className="absolute left-9 top-0 bottom-0 w-px bg-black/8 hidden md:block" />
            <div className="space-y-0">
              {PROCESS.map((s, i) => (
                <div key={s.num} className="relative flex gap-8 md:gap-14 group">
                  <div className="hidden md:flex shrink-0 w-[72px] h-[72px] rounded-full border-2 border-black/10 items-center justify-center bg-white z-10 group-hover:border-[#E07B39] group-hover:bg-[#E07B39] transition-all duration-300">
                    <span className="text-sm font-black text-[#0D0D0D] group-hover:text-white transition-colors" style={{ fontFamily: "'Satoshi', sans-serif" }}>{s.num}</span>
                  </div>
                  <div className={cn("flex-1 pt-4", i === PROCESS.length - 1 ? "pb-0" : "pb-14")}>
                    <div className="md:hidden text-xs font-bold text-[#E07B39] mb-1">Phase {s.num}</div>
                    <h3 className="text-2xl font-black text-[#0D0D0D] mb-3" style={{ fontFamily: "'Satoshi', sans-serif" }}>{s.title}</h3>
                    <p className="text-[#4A4A5A] leading-relaxed max-w-2xl">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DESIGN DECISIONS ─────────────────────────────────────── */}
      <section id="design" className="bg-[#F7F7F9] py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-[#E07B39]" />
            <span className="text-[#E07B39] text-xs font-bold tracking-[0.25em] uppercase">Design Decisions</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-[#0D0D0D] leading-tight" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              6 decisions that<br />moved the needle
            </h2>
            <p className="text-[#6B6B7A] max-w-xs leading-relaxed text-sm">
              Each tested, iterated, and validated before committing to the design system.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {DECISIONS.map((d, i) => (
              <div key={d.title}
                className={cn(
                  "rounded-2xl p-7 border",
                  i === 0
                    ? "bg-[#E07B39] border-transparent lg:col-span-2"
                    : "bg-white border-black/8 hover:shadow-md transition-shadow duration-300"
                )}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className={cn("text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full", i === 0 ? "bg-white/20 text-white" : "bg-[#E07B39]/10 text-[#E07B39]")}>
                    {d.tag}
                  </span>
                  <span className={cn("text-sm font-black px-3 py-1 rounded-full", i === 0 ? "bg-white text-[#E07B39]" : "bg-[#22C55E]/10 text-[#22C55E]")} style={{ fontFamily: "'Satoshi', sans-serif" }}>
                    {d.impact}
                  </span>
                </div>
                <h3 className={cn("font-black mb-6", i === 0 ? "text-white text-3xl" : "text-[#0D0D0D] text-xl")} style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  {d.title}
                </h3>
                <div className={cn("grid gap-4", i === 0 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2")}>
                  <div className={cn("rounded-xl p-4", i === 0 ? "bg-white/15" : "bg-[#FFF5F5]")}>
                    <div className={cn("text-[10px] font-bold uppercase tracking-widest mb-2", i === 0 ? "text-white/70" : "text-[#FF5F57]")}>Before</div>
                    <p className={cn("text-sm leading-relaxed", i === 0 ? "text-white/80" : "text-[#4A4A5A]")}>{d.before}</p>
                  </div>
                  <div className={cn("rounded-xl p-4", i === 0 ? "bg-white/15" : "bg-[#F0FFF4]")}>
                    <div className={cn("text-[10px] font-bold uppercase tracking-widest mb-2", i === 0 ? "text-white/70" : "text-[#22C55E]")}>After</div>
                    <p className={cn("text-sm leading-relaxed", i === 0 ? "text-white/80" : "text-[#4A4A5A]")}>{d.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ──────────────────────────────────────────────── */}
      <section id="results" className="bg-white py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-[#E07B39]" />
            <span className="text-[#E07B39] text-xs font-bold tracking-[0.25em] uppercase">Results & Impact</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-5xl lg:text-6xl font-black text-[#0D0D0D] leading-tight mb-8" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                Numbers<br />don't lie.
              </h2>
              <p className="text-[#6B6B7A] leading-relaxed mb-12">
                All metrics vs. a 90-day pre-launch baseline. Statistical significance p&nbsp;&lt;&nbsp;0.05.
              </p>

              {/* Testimonial */}
              <div className="border-l-4 border-[#E07B39] pl-6">
                <div className="text-5xl text-[#E07B39]/30 leading-none mb-3">"</div>
                <blockquote className="text-[#0D0D0D] text-lg font-medium leading-relaxed mb-6" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  The redesign gave YouKraft the digital maturity our product and our customers always deserved.
                </blockquote>
                <div className="flex items-center gap-3">
                  <img src={image_manav_} alt="Manav Goel" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-[#0D0D0D] font-semibold text-sm" style={{ fontFamily: "'Satoshi', sans-serif" }}>Manav Goel</div>
                    <div className="text-[#6B6B7A] text-xs">Founder & CEO · YouKraft · Bengaluru</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              {METRICS.map((m, i) => (
                <div key={m.value}
                  className={cn("rounded-2xl p-7 border", i === 0 ? "bg-[#E07B39] border-transparent" : "bg-[#F7F7F9] border-black/8")}
                >
                  <div className={cn("text-4xl font-black leading-none mb-2", i === 0 ? "text-white" : "text-[#E07B39]")} style={{ fontFamily: "'Satoshi', sans-serif" }}>
                    {m.value}
                  </div>
                  <div className={cn("text-sm leading-relaxed whitespace-pre-line", i === 0 ? "text-white/70" : "text-[#6B6B7A]")}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REFLECTION ───────────────────────────────────────────── */}
      <section className="bg-[#F7F7F9] py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-[#E07B39]" />
            <span className="text-[#E07B39] text-xs font-bold tracking-[0.25em] uppercase">Reflection</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-[#0D0D0D] leading-tight mb-20" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            What I learned
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[
              { num: "I",   title: "Mobile isn't a channel — it's the channel.", body: "Over 70% of YouKraft's traffic is mobile-first. Re-centering every decision around the app — ordering, tracking, reordering — unlocked disproportionate impact.", highlight: false },
              { num: "II",  title: "Category depth is a UX problem, not just an IA one.", body: "With 6 categories serving different buyer mindsets, the navigation had to do real work. Giving each its own storefront pattern resolved confusion that a generic grid never could.", highlight: true },
              { num: "III", title: "Founders make the fastest stakeholders.", body: "Working directly with Manav and Rajib shortened every feedback loop. Seed-stage velocity is a design superpower — if you use it well.", highlight: false },
            ].map(item => (
              <div key={item.num} className={cn("rounded-2xl p-8 border bg-[#fcd0b3] bg-[#fcd5bc] bg-[#fcd7bf] bg-[#fcdeca] bg-[#fceade] bg-[#fcf7f3] bg-[#fcfcfc] bg-[#fdfdfd] bg-[#fefefe] bg-[#ffffff]", item.highlight ? "bg-[#E07B39] border-transparent" : "bg-white border-black/8")}>
                <div className={cn("text-6xl font-black leading-none mb-6 opacity-10 text-[#8e8e8e] text-[#8d8d8d] text-[#909090] text-[#959595] text-[#9e9e9e] text-[#a2a2a2] text-[#a4a4a4] text-[#a7a7a7] text-[#aaaaaa] text-[#acacac] text-[#aeaeae] text-[#b0b0b0] text-[#b2b2b2] text-[#adadad] text-[#a3a3a3] text-[#888888] text-[#616161] text-[#4d4d4d] text-[#444444] text-[#2c2c2c] text-[#222222] text-[#1e1e1e] text-[#1d1d1d] text-[#1b1b1b] text-[#1c1c1c] text-[#1f1f1f] text-[#242424] text-[#282828] text-[#2b2b2b] text-[#2e2e2e] text-[#343434] text-[#3d3d3d] text-[#4b4b4b] text-[#595959] text-[#626262] text-[#686868] text-[#6a6a6a] text-[#707070] text-[#757575] text-[#777777] text-[#7b7b7b] text-[#7c7c7c] text-[#797979] text-[#717171] text-[#606060] text-[#565656] text-[#4e4e4e] text-[#454545] text-[#424242] text-[#404040] text-[#3e3e3e] text-[#3f3f3f] text-[#464646] text-[#474747] text-[#484848] text-[#494949] text-[#4a4a4a] text-[#4c4c4c] text-[#4f4f4f]", item.highlight ? "text-white" : "text-[#0D0D0D]")} style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  {item.num}
                </div>
                <h3 className={cn("text-xl font-black leading-tight mb-4 text-[#393434] text-[#383333] text-[#353131] text-[#322e2e] text-[#2f2b2b] text-[#2f2c2c] text-[#302c2c] text-[#302d2d] text-[#332f2f] text-[#333030] text-[#343030]", item.highlight ? "text-white" : "text-[#0D0D0D]")} style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  {item.title}
                </h3>
                <p className={cn("text-sm leading-relaxed text-[#7b5f5fb3] text-[#7b5e5eb3] text-[#765b5bb3] text-[#705858b3] text-[#645151b3] text-[#5a4b4bb3] text-[#524646b3] text-[#4f4444b3] text-[#4d4343b3] text-[#4a4141b3] text-[#473f3fb3] text-[#463e3eb3] text-[#453e3eb3] text-[#443d3db3] text-[#433d3db3] text-[#433c3cb3] text-[#413b3bb3] text-[#403a3ab3] text-[#3f3939b3] text-[#3d3838b3] text-[#3b3636b3] text-[#393535b3] text-[#383434b3] text-[#373333b3] text-[#363333b3] text-[#363232b3] text-[#353232b3] text-[#353131b3] text-[#343131b3] text-[#383535b3] text-[#3c3939b3] text-[#444141b3] text-[#4c4949b3] text-[#504d4db3] text-[#555353b3] text-[#575555b3] text-[#595757b3] text-[#5a5858b3] text-[#5a5959b3] text-[#5b5959b3] text-[#5b5a5ab3] text-[#5c5b5bb3] text-[#5e5d5db3] text-[#605e5eb3] text-[#636161b3] text-[#656363b3] text-[#686666b3] text-[#6c6a6ab3] text-[#716e6eb3] text-[#787474b3] text-[#797575b3] text-[#807a7ab3] text-[#837d7db3] text-[#857e7eb3] text-[#867f7fb3] text-[#877f7fb3] text-[#888080b3] text-[#857d7db3] text-[#817979b3] text-[#7b7373b3] text-[#736c6cb3] text-[#716a6ab3] text-[#706969b3] text-[#6f6868b3] text-[#6e6767b3] text-[#6d6767b3] text-[#6d6666b3]", item.highlight ? "text-white/70" : "text-[#4A4A5A]")}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
            {[
              { icon: "🚀", title: "What shipped",      body: "Homepage, category storefronts, search, PDPs, cart, checkout, and the mobile app's live tracking screen — on youkraft.in and both app stores." },
              { icon: "💡", title: "If I did it again", body: "Run a JTBD workshop with contractors on day one. Their bulk-order workflow shaped back-end constraints we only discovered late in the engagement." },
              { icon: "📐", title: "What's next",       body: "Trade account dashboard with GST invoice management, multi-site delivery splitting, and project folder sharing for interior designers." },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-7 border border-black/8">
                <span className="text-2xl">{item.icon}</span>
                <h4 className="font-black text-[#0D0D0D] mt-4 mb-2" style={{ fontFamily: "'Satoshi', sans-serif" }}>{item.title}</h4>
                <p className="text-sm text-[#4A4A5A] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="bg-[#E07B39]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div>
              <div className="text-white/60 text-xs font-bold tracking-[0.25em] uppercase mb-4">Next steps</div>
              <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                Let's build<br />something bold.
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              
              
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs">
            <span>© 2022 · Case Study </span>
            <span>YouKraft — Home Improvement Marketplace · Bengaluru, India · Founded 2021</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
