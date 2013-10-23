miTunes.factory('player', function (audio, $rootScope) {
    var player,
        playlist = [],
        playedList = [],
        paused = false,
        time = 0,
        current = new ModelSong({}),
        // removes song if already in array
        checkUnique = function(song) {
            if (player.playlist.indexOf(song) >= 0) {
                player.playlist.splice(player.playlist.indexOf(song), 1);
            }
        };

    player = {
        playlist: playlist,

        playedList: playedList,

        current: current,
        
        time: time,

        playing: false,

        play: function (song) {

            if (angular.isDefined(song.name)) {
                current = song;
            } else if (playlist.length > 0) {
                this.next();
                return;
            } else {
                return;
            }

            if (!paused) audio.src = current.path;
            audio.play();
            player.playing = true;
            paused = false;
            
        },

        pause: function () {
            if (player.playing) {
                audio.pause();
                player.playing = false;
                paused = true;
            }
        },

        stop: function () {
            player.pause();
            time = 0;
            current = new ModelSong({});
        },

        next: function () {
            if (player.playlist.length > 0) {
                player.play(player.playlist[0]);
                player.playedList.push(player.playlist[0]);
                player.playlist.splice(0, 1);
            }
            
        },

        previous: function () {
            if (player.playedList.length > 0) {
                //player.play(player.playedList[player.playedList.length-1]);
                //player.playedList.splice(player.playedList.length - 1, 1);
            }
        },

        paused: paused,

        addToQue: function (song) {
            player.playlist.push(song);
        },

        addSong: function (song) {
            checkUnique(song);
            player.playlist.push(song);
        },
        addSongNext: function (song) {
            checkUnique(song);
            player.playlist.unshift(song);
        },
        getCurrentSong: function () {
            return current;
        },
        playAll: function(list) {
            player.playlist = list;
            player.next();
        },

        updateProgress: function () {
            var progress = document.getElementById("progress");
            var value = 0;
            if (audio.currentTime > 0) {
                value = Math.floor((100 / audio.duration) * audio.currentTime);
            }
            progress.style.width = value + "%";
            
        },
        
        setVolume: function () {
           var volume = document.getElementById("volume");
           audio.volume = volume.value;
        }
    };
    audio.addEventListener('play', function () {
        setTimeout(function() {
            $('#playerDuration').html((audio.duration / 100).toString().substring(0, 4));
        }, 500);
        
    }, false);
    audio.addEventListener('ended', function () {
        $rootScope.$apply(player.next);
    }, false);
    audio.addEventListener("timeupdate", player.updateProgress, false);

    return player;
});