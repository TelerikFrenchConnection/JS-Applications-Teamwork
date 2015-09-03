/* */ 
"use strict";
const defineGetter = require("../utils").defineGetter;
const simultaneousIterators = require("../utils").simultaneousIterators;
const attributes = require("./attributes");
const cloneDoctype = require("./document-type").clone;
const cloningSteps = require("./helpers/internal-constants");
const domSymbolTree = require("./helpers/internal-constants").domSymbolTree;
const NODE_TYPE = require("./node-type");
const documentBaseURL = require("./helpers/document-base-url").documentBaseURL;
module.exports = function(core) {
  var DOCUMENT_POSITION_DISCONNECTED = core.Node.DOCUMENT_POSITION_DISCONNECTED;
  var DOCUMENT_POSITION_FOLLOWING = core.Node.DOCUMENT_POSITION_FOLLOWING;
  var DOCUMENT_POSITION_CONTAINED_BY = core.Node.DOCUMENT_POSITION_CONTAINED_BY;
  var DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = core.Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  function isObsoleteNodeType(node) {
    return node.nodeType === NODE_TYPE.ENTITY_NODE || node.nodeType === NODE_TYPE.ENTITY_REFERENCE_NODE || node.nodeType === NODE_TYPE.NOTATION_NODE || node.nodeType === NODE_TYPE.CDATA_SECTION_NODE;
  }
  core.Node.prototype.cloneNode = function(deep) {
    deep = Boolean(deep);
    return module.exports.clone(core, this, undefined, deep);
  };
  core.Node.prototype.compareDocumentPosition = function(other) {
    const reference = this;
    if (!(other instanceof core.Node)) {
      throw new Error("Comparing position against non-Node values is not allowed");
    }
    if (isObsoleteNodeType(reference) || isObsoleteNodeType(other)) {
      throw new Error("Obsolete node type");
    }
    const result = domSymbolTree.compareTreePosition(reference, other);
    if (result === DOCUMENT_POSITION_DISCONNECTED) {
      return DOCUMENT_POSITION_DISCONNECTED | DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC | DOCUMENT_POSITION_FOLLOWING;
    }
    return result;
  };
  core.Node.prototype.contains = function(other) {
    return !!(other instanceof core.Node && (this === other || this.compareDocumentPosition(other) & DOCUMENT_POSITION_CONTAINED_BY));
  };
  defineGetter(core.Node.prototype, "parentElement", function() {
    const parentNode = domSymbolTree.parent(this);
    return parentNode !== null && parentNode.nodeType === NODE_TYPE.ELEMENT_NODE ? parentNode : null;
  });
  defineGetter(core.Node.prototype, "baseURI", function() {
    return documentBaseURL(this._ownerDocument);
  });
  function nodeEquals(a, b) {
    if (a.nodeType !== b.nodeType) {
      return false;
    }
    switch (a.nodeType) {
      case NODE_TYPE.DOCUMENT_TYPE_NODE:
        if (a._name !== b._name || a._publicId !== b._publicId || a._systemId !== b._systemId) {
          return false;
        }
        break;
      case NODE_TYPE.ELEMENT_NODE:
        if (a._namespaceURI !== b._namespaceURI || a._prefix !== b._prefix || a._localName !== b._localName || a._attributes.length !== b._attributes.length) {
          return false;
        }
        break;
      case NODE_TYPE.PROCESSING_INSTRUCTION_NODE:
        if (a._target !== b._target || a._data !== b._data) {
          return false;
        }
        break;
      case NODE_TYPE.TEXT_NODE:
      case NODE_TYPE.COMMENT_NODE:
        if (a._data !== b._data) {
          return false;
        }
        break;
    }
    if (a.nodeType === NODE_TYPE.ELEMENT_NODE) {
      for (var i = 0; i < a._attributes.length; ++i) {
        var aAttr = a._attributes[i];
        var bAttr = b._attributes.$getNode(aAttr._namespaceURI, aAttr._localName);
        if (!bAttr) {
          return false;
        }
        if (aAttr.value !== bAttr.value) {
          return false;
        }
      }
    }
    for (const nodes of simultaneousIterators(domSymbolTree.childrenIterator(a), domSymbolTree.childrenIterator(b))) {
      if (!nodes[0] || !nodes[1]) {
        return false;
      }
      if (!nodeEquals(nodes[0], nodes[1])) {
        return false;
      }
    }
    return true;
  }
  core.Node.prototype.isEqualNode = function(node) {
    if (node === undefined) {
      node = null;
    }
    if (node === null) {
      return false;
    }
    if (this === node) {
      return true;
    }
    return nodeEquals(this, node);
  };
};
module.exports.clone = function(core, node, document, cloneChildren) {
  if (document === undefined) {
    document = node._ownerDocument;
  }
  let copy;
  switch (node.nodeType) {
    case NODE_TYPE.DOCUMENT_NODE:
      copy = new node.constructor({
        contentType: node._contentType,
        url: node._URL,
        parsingMode: node._parsingMode
      });
      document = copy;
      break;
    case NODE_TYPE.DOCUMENT_TYPE_NODE:
      copy = cloneDoctype(core, node);
      break;
    case NODE_TYPE.ELEMENT_NODE:
      copy = document._createElementWithCorrectElementInterface(node._localName, node._namespaceURI);
      copy._namespaceURI = node._namespaceURI;
      copy._prefix = node._prefix;
      copy._localName = node._localName;
      attributes.copyAttributeList(node, copy);
      break;
    case NODE_TYPE.TEXT_NODE:
      copy = new core.Text(document, node._data);
      break;
    case NODE_TYPE.COMMENT_NODE:
      copy = new core.Comment(document, node._data);
      break;
    case NODE_TYPE.PROCESSING_INSTRUCTION_NODE:
      copy = new core.ProcessingInstruction(document, node._target, node._data);
      break;
    case NODE_TYPE.DOCUMENT_FRAGMENT_NODE:
      copy = new core.DocumentFragment(document);
      break;
  }
  if (node[cloningSteps]) {
    node[cloningSteps](copy, node, document, cloneChildren);
  }
  if (cloneChildren) {
    for (const child of domSymbolTree.childrenIterator(node)) {
      const childCopy = module.exports.clone(core, child, document, true);
      copy.appendChild(childCopy);
    }
  }
  return copy;
};
