angular.module("bicas").controller("infoCtrl", ['$scope', function($scope) {
    $scope.appInfoEN = {
        intro: [
            'This app is used to count the points of all players while they play the card game Bicas.',
            'From the moment the first player is added, a table is generated with the following information: Name, Score, Round Category and Points in Previous Round.',
            'The table also includes a button to remove the player, an input box to add round points and a check box if he is the dealer (in case of a tie of loosers).'
        ],
        insPlayers: [
            'To insert a player, simply insert the name in the respective input box and click on the \'Add Player(s)\' button.',
            'You can also enter players all at once.',
            'In this case, enter the names separated by commas.',
            'The algorithm recognizes spacing (\',\'/\', \'/\' ,\'/\' , \').',
            'The \'Add Player(s)\' button is only available if the input box is not empty.',
            'The algorithm recognizes if you enter an existing player name.',
            'If you try it, it displays an error message and erases the input box.'
        ],
        table: [
            'The table columns are as follows:',
            'Delete / Name / Score / Round Category / Previous Round Points / Add Points / Dealer.',
            'The \'Delete\' column contains a button to delete the player (mentioned before).',
            'The \'Score\' column contains the sum of all points obtained in all rounds played.',
            'The \'Round Category\' column contains the player\'s category once the points have been added, which are as follows:',
            '- \'winner\' if have won the game (0 points, only one per round);',
            '- \'dealer\' if have lost the game (the one with the most points), shuffle and deal the cards;',
            '- In case of tied \'dealers\', must select the check box of looser by decision of the players (the one with the most cards, heads or tails, rock paper scissors, etc);',
            '- If a player reaches 420 or 422 points in the \'Score\', the player will have 0 points in the \'Score\' and wins the category \'#420FAZESSAXAPABRUX\';',
            '- The remaining players have no category (\'-\').',
            'The column \'Previous Round Points\' contains the points obtained in the round as soon as they are added',
            '(ie when added the points go to the next round, so that column contains the respective points that were added).',
            'The \'Add Points\' column contains an input box to add the points obtained in the round (described below).',
            'The \'Dealer\' column contains a check box whose selection, considering all players, is one or none (mentioned before).'
        ],
        addPoints: [
            'To add points, click on the \'Add Points\' button.',
            'However, the following specifications must be adhered to before clicking:',
            '- all point input boxes must be filled in;',
            '- mandatory to have one and only one player with 0 points;',
            '- there must not be more than one player with a filled check box (one or none).'
        ]
    }

    $scope.gameInfoEN = {
        intro: [
        'This game is kinda similar to Uno.',
        'While in Uno you must assist the color or the number or symbol, in the Bicas your move must assist the suit or the number or figure.'
        ],
        rules: [
        '- Only one card per player can be played;',
        '- If there is no card to play, the passes (does not go to the deck);',
        '- When everyone passes, the 1st that passed starts to go to the deck in the round, and so on, UNTIL SOMEONE PLAYS (from then on, it stops going to the deck);',
        '- The round ends when someone finish their cards;',
        '- When a player has only one card, he must say BICAS when playing the penultimate one, otherwise take it with a CONTRA-BICAS and get 2 cards (it is recommended to give a delay between half and a second before attacking with the CONTRA-BICAS);',
        '- The game ends when you want, when you all get tired, or when someone reaches the 420 or 422 score points.'
        ],
        special: [
        '- 2: forbids the next player;',
        '- 7: forces the next player to pick up 2 cards;',
        '- Q: revert the direction of the round;',
        '- J: change the suit (black card - it is the only card on which you are not forced to attend the suit)'
        ],
        points: [
        '- K: 40;',
        '- J: 30;',
        '- Q: 20;',
        '- N: n;',
        '- A: 1;'
        ]
    }
}]);