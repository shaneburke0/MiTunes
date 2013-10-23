miTunes.controller("workspaceTabsCtrl", function ($scope) {
    $scope.tabs = ['Library', 'Playlists'];
    $scope.tabs.active = $scope.tabs[0];
    $scope.switchTabs = function (tab) {
        return $scope.tabs.active = tab;
    }

});
