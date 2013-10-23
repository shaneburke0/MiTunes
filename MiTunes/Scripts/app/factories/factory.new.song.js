miTunes.factory('newSong',['$http', function ($http) {
    var newSong = {
        open: function () {
            $('#new-song').show();
            $('#new-song').animate({ "right": 0 }, 1000);
        },
        close: function() {
            $('#new-song').animate({ "right": -420 }, 1000, function() {
                $(this).hide();
            });
        },
        save: function (_song) {
            var uploadSong = new ModelSong({ name: _song.name, artist: _song.artist, album: _song.album });
            $http({
                url: 'api/songs/',
                method: "POST",
                data: { song: JSON.stringify(uploadSong), files: [_song.file] },
                headers: { 'Content-Type': 'application/json' },
                enctype: "multipart/form-data",
            }).success(function (data, status, headers, config) {
                alert("success");
            }).error(function (data, status, headers, config) {
                alert(status + ' ' + headers);
            });
            newSong.close();
        }
    };
    return newSong;
}]);