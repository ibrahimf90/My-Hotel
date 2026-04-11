# My-Hotel
My Hotel is a dynamic, fully-featured hotel reservation Single Page Application (SPA), built beautifully from scratch for a seamless user experience. It allows users to register, log in, browse room options based on complex guest limits, and make reservations.
## Tech Stack

- **HTML5:** Pure HTML skeleton structure.
- **CSS3:** Premium styling with a gorgeous dark glassmorphism design, utilizing custom CSS variables, layout positioning, and modern animations.
- **Vanilla JavaScript:** Powers the SPA routing, data handling via `sessionStorage` for persistence across reloads, form validation, check-in constraints, and the generation of interactive results.

## Features

- **Client-Side Routing:** Navigate smoothly between Home, Login/Register, Reservation, and Results instantly.
- **State Management:** User credentials securely cached in `sessionStorage` for the duration of the browsing session.
- **Room Booking Constraints:**
  - Single Room: Handles 2 Adults max, strictly restricts kids selection to 0.
  - Double Room: Allow up to 2 Adults and 2 Kids.
  - Suite: The ultimate luxury allowing up to 2 Adults and 4 Kids.
- **Dynamic Search Results:** Renders images, calculated prices, features, and auto-generates a floor location based on the hotel's 10 floors.

## How To Run Locally

Because this project utilizes pure web standards without relying on build tools or an HTTP server backend, getting started is straightforward.

1. Download or clone this repository to your local machine.
2. Open the `hotel-website` folder.
3. Double click on `index.html` to execute the application within your default web browser.

## Customization

- **Images:** Any generated images are currently loading from `./assets/` or fallback URLs from `placehold.co`. You can drop your own HD room photos into the assets folder and rename them in `app.js` under the `renderResults` function.
- **Theme:** You can modify the site's entire color flow globally just by changing the `--primary-color` CSS variable inside `styles.css`.

## 👨‍💻 Author

Ibrahim Fayyad
📍 Germany
💼 Full Stack Developer

## 🔗 GitHub

https://github.com/ibrahimf90


