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
        }
    };
    return newSong;
}]);