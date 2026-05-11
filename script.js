// Optional: floating effect on hover 
const shortCards = document.querySelectorAll('#shorts .short-card');

shortCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px) scale(1.05)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Smooth Scroll (only for visible nav links)
document.querySelectorAll('header nav a').forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior:'smooth'
    });
  });
});

// =========================
// Mobile Sidebar
// =========================
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('menuOverlay');
const backBtn = document.getElementById('backBtn');

const toggleMenu = () => {
  mobileNav.classList.toggle('show');
  overlay.classList.toggle('show');
};

// Open menu
menuBtn.addEventListener('click', toggleMenu);

// Close menu when clicking overlay
overlay.addEventListener('click', toggleMenu);

// Close menu when clicking back button
backBtn.addEventListener('click', toggleMenu);

// Close menu when a link is clicked
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', toggleMenu);
});

// =========================
// Modal Data
// =========================
const people = {
  1: {
    name: "Ashlin Prajaa P J",
    role: "Content Creator • Vlogger • Editor",
    desc: "Fun vlogs, creative videos, and entertaining storytelling with stunning editing.",
    img: "Person1.jpeg",
    insta: "https://www.instagram.com/fehiprajaa._official._/"
  },
  2: {
    name: "Ashmin Prajaa P J",
    role: "Content Creator • Vlogger",
    desc: "Make sure videos get morefun and exciting.",
    img: "Person2.jpeg",
    insta: "https://www.instagram.com/fehiprajaa._official._/"
  },
  4: {name: "Nithica M",
    role: "Content Creator • Vlogger",
    desc: "Kid vlogger with video bombing skills 🤣.",
    img: "Person4.jpeg",
    insta: null
  },
  3: {
    name: "Jerish M",
    role: "Content Creator • Vlogger • Cameraman • Editor",
    desc: "Adds more stunning lights and visuals into screen with exiciting edits.",
    img: "Person3.jpeg",
    insta: "https://www.instagram.com/fehiprajaa._official._/"
  }
};

// =========================
// Modal
// =========================
const cards = document.querySelectorAll(".about-card");
const modal = document.getElementById("aboutModal");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const id = card.getAttribute("data-person");
    const person = people[id];

    document.querySelector(".modal-photo").src = person.img;
    document.querySelector(".modal-name").innerText = person.name;
    document.querySelector(".modal-role").innerText = person.role;
    document.querySelector(".modal-desc").innerText = person.desc;
    const instaBtn = document.querySelector(".modal-instagram-btn");

if (!person.insta) {
  instaBtn.innerText = "Not recommended";
  instaBtn.removeAttribute("href");
  instaBtn.style.pointerEvents = "none";
  instaBtn.style.opacity = "0.5";
  instaBtn.style.filter = "grayscale(1)";
} else {
  instaBtn.innerText = "Follow on Instagram";
  instaBtn.href = person.insta;
  instaBtn.style.pointerEvents = "auto";
  instaBtn.style.opacity = "1";
  instaBtn.style.filter = "none";
}



    modal.classList.add("show");
  });
});

const closeModal = () => {
  modal.classList.remove("show");
};

document.querySelector(".close-btn").addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
const communityBtn = document.querySelector(".community-btn");
const communityModal = document.getElementById("communityModal");
const communityClose = document.querySelector(".community-close");

communityBtn.addEventListener("click", (e) => {
  e.preventDefault();
  communityModal.classList.add("show");
});

communityClose.addEventListener("click", () => {
  communityModal.classList.remove("show");
});

// Close when clicking outside
communityModal.addEventListener("click", (e) => {
  if (e.target === communityModal) {
    communityModal.classList.remove("show");
  }
});

// Community → WhatsApp
document.querySelector(".community-icon.whatsapp").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("communityModal").classList.remove("show");
  document.getElementById("whatsappModal").classList.add("show");
});

// Back to Community
document.getElementById("backToCommunity").addEventListener("click", () => {
  document.getElementById("whatsappModal").classList.remove("show");
  document.getElementById("communityModal").classList.add("show");
});

// Under Progress
document.getElementById("progressBtn").addEventListener("click", () => {
  document.getElementById("whatsappModal").classList.remove("show");
  document.getElementById("progressModal").classList.add("show");
});

// Back to WhatsApp
document.getElementById("backToWhatsapp").addEventListener("click", () => {
  document.getElementById("progressModal").classList.remove("show");
  document.getElementById("whatsappModal").classList.add("show");
});

// =========================
// HERO FADE IN / OUT ON SCROLL
// =========================
const hero = document.querySelector(".hero");

const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        hero.classList.add("fade-in");
        hero.classList.remove("fade-out");
      } else {
        hero.classList.remove("fade-in");
        hero.classList.add("fade-out");
      }
    });
  },
  {
    threshold: 0.3 // triggers when 30% visible
  }
);

heroObserver.observe(hero);

// =========================
// GLOBAL FADE IN / OUT ON SCROLL
// =========================
const fadeTargets = document.querySelectorAll(`
  .hero > *,
  #videos h2, #videos .card,
  #shorts h2, #shorts .short-card,
  #playlist h2, .playlist-btn,
  #community h2, #community p, .community-btn,
  #about h2, .about-card
`);

fadeTargets.forEach(el => {
  el.classList.add("fade-item", "fade-out");
});

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        entry.target.classList.remove("fade-out");
      } else {
        entry.target.classList.remove("fade-in");
        entry.target.classList.add("fade-out");
      }
    });
  },
  {
    threshold: 0.25
  }
);

fadeTargets.forEach(el => fadeObserver.observe(el));

const shortsRow = document.querySelector("#shorts .shorts-row");
const shortsDots = document.querySelector(".shorts-dots");

if (shortsRow && shortsDots) {
  shortsRow.addEventListener("scroll", () => {
    shortsDots.style.opacity = "0.15";
    clearTimeout(shortsRow._scrollTimer);
    shortsRow._scrollTimer = setTimeout(() => {
      shortsDots.style.opacity = "0.25";
    }, 300);
  });
}

function openPlaylistModal() {
  document.getElementById("playlistModal").classList.add("show");
}

function closePlaylistModal() {
  document.getElementById("playlistModal").classList.remove("show");
}



document.addEventListener("DOMContentLoaded", function() {
  const playlistModal = document.getElementById('playlistModal');
  const openBtns = document.querySelectorAll('.playlist-btn'); // multiple buttons
  const closeBtn = document.getElementById('closePlaylist');

  // Open modal from any button
  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playlistModal.classList.add('show');
    });
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    playlistModal.classList.remove('show');
  });

  // Close if clicking outside the modal content
  playlistModal.addEventListener('click', (e) => {
    if (e.target === playlistModal) {
      playlistModal.classList.remove('show');
    }
  });
});

const header = document.querySelector("header");
const shorts = document.querySelector("#shorts");

window.addEventListener("scroll", () => {

    const shortsPosition = shorts.getBoundingClientRect();

    // If shorts section is near top of screen
    if(shortsPosition.top <= 100 && shortsPosition.bottom >= 100){
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    }

});


