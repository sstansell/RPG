import $ from "jquery";
import { DiceRoller } from "./rpg-dice-roller.js";
import Encounters from "./encounters.js";
import Handlebars from "handlebars";

require("./css/normalize.css");
require("./css/skeleton.css");
require("./css/style.css");
require("./css/enemyCard.css");

function getRandom(col) {
  var ret = col[Math.floor(Math.random() * col.length)];
  return ret;
}

function writeLog(line) {
  //console.log(line);
  var log = $("#log");
  log.html(log.html() + "<br>" + line);
}
function findObjectByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }
  return null;
}
function reset(encounter) {
  $("#encounter").html("");
  $(".enemy").html("");
  $("#decisionList").html("");
  $("#log").html("");
  encounter.enemies.forEach(function(element) {
    element.hp = element.maxHP;
  });
}

function buildEnemyCard(enemy) {
  writeLog("Building Card for " + enemy.name + " (Level " + enemy.level + ")");

  var source = document.getElementById("enemy-template").innerHTML;
  var template = Handlebars.compile(source);
  var enemyCard = template(enemy);

  return enemyCard;
}

$("#start").click(function() {
  var encounter = getRandom(Encounters);
  reset(encounter);
  $("#encounter").append("<h2>" + encounter.name) + "</h2>";
  $("#encounter").append("What do you do?");
  writeLog(encounter.name);
  writeLog("# of enemies: " + encounter.enemies.length);

  encounter.decisions.forEach(function(element) {
    var li =
      "<li class='decision' data-id='" +
      element.id +
      "'>" +
      element.name +
      "</li>";
    $("#decisionList").append(li);
  });

  //show the enemies
  encounter.enemies.forEach(function(element) {
    var enemyCard = buildEnemyCard(element);
    $("#enemies").append(enemyCard);
  });

  $(".decision").click(function(element) {
    var id = $(this).data("id");
    writeLog("Clicked Decision " + id + ", " + $(this).text());

    var decision = findObjectByKey(encounter.decisions, "id", id);
    var die = decision.die;
    var min = decision.min;

    if (decision.type === "attack") {
      //select an enemy (do this randomly to start)
      var enemy = getRandom(encounter.enemies);

      //roll for attack
      writeLog("Min Roll for Success: " + min);
      writeLog("Rolling " + die);
      var roll = doRoll(die);
      writeLog("Rolled " + roll);

      //if it's a hit, apply damage
      if (roll >= min) {
        var damage = roll - min + 1;
        writeLog("Hit! Inflicted " + damage + " damage.");
        enemy.hp = enemy.hp - damage;
        //check to see if enemy HP are below 1
        if (enemy.hp < 1) {
          writeLog("Enemy " + enemy.name + " defeated");
          //apply experience
          writeLog("You have received " + enemy.experience + " EXP");

          //check for item drops
        } else {
          writeLog("Enemy HP reduced to " + enemy.hp);
        }
      } else {
        writeLog("Miss!");
      }
    }
    if (decision.type === "retreat") {
      writeLog("Min Roll for Success: " + min);
      writeLog("Rolling " + die);
      var roll = doRoll(die);
      writeLog("Rolled " + roll);
      if (roll >= min) {
        writeLog("You successfully retreated.");
      } else {
        writeLog("Failed to retreat!");
      }
    }
  });
});

function doRoll(dice) {
  // create a new instance of the DiceRoller
  var diceRoller = new DiceRoller();

  // roll the dice
  diceRoller.roll(dice);

  // get the latest dice rolls from the log
  var latestRoll = diceRoller
    .getLog()
    .shift()
    .getTotal();

  // output the latest roll - it has a toString method for nice output

  return latestRoll;
  //document.write(latestRoll);
}
