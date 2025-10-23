const photos = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg"
];

const photoContainer = document.getElementById("photoContainer");
const endSection = document.getElementById("endSection");
const endVoteBtn = document.getElementById("endVoteBtn");

let voteCount = 0;
const MAX_VOTES = 5;

function getRandomPair() {
  let first = Math.floor(Math.random() * photos.length);
  let second;
  do {
    second = Math.floor(Math.random() * photos.length);
  } while (second === first);
  return [photos[first], photos[second]];
}

function renderPhotos() {
  photoContainer.innerHTML = "";
  const [photo1, photo2] = getRandomPair();

  const card1 = createPhotoCard(photo1);
  const card2 = createPhotoCard(photo2);

  photoContainer.appendChild(card1);
  photoContainer.appendChild(card2);
}

function createPhotoCard(src) {
  const card = document.createElement("div");
  card.classList.add("photo-card");

  const img = document.createElement("img");
  img.src = src;

  const btn = document.createElement("button");
  btn.textContent = "Vote";
  btn.classList.add("vote-btn");
  btn.onclick = () => handleVote(src);

  card.appendChild(img);
  card.appendChild(btn);
  return card;
}

function handleVote(selectedPhoto) {
  voteCount++;

  // Send vote to backend
  fetch("/vote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ photo: selectedPhoto, time: new Date().toISOString() })
  });

  if (voteCount < MAX_VOTES) {
    renderPhotos();
  } else {
    photoContainer.classList.add("hidden");
    endSection.classList.remove("hidden");
  }
}

endVoteBtn.addEventListener("click", () => {
  alert("Voting session ended! Thanks for participating.");
  location.reload(); // restart the app if needed
});

// Initial load
renderPhotos();
