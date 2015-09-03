/* */ 
"use strict";
const inheritFrom = require("../utils").inheritFrom;
const oldURL = Symbol("oldURL");
const newURL = Symbol("newURL");
module.exports = function(core) {
  core.HashChangeEvent = function HashChangeEvent(eventType, eventInit) {
    core.Event.apply(this, arguments);
    this[oldURL] = eventInit && eventInit.oldURL !== undefined ? String(eventInit.oldURL) : "";
    this[newURL] = eventInit && eventInit.newURL !== undefined ? String(eventInit.newURL) : "";
  };
  inheritFrom(core.Event, core.HashChangeEvent, {
    get oldURL() {
      return this[oldURL];
    },
    get newURL() {
      return this[newURL];
    }
  });
};
