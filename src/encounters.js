!function(name, context, definition) {
  if (typeof exports == "object") {
    module.exports = definition(require);
  } else if (typeof define == "function" && define.amd) {
    define(definition);
  } else if (typeof YUI == "function") {
    YUI.add(name, definition, "@VERSION@", { requires: [] });
  } else {
    context[name] = definition();
  }
}.call(this, "Encounters", this, function(require) {
  "use strict";

  //function Scenarios() { }
  //Scenarios.prototype.start = function () { };
  var Encounters = [
    {
      name: "You See a Kobold",
      enemies: [
        {
          id: 0,
          name: "Skippy",
          race: "Kobold",
          description:
            "Kobolds were aggressive, inward, yet industrious small humanoid creatures. They were noted for their skill at building traps and preparing ambushes, and mining. They were distinctly related to dragons and urds and were often found serving as their minions.",
          image: "http://www.lomion.de/cmm/img/kobold.gif",
          level: 3,
          maxHP: 40,
          hp: 40,
          strength: 3,
          maxMana: 0,
          experience: 15,
          dexterity: 2,
          equipment: [
            {
              name: "Basic Short Sword",
              minDamage: 1,
              maxDamage: 4,
              chanceToDrop: 0.5,
              itemClass: "sword",
              itemType: "weapon"
            },
            {
              name: "Basic Small Shield",
              minDamage: 1,
              maxDamage: 4,
              chanceToDrop: 0.5,
              itemClass: "shield",
              itemType: "armor"
            }
          ]
        }
      ],
      decisions: [
        {
          id: 0,
          name: "Attack!",
          success: "Hit for ",
          fail: "Miss!",
          die: "2d6",
          min: "6",
          type: "attack"
        },
        {
          id: 1,
          name: "Flee!",
          success: "You successfully fled",
          fail: "You Were Cornered!",
          die: "1d6",
          min: "3",
          type: "retreat"
        }
      ]
    }
  ];
  // exports
  return Encounters;
});
