/* */ 
"use strict";
var resourceLoader = require("../browser/resource-loader"),
    core = require("../level1/core"),
    utils = require("../utils"),
    defineGetter = utils.defineGetter,
    inheritFrom = utils.inheritFrom,
    cssom = require("cssom"),
    cssstyle = require("cssstyle"),
    resolveHref = require("../utils").resolveHref,
    assert = require("assert");
const domSymbolTree = require("../living/helpers/internal-constants").domSymbolTree;
const NODE_TYPE = require("../living/node-type");
core.StyleSheet = cssom.StyleSheet;
core.MediaList = cssom.MediaList;
core.CSSStyleSheet = cssom.CSSStyleSheet;
core.CSSRule = cssom.CSSRule;
core.CSSStyleRule = cssom.CSSStyleRule;
core.CSSMediaRule = cssom.CSSMediaRule;
core.CSSImportRule = cssom.CSSImportRule;
core.CSSStyleDeclaration = cssstyle.CSSStyleDeclaration;
function StyleSheetList() {}
StyleSheetList.prototype.__proto__ = Array.prototype;
StyleSheetList.prototype.item = function item(i) {
  return this[i];
};
core.StyleSheetList = StyleSheetList;
defineGetter(core.Document.prototype, 'styleSheets', function() {
  if (!this._styleSheets) {
    this._styleSheets = new StyleSheetList();
  }
  return this._styleSheets;
});
function fetchStylesheet(url, sheet) {
  resourceLoader.load(this, url, function(data) {
    url = sheet.href = resourceLoader.resolveResourceUrl(this.ownerDocument, url);
    evaluateStylesheet.call(this, data, sheet, url);
  });
}
function evaluateStylesheet(data, sheet, baseUrl) {
  var newStyleSheet = cssom.parse(data);
  var spliceArgs = newStyleSheet.cssRules;
  spliceArgs.unshift(0, sheet.cssRules.length);
  Array.prototype.splice.apply(sheet.cssRules, spliceArgs);
  scanForImportRules.call(this, sheet.cssRules, baseUrl);
  this.ownerDocument.styleSheets.push(sheet);
}
function scanForImportRules(cssRules, baseUrl) {
  if (!cssRules)
    return;
  for (var i = 0; i < cssRules.length; ++i) {
    if (cssRules[i].cssRules) {
      scanForImportRules.call(this, cssRules[i].cssRules, baseUrl);
    } else if (cssRules[i].href) {
      fetchStylesheet.call(this, resolveHref(baseUrl, cssRules[i].href), this.sheet);
    }
  }
}
assert.equal(undefined, core.HTMLLinkElement._init);
core.HTMLLinkElement._init = function() {
  this.addEventListener('DOMNodeInsertedIntoDocument', function() {
    if (!/(?:[ \t\n\r\f]|^)stylesheet(?:[ \t\n\r\f]|$)/i.test(this.rel)) {
      return;
    }
    if (this.href) {
      fetchStylesheet.call(this, this.href, this.sheet);
    }
  });
  this.addEventListener('DOMNodeRemovedFromDocument', function() {});
};
assert.equal(undefined, core.HTMLStyleElement._init);
core.HTMLStyleElement._init = function() {
  this.addEventListener('DOMNodeInsertedIntoDocument', function() {
    if (this.type && this.type !== 'text/css') {
      return;
    }
    let content = '';
    for (const child of domSymbolTree.childrenIterator(this)) {
      if (child.nodeType === NODE_TYPE.TEXT_NODE) {
        content += child.nodeValue;
      }
    }
    evaluateStylesheet.call(this, content, this.sheet, this._ownerDocument.URL);
  });
};
function getOrCreateSheet() {
  if (!this._cssStyleSheet) {
    this._cssStyleSheet = new cssom.CSSStyleSheet();
  }
  return this._cssStyleSheet;
}
defineGetter(core.HTMLLinkElement.prototype, 'sheet', getOrCreateSheet);
defineGetter(core.HTMLStyleElement.prototype, 'sheet', getOrCreateSheet);
