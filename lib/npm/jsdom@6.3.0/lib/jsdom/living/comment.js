/* */ 
"use strict";
var inheritFrom = require("../utils").inheritFrom;
const NODE_TYPE = require("./node-type");
module.exports = function(core) {
  core.Comment = function Comment(ownerDocument, data) {
    core.CharacterData.call(this, ownerDocument, data);
  };
  inheritFrom(core.CharacterData, core.Comment, {nodeType: NODE_TYPE.COMMENT_NODE});
};
