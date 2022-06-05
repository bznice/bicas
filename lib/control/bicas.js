angular.module("bicas", []);
angular.module("bicas")
    .controller("bicasCtrl", function ($scope) {
    $scope.app = "LETS PLAY BICAS!";

    $scope.rulesEN = {
        intro: [
        'This game is kinda similar to Uno.',
        'While in Uno you must assist the color or the number or symbol,',
        'in the Bicas your move must assist the suit or the number or figure.'
        ],
        rules: [
        'Original rules of the Bicas:',
        '- Only one card per player can be played;',
        '- If there is no card to play, the passes (does not go to the deck);',
        '- When everyone passes, the 1st that passed starts to go to the deck',
        ' in the round, and so on, UNTIL SOMEONE PLAYS (from then on, it stops',
        ' going to the deck);',
        '- The round ends when someone finish their cards;',
        '- When a player has only one card, he must say BICAS when playing the',
        ' penultimate one, otherwise take it with a CONTRA-BICAS and get 2 cards',
        ' (it is recommended to give a delay between half and a second before',
        ' attacking with the CONTRA-BICAS);',
        '- The game ends when you want, when you all get tired, or when',
        ' someone reaches the 420 or 422 score points.'
        ],
        special: [
        'Special cards:',
        '- 2: forbids the next player;',
        '- 7: forces the next player to pick up 2 cards;',
        '- Q: revert the direction of the round;',
        '- J: change the suit (black card - it is the only card on which you',
        ' are not forced to attend the suit)'
        ],
        points: [
        'Points:',
        '- K: 40;',
        '- J: 30;',
        '- Q: 20;',
        '- N: n;',
        '- A: 1;'
        ]
    };

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
        var errorCheckboxes = document.getElementById("errorCheckboxes");
        if ($scope.players.filter(player => player.dealer).length > 1) {
            errorCheckboxes.textContent = "Please select 0 or 1 dealer in checkboxes, only!"
            errorCheckboxes.style.color = "red"
        } else {
            errorCheckboxes.textContent = ""
            const specialArray = [420, 422];
            const dealer = ($scope.players.filter(player => player.dealer).length != 0) ? true : false;
            var looser = {name:"", points:"0"};
            var specialPlayer = false;
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