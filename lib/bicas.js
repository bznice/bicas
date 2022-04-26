angular.module("bicas", []);
angular.module("bicas")
    .controller("bicasCtrl", function ($scope) {
    $scope.app = "LETS PLAY BICAS!";

    $scope.players = [];

    $scope.playersN = 0;

    $scope.addPlayer = function (player) {
        player.score = "0";
        player.pointslr = "0";
        player.points = "0";
        $scope.players.push(angular.copy(player));
        $scope.playersN++;
        delete $scope.player;
    };

    $scope.addPoints = function () {
        $scope.players.forEach(player => {
        player.score = Number(player.score) + Number(player.points);
        player.pointslr = player.points;
        player.points = "0";
        });
    };
});