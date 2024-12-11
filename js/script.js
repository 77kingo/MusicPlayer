const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// Songs data
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
  }
];

let currentSongIndex = 0;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
}

function togglePlay() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
}

function updateProgress() {
  progress.value = (audio.currentTime / audio.duration) * 100;
  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
  currentTimeEl.textContent = `${minutes}:${seconds}`;
}

function setProgress() {
  audio.currentTime = (progress.value / 100) * audio.duration;
}

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
progress.addEventListener('input', setProgress);
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Load the first song
loadSong(songs[currentSongIndex]);
