/* */ 
"use strict";
var inheritFrom = require("../utils").inheritFrom;
const domSymbolTree = require("./helpers/internal-constants").domSymbolTree;
const NODE_TYPE = require("./node-type");
module.exports = function(core) {
  core.Text = function Text(ownerDocument, data) {
    core.CharacterData.call(this, ownerDocument, data);
  };
  inheritFrom(core.CharacterData, core.Text, {
    nodeType: NODE_TYPE.TEXT_NODE,
    splitText: function(offset) {
      offset = offset >>> 0;
      var length = this.length;
      if (offset > length) {
        throw new core.DOMException(core.DOMException.INDEX_SIZE_ERR);
      }
      var count = length - offset;
      var newData = this.substringData(offset, count);
      var newNode = this._ownerDocument.createTextNode(newData);
      var parent = domSymbolTree.parent(this);
      if (parent !== null) {
        parent.insertBefore(newNode, this.nextSibling);
      }
      this.replaceData(offset, count, "");
      return newNode;
    }
  });
};
