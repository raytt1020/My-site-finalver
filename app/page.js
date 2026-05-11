"use client";

import { useEffect, useRef, useState } from "react";

// ---------- Scroll Animation Hook ----------
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up, .fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ---------- Parallax Hook ----------
function useParallax() {
  useEffect(() => {
    const hero = document.getElementById("hero-bg");
    const handleScroll = () => {
      if (hero) {
        hero.style.transform = `translateY(${window.scrollY * 0.42}px) scale(1.15)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}

// ---------- Smooth scroll helper ----------
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ---------- Navigation ----------
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "glass-nav py-3" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`font-['Playfair_Display'] font-bold text-lg tracking-tight transition-all duration-700 ${
            scrolled ? "text-[#064e3b]" : "text-white"
          }`}
        >
          Stanley Park
        </button>
        <div className="hidden md:flex gap-10">
          {[
            { label: "Icons", id: "icons" },
            { label: "Seasons", id: "seasons" },
            { label: "Dining", id: "dining" },
            { label: "Visit", id: "visit" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.id)}
              className={`text-xs font-medium tracking-[0.15em] uppercase transition-all duration-500 hover:opacity-60 ${
                scrolled ? "text-[#064e3b]" : "text-white/80"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTo("visit")}
          className={`text-xs font-semibold tracking-[0.12em] uppercase px-5 py-2.5 rounded-full transition-all duration-500 hover:scale-105 ${
            scrolled
              ? "bg-[#064e3b] text-white hover:bg-[#065f46]"
              : "bg-white/15 text-white border border-white/30 hover:bg-white/25"
          }`}
        >
          Plan Visit
        </button>
      </div>
    </nav>
  );
}

// ---------- Hero ----------
// Confirmed Unsplash: Kyle Thacker – Stanley Park seawall winding road
const HERO_IMG = "https://images.unsplash.com/photo-1541369866856-c4f5aa6f5807?w=1800&q=90&fit=crop";

function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
      <div
        id="hero-bg"
        className="absolute inset-0 origin-top"
        style={{ willChange: "transform" }}
      >
        <img src={HERO_IMG} alt="Stanley Park Seawall" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 pb-24 md:pb-32 w-full">
        <p className="text-[#d4a853] text-xs font-semibold tracking-[0.3em] uppercase mb-6">
          Vancouver · British Columbia
        </p>
        <h1 className="font-['Playfair_Display'] text-white font-black text-6xl md:text-8xl lg:text-9xl leading-[0.92] mb-8 max-w-4xl">
          Nature,
          <br />
          <span className="italic font-normal">Redefined.</span>
        </h1>
        <p className="text-white/70 text-lg md:text-xl font-light max-w-xl leading-relaxed mb-12">
          1,001 acres of ancient rainforest, dramatic sea cliffs, and living
          Indigenous heritage — steps from the city skyline.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollTo("icons")}
            className="group relative px-8 py-4 bg-[#d4a853] text-[#022c22] font-semibold text-sm tracking-wide rounded-full hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4a853]/30"
          >
            Explore the Park
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
          <button
            onClick={() =>
              window.open(
                "https://www.youtube.com/results?search_query=stanley+park+vancouver+4k",
                "_blank"
              )
            }
            className="px-8 py-4 border border-white/30 text-white font-light text-sm tracking-wide rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-500"
          >
            ▶ Watch the Story
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div className="w-px h-12 bg-gradient-to-b from-white/0 to-white/50" />
        <span className="text-white/40 text-[10px] tracking-[0.25em] uppercase">Scroll</span>
      </div>
    </section>
  );
}

// ---------- Intro ----------
function Intro() {
  return (
    <section className="py-28 md:py-40 bg-[#faf9f6]">
      <div className="max-w-5xl mx-auto px-8 text-center">
        <div className="rule-gold mb-16 mx-auto max-w-xs" />
        <p className="text-[#064e3b] text-xs font-semibold tracking-[0.3em] uppercase mb-8 fade-up">
          The Emerald Heart
        </p>
        <h2 className="font-['Playfair_Display'] text-[#022c22] text-4xl md:text-6xl font-bold leading-[1.1] mb-10 fade-up delay-100">
          A sanctuary that has stood
          <br />
          <span className="italic font-normal text-[#064e3b]">for ten thousand years.</span>
        </h2>
        <p className="text-neutral-500 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto fade-up delay-200">
          Established in 1888, Stanley Park remains one of the most extraordinary urban parks on
          Earth — a place where the Pacific temperate rainforest meets the tidal pulse of Burrard
          Inlet, and where the Squamish and Tsleil-Waututh peoples' stories echo through every
          ancient cedar.
        </p>
        <div className="rule-gold mt-16 mx-auto max-w-xs" />
      </div>
    </section>
  );
}

