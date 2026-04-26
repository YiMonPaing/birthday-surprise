/*
  ===========================
  EASY EDIT AREA (CUSTOMIZE)
  ===========================
  Change these values anytime for your surprise.
*/
const config = {
  // Change the password here:
  password: "142026",

  // Change names here:
  boyfriendName: "‌ကောကော",
  yourName: "မီးလေး",

  // Hero subtitle:
  heroSubtitle:
    "Today is all about you, your smile, and every little moment that makes my heart feel warm.",

  // Birthday letter:
  birthdayLetter: `Happy Birthday, my love.
You are the calm in my chaos and the joy in my everyday life.
Thank you for loving me with such kindness, patience, and warmth.
I am so lucky to walk through life with you.
I hope this year brings you the same happiness you give me every single day.
I love you more than words can ever explain.`,

  // Reasons why I love you:
  reasons: [
    "You make me feel safe, valued, and deeply loved.",
    "Your smile can brighten my hardest day.",
    "You always believe in me, even when I doubt myself.",
    "You are caring, thoughtful, and incredibly strong.",
    "Life with you feels like my favorite story."
  ],

  // Memories timeline:
  memories: [
    { date: "Jan-8-2026", text: "The day we started talking and everything changed." },
    { date: "Mar-11-2026", text: "Nervous smiles, warm coffee, and instant comfort." },
    { date: "Tough Days-Mar-28-to-30-2026", text: "We struggle tofigure out what will be next." },
    { date: "Mar-31-2026,Apr-1-2026", text: "We decided to be together." },
    { date: "Today", text: "Celebrating your birthday and our beautiful journey." }
  ],

  // Photo file names (put these files inside assets/photo/):
  photos: ["photo1.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg", "photo5.jpg"],

  // Hidden final message:
  hiddenMessage:
    "No matter where life takes us, my heart will always choose you. Happy Birthday, my forever love. - မီးလေး"
};

const lockScreen = document.getElementById("lockScreen");
const giftScreen = document.getElementById("giftScreen");
const mainWebsite = document.getElementById("mainWebsite");

const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordMessage = document.getElementById("passwordMessage");

const openGiftBtn = document.getElementById("openGiftBtn");
const giftBox = document.getElementById("giftBox");

const heroTitle = document.getElementById("heroTitle");
const heroSubtitle = document.getElementById("heroSubtitle");
const birthdayLetter = document.getElementById("birthdayLetter");
const reasonsList = document.getElementById("reasonsList");
const timeline = document.getElementById("timeline");
const galleryGrid = document.getElementById("galleryGrid");

const revealMessageBtn = document.getElementById("revealMessageBtn");
const hiddenMessage = document.getElementById("hiddenMessage");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");
const heartsContainer = document.getElementById("heartsContainer");

const photoBasePath = "assets/photo";

function getPhotoPath(fileName) {
  return `${photoBasePath}/${fileName}`;
}

function applyTextContent() {
  heroTitle.textContent = `Happy Birthday ${config.boyfriendName}`;
  heroSubtitle.textContent = config.heroSubtitle;
  birthdayLetter.textContent = config.birthdayLetter;
  hiddenMessage.textContent = config.hiddenMessage.replace("Your Name", config.yourName);
}

function renderReasons() {
  reasonsList.innerHTML = "";
  config.reasons.forEach((reason) => {
    const li = document.createElement("li");
    li.textContent = reason;
    reasonsList.appendChild(li);
  });
}

function renderTimeline() {
  timeline.innerHTML = "";
  config.memories.forEach((memory) => {
    const item = document.createElement("article");
    item.className = "timeline-item";
    item.innerHTML = `
      <div class="timeline-date">${memory.date}</div>
      <div>${memory.text}</div>
    `;
    timeline.appendChild(item);
  });
}

function renderGallery() {
  galleryGrid.innerHTML = "";
  config.photos.forEach((fileName) => {
    const card = document.createElement("button");
    card.className = "gallery-item";
    card.type = "button";
    const photoPath = getPhotoPath(fileName);
    card.innerHTML = `<img src="${photoPath}" alt="Memory photo" loading="lazy" />`;
    card.addEventListener("click", () => openLightbox(photoPath));
    galleryGrid.appendChild(card);
  });
}

function openLightbox(src) {
  lightboxImage.src = src;
  lightbox.classList.remove("hidden");
}

function handleMissingImage(event) {
  const img = event.target;
  img.alt = "Image failed to load";
  img.classList.add("image-missing");
}

function closeLightboxModal() {
  lightbox.classList.add("hidden");
  lightboxImage.src = "";
}

function startHearts() {
  setInterval(() => {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = "❤";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${5 + Math.random() * 6}s`;
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 12000);
  }, 700);
}

passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword === config.password) {
    passwordMessage.textContent = "Aww, perfect. Unlocking your surprise...";
    passwordMessage.className = "message success";

    setTimeout(() => {
      lockScreen.classList.add("hidden");
      giftScreen.classList.remove("hidden");
    }, 800);
  } else {
    passwordMessage.textContent = "Almost, my love. Try the special password again.";
    passwordMessage.className = "message error";
  }
});

openGiftBtn.addEventListener("click", () => {
  giftBox.classList.add("open");
  openGiftBtn.disabled = true;

  setTimeout(() => {
    giftScreen.classList.add("hidden");
    mainWebsite.classList.remove("hidden");
    mainWebsite.classList.add("fade-in");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 1100);
});

revealMessageBtn.addEventListener("click", () => {
  hiddenMessage.classList.add("show");
  revealMessageBtn.textContent = "I love you forever ❤";
});

closeLightbox.addEventListener("click", closeLightboxModal);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightboxModal();
});

galleryGrid.addEventListener("error", handleMissingImage, true);
lightboxImage.addEventListener("error", handleMissingImage);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
    closeLightboxModal();
  }
});

function init() {
  applyTextContent();
  renderReasons();
  renderTimeline();
  renderGallery();
  startHearts();
}

init();
