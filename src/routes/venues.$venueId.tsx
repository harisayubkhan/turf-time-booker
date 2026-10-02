import { createFileRoute, Link } from "@tanstack/react-router";
import { addDays, format, startOfWeek } from "date-fns";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, Lightbulb, MapPin, ShieldCheck, Users, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useBookings } from "@/lib/booking-context";
import { dateKey, priceLabel, slotHours, timeLabel, venues } from "@/lib/turf-data";

export const Route = createFileRoute("/venues/$venueId")({
  head: ({ params }) => {
    const venue = venues.find((item) => item.id === params.venueId);
    const title = `${venue?.name ?? "Venue"} | Pitchside`;
    const description = `View available 5-a-side football slots at ${venue?.name ?? "a Pitchside turf"} in Islamabad.`;
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: VenueDetails,
});

function VenueDetails() {
  const { venueId } = Route.useParams();
  const venue = venues.find((item) => item.id === venueId);
  const { reservations, reserve } = useBookings();
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const today = new Date();
  const weekStart = addDays(startOfWeek(today, { weekStartsOn: 1 }), weekOffset * 7);
  const days = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));

  if (!venue) return <main className="container page-pad"><div className="empty-state"><h1>Turf not found</h1><p>This venue is not in our demo listings.</p><Button asChild><Link to="/">Browse turfs</Link></Button></div></main>;

  const currentVenue = venue;
  const bookedForDay = reservations.filter((item) => item.venueId === currentVenue.id && item.date === dateKey(selectedDate));
  const availableCount = slotHours.length - bookedForDay.length;

  function confirmBooking() {
    if (selectedHour === null) return;
    const success = reserve(currentVenue.id, dateKey(selectedDate), selectedHour);
    setSelectedHour(null);
    if (success) toast.success("Reservation confirmed!", { description: `${currentVenue.name} · ${format(selectedDate, "d MMM")} at ${timeLabel(selectedHour)}` });
    else toast.error("That slot is no longer available.");
  }

  return (
    <main className="page-content">
      <div className="container detail-wrap">
        <Link to="/" className="back-link"><ArrowLeft size={16} /> Back to turfs</Link>
        <div className="detail-hero">
          <img src={currentVenue.image} alt={`${currentVenue.name} football pitch`} width={1280} height={850} className="detail-photo" />
          <div className="detail-image-label"><span className="live-dot" /> READY FOR KICKOFF</div>
        </div>
        <div className="detail-heading-row">
          <div><p className="eyebrow">THE PITCH / ISLAMABAD</p><h1>{currentVenue.name}</h1><p className="detail-address"><MapPin size={16} />{currentVenue.address}</p></div>
          <div className="detail-rate"><span>STARTING FROM</span><strong>{priceLabel(currentVenue.price)}</strong><small>/ hour</small></div>
        </div>
        <div className="amenity-list">{currentVenue.amenities.map((amenity) => <span key={amenity} className="amenity"><Check size={14} />{amenity}</span>)}</div>

        <section className="booking-section" aria-labelledby="booking-title">
          <div className="section-top"><div><p className="eyebrow">MAKE IT HAPPEN</p><h2 id="booking-title">Find your time on the pitch<span className="heading-period">.</span></h2><p>Pick a day, grab a slot, and get the squad together.</p></div><span className="duration-note"><Clock3 size={16} /> 60-minute sessions</span></div>
          <div className="calendar-panel">
            <div className="calendar-header"><div><CalendarDays size={19} /><strong>{format(selectedDate, "MMMM yyyy")}</strong><span className="calendar-week">Week of {format(weekStart, "d MMM")}</span></div><div className="calendar-controls"><Button variant="outline" size="icon" aria-label="Previous week" disabled={weekOffset === 0} onClick={() => setWeekOffset((value) => value - 1)}><ArrowLeft /></Button><Button variant="outline" size="icon" aria-label="Next week" disabled={weekOffset === 3} onClick={() => setWeekOffset((value) => value + 1)}><ArrowRight /></Button></div></div>
            <div className="calendar-days">{days.map((day) => { const past = dateKey(day) < dateKey(today); const active = dateKey(day) === dateKey(selectedDate); return <Button key={dateKey(day)} variant="ghost" disabled={past} onClick={() => setSelectedDate(day)} className={`day-cell ${active ? "day-cell-active" : ""}`} aria-pressed={active}><span>{format(day, "EEE")}</span><strong>{format(day, "d")}</strong><small>{dateKey(day) === dateKey(today) ? "Today" : "\u00a0"}</small></Button>; })}</div>
          </div>
          <div className="slots-header"><div><h3>{format(selectedDate, "EEEE, d MMMM")}</h3><p>All times are Pakistan Standard Time (PKT)</p></div><span className="available-indicator"><span /> {availableCount} available</span></div>
          <div className="slots-grid">{slotHours.map((hour) => { const reservation = bookedForDay.find((item) => item.hour === hour); return <Button key={hour} variant="outline" disabled={Boolean(reservation)} onClick={() => setSelectedHour(hour)} className={`slot-button ${reservation ? "slot-booked" : ""}`}><span className="slot-time">{timeLabel(hour)}</span><span className="slot-status">{reservation ? reservation.status === "blocked" ? "Blocked" : "Booked" : "Available"}{!reservation && <ArrowRight size={15} />}</span></Button>; })}</div>
          <div className="booking-footnote"><ShieldCheck size={17} /><span>No payment needed now. Settle up at the venue.</span></div>
        </section>
      </div>

      <Dialog open={selectedHour !== null} onOpenChange={(open) => { if (!open) setSelectedHour(null); }}>
        <DialogContent className="booking-dialog"><DialogHeader><p className="eyebrow">YOU'RE ONE STEP AWAY</p><DialogTitle>Confirm your game<span className="heading-period">.</span></DialogTitle><DialogDescription>Review the details before you lock in the pitch.</DialogDescription></DialogHeader>
          <div className="dialog-venue"><img src={currentVenue.image} alt="" width={1280} height={850} /><div><strong>{currentVenue.name}</strong><span><MapPin size={13} /> {currentVenue.area}</span></div></div>
          <div className="dialog-detail-grid"><div><span>DATE</span><strong>{format(selectedDate, "EEE, d MMM yyyy")}</strong></div><div><span>TIME</span><strong>{selectedHour !== null ? timeLabel(selectedHour) : ""} – {selectedHour !== null ? timeLabel(selectedHour + 1) : ""}</strong></div></div>
          <div className="cost-breakdown"><div><span>Pitch rental · 60 min</span><strong>{priceLabel(currentVenue.price)}</strong></div><div className="total-line"><span>Total cost</span><strong>{priceLabel(currentVenue.price)}</strong></div></div>
          <div className="split-panel"><div className="split-icon"><Users size={21} /></div><div><span>SPLIT THE COST</span><strong>{priceLabel(currentVenue.price / 10)} <small>/ player</small></strong><p>Based on 10 players sharing the pitch.</p></div></div>
          <Button size="lg" className="confirm-button" onClick={confirmBooking}>Confirm reservation <ArrowRight /></Button><p className="dialog-disclaimer">Demo booking only · No payment will be taken</p>
        </DialogContent>
      </Dialog>
    </main>
  );
}