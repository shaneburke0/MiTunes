miTunes.factory('library',['$http', '$log', function ($http, $log) {
    var library = {
        getSongs: function (successcb) {
            $http({ method: 'GET', url: 'api/songs/' }).
                success(function (data, status, headers, config) {
                    var list = [];
                    for (var i = 0; i < data.length; i++) {
                        list.push(new ModelSong({ id: data[i].id, name: data[i].name, artist: data[i].artist, album: data[i].album, path: data[i].path }));
                    }
                    successcb(list);
                })
                .error(function(data, status, headers, config) {
                    $log.warn(data, status, headers, config);
                });
        }
    };
    return library;
}]);