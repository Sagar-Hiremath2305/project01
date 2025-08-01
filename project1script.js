console.log("Welcome to Spotify");

let songIndex = 0;

let masterplay = document.getElementById('masterplay');
let myProgressbar = document.getElementById('myProgressbar');
let audio1 = document.getElementById("audio1");
let backward = document.getElementById("backward");
let forward = document.getElementById("forward");
let songTitle = document.getElementById("songTitle");

let songs = [
  { name: "Samajavaragamana", filepath: "samajavaragmana.mp3" },
  { name: "Nanna Preethi Sullalla", filepath: "Nannapreethi.mp3" },
  { name: "Tere Liye", filepath: "tereliye.mp3" }
];

// Load a song
function loadSong(index) {
  audio1.src = songs[index].filepath;
  songTitle.textContent = songs[index].name;
  audio1.currentTime = 0;
  audio1.play();
  updatePlayPauseIcon(true);
}

// Update main play button icon
function updatePlayPauseIcon(isPlaying) {
  if (isPlaying) {
    masterplay.classList.remove("fa-circle-play");
    masterplay.classList.add("fa-circle-pause");
  } else {
    masterplay.classList.remove("fa-circle-pause");
    masterplay.classList.add("fa-circle-play");
  }
}

// Master Play Button
masterplay.addEventListener('click', () => {
  if (audio1.paused || audio1.currentTime <= 0) {
    audio1.play();
    updatePlayPauseIcon(true);
  } else {
    audio1.pause();
    updatePlayPauseIcon(false);
  }
});

// Progress Bar Update
audio1.addEventListener('timeupdate', () => {
  if (!isNaN(audio1.duration)) {
    let progress = parseInt((audio1.currentTime / audio1.duration) * 100);
    myProgressbar.value = progress;
  }
});

// Seek
myProgressbar.addEventListener('input', () => {
  if (!isNaN(audio1.duration)) {
    audio1.currentTime = (myProgressbar.value * audio1.duration) / 100;
  }
});

// Previous Song
backward.addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
});

// Next Song
forward.addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
});

// Handle each song item play click
document.querySelectorAll('.songItemPlay').forEach((element) => {
  element.addEventListener('click', (e) => {
    let index = parseInt(e.target.getAttribute("data-index"));
    songIndex = index;
    loadSong(songIndex);
  });
});
