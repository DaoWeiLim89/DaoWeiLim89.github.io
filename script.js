/*
playBtn.addEventListener('click', () => {
  alert('Play button clicked!');
});

prevBtn.addEventListener('click', () => {
  alert('Previous track!');
});

nextBtn.addEventListener('click', () => {
  alert('Next track!');
});
*/

/* Button to switch Professional to Personal */
function showInterest(type) {
  const proBtn = document.getElementById('pro-btn');
  const persBtn = document.getElementById('pers-btn');
  const line1 = document.getElementById('interest-main');
  
  if (type === 'professional') {
    line1.textContent = "Lately I've been working on side projects that are useful to me in my daily life and that's really been my focus. Just to make stuff that people can use. In terms of fields I have great interest in, I love Data Science, Computer Vision, and just generally building cool software!";
    proBtn.classList.add('active');
    proBtn.textContent = '✔';
    persBtn.classList.remove('active');
    persBtn.textContent = '';
  } else if (type === 'personal') {
    line1.textContent = "In my free time you'll find me going to concerts, playing guitar, or at a record shop. I've added some of my current favorites songs to play in the background. Have a listen! I also love sports, mainly soccer and basketball which is actually what got me into Data Science.";
    persBtn.classList.add('active');
    persBtn.textContent = '✔';
    proBtn.classList.remove('active');
    proBtn.textContent = '';
  }
}
  
// Set default state
document.addEventListener('DOMContentLoaded', () => {
  showInterest('professional');
});
  


// Music Player
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const nowPlaying = document.getElementById('now-playing-title');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const albumCover = document.getElementById('album-cover');

// Define songs with metadata
const playlist = [
  {
    title: 'Blue by You',
    artist: 'Turnstile',
    file: 'Blue by You.mp3',
    cover: 'Blue by You.png'
  },
  {
    title: 'God Only Knows',
    artist: 'The Beach Boys',
    file: 'God Only Knows.mp3',
    cover: 'God Only Knows.png'
  },
  {
    title: 'It Never Entered My Mind',
    artist: 'Miles Davis Quintet',
    file: 'It Never Entered My Mind.mp3',
    cover: 'It Never Entered My Mind.png'
  },
  {
    title: 'Are You Looking Up',
    artist: 'Mk.Gee',
    file: 'Are You Looking Up.mp3',
    cover: 'Are You Looking Up.png'
  },
  {
    title: 'The Field',
    artist: 'Blood Orange',
    file: 'The Field.mp3',
    cover: 'The Field.png'
  },
  {
    title: 'Vampire in the Corner',
    artist: 'Magdalena Bay',
    file: 'Vampire in the Corner.mp3',
    cover: 'Vampire in the Corner.png'
  }
];

let currentSong = 0;
let isPlaying = false;

// Load a song
function loadSong(index) {
    const song = playlist[index];
    audio.src = `music/${song.file}`;
    albumCover.src = `covers/${song.cover}`;
    document.getElementById('song-title').textContent = song.title;
    document.getElementById('song-artist').textContent = song.artist;
    playBtn.textContent = '▶️';
    isPlaying = false;
    progressBar.value = 0;
    currentTimeEl.textContent = '0:00';
    durationEl.textContent = '0:00';
    console.log(`Loading: music/${song.file}, covers/${song.cover}`);
  }

// Format time in mm:ss
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Toggle Play
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = '▶️';
  } else {
    audio.play();
    playBtn.textContent = '⏸️';
  }
  isPlaying = !isPlaying;
}

// Skip
function nextSong() {
  currentSong = (currentSong + 1) % playlist.length;
  loadSong(currentSong);
  if (isPlaying) audio.play();
}

function prevSong() {
  currentSong = (currentSong - 1 + playlist.length) % playlist.length;
  loadSong(currentSong);
  if (isPlaying) audio.play();
}

// Update progress
audio.addEventListener('timeupdate', () => {
  const { currentTime, duration } = audio;
  progressBar.value = (currentTime / duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = isNaN(duration) ? '0:00' : formatTime(duration);
});

// Seek
progressBar.addEventListener('input', () => {
  if (!isNaN(audio.duration)) {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  }
});

// When song ends
audio.addEventListener('ended', nextSong);

// Button events
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Load initial song
document.addEventListener('DOMContentLoaded', () => {
  loadSong(currentSong);
});
