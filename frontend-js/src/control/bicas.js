angular.module("bicas", []);
angular.module("bicas").controller("bicasCtrl", ['$scope', function ($scope) {
    
    //----------------- DATA -------------------------------------------------

    var arrayTheme = ["light", "dark"];

    document.body.className = arrayTheme.some(theme => document.body.className.includes(theme))
        ? document.body.className : "light " + document.body.className;

    $scope.appInfoButton = false;

    $scope.gameInfoButton = false;

    $scope.appInfoButtonText = ($scope.appInfoButton ? "Hide " : "View ") + "App Information";

    $scope.gameInfoButtonText = ($scope.gameInfoButton ? "Hide " : "View ") + "Game Information";

    $scope.players = [];

    $scope.playersN = 0;

    $scope.themeSpanTimeout = "";

    $scope.pointsSpanTimeout = "";

    $scope.playerExistSpanTimeout = "";

    //----------------- INFO METHODS -----------------------------------------

    $scope.showHideAppInfo = function () {
        $scope.appInfoButton = !$scope.appInfoButton;
        $scope.appInfoButtonText = ($scope.appInfoButton ? "Hide " : "View ") + "App Information";
    }

    $scope.showHideGameInfo = function () {
        $scope.gameInfoButton = !$scope.gameInfoButton;
        $scope.gameInfoButtonText = ($scope.gameInfoButton ? "Hide " : "View ") + "Game Information";
    }

    //----------------- TOGGLE THEME METHODS ---------------------------------

    $scope.toggleTheme = function () {
        const theme = document.body.className;
        var logThemeChanged = document.getElementById("themeChanged");
        document.body.className = (theme.includes("light"))
                    ? theme.replace("light", "dark")
                    : theme.replace("dark", "light");
        logThemeChanged.textContent = "Theme changet to"
                    + (document.body.className.includes("light") ? " light" : " dark");
        if($scope.themeSpanTimeout != "") clearTimeout($scope.themeSpanTimeout);
        $scope.themeSpanTimeout = setTimeout(clearDemo, 2000, logThemeChanged, $scope.themeSpanTimeout);
    }

    //----------------- ADD/DELETE PLAYERS METHODS ---------------------------

    $scope.addPlayer = function (player) {
        if(isMultiplePlayer(player.name)) {
            var re = /\s*,\s*/;
            var arrayPlayersNames = player.name.split(re);
            if(playersIncludePlayerListByName(arrayPlayersNames)) {
                playerAlreadyExists(player);
            } else {
                var players = [];
                pushPlayersNames(players, arrayPlayersNames);
                players.forEach(player => pushPlayer(player));
            }
        } else {
            if(playersIncludePlayerByName(player.name)) {
                playerAlreadyExists(player);
            } else {
                pushPlayer(player);
            }
        }
    }

    $scope.deletePlayer = function (name) {
        var indexPlayer = $scope.players
            .map(function (player){return player.name})
            .indexOf(name);
        $scope.players.splice(indexPlayer, 1);
        $scope.playersN--;
    }

    var pushPlayer = function (player) {
        player.score = "0";
        player.category = "-";
        player.pointslr = "0";
        player.points = "";
        player.dealer = false;
        $scope.players.push(angular.copy(player));
        $scope.playersN++;
        delete $scope.player;
    }

    var pushPlayersNames = function (players, arrayOnlyNames) {
        arrayOnlyNames.forEach(name => {
            var player = {name: name};
            players.push(angular.copy(player));
        });
    }

    var isMultiplePlayer = function(name) {
        var separators = [",", " ,", ", "," , "];
        return separators.some(sep => name.includes(sep));
    }

    var playersIncludePlayerByName = function(name) {
        var exists = false;
        $scope.players.forEach(player => {
            if(player.name === name) exists = true;
        });
        return exists ? true : false;
    }

    var playersIncludePlayerListByName = function(arrayOnlyNames) {
        var exists = false;
        $scope.players.forEach(player => {
            if(arrayOnlyNames.some(name => player.name === name)) exists = true;
        });
        return exists ? true : false;
    }

    var playerAlreadyExists = function (player) {
        var logErrorPlayerExists = document.getElementById("errorPlayerExists");
        logErrorPlayerExists.textContent = "This player already exists!";
        if($scope.playerExistSpanTimeout != "") clearTimeout($scope.playerExistSpanTimeout);
        $scope.playerExistSpanTimeout = setTimeout(clearDemo, 2000, logErrorPlayerExists, $scope.playerExistSpanTimeout);
        player.name = "";
    }

    //----------------- ADD POINTS METHODS -----------------------------------

    $scope.addPoints = function () {
        if (validatePointsAndCheckboxes()) {
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
    }

    var validatePointsAndCheckboxes = function () {
        var error = document.getElementById("errorPointsCheckboxes");
        if($scope.players.filter(player => player.dealer).length > 1
                && $scope.players.filter(player => player.points == "").length > 0
                && $scope.players.filter(player => player.points == "0").length == 0
                && $scope.players.filter(player => player.points == "0").length > 1) {
            error.textContent = "WTF ARE YOU DOING?!?!";
            if($scope.pointsSpanTimeout != "") clearTimeout($scope.pointsSpanTimeout);
            $scope.pointsSpanTimeout = setTimeout(clearDemo, 2000, error, $scope.pointsSpanTimeout);
            return false;
        }
        if($scope.players.filter(player => player.dealer).length > 1) {
            error.textContent = "Please select 0 or 1 dealer in checkboxes, only!";
            if($scope.pointsSpanTimeout != "") clearTimeout($scope.pointsSpanTimeout);
            $scope.pointsSpanTimeout = setTimeout(clearDemo, 2000, error, $scope.pointsSpanTimeout);
            return false;
        }
        if($scope.players.filter(player => player.points == "").length > 0) {
            error.textContent = "Please insert all points (even zero to winner)!";
            if($scope.pointsSpanTimeout != "") clearTimeout($scope.pointsSpanTimeout);
            $scope.pointsSpanTimeout = setTimeout(clearDemo, 2000, error, $scope.pointsSpanTimeout);
            return false;
        }
        if($scope.players.filter(player => player.points == "0").length == 0) {
            error.textContent = "This round don't have winner!";
            if($scope.pointsSpanTimeout != "") clearTimeout($scope.pointsSpanTimeout);
            $scope.pointsSpanTimeout = setTimeout(clearDemo, 2000, error, $scope.pointsSpanTimeout);
            return false;
        }
        if($scope.players.filter(player => player.points == "0").length > 1) {
            error.textContent = "Only one winner per round!";
            if($scope.pointsSpanTimeout != "") clearTimeout($scope.pointsSpanTimeout);
            $scope.pointsSpanTimeout = setTimeout(clearDemo, 2000, error, $scope.pointsSpanTimeout);
            return false;
        }
        return true;
    }
  
    //----------------- GENERAL METHODS --------------------------------------

    clearDemo = function (log, timeoutId) {
        log.textContent = "";
        timeoutId = "";
    }
    
    //------------------------------------------------------------------------
}]);