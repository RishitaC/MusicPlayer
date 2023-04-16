console.log("Welcome to my Music Player");
// initialize the variables
let songIndex = 0;
let audioElement = new Audio("1.mp.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName(".songItem"));
// console.log(songItems);

let songs = [
  { songName: "Majhe Majhe Tobo", filePath: "1.mp.mp3" },
  { songName: "Amaro Porano Jaha Chay", filePath: "2.mp.mp3" },
  { songName: "Oo Je Mane Na Mana", filePath: "3.mp.mp3" },
  { songName: "Dekhechi Rupsagore", filePath: "4.mp.mp3" },
  { songName: "Khelaghar Bandhte Legechi", filePath: "5.mp.mp3" },

  { songName: "Jakhon Porbe Na Mor", filePath: "6.mp.mp3" },
  { songName: "Mayabono Biharini", filePath: "7.mp.mp3" },
  { songName: "Phagun Haway Haway", filePath: "8.mp.mp3" },
];
+songItems.forEach((element, i) => {
  //   console.log(element, i);
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// audioElement.play();

// handle play-pause
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});

// listen to events
audioElement.addEventListener("timeupdate", () => {
  // Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause");
      element.classList.add("fa-play");
      gif.style.opacity = 1;
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play");
      e.target.classList.add("fa-pause");
      audioElement.src = `${songIndex}.mp.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  makeAllPlays();
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `${songIndex}.mp.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  makeAllPlays();
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `${songIndex}.mp.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});
