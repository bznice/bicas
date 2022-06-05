angular.module("bicas", []);
angular.module("bicas")
    .controller("bicasCtrl", function ($scope) {
    $scope.app = "LETS PLAY BICAS!";

    $scope.players = [];

    $scope.playersN = 0;

    $scope.addPlayer = function (player) {
        player.score = "0";
        player.category = "-";
        player.pointslr = "0";
        player.points = "";
        player.dealer = false;
        $scope.players.push(angular.copy(player));
        $scope.playersN++;
        delete $scope.player;
    };

    $scope.addPoints = function () {
        var looser = {name:"", points:"0"};
        var specialPlayer = false;
        const specialArray = [420, 422];
        const dealer = ($scope.players.filter(player => player.dealer).length != 0) ? true : false;
        $scope.players.forEach(player => {
            player.score = Number(player.score) + Number(player.points);
            player.category = (player.points == 0) ? "winner" : "-";
            if(specialArray.includes(Number(player.score))) {
                player.score = 0;
                player.category = "#420FAZESSAXAPABRUX";
                specialPlayer = true;
            }
            if(dealer) {
                if(player.dealer) {
                    looser.name = player.name;
                }
            } else {
                if ((Number(looser.points) < Number(player.points))) {
                    looser.name = player.name;
                    looser.points = player.points;
                }
            }
            player.pointslr = Number(player.points);
            player.points = "";
            player.dealer = false;
        });
        if(!specialPlayer){
            $scope.players
                .filter(player => player.category != "winner")
                .forEach(player => {
                if (player.name == looser.name) {
                    player.category = "dealer";
                }
            });
        }
    };

    $scope.deletePlayer = function (name) {
        var indexPlayer = $scope.players
            .map(function (player){return player.name})
            .indexOf(name);
        $scope.players.splice(indexPlayer, 1);
        $scope.playersN--;
    }
});