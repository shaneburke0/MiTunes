miTunes.controller('LibraryCtrl', ['$scope', '$rootScope', '$http', 'library', 'player', 'editSong', 'newSong',
    function ($scope, $rootScope, $http, library, player, editSong, newSong) {
        
        $scope.songToEdit = new ModelSong({});
        library.getSongs(function(songs) {
            $rootScope.library = songs;
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
            var songs = angular.copy($rootScope.library); 
            player.playAll(songs);
        };
        $scope.editSong = function (song) {
            editSong.open(song);
        };
        $scope.new = function() {
            newSong.open();
        };
        $scope.predicate = 'artist';
        $scope.searchFilter = "";
    }
]);