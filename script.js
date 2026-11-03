var fileInput = document.getElementById("song-files");
var songList = document.getElementById("song-list");
var audioPlayer = document.getElementById("audio-player");
var nowPlaying = document.getElementById("now-playing");

var songNames = [];
var songUrls = [];
var currentSong = 0;

audioPlayer.onended = function () {
    if (currentSong < songNames.length - 1) {
        playSong(currentSong + 1);
    }
};

audioPlayer.onerror = function () {
    nowPlaying.textContent = "This audio file could not be played.";
};

audioPlayer.onloadedmetadata = function () {
    audioPlayer.currentTime = 0;
};

fileInput.onchange = function () {
    for (var i = 0; i < fileInput.files.length; i++) {
        var file = fileInput.files[i];

        if (file.type.startsWith("audio/")) {
            songNames.push(file.name);
            songUrls.push(URL.createObjectURL(file));
        }
    }

    showSongs();
    fileInput.value = "";
};

function showSongs() {
    songList.innerHTML = "";

    if (songNames.length === 0) {
        var message = document.createElement("li");
        message.className = "empty-message";
        message.textContent = "Your songs will appear here.";
        songList.appendChild(message);
        return;
    }

    for (var i = 0; i < songNames.length; i++) {
        addSongToList(i);
    }
}

function addSongToList(songNumber) {
    var row = document.createElement("li");
    var number = document.createElement("span");
    var name = document.createElement("span");
    var button = document.createElement("button");

    row.className = "song";
    number.textContent = songNumber + 1;
    name.textContent = songNames[songNumber];
    button.textContent = "Play";
    button.type = "button";
    button.onclick = function () {
        playSong(songNumber);
    };

    row.appendChild(number);
    row.appendChild(name);
    row.appendChild(button);
    songList.appendChild(row);
}

function playSong(songNumber) {
    currentSong = songNumber;
    audioPlayer.src = songUrls[songNumber];
    audioPlayer.currentTime = 0;
    nowPlaying.textContent = songNames[songNumber];
    audioPlayer.play().catch(function () {
        nowPlaying.textContent = "Could not play this file. Try another audio file.";
    });
}