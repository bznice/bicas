angular.module("bicas", []);
angular.module("bicas")
    .controller("bicasCtrl", function ($scope) {
    $scope.app = "LETS PLAY BICAS!";

    $scope.players = [
        { name: "bznice", score: "0", pointslr: "0", points: "0"}
    ];

    $scope.playersN = 1;

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

    $scope.deletePlayer = function (name) {
        var indexPlayer = $scope.players
            .map(function (player){return player.name})
            .indexOf(name);
        $scope.players.splice(indexPlayer, 1);
    }
});