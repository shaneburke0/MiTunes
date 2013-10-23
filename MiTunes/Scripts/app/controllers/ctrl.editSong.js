miTunes.controller('EditSongCtrl', ['$scope', 'editSong', function ($scope, editSong) {
    $scope.song = new ModelSong({});
    $scope.close = function () {
        editSong.close();
    };
    $scope.save = function (_song) {
        editSong.save(_song);
    };
    $scope.delete = function (_song) {
        if (confirm("Are you sure?")) {
            editSong.delete(_song);
        }
    };
    $scope.$watch(function () { return editSong.getCurrentSong(); }, function (_song) {
        $scope.song = _song;
    });
}]);