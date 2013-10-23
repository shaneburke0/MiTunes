miTunes.controller('NowPlayingCtrl', ['$scope', 'player', function ($scope, player) {
    $scope.currentSong = new ModelSong({});
    $scope.player = player;
    $scope.$watch(function () { return player.getCurrentSong(); }, function (song) {
        $scope.currentSong = song;
    });
}]);