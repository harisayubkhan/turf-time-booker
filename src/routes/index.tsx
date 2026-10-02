import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Clock3, MapPin, Search, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { priceLabel, venues, type Venue } from "@/lib/turf-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Find Your Pitch | Pitchside Islamabad" }, { name: "description", content: "Discover and book 5-a-side football turfs in Islamabad. Browse local pitches, compare rates, and find your next game." }, { property: "og:title", content: "Find Your Pitch | Pitchside Islamabad" }, { property: "og:description", content: "Discover local 5-a-side football turfs in Islamabad and find your next game." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Home,
});

function VenueCard({ venue }: { venue: Venue }) {
  return <Link to="/venues/$venueId" params={{ venueId: venue.id }} className="venue-card"><div className="venue-image-wrap"><img src={venue.image} alt={`${venue.name} football turf`} loading="lazy" width={1280} height={850} /><span className="venue-tag">{venue.tag}</span></div><div className="venue-card-body"><div className="venue-card-heading"><h3>{venue.name}</h3><span className="card-arrow"><ArrowRight size={18} /></span></div><p className="venue-location"><MapPin size={15} /> {venue.area}</p><div className="venue-card-bottom"><span><Clock3 size={15} /> 60 min sessions</span><div><strong>{priceLabel(venue.price)}</strong><small> / hr</small></div></div></div></Link>;
}

function Home() {
  const [query, setQuery] = useState("");
  const filtered = venues.filter((venue) => `${venue.name} ${venue.area} ${venue.address}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <main className="page-content"><section className="home-hero"><div className="hero-photo"><img src={venues[0].image} alt="Football turf under the evening sky in Islamabad" width={1280} height={850} /></div><div className="container hero-inner"><div className="hero-copy"><span className="hero-kicker"><span className="live-dot" /> ISLAMABAD'S GAME STARTS HERE</span><h1>Find your pitch.<br /><em>Own the game.</em></h1><p>Great games start with a great pitch. Discover local 5-a-side turfs, pick your time, and get playing.</p><a href="#turfs" className="hero-cta">Explore turfs <ArrowRight size={19} /></a></div><div className="hero-bottom"><span>PLAY MORE. PLAN LESS.</span><span>01 / DISCOVER</span></div></div></section>
    <section className="discovery-section" id="turfs"><div className="container"><div className="section-top discover-heading"><div><p className="eyebrow">YOUR NEXT MATCH AWAITS</p><h2>Find a turf near you<span className="heading-period">.</span></h2><p>Quality pitches, good times, and a game worth showing up for.</p></div><span className="venue-count">{filtered.length.toString().padStart(2, "0")} TURFS FOUND</span></div><div className="search-row"><div className="search-field"><Search size={20} /><Input aria-label="Search by location or turf name" placeholder="Search by location or turf name..." value={query} onChange={(event) => setQuery(event.target.value)} />{query && <Button variant="ghost" size="icon" aria-label="Clear search" onClick={() => setQuery("")}><X /></Button>}</div><span className="search-area"><MapPin size={16} /> Islamabad, PK</span></div>{filtered.length ? <div className="venue-grid">{filtered.map((venue) => <VenueCard key={venue.id} venue={venue} />)}</div> : <div className="empty-state"><Search size={30} /><h3>No turfs found</h3><p>Try another location or turf name.</p><Button variant="outline" onClick={() => setQuery("")}>Clear search</Button></div>}</div></section>
    <section className="bottom-band"><div className="container bottom-band-inner"><div><span><Sparkles size={16} /> THE BEAUTIFUL GAME, MADE SIMPLE</span><h2>Less organising.<br />More playing.</h2></div><p>Your next match is only a few taps away. Find your spot and bring your squad.</p></div></section>
  </main>;
}