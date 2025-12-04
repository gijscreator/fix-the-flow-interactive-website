// ---------------------------
// Path Helper
// ---------------------------
const getAssetPath = (assetPath) => {
  const cleanPath = assetPath.startsWith("/") ? assetPath.slice(1) : assetPath;
  const isInSubdir = window.location.pathname.includes("/pages/");
  return isInSubdir ? `../${cleanPath}` : cleanPath;
};

const getPagePath = (page) => {
  const isInSubdir = window.location.pathname.includes("/pages/");
  return isInSubdir ? `./${page}` : `pages/${page}`;
};

// ---------------------------
// Image Data
// ---------------------------
const pictures = [
  { src: getAssetPath("assets/handgeschaaft.jpg"), alt: "Handgeschaaft", name: "Anna van Veen", place: "Amsterdam Oost", snappmap: "Mooi" },
  { src: getAssetPath("assets/autofiat.jpg"), alt: "Auto Fiat", name: "Bram de Groot", place: "Rotterdam Centrum", snappmap: "Mooi" },
  { src: getAssetPath("assets/bikerental.jpg"), alt: "Bike rental", name: "Clara Meijer", place: "Utrecht Zuid", snappmap: "Mooi" },
  { src: getAssetPath("assets/fietaanpaal.jpg"), alt: "Fiets aan paal", name: "Daan Visser", place: "Den Haag", snappmap: "Mooi" },
  { src: getAssetPath("assets/fietsbijtrap.jpg"), alt: "Fiets bij trap", name: "Eva Janssen", place: "Leiden", snappmap: "Mooi" },
  { src: getAssetPath("assets/fietsbord.jpg"), alt: "Fietsbord", name: "@Finn Bakker", place: "#Haarlem", snappmap: "#Mooi" },
  { src: getAssetPath("assets/onibus.jpg"), alt: "Bus", name: "Gwen Vos", place: "Eindhoven", snappmap: "Mooi" },
  { src: getAssetPath("assets/stoplicht.jpg"), alt: "Stoplicht", name: "Hugo Peters", place: "Groningen", snappmap: "Mooi" },
  { src: getAssetPath("assets/stoplicht.jpg"), alt: "Stoplicht", name: "Hugo Peters", place: "Groningen", snappmap: "Mooi" },
  { src: getAssetPath("assets/stoplicht.jpg"), alt: "Stoplicht", name: "Hugo Peters", place: "Groningen", snappmap: "Mooi" },
  { src: getAssetPath("assets/stoplicht.jpg"), alt: "Stoplicht", name: "Hugo Peters", place: "Groningen", snappmap: "Mooi" },
  { src: getAssetPath("assets/stoplicht.jpg"), alt: "Stoplicht", name: "Hugo Peters", place: "Groningen", snappmap: "Mooi" }
];

// ---------------------------
// DOM Elements
// ---------------------------
const gallery = document.querySelector("article.images ul");
const button = document.querySelector(".grid-list-toggle");

const bigImage = document.getElementById("detail-image");
const nameText = document.getElementById("detail-name");
const placeText = document.getElementById("detail-location");
const snappmapText = document.getElementById("detail-snappmap");

const personArray = document.querySelector(".person-array");
const locationArray = document.querySelector(".location-array");

const onDetailPage = bigImage && nameText && placeText;

// ===========================================================
// DETAIL PAGE LOGIC
// ===========================================================
if (onDetailPage) {
  const urlBits = new URLSearchParams(window.location.search);
  const index = parseInt(urlBits.get("i"));
  const chosenPic = pictures[index];

  if (chosenPic) {
    bigImage.src = chosenPic.src;
    bigImage.alt = chosenPic.alt;
    nameText.textContent = chosenPic.name;
    snappmapText.textContent = chosenPic.snappmap;
    placeText.textContent = chosenPic.place;
  }

  const makeThumbHTML = (pic, i) => `
    <li>
      <a href="${getPagePath(`detailpagina.html?i=${i}`)}">
        <img src="${pic.src}" alt="${pic.alt}">
      </a>
    </li>
  `;

  if (personArray) {
    personArray.innerHTML = pictures.slice(0, 5).map(makeThumbHTML).join("");
  }

  if (locationArray) {
    locationArray.innerHTML = pictures.slice(0, 5).map(makeThumbHTML).join("");
  }

  const likeBtn = document.querySelector(".like-button");
  const dislikeBtn = document.querySelector(".dislike-button");
  const favBtn = document.querySelector(".favorite-button");

  if (likeBtn && dislikeBtn && favBtn) {
    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("liked");
      dislikeBtn.classList.remove("disliked");
      favBtn.classList.remove("favorited");
    });

    dislikeBtn.addEventListener("click", () => {
      dislikeBtn.classList.toggle("disliked");
      likeBtn.classList.remove("liked");
      favBtn.classList.remove("favorited");
    });

    favBtn.addEventListener("click", () => {
      favBtn.classList.toggle("favorited");
      likeBtn.classList.remove("liked");
      dislikeBtn.classList.remove("disliked");
    });
  }
}

// ===========================================================
// GALLERY PAGE LOGIC
// ===========================================================
else if (gallery) {
  gallery.classList.add("images-grid");

  gallery.innerHTML = pictures
    .map((pic, i) => `
      <li>
        <a href="${getPagePath(`detailpagina.html?i=${i}`)}">
          <figure>
            <img src="${pic.src}" alt="${pic.alt}" loading="lazy">
            <article>
              <p>${pic.name}</p>
              <p>${pic.place}</p>
            </article>
          </figure>
        </a>
      </li>
    `)
    .join("");

  if (button) {
    button.addEventListener("click", () => {
      gallery.classList.toggle("images-grid");
      gallery.classList.toggle("images-list");
    });
  }
}

// ---------------------------
// Sticky Capture Button
// ---------------------------
const captureBtn = document.getElementById("captureBtn");
const marginBtm = document.getElementById("images");

if (captureBtn) {
  window.addEventListener("scroll", () => {
    captureBtn.classList.toggle("sticky", window.scrollY > 0);
    marginBtm.classList.toggle("sticky", window.scrollY > 0);
  });
}

// ===========================================================
// CAMERA INPUT
// ===========================================================
const cameraInput = document.getElementById("cameraInput");
if (cameraInput) {
  cameraInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) console.log("You took a picture!", file);
  });
}

// ===========================================================
// LIKE TAB SLIDEOUT
// ===========================================================
const likee = document.querySelector(".like-section");
if (likee) {
  likee.addEventListener("click", () => {
    likee.classList.toggle("open");
  });
}

// ===========================================================
// COUNTDOWN TIMER
// ===========================================================
const clock = document.getElementById("countdown");

window.onload = () => {
  if (clock) timer();
};

function timer() {
  console.log("countdown started");
  let seconds = Math.floor(Math.random() * (21600 - 3600) + 3600);

  setInterval(() => {
    seconds--;
    clock.textContent = timeFormat(seconds);

    if (seconds <= 0) {
      clock.textContent = "je was op niks aan het wachten";
    }
  }, 1000);
}

function timeFormat(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}