// ---------- Icons ----------
// Confirmed Unsplash photos actually taken at Stanley Park:
// Totem poles: Itsuka Iwaki (photo-1707807525886-b0b72b9e3043) – Stanley Park, Vancouver
// Lighthouse: use seawall view (confirmed Stanley Park, Kyle Thacker)
// Siwash Rock: Vancouver skyline from rocky Stanley Park shore (Filipe Freitas photo-1682460451500-1287a2eb2856)
const icons = [
  {
    name: "Brockton Point Lighthouse",
    tagline: "静寂を照らす、赤と白の詩。",
    subtitle: "A poem in red and white, illuminating silence.",
    desc: "Since 1914, this iconic red-and-white lighthouse has guided mariners through First Narrows. Its nine-second flash cuts through Pacific fog — a heartbeat of light standing watch at the edge of the world.",
    img: "https://images.unsplash.com/photo-1541369866856-c4f5aa6f5807?w=900&q=85&fit=crop&crop=top",
    stat: "Est. 1914",
    link: "https://vancouver.ca/parks-recreation-culture/brockton-point-lighthouse.aspx",
  },
  {
    name: "Totem Poles",
    tagline: "受け継がれる、魂の彫刻。",
    subtitle: "Sculptures of the soul, passed down through generations.",
    desc: "Nine towering totem poles at Brockton Point stand as vibrant embodiments of First Nations art and storytelling — cedar monuments connecting the living with ancestral spirits of the Pacific Northwest.",
    // Confirmed: Itsuka Iwaki, Stanley Park, Vancouver — Feb 2024
    img: "https://images.unsplash.com/photo-1707807525886-b0b72b9e3043?w=900&q=85&fit=crop",
    stat: "9 Poles",
    link: "https://vancouver.ca/parks-recreation-culture/totems-and-first-nations-art.aspx",
  },
  {
    name: "Siwash Rock",
    tagline: "波に耐え、孤独に輝く不朽の象徴。",
    subtitle: "An eternal symbol, enduring waves, shining in solitude.",
    desc: "Rising 15 metres from the Seawall, this 32-million-year-old sea stack is sacred to the Squamish Nation — the transformed warrior Skalsh, immortalised for his selflessness by the transformer Xals.",
    // Confirmed: Filipe Freitas, Vancouver skyline from Stanley Park rocky shore — Apr 2023
    img: "https://images.unsplash.com/photo-1682460451500-1287a2eb2856?w=900&q=85&fit=crop",
    stat: "15 m High",
    link: "https://vancouver.ca/parks-recreation-culture/landmarks-in-stanley-park.aspx",
  },
];

