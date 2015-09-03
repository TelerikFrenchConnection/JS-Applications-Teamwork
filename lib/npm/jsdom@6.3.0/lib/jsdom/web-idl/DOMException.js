/* */ 
"use strict";
var inheritFrom = require("../utils").inheritFrom;
var addConstants = require("../utils").addConstants;
var table = require("./dom-exception-table.json!systemjs-json");
var namesWithCodes = Object.keys(table).filter(function(name) {
  return "legacyCodeValue" in table[name];
});
var codesToNames = Object.create(null);
namesWithCodes.forEach(function(name) {
  codesToNames[table[name].legacyCodeValue] = name;
});
module.exports = DOMException;
function DOMException(code, message) {
  var name = codesToNames[code];
  if (message === undefined) {
    message = table[name].description;
  }
  Error.call(this, message);
  Object.defineProperty(this, "name", {
    value: name,
    writable: true,
    configurable: true,
    enumerable: false
  });
  Object.defineProperty(this, "code", {
    value: code,
    writable: true,
    configurable: true,
    enumerable: false
  });
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, DOMException);
  }
}
inheritFrom(Error, DOMException);
var constants = Object.create(null);
namesWithCodes.forEach(function(name) {
  constants[table[name].legacyCodeName] = table[name].legacyCodeValue;
});
addConstants(DOMException, constants);
