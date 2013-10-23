miTunes.factory('editSong',['$http', '$log', function ($http, $log) {
    var song = new ModelSong({}),
        editSong = {
        song: song,
        open: function (tune) {
            $('#edit-song').show();
            $('#edit-song').animate({ "right": 0 }, 1000);
            editSong.song = tune;
        },
        close: function() {
            $('#edit-song').animate({ "right": -420 }, 1000, function() {
                $(this).hide();
                editSong.song = new ModelSong({});
            });
            
        },
        getCurrentSong: function() {
            return editSong.song;
        },
        save: function (_song) {
            $http({
                url: 'api/songs/' + _song.id,
                method: "PUT",
                data: JSON.stringify(_song),
                headers: {'Content-Type': 'application/json'}
            }).success(function (data, status, headers, config) {
                $log.info(data.artist + ' - ' + data.name + " : edit successful.");
            }).error(function (data, status, headers, config) {
                $log(data, status, headers, config);
            });
            editSong.close();
        },
        delete: function (_song) {
            $http({
                url: 'api/songs/' + _song.id,
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data, status, headers, config) {
                $log.info("Delete successful.");
            }).error(function (data, status, headers, config) {
                $log(data, status, headers, config);
            });
            editSong.close();
        }
    };
    return editSong;
}]);