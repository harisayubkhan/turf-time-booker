import { createFileRoute, Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { ArrowDownRight, ArrowRight, CalendarCheck2, CircleCheck, Clock3, LockKeyhole, TrendingUp, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useBookings } from "@/lib/booking-context";
import { dateKey, priceLabel, slotHours, timeLabel, venues } from "@/lib/turf-data";

export const Route = createFileRoute("/manager")({
  head: () => ({ meta: [{ title: "Manager Dashboard | Pitchside" }, { name: "description", content: "Demo manager schedule, bookings, revenue, and available 5-a-side football slots." }, { property: "og:title", content: "Manager Dashboard | Pitchside" }, { property: "og:description", content: "View today's football turf schedule and booking activity in the Pitchside demo." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: ManagerDashboard,
});

function ManagerDashboard() {
  const { reservations, cancel, block } = useBookings();
  const today = new Date();
  const todayReservations = reservations.filter((item) => item.date === dateKey(today)).sort((a, b) => a.hour - b.hour);
  const booked = todayReservations.filter((item) => item.status === "booked");
  const revenue = booked.reduce((sum, item) => sum + (venues.find((venue) => venue.id === item.venueId)?.price ?? 0), 0);
  const available = venues.length * slotHours.length - todayReservations.length;

  return <main className="page-content"><div className="container manager-page">
    <div className="manager-heading"><div><p className="eyebrow">PITCHSIDE / MANAGER</p><h1>Today's playbook<span className="heading-period">.</span></h1><p>Here’s what’s happening across your pitches today.</p></div><div className="manager-date"><CalendarCheck2 size={18} /> {format(today, "EEEE, d MMMM yyyy")}</div></div>
    <div className="metric-grid"><div className="metric-card"><div className="metric-top"><span>TODAY'S REVENUE</span><TrendingUp size={19} /></div><strong>{priceLabel(revenue)}</strong><p>From confirmed bookings</p></div><div className="metric-card"><div className="metric-top"><span>TOTAL BOOKINGS</span><CalendarCheck2 size={19} /></div><strong>{booked.length.toString().padStart(2, "0")}</strong><p>Scheduled for today</p></div><div className="metric-card"><div className="metric-top"><span>AVAILABLE SLOTS</span><Clock3 size={19} /></div><strong>{available.toString().padStart(2, "0")}</strong><p>Across {venues.length} pitches today</p></div></div>
    <div className="schedule-heading"><div><p className="eyebrow">LIVE SCHEDULE</p><h2>Today's bookings</h2></div><span>{todayReservations.length} scheduled slots</span></div>
    {todayReservations.length === 0 ? <div className="empty-state"><CalendarCheck2 size={30} /><h3>No bookings today</h3><p>Your schedule is clear. New reservations will show up here.</p><Button asChild><Link to="/">Browse turfs <ArrowRight /></Link></Button></div> : <div className="schedule-list"><div className="schedule-column-head"><span>TIME / VENUE</span><span>BOOKED BY</span><span>STATUS</span><span>ACTIONS</span></div>{todayReservations.map((item) => { const venue = venues.find((entry) => entry.id === item.venueId); return <div className="schedule-row" key={item.id}><div className="schedule-time"><strong>{timeLabel(item.hour)} – {timeLabel(item.hour + 1)}</strong><span>{venue?.name}</span></div><div className="schedule-person"><span className="person-avatar">{item.status === "blocked" ? <LockKeyhole size={14} /> : item.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><span>{item.name}</span></div><div><span className={`status-pill ${item.status === "blocked" ? "status-blocked" : ""}`}>{item.status === "blocked" ? <LockKeyhole size={13} /> : <CircleCheck size={13} />}{item.status === "blocked" ? "Blocked" : "Confirmed"}</span></div><div className="schedule-actions"><Button variant="outline" size="sm" disabled={item.status === "blocked"} onClick={() => { block(item.id); toast.info("Slot blocked", { description: "This slot is no longer available to book." }); }}><LockKeyhole size={14} /> Block slot</Button><Button variant="ghost" size="sm" onClick={() => { cancel(item.id); toast.success("Booking cancelled", { description: "The slot is available again." }); }}><X size={14} /> Cancel booking</Button></div></div>; })}</div>}
    <div className="manager-footer"><span><ArrowDownRight size={17} /> Demo data resets when the page is refreshed</span><Button variant="link" asChild><Link to="/">Explore turfs <ArrowRight /></Link></Button></div>
  </div></main>;
}