/* */ 
"use strict";
var parser = require("./generated-parser");
exports.name = function(potentialName) {
  return mapResult(parser.startWith("Name").exec(potentialName));
};
exports.qname = function(potentialQname) {
  return mapResult(parser.startWith("QName").exec(potentialQname));
};
function mapResult(result) {
  return {
    success: result.success,
    error: result.error && parser.getTrace(result.error.message)
  };
}
