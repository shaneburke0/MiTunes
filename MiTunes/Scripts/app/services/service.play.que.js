miTunes.service('sharedQue', function () {
    var playQue = [],
        nowPlaying = new ModelSong({});
    // removes song if already in array
    function checkUnique(song) {
        if (playQue.indexOf(song) >= 0) {
            playQue.splice(playQue.indexOf(song), 1);
        }
    }
    return {
        getQue: function () {
            return playQue;
        },
        addSong: function (song) {
            checkUnique(song);
            playQue.push(song);
        },
        addSongNext: function (song) {
            checkUnique(song);
            // insert after current song index
            playQue.unshift(song);
        },
        getCurrentSong: function () {
            return nowPlaying;
        },
        playSong: function (song) {
            checkUnique(song);
            nowPlaying = song;
        }
    };
});