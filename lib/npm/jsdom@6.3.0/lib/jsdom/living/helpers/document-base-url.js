/* */ 
"use strict";
const internalQuerySelector = require("../selectors").querySelector;
const internalGetAttr = require("../attributes").getAttributeValue;
const URL = require("../../utils").URL;
exports.documentBaseURL = function(document) {
  const firstBase = internalQuerySelector(document, "base[href]");
  const fallbackBaseURL = exports.fallbackBaseURL(document);
  if (firstBase === null) {
    return fallbackBaseURL;
  } else {
    return exports.frozenBaseURL(firstBase, fallbackBaseURL);
  }
};
exports.fallbackBaseURL = function(document) {
  if (document._URL === "about:blank" && document._defaultView && document._defaultView._parent !== document._defaultView) {
    return module.exports.documentBaseURL(document._defaultView._parent._document);
  }
  return document._URL;
};
exports.frozenBaseURL = function(baseElement, fallbackBaseURL) {
  const baseHrefAttribute = internalGetAttr(baseElement, "href");
  try {
    return new URL(baseHrefAttribute, fallbackBaseURL).href;
  } catch (e) {
    return fallbackBaseURL;
  }
};