function Icons() {
  return (
    <section id="icons" className="py-24 md:py-36 bg-[#022c22]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-20">
          <p className="text-[#d4a853] text-xs font-semibold tracking-[0.3em] uppercase mb-5 fade-up">
            The Icons
          </p>
          <h2 className="font-['Playfair_Display'] text-white text-4xl md:text-6xl font-bold leading-[1.05] fade-up delay-100">
            Landmarks forged
            <br />
            <span className="italic font-normal text-[#d4a853]">by time and tide.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {icons.map((icon, i) => (
            <div
              key={icon.name}
              className={`icon-card group rounded-3xl overflow-hidden bg-[#033d2e] fade-up delay-${(i + 1) * 100} cursor-pointer`}
              onClick={() => window.open(icon.link, "_blank")}
            >
              <div className="relative h-64 overflow-hidden">
                <img src={icon.img} alt={icon.name} className="icon-img w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#033d2e] via-transparent to-transparent" />
                <span className="absolute top-5 right-5 bg-[#d4a853]/90 text-[#022c22] text-xs font-bold px-3 py-1.5 rounded-full">
                  {icon.stat}
                </span>
                <span className="absolute top-5 left-5 bg-white/10 text-white/60 text-[10px] px-2 py-1 rounded-full tracking-wider">
                  TAP TO LEARN MORE
                </span>
              </div>
              <div className="p-8">
                <h3 className="font-['Playfair_Display'] text-white text-2xl font-bold mb-3 leading-tight">
                  {icon.name}
                </h3>
                <p className="text-[#d4a853] text-sm font-medium mb-1">{icon.tagline}</p>
                <p className="text-white/40 text-xs italic mb-5">{icon.subtitle}</p>
                <p className="text-white/60 text-sm font-light leading-relaxed">{icon.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Stats ----------
function Stats() {
  const stats = [
    { value: "1,001", label: "Acres of Wilderness" },
    { value: "27 km", label: "Of Scenic Seawall" },
    { value: "8M+", label: "Annual Visitors" },
    { value: "135+", label: "Years of History" },
  ];
  return (
    <section className="py-16 bg-[#064e3b]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={s.label} className={`text-center fade-up delay-${i * 100}`}>
              <p className="font-['Playfair_Display'] text-white text-4xl md:text-5xl font-black mb-2 gold-shimmer">
                {s.value}
              </p>
              <p className="text-white/50 text-xs tracking-[0.15em] uppercase font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Seasons ----------
const seasons = [
  {
    season: "Spring",
    title: "Cherry Blossom Season",
    desc: "In late March, Japanese cherry trees along Pipeline Road explode into clouds of pale pink. The contrast of blossoms against ancient Douglas firs is nothing short of miraculous.",
    // Vancouver cherry blossoms in a park
    img: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=700&q=85&fit=crop",
    accent: "#e8a0b4",
    months: "Mar — May",
    mapLink: "https://www.google.com/maps/place/Stanley+Park+Rose+Garden/@49.3003,-123.1432,17z",
  },
  {
    season: "Summer",
    title: "Seawall Cycling",
    desc: "The 9 km Seawall loops the entire park perimeter — cyclists glide past Lions Gate Bridge, English Bay, and the roaring surf of Third Beach as the sun sets behind Vancouver Island.",
    // Confirmed Stanley Park Seawall road
    img: "https://images.unsplash.com/photo-1541369866856-c4f5aa6f5807?w=700&q=85&fit=crop&crop=center",
    accent: "#7ab8d4",
    months: "Jun — Aug",
    mapLink: "https://www.google.com/maps/place/Stanley+Park+Seawall/@49.3017,-123.1407,15z",
  },
  {
    season: "Autumn",
    title: "Lost Lagoon Foliage",
    desc: "The old-growth maples surrounding Lost Lagoon ignite in amber and crimson. Great Blue Herons stalk the misty shallows, and the air carries the sweet decay of ten thousand fallen leaves.",
    // Autumn forest reflection lake
    img: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=700&q=85&fit=crop",
    accent: "#d4891a",
    months: "Sep — Nov",
    mapLink: "https://www.google.com/maps/place/Lost+Lagoon,+Vancouver,+BC/@49.2966,-123.1403,16z",
  },
  {
    season: "Winter",
    title: "Bright Nights",
    desc: "Each December, over a million lights transform Stanley Park into a twinkling wonderland. Horse-drawn carriages clip through illuminated tunnels of cedar, and hot cocoa warms frozen hands.",
    // Winter Christmas lights
    img: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=700&q=85&fit=crop",
    accent: "#5b8dd9",
    months: "Dec — Feb",
    mapLink: "https://vancouver.ca/parks-recreation-culture/bright-nights-train.aspx",
  },
];

function Seasons() {
  return (
    <section id="seasons" className="py-24 md:py-36 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <p className="text-[#064e3b] text-xs font-semibold tracking-[0.3em] uppercase mb-5 fade-up">
            Seasonal Experience
          </p>
          <h2 className="font-['Playfair_Display'] text-[#022c22] text-4xl md:text-6xl font-bold leading-[1.08] fade-up delay-100">
            Four seasons,
            <br />
            <span className="italic font-normal">infinite wonder.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {seasons.map((s, i) => (
            <div
              key={s.season}
              className={`season-card group rounded-3xl overflow-hidden bg-white shadow-sm fade-up delay-${i % 2 === 0 ? 100 : 200} cursor-pointer`}
              onClick={() => window.open(s.mapLink, "_blank")}
            >
              <div className="relative h-56 overflow-hidden">
                <img src={s.img} alt={s.title} className="icon-img w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span
                  className="absolute top-5 left-5 text-xs font-bold px-3 py-1.5 rounded-full text-white"
                  style={{ background: s.accent }}
                >
                  {s.months}
                </span>
                <span className="absolute top-5 right-5 bg-white/15 text-white text-[10px] px-2 py-1 rounded-full tracking-wider">
                  TAP TO EXPLORE
                </span>
              </div>
              <div className="p-8">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: s.accent }}>
                  {s.season}
                </p>
                <h3 className="font-['Playfair_Display'] text-[#022c22] text-2xl font-bold mb-4 leading-tight">
                  {s.title}
                </h3>
                <p className="text-neutral-500 text-sm font-light leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Quote ----------
function Quote() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden" style={{ background: "#064e3b" }}>
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=80&fit=crop"
          alt="Forest canopy"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        <p className="text-[#d4a853] text-4xl mb-8 float-slow">✦</p>
        <blockquote className="font-['Playfair_Display'] text-white text-3xl md:text-5xl font-bold italic leading-[1.15] mb-10 fade-up">
          "The forest is not a resource for us,
          <br />
          it is life itself."
        </blockquote>
        <p className="text-white/40 text-sm tracking-[0.2em] uppercase fade-up delay-100">
          — Squamish Nation Elder
        </p>
      </div>
    </section>
  );
}

// ---------- Dining ----------
const venues = [
  {
    name: "Stanley's Bar & Grill",
    type: "Casual Dining",
    desc: "Perched beside the pitch-and-putt course, Stanley's serves craft burgers, coastal seafood, and BC craft beers with sweeping views of the park meadows. A beloved gathering place since 1983.",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85&fit=crop",
    tags: ["Lunch", "Dinner", "Patio"],
    link: "https://www.stanleybarandgrill.com/",
    phone: "tel:+16046022997",
    mapsLink: "https://www.google.com/maps/place/Stanley's+Bar+%26+Grill/@49.2987,-123.1392,17z",
  },
  {
    name: "The Teahouse",
    type: "Fine Dining",
    desc: "Housed in a historic 1930s military building at Ferguson Point, The Teahouse offers white-tablecloth dining with panoramic views of English Bay — watching the sun sink behind Vancouver Island has never tasted so exquisite.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=85&fit=crop",
    tags: ["Brunch", "Dinner", "Sunset Views"],
    link: "https://www.teahouserestaurant.ca/",
    phone: "tel:+16046693281",
    mapsLink: "https://www.google.com/maps/place/The+Teahouse+in+Stanley+Park/@49.3011,-123.1636,17z",
  },
];

function Dining() {
  return (
    <section id="dining" className="py-24 md:py-36 bg-[#022c22]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-20">
          <p className="text-[#d4a853] text-xs font-semibold tracking-[0.3em] uppercase mb-5 fade-up">
            Lifestyle & Dining
          </p>
          <h2 className="font-['Playfair_Display'] text-white text-4xl md:text-6xl font-bold leading-[1.08] fade-up delay-100">
            The art of
            <br />
            <span className="italic font-normal text-[#d4a853]">supreme repose.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {venues.map((v, i) => (
            <div
              key={v.name}
              className={`icon-card group rounded-3xl overflow-hidden bg-[#033d2e] fade-up delay-${(i + 1) * 150}`}
            >
              <div className="relative h-72 overflow-hidden">
                <img src={v.img} alt={v.name} className="icon-img w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#033d2e] via-[#033d2e]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <span className="text-[#d4a853] text-xs font-semibold tracking-[0.2em] uppercase mb-2 block">
                    {v.type}
                  </span>
                  <h3 className="font-['Playfair_Display'] text-white text-3xl font-bold leading-tight">
                    {v.name}
                  </h3>
                </div>
              </div>
              <div className="p-7 pt-5">
                <p className="text-white/55 text-sm font-light leading-relaxed mb-6">{v.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {v.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-full border border-[#d4a853]/30 text-[#d4a853]">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => window.open(v.link, "_blank")}
                    className="flex-1 py-3 bg-[#d4a853] text-[#022c22] text-xs font-bold tracking-widest uppercase rounded-full hover:scale-105 transition-all duration-500"
                  >
                    Reserve a Table
                  </button>
                  <button
                    onClick={() => window.open(v.mapsLink, "_blank")}
                    className="px-5 py-3 border border-white/20 text-white/60 text-xs rounded-full hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    📍 Map
                  </button>
                  <a
                    href={v.phone}
                    className="px-5 py-3 border border-white/20 text-white/60 text-xs rounded-full hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    📞
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Visit CTA ----------
function Visit() {
  return (
    <section id="visit" className="py-24 md:py-40 bg-[#faf9f6] relative overflow-hidden">
      <div className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full bg-[#064e3b]/5 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#d4a853]/8 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
        <p className="text-[#064e3b] text-xs font-semibold tracking-[0.3em] uppercase mb-6 fade-up">
          Begin Your Journey
        </p>
        <h2 className="font-['Playfair_Display'] text-[#022c22] text-5xl md:text-7xl font-black leading-[0.95] mb-8 fade-up delay-100">
          The park is
          <br />
          always open.
        </h2>
        <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl mx-auto mb-14 fade-up delay-200">
          Stanley Park is free to enter, open 24 hours, 365 days a year. The Seawall is accessible
          to cyclists, pedestrians, and inline skaters. Parking is available near the park entrances.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center fade-up delay-300">
          <button
            onClick={() =>
              window.open(
                "https://www.google.com/maps/place/Stanley+Park/@49.3017,-123.1418,14z",
                "_blank"
              )
            }
            className="group px-10 py-5 bg-[#064e3b] text-white font-semibold text-sm tracking-wide rounded-full hover:bg-[#065f46] hover:scale-105 transition-all duration-500 shadow-2xl shadow-[#064e3b]/20"
          >
            Get Directions ↗
          </button>
          <button
            onClick={() =>
              window.open(
                "https://vancouver.ca/files/cov/stanley-park-trails-map.pdf",
                "_blank"
              )
            }
            className="group px-10 py-5 border-2 border-[#064e3b] text-[#064e3b] font-semibold text-sm tracking-wide rounded-full hover:bg-[#064e3b] hover:text-white hover:scale-105 transition-all duration-500"
          >
            Download Trail Map
          </button>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            {
              icon: "🌲",
              title: "Getting There",
              body: "West Georgia St. or Stanley Park Causeway. Bus 19 from downtown. Bike-share available at multiple entry points.",
              link: "https://www.google.com/maps/place/Stanley+Park/@49.3017,-123.1418,14z",
              cta: "View on Map",
            },
            {
              icon: "🕐",
              title: "Hours",
              body: "Open 24 hours, every day of the year. Teahouse and Stanley's Bar & Grill maintain their own seasonal hours.",
              link: "https://vancouver.ca/parks-recreation-culture/stanley-park.aspx",
              cta: "Park Info",
            },
            {
              icon: "💚",
              title: "Entry",
              body: "The park is free for walkers and cyclists. Parking fees apply. Seawall rental bikes available from $10/hour.",
              link: "https://vancouver.ca/parks-recreation-culture/stanley-park-bike-rentals.aspx",
              cta: "Bike Rentals",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-3xl p-8 shadow-sm fade-up">
              <span className="text-3xl mb-4 block">{item.icon}</span>
              <h3 className="font-['Playfair_Display'] text-[#022c22] font-bold text-lg mb-3">{item.title}</h3>
              <p className="text-neutral-500 text-sm font-light leading-relaxed mb-5">{item.body}</p>
              <button
                onClick={() => window.open(item.link, "_blank")}
                className="text-[#064e3b] text-xs font-semibold tracking-widest uppercase hover:opacity-60 transition-opacity"
              >
                {item.cta} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="bg-[#022c22] py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-['Playfair_Display'] text-white text-2xl font-bold mb-1 hover:opacity-70 transition-opacity"
            >
              Stanley Park
            </button>
            <p className="text-white/30 text-sm">Vancouver, British Columbia, Canada</p>
          </div>
          <p className="text-[#d4a853] text-sm italic font-light max-w-xs">
            "We are all visitors to this time, this place."
          </p>
        </div>
        <div className="rule-gold mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © 2025 Stanley Park. Unceded territory of the Squamish, Tsleil-Waututh, and Musqueam peoples.
          </p>
          <div className="flex gap-6">
            <button
              onClick={() => window.open("https://vancouver.ca/parks-recreation-culture/stanley-park.aspx", "_blank")}
              className="text-white/30 text-xs hover:text-white/60 transition-colors"
            >
              Official Site
            </button>
            <button
              onClick={() => window.open("https://stanleyparkecology.ca", "_blank")}
              className="text-white/30 text-xs hover:text-white/60 transition-colors"
            >
              Ecology Society
            </button>
            <button
              onClick={() => window.open("https://www.instagram.com/explore/tags/stanleypark/", "_blank")}
              className="text-white/30 text-xs hover:text-white/60 transition-colors"
            >
              Instagram
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---------- Main ----------
export default function Page() {
  useScrollReveal();
  useParallax();

  return (
    <main>
      <Nav />
      <Hero />
      <Intro />
      <Icons />
      <Stats />
      <Seasons />
      <Quote />
      <Dining />
      <Visit />
      <Footer />
    </main>
  );
}
