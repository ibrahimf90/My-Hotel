let currentUser = null;
let activeView = "home";

const views = document.querySelectorAll(".view");
const navReserve = document.getElementById("nav-reserve");
const navLogin = document.getElementById("nav-login");
const navLogout = document.getElementById("nav-logout");

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const reservationForm = document.getElementById("reservation-form");

document.addEventListener("DOMContentLoaded", () => {
  const savedUser = sessionStorage.getItem("hotelUser");
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    updateNav();
  }
});

function navigateTo(viewId) {
  views.forEach((v) => v.classList.remove("active"));
  document.getElementById(`view-${viewId}`).classList.add("active");
  activeView = viewId;
  window.scrollTo(0, 0);
}

function updateNav() {
  if (currentUser) {
    navLogin.style.display = "none";
    navReserve.style.display = "inline-block";
    navLogout.style.display = "inline-block";
  } else {
    navLogin.style.display = "inline-block";
    navReserve.style.display = "none";
    navLogout.style.display = "none";
  }
}

function handleReserveClick() {
  if (currentUser) {
    navigateTo("reservation");
  } else {
    navigateTo("login");
  }
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (email && password.length >= 4) {
    currentUser = { email: email, name: email.split("@")[0] };
    sessionStorage.setItem("hotelUser", JSON.stringify(currentUser));
    updateNav();
    document.getElementById("login-error").textContent = "";
    loginForm.reset();
    navigateTo("reservation");
  } else {
    document.getElementById("login-error").textContent =
      "Invalid credentials. Try any email & password.";
  }
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;

  currentUser = { name: name, email: email };
  sessionStorage.setItem("hotelUser", JSON.stringify(currentUser));
  updateNav();
  document.getElementById("register-error").textContent = "";
  registerForm.reset();
  navigateTo("reservation");
});

function logoutUser() {
  currentUser = null;
  sessionStorage.removeItem("hotelUser");
  updateNav();
  navigateTo("home");
}

function updateGuestLimits() {
  const type = document.getElementById("res-room-type").value;
  const adultsInput = document.getElementById("res-adults");
  const kidsInput = document.getElementById("res-kids");

  adultsInput.value = 1;
  kidsInput.value = 0;

  switch (type) {
    case "single":
      adultsInput.max = 2;
      kidsInput.max = 0;
      kidsInput.disabled = true;
      break;
    case "double":
      adultsInput.max = 2;
      kidsInput.max = 2;
      kidsInput.disabled = false;
      break;
    case "suite":
      adultsInput.max = 2;
      kidsInput.max = 4;
      kidsInput.disabled = false;
      break;
    default:
      adultsInput.max = 2;
      kidsInput.max = 0;
      kidsInput.disabled = false;
      break;
  }
}

reservationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const start = document.getElementById("res-start").value;
  const end = document.getElementById("res-end").value;
  const type = document.getElementById("res-room-type").value;
  const adults = parseInt(document.getElementById("res-adults").value);
  const kids = parseInt(document.getElementById("res-kids").value);
  const errorEl = document.getElementById("reservation-error");

  if (new Date(start) >= new Date(end)) {
    errorEl.textContent = "Ending date must be after starting date.";
    return;
  }

  let maxAdults = 2,
    maxKids = 0;
  if (type === "double") {
    maxKids = 2;
  }
  if (type === "suite") {
    maxKids = 4;
  }

  if (adults > maxAdults) {
    errorEl.textContent = `Too many adults. Maximum is ${maxAdults}.`;
    return;
  }
  if (kids > maxKids) {
    errorEl.textContent = `Too many kids for this room type. Maximum is ${maxKids}.`;
    return;
  }

  errorEl.textContent = "";

  renderResults(type, adults, kids, start, end);
  navigateTo("results");
});

function renderResults(type, adults, kids, start, end) {
  const resultsContainer = document.getElementById("results-content");

  const floor = Math.floor(Math.random() * 10) + 1;

  let title, normalPrice, discountPrice, details, images;

  if (type === "single") {
    title = "Deluxe Single Room";
    normalPrice = "$150/night";
    discountPrice = "$120/night";
    details = [
      "1 Plush Twin Bed",
      "Max Capacity: 2 Adults",
      "Free High-Speed Wi-Fi",
      "Modern Glass Rain Shower",
      "City Skyline View",
    ];

    images = ["assets/single_room_main.png", "assets/single_room_bathroom.png"];
  } else if (type === "double") {
    title = "Premium Double Room";
    normalPrice = "$280/night";
    discountPrice = "$220/night";
    details = [
      "2 Queen Beds",
      "Max Capacity: 2 Adults, 2 Kids",
      "Interactive Smart TV",
      "Soaking Tub & Separate Shower",
      "Balcony with Ocean View",
    ];
    images = ["assets/single_room_main.png", "assets/single_room_bathroom.png"];
  } else {
    title = "Presidential Suite";
    normalPrice = "$800/night";
    discountPrice = "$650/night";
    details = [
      "1 Massive King-Sized Bed & Sofa Beds",
      "Max Capacity: 2 Adults, 4 Kids",
      "Private Dining Area & Living Room",
      "Jacuzzi & Marble Bathroom",
      "Unrestricted Panoramic Views",
      "Dedicated Butler Service",
    ];
    images = ["assets/single_room_main.png", "assets/single_room_bathroom.png"];
  }

  let imagesHtml = `
        <div class="featured-image-wrapper">
            <img id="featured-room-img" src="${images[0]}" alt="Room Highlight" onerror="this.src='https://placehold.co/600x400?text=Image+Not+Found'">
            <div class="image-overlay"></div>
        </div>
        <div class="thumbnail-gallery">
            ${images
              .map(
                (src, idx) => `
                <img src="${src}" 
                     class="thumbnail ${idx === 0 ? "active" : ""}" 
                     onclick="updateFeaturedImage(this, '${src}')"
                     alt="Room Thumbnail" 
                     onerror="this.src='https://placehold.co/600x400?text=Image+Not+Found'">
            `,
              )
              .join("")}
        </div>
    `;

  let detailsHtml = details.map((d) => `<li>${d}</li>`).join("");

  resultsContainer.innerHTML = `
        <div class="room-gallery-enhanced">
            ${imagesHtml}
        </div>
        <div class="room-info">
            <h3>${title}</h3>
            <p><strong>Floor Number:</strong> ${floor} (Accessible via VIP elevator)</p>
            <p><strong>Availability:</strong> Confirmed for ${start} to ${end}</p>
            
            <div class="price-box">
                <span class="normal-price">${normalPrice}</span>
                <span class="discount-price">${discountPrice}</span>
                <span style="display:block; margin-top:5px; font-size:0.9rem; color: #a4b0be;">* Special web-only discount applied</span>
            </div>

            <ul class="room-details-list">
                ${detailsHtml}
            </ul>

            <button class="btn btn-primary w-100" onclick="alert('Proceeding to payment gateway... (Demo end)')">Confirm & Book Now</button>
        </div>
    `;
}

function updateFeaturedImage(thumbnailElement, src) {
  const featuredImg = document.getElementById("featured-room-img");
  featuredImg.style.opacity = "0";
  setTimeout(() => {
    featuredImg.src = src;
    featuredImg.style.opacity = "1";
  }, 200);

  document.querySelectorAll(".thumbnail-gallery .thumbnail").forEach((el) => {
    el.classList.remove("active");
  });
  thumbnailElement.classList.add("active");
}
