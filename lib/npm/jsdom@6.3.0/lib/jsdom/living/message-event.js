/* */ 
"use strict";
const inheritFrom = require("../utils").inheritFrom;
module.exports = function(core) {
  core.MessageEvent = function MessageEvent(eventType, eventInit) {
    core.Event.apply(this, arguments);
    this._data = eventInit ? eventInit.data : undefined;
  };
  inheritFrom(core.Event, core.MessageEvent, {get data() {
      return this._data;
    }});
};
