/* */ 
"use strict";
var core = require("../level1/core"),
    defineGetter = require("../utils").defineGetter,
    defineSetter = require("../utils").defineSetter,
    HtmlToDom = require("../browser/htmltodom").HtmlToDom;
const domSymbolTree = require("../living/helpers/internal-constants").domSymbolTree;
const NODE_TYPE = require("../living/node-type");
core.DOMImplementation.prototype.getFeature = function(feature, version) {};
var DOCUMENT_POSITION_DISCONNECTED = core.Node.DOCUMENT_POSITION_DISCONNECTED = core.Node.prototype.DOCUMENT_POSITION_DISCONNECTED = 0x01;
var DOCUMENT_POSITION_PRECEDING = core.Node.DOCUMENT_POSITION_PRECEDING = core.Node.prototype.DOCUMENT_POSITION_PRECEDING = 0x02;
var DOCUMENT_POSITION_FOLLOWING = core.Node.DOCUMENT_POSITION_FOLLOWING = core.Node.prototype.DOCUMENT_POSITION_FOLLOWING = 0x04;
var DOCUMENT_POSITION_CONTAINS = core.Node.DOCUMENT_POSITION_CONTAINS = core.Node.prototype.DOCUMENT_POSITION_CONTAINS = 0x08;
var DOCUMENT_POSITION_CONTAINED_BY = core.Node.DOCUMENT_POSITION_CONTAINED_BY = core.Node.prototype.DOCUMENT_POSITION_CONTAINED_BY = 0x10;
var DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = core.Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = core.Node.prototype.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 0x20;
defineGetter(core.Node.prototype, 'textContent', function() {
  let text;
  switch (this.nodeType) {
    case NODE_TYPE.COMMENT_NODE:
    case NODE_TYPE.CDATA_SECTION_NODE:
    case NODE_TYPE.PROCESSING_INSTRUCTION_NODE:
    case NODE_TYPE.TEXT_NODE:
      return this.nodeValue;
    case NODE_TYPE.ATTRIBUTE_NODE:
    case NODE_TYPE.DOCUMENT_FRAGMENT_NODE:
    case NODE_TYPE.ELEMENT_NODE:
      text = '';
      for (const child of domSymbolTree.treeIterator(this)) {
        if (child.nodeType === NODE_TYPE.TEXT_NODE) {
          text += child.nodeValue;
        }
      }
      return text;
    default:
      return null;
  }
});
defineSetter(core.Node.prototype, 'textContent', function(txt) {
  switch (this.nodeType) {
    case NODE_TYPE.COMMENT_NODE:
    case NODE_TYPE.CDATA_SECTION_NODE:
    case NODE_TYPE.PROCESSING_INSTRUCTION_NODE:
    case NODE_TYPE.TEXT_NODE:
      return this.nodeValue = String(txt);
  }
  for (let child = null; child = domSymbolTree.firstChild(this); ) {
    this.removeChild(child);
  }
  if (txt !== "" && txt != null) {
    this.appendChild(this._ownerDocument.createTextNode(txt));
  }
  return txt;
});
core.Node.prototype.setUserData = function(key, data, handler) {
  var r = this[key] || null;
  this[key] = data;
  return (r);
};
core.Node.prototype.getUserData = function(key) {
  var r = this[key] || null;
  return (r);
};
defineGetter(core.Attr.prototype, 'isId', function() {
  return (this.name.toLowerCase() === 'id');
});
core.UserDataHandler = function() {};
core.UserDataHandler.prototype.NODE_CLONED = 1;
core.UserDataHandler.prototype.NODE_IMPORTED = 2;
core.UserDataHandler.prototype.NODE_DELETED = 3;
core.UserDataHandler.prototype.NODE_RENAMED = 4;
core.UserDataHandler.prototype.NODE_ADOPTED = 5;
core.UserDataHandler.prototype.handle = function(operation, key, data, src, dst) {};
core.DOMError = function(severity, message, type, relatedException, relatedData, location) {
  this._severity = severity;
  this._message = message;
  this._type = type;
  this._relatedException = relatedException;
  this._relatedData = relatedData;
  this._location = location;
};
core.DOMError.prototype = {};
core.DOMError.prototype.SEVERITY_WARNING = 1;
core.DOMError.prototype.SEVERITY_ERROR = 2;
core.DOMError.prototype.SEVERITY_FATAL_ERROR = 3;
defineGetter(core.DOMError.prototype, 'severity', function() {
  return this._severity;
});
defineGetter(core.DOMError.prototype, 'message', function() {
  return this._message;
});
defineGetter(core.DOMError.prototype, 'type', function() {
  return this._type;
});
defineGetter(core.DOMError.prototype, 'relatedException', function() {
  return this._relatedException;
});
defineGetter(core.DOMError.prototype, 'relatedData', function() {
  return this._relatedData;
});
defineGetter(core.DOMError.prototype, 'location', function() {
  return this._location;
});
core.DOMConfiguration = function() {
  var possibleParameterNames = {
    'canonical-form': [false, true],
    'cdata-sections': [true, false],
    'check-character-normalization': [false, true],
    'comments': [true, false],
    'datatype-normalization': [false, true],
    'element-content-whitespace': [true, false],
    'entities': [true, false],
    'infoset': [undefined, true, false],
    'namespaces': [true, false],
    'namespace-declarations': [true, false],
    'normalize-characters': [false, true],
    'split-cdata-sections': [true, false],
    'validate': [false, true],
    'validate-if-schema': [false, true],
    'well-formed': [true, false]
  };
};
core.DOMConfiguration.prototype = {
  setParameter: function(name, value) {},
  getParameter: function(name) {},
  canSetParameter: function(name, value) {},
  parameterNames: function() {}
};
defineGetter(core.Document.prototype, 'domConfig', function() {
  return this._domConfig || new core.DOMConfiguration();
  ;
});
core.DOMStringList = function() {};
core.DOMStringList.prototype = {
  item: function() {},
  length: function() {},
  contains: function() {}
};
