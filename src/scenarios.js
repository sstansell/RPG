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
}.call(this, "Scenarios", this, function(require) {
  "use strict";

  //function Scenarios() { }
  //Scenarios.prototype.start = function () { };
  var Scenarios = [
    {
      label: "You attack",
      success: "Hit for ",
      fail: "Miss!",
      min: 4
    },
    {
      label: "You are attacked",
      success: "Hit for ",
      fail: "Dodge!",
      min: 7
    }
  ];
  // exports
  return Scenarios;
});
