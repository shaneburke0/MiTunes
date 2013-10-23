miTunes.controller('LibraryCtrl', ['$scope', '$http','library', 'player', 'editSong', 'newSong', function ($scope, $http, library, player, editSong, newSong) {
    $scope.songToEdit = new ModelSong({});
    library.getSongs(function(songs) {
        $scope.songs = songs;
    });
    $scope.addToQue = function(song) {
        player.addSong(song);
    };
    $scope.addToQueNext = function(song) {
        player.addSongNext(song);
    };
    $scope.playSong = function(song) {
        player.play(song);
    };
    $scope.playAll = function () {
        player.playAll($scope.songs);
    };
    $scope.editSong = function (song) {
        editSong.open(song);
    };
    $scope.new = function() {
        newSong.open();
    };
    
    $scope.searchFilter = "";
}]);