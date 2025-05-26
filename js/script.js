const songs = [
  {
    title: "Song One",
    artist: "Artist One",
    src: "assets/song1.mp3",
    cover: "assets/cover1.jpg"
  },
  {
    title: "Song Two",
    artist: "Artist Two",
    src: "assets/song2.mp3",
    cover: "assets/cover2.jpg"
  },
  {
    title: "Song Three",
    artist: "Artist Three",
    src: "assets/song3.mp3",
    cover: "assets/cover3.jpg"
  }
  // Add more songs here for unlimited music
];

let currentIndex = 0;

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  playBtn.textContent = '⏸️';
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = '▶️';
}

function togglePlay() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  playSong();
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  playSong();
}

function updateProgress() {
  progress.value = (audio.currentTime / audio.duration) * 100;
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
  durationDisplay.textContent = formatTime(audio.duration);
}

function setProgress() {
  audio.currentTime = (progress.value / 100) * audio.duration;
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60) || 0;
  const sec = Math.floor(seconds % 60) || 0;
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', setProgress);
audio.addEventListener('ended', nextSong); // Auto-play next song when current ends

// Initial load
loadSong(currentIndex);
