/* */ 
"use strict";
var nwmatcher = require("nwmatcher/src/nwmatcher-noqsa");
var memoizeQuery = require("../utils").memoizeQuery;
const domSymbolTree = require("./helpers/internal-constants").domSymbolTree;
module.exports = function(core) {
  [core.Document, core.DocumentFragment, core.Element].forEach(function(Class) {
    Class.prototype.querySelector = memoizeQuery(function(selectors) {
      return addNwmatcher(this).first(String(selectors), this);
    });
    Class.prototype.querySelectorAll = memoizeQuery(function(selectors) {
      return new core.NodeList(addNwmatcher(this).select(String(selectors), this));
    });
  });
  core.Element.prototype.matches = memoizeQuery(function(selectors) {
    return addNwmatcher(this).match(this, selectors);
  });
};
module.exports.querySelector = function(parentNode, selectors) {
  if (!domSymbolTree.hasChildren(parentNode) || (parentNode === parentNode._ownerDocument && !parentNode._documentElement)) {
    return null;
  }
  return addNwmatcher(parentNode).first(selectors, parentNode);
};
function addNwmatcher(parentNode) {
  var document = parentNode._ownerDocument;
  if (!document._nwmatcher) {
    document._nwmatcher = nwmatcher({document: document});
    document._nwmatcher.configure({UNIQUE_ID: false});
  }
  return document._nwmatcher;
}
