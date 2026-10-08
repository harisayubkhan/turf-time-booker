# Turf Time Booker

Build a frontend-only skeleton prototype for a local 5-a-side football turf booking app. The app must be fully responsive (mobile-first, but works on tablet and desktop) and use realistic static mock data with no backend connection. Use a modern, sporty, and clean UI design system.



Please create the following screens with clear navigation between them:



1. Home / Venue Discovery Page: 

- A top navigation bar with a logo and a user profile avatar.

- A search bar for filtering by location.

- A responsive grid of Turf Venue Cards. Each card should show a mock photo, venue name (e.g., "F-9 Park Arena", "G-8 Sports Complex"), location, and an hourly rate in PKR (e.g., "3,500 PKR/hr"). 

- Clicking a card navigates to the Venue Details page.



2. Venue Details & Calendar Page: 

- A header with the turf photo, name, and facility amenities (e.g., "Floodlights", "Bibs provided").

- An interactive weekly calendar grid showing dates.

- A list or grid of 60-minute time slots for the selected date. Distinguish visually between "Available" (clickable) and "Booked" (disabled/greyed out) slots.

- Clicking an available time slot triggers the Booking Confirmation Modal.



3. Booking Confirmation Modal: 

- An overlay pop-up displaying a summary of the selected date, time, and venue.

- A total cost breakdown.

- A visual "Split-Payment Calculator" showing the cost divided by 10 players.

- A "Confirm Reservation" button. Clicking this should show a temporary success state/toast message and close the modal.



4. Manager Dashboard (Admin View): 

- A separate view accessible via a toggle or navigation link.

- Key metric cards at the top: "Today's Revenue", "Total Bookings", "Available Slots".

- A schedule table or list for the current day showing booked slots, the user who booked them, and the status.

- Action buttons next to bookings to "Cancel Booking" or "Block Slot" (which just temporarily updates the UI state).



Design & Technical Requirements:

- Use reusable UI components (cards, forms, tables, buttons, modals, toast notifications).

- Include temporary frontend state only using React state (e.g., clicking 'Confirm' updates a slot to 'booked' in the current session).

- Include useful empty states or validation states where appropriate.

- Keep UI styling, colors (maybe a vibrant turf green primary color), spacing, and status labels highly consistent.

- Do NOT attempt to connect to a real database, authentication service, or payment gateway.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4bbd9912-8c95-4f01-b667-e9cd1554364b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
