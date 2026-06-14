const settings = {
  girlName: "Карина"
};

document.getElementById("girlName").textContent = settings.girlName;

window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("loader").classList.add("hide"), 500);
});

const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const glow = document.querySelector(".cursor-glow");
window.addEventListener("mousemove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.14 });

revealItems.forEach(item => observer.observe(item));

function tryLoadImages() {
  const photoBlocks = document.querySelectorAll("[data-photo]");
  photoBlocks.forEach(block => {
    const filename = block.dataset.photo;
    const img = new Image();
    img.src = `assets/photos/${filename}`;

    img.onload = () => {
      block.innerHTML = "";
      block.appendChild(img);
      block.classList.add("has-image");
    };
  });
}

tryLoadImages();

const filters = document.querySelectorAll(".filter");
const galleryItems = document.querySelectorAll(".gallery-item");

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    galleryItems.forEach(item => {
      const match = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("hide", !match);
    });
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".collage-item, .gallery-item, .photo-placeholder").forEach(item => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    if (!img) return;
    lightboxImg.src = img.src;
    lightbox.classList.add("show");
  });
});

lightboxClose.addEventListener("click", () => lightbox.classList.remove("show"));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("show");
});

const modal = document.getElementById("modal");
const giftBtn = document.getElementById("giftBtn");
const modalClose = document.getElementById("modalClose");
const confettiBtn = document.getElementById("confettiBtn");

giftBtn.addEventListener("click", () => {
  modal.classList.add("show");
  makeConfetti(110);
});

modalClose.addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("show");
});

confettiBtn.addEventListener("click", () => makeConfetti(160));

function makeConfetti(count = 90) {
  const colors = ["#ff6fb1", "#ffd36e", "#a78bfa", "#91d7ff", "#ffffff"];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.7 + "s";
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.style.width = Math.random() * 8 + 6 + "px";
    piece.style.height = Math.random() * 12 + 8 + "px";
    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 4200);
  }
}

const musicBtn = document.getElementById("musicBtn");
const song = document.getElementById("birthdaySong");
let playing = false;

musicBtn.addEventListener("click", async () => {
  try {
    if (!playing) {
      await song.play();
      playing = true;
      musicBtn.textContent = "Поставить на паузу";
    } else {
      song.pause();
      playing = false;
      musicBtn.textContent = "Включить музыку";
    }
  } catch {
    musicBtn.textContent = "Добавь song.mp3 в папку music";
  }
});

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({ length: Math.min(160, Math.floor(window.innerWidth / 8)) }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.4,
    a: Math.random(),
    s: Math.random() * 0.015 + 0.004
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.a += star.s;
    const opacity = 0.25 + Math.abs(Math.sin(star.a)) * 0.75;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 247, 251, ${opacity})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

resizeCanvas();
drawStars();
window.addEventListener("resize", resizeCanvas);
const collageTrackNew = document.getElementById("collageTrack");
const collagePrevNew = document.getElementById("collagePrev");
const collageNextNew = document.getElementById("collageNext");
const collageDotsNew = document.getElementById("collageDots");
const collageSlidesNew = document.querySelectorAll(".phone-slide");

let collageIndex = 0;

collageSlidesNew.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.className = "phone-slider-dot";

  if (index === 0) {
    dot.classList.add("active");
  }

  dot.addEventListener("click", () => {
    collageIndex = index;
    updateCollageSlider();
  });

  collageDotsNew.appendChild(dot);
});

const collageDotButtons = document.querySelectorAll(".phone-slider-dot");

function updateCollageSlider() {
  collageTrackNew.style.transform = `translateX(-${collageIndex * 100}%)`;

  collageDotButtons.forEach(dot => dot.classList.remove("active"));

  if (collageDotButtons[collageIndex]) {
    collageDotButtons[collageIndex].classList.add("active");
  }
}

collageNextNew.addEventListener("click", () => {
  collageIndex++;

  if (collageIndex >= collageSlidesNew.length) {
    collageIndex = 0;
  }

  updateCollageSlider();
});

collagePrevNew.addEventListener("click", () => {
  collageIndex--;

  if (collageIndex < 0) {
    collageIndex = collageSlidesNew.length - 1;
  }

  updateCollageSlider();
});

let startX = 0;

collageTrackNew.addEventListener("touchstart", (event) => {
  startX = event.touches[0].clientX;
});

collageTrackNew.addEventListener("touchend", (event) => {
  const endX = event.changedTouches[0].clientX;
  const difference = startX - endX;

  if (difference > 50) {
    collageIndex++;

    if (collageIndex >= collageSlidesNew.length) {
      collageIndex = 0;
    }

    updateCollageSlider();
  }

  if (difference < -50) {
    collageIndex--;

    if (collageIndex < 0) {
      collageIndex = collageSlidesNew.length - 1;
    }

    updateCollageSlider();
  }
});

document.querySelectorAll(".phone-slide").forEach(item => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");

    if (!img) return;

    lightboxImg.src = img.src;
    lightbox.classList.add("show");
  });
});