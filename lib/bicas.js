angular.module("bicas", []);
angular.module("bicas")
    .controller("bicasCtrl", function ($scope) {
    $scope.app = "LETS PLAY BICAS!";

    $scope.players = [
        { name: "bznice", score: "0", category: "-", pointslr: "0", points: "0"}
    ];

    $scope.playersN = 1;

    $scope.addPlayer = function (player) {
        player.score = "0";
        player.category = "-";
        player.pointslr = "0";
        player.points = "0";
        $scope.players.push(angular.copy(player));
        $scope.playersN++;
        delete $scope.player;
    };

    $scope.addPoints = function () {
        var looser = {name:" ", points:"0"};
        $scope.players.forEach(player => {
            player.score = Number(player.score) + Number(player.points);
            player.category = (player.points == 0) ? "starter" : "-";
            if (Number(looser.points) < Number(player.points)) {
                looser.name = player.name;
                looser.points = player.points;
            }
            player.pointslr = Number(player.points);
            player.points = "0";
        });
        $scope.players.forEach(player => {
            if (player.name == looser.name) {
                player.category = "dealer";
            }
        });

    };

    $scope.deletePlayer = function (name) {
        var indexPlayer = $scope.players
            .map(function (player){return player.name})
            .indexOf(name);
        $scope.players.splice(indexPlayer, 1);
    }
});