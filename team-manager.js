var inquirer = require("inquirer");

function Player(name, position, offense, defense, starter) {
    this.name = name;
    this.position = position;
    this.offense = offense;
    this.defense = defense;
    this.starter = starter;
    this.goodGame = function() {
        var heads = 1;
        var coin = Math.floor(Math.random()* 2)+1;
        if(heads===coin) {
            this.offense += 1;
        }
        else {
            this.defense +=1;
        }
    }
    this.badGame = function() {
        var heads = 1;
        var coin = Math.floor(Math.random()* 2)+1;
        if(heads===coin) {
            this.offense -= 1;
        }
        else {
            this.defense -=1;
        }
    }

    this.printStats = function() {
         console.log("Name: "+this.name, "\nPosition: " + this.position, "\nOffense: " + this.offense, "\nDefense: "+this.defense, "\nStarter? " +this.starter);
    }
}
var playerCount = 0;
var players = [];
var starters = [];
var subs = [];
var gameCount = 0;
function createPlayers() {
    if(playerCount<3) {
        console.log("New Player");
        inquirer.prompt([
           {
               name: "name",
               type: "input",
               message: "What is the player's name?"
           },
           {
               name: "position",
               type: "input",
               message: "What is the player's position?"
           },
           {
                name: "offense",
                type: "input",
                message: "What is the player's offense level?",
                validate: function validateOffense(offense) {
                    return parseFloat(offense)>0 && parseFloat(offense)<11;
            }
            },
            {
                name: "defense",
                type: "input",
                message: "What is the player's defense level?",
                validate: function validateDefense(defense) {
                    return parseFloat(defense)>0 && parseFloat(defense)<11;
                }
            },
            {
                name: "starter",
                type: "list",
                message: "Is this player a starter or substitute?",
                choices: ["Starter","Substitute"],
                validate: function validateStarters(starter) {
                    return starter=="Starter" && starters.length<2;
                }
            }
        ])
        .then(function(answers){
            var newPlayer = new Player(
                answers.name,
                answers.position,
                answers.offense,
                answers.defense,
                answers.starter
            );
            players.push(newPlayer);
            if (newPlayer.starter === "Starter") {
                starters.push(newPlayer);
                console.log(starters.length);
            }
            else {
                subs.push(newPlayer);
            }
            playerCount++;
            createPlayers();
        })
        
    }
    else {
        for (var x = 0; x<players.length; x++) {
            players[x].printStats();
        }
        playGame();
    }
}
createPlayers();
var score = 0;
var teamOffense = 0;
var teamDefense = 0;
function playGame() {
    if(starters.length === 2 && gameCount<5) {
        var randomOffense = Math.floor(Math.random()*20)+1;
        var randomDefense = Math.floor(Math.random()*20)+1;
        
        for (var i=0; i<starters.length; i++) {
            teamOffense += starters[i].offense;
            teamDefense += starters[i].defense;
        }
        
        if (randomOffense<teamOffense) {
            score ++;
        }
        
        if (randomDefense>teamDefense) {
            score --;
        }

        console.log(randomOffense, randomDefense, teamOffense, teamDefense, score);
        playGame();
    }
}

