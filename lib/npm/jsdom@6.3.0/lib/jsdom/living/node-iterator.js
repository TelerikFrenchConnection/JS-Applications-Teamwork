/* */ 
"use strict";
const domSymbolTree = require("./helpers/internal-constants").domSymbolTree;
const defineGetter = require("../utils").defineGetter;
const INTERNAL = Symbol("NodeIterator internal");
module.exports = function(core) {
  function NodeIteratorInternal(document, root, whatToShow, filter) {
    this.active = true;
    this.document = document;
    this.root = root;
    this.referenceNode = root;
    this.pointerBeforeReferenceNode = true;
    this.whatToShow = whatToShow;
    this.filter = filter;
  }
  NodeIteratorInternal.prototype.throwIfNotActive = function() {
    if (!this.active) {
      throw Error("This NodeIterator is no longer active. " + "More than " + this.document._activeNodeIteratorsMax + " iterators are being used concurrently. " + "You can increase the 'concurrentNodeIterators' option to " + "make this error go away.");
    }
  };
  NodeIteratorInternal.prototype.traverse = function(next) {
    let node = this.referenceNode;
    let beforeNode = this.pointerBeforeReferenceNode;
    do {
      if (next) {
        if (!beforeNode) {
          node = domSymbolTree.following(node, {root: this.root});
          if (!node) {
            return null;
          }
        }
        beforeNode = false;
      } else {
        if (beforeNode) {
          node = domSymbolTree.preceding(node, {root: this.root});
          if (!node) {
            return null;
          }
        }
        beforeNode = true;
      }
    } while (this.filterNode(node) !== core.NodeFilter.FILTER_ACCEPT);
    this.pointerBeforeReferenceNode = beforeNode;
    this.referenceNode = node;
    return node;
  };
  NodeIteratorInternal.prototype.filterNode = function(node) {
    let n = node.nodeType - 1;
    if (!(this.whatToShow & (1 << n))) {
      return core.NodeFilter.FILTER_SKIP;
    }
    let ret = core.NodeFilter.FILTER_ACCEPT;
    let filter = this.filter;
    if (typeof filter === "function") {
      ret = filter(node);
    } else if (filter && typeof filter.acceptNode === "function") {
      ret = filter.acceptNode(node);
    }
    if (ret === true) {
      return core.NodeFilter.FILTER_ACCEPT;
    } else if (ret === false) {
      return core.NodeFilter.FILTER_REJECT;
    }
    return ret;
  };
  NodeIteratorInternal.prototype.runRemovingSteps = function(oldNode, oldParent, oldPreviousSibling) {
    if (oldNode.contains(this.root)) {
      return;
    }
    if (!oldNode.contains(this.referenceNode)) {
      return;
    }
    if (this.pointerBeforeReferenceNode) {
      let nextSibling = oldPreviousSibling ? oldPreviousSibling.nextSibling : oldParent.firstChild;
      if (nextSibling) {
        this.referenceNode = nextSibling;
        return;
      }
      let next = domSymbolTree.following(oldParent, {skipChildren: true});
      if (this.root.contains(next)) {
        this.referenceNode = next;
        return;
      }
      this.pointerBeforeReferenceNode = false;
    }
    this.referenceNode = oldPreviousSibling ? domSymbolTree.lastInclusiveDescendant(oldPreviousSibling) : oldParent;
  };
  core.Document._removingSteps.push(function(document, oldNode, oldParent, oldPreviousSibling) {
    for (let i = 0; i < document._activeNodeIterators.length; ++i) {
      let internal = document._activeNodeIterators[i];
      internal.runRemovingSteps(oldNode, oldParent, oldPreviousSibling);
    }
  });
  core.Document.prototype.createNodeIterator = function(root, whatToShow, filter) {
    if (!root) {
      throw new TypeError("Not enough arguments to Document.createNodeIterator.");
    }
    if (filter === undefined) {
      filter = null;
    }
    if (filter !== null && typeof filter !== "function" && typeof filter.acceptNode !== "function") {
      throw new TypeError("Argument 3 of Document.createNodeIterator should be a function or implement NodeFilter.");
    }
    let document = root._ownerDocument;
    whatToShow = whatToShow === undefined ? core.NodeFilter.SHOW_ALL : (whatToShow & core.NodeFilter.SHOW_ALL) >>> 0;
    filter = filter || null;
    let it = Object.create(core.NodeIterator.prototype);
    let internal = new NodeIteratorInternal(document, root, whatToShow, filter);
    it[INTERNAL] = internal;
    document._activeNodeIterators.push(internal);
    while (document._activeNodeIterators.length > document._activeNodeIteratorsMax) {
      let internalOther = document._activeNodeIterators.shift();
      internalOther.active = false;
    }
    return it;
  };
  core.NodeIterator = function NodeIterator() {
    throw new TypeError("Illegal constructor");
  };
  defineGetter(core.NodeIterator.prototype, "root", function() {
    return this[INTERNAL].root;
  });
  defineGetter(core.NodeIterator.prototype, "referenceNode", function() {
    const internal = this[INTERNAL];
    internal.throwIfNotActive();
    return internal.referenceNode;
  });
  defineGetter(core.NodeIterator.prototype, "pointerBeforeReferenceNode", function() {
    const internal = this[INTERNAL];
    internal.throwIfNotActive();
    return internal.pointerBeforeReferenceNode;
  });
  defineGetter(core.NodeIterator.prototype, "whatToShow", function() {
    return this[INTERNAL].whatToShow;
  });
  defineGetter(core.NodeIterator.prototype, "filter", function() {
    return this[INTERNAL].filter;
  });
  core.NodeIterator.prototype.previousNode = function() {
    const internal = this[INTERNAL];
    internal.throwIfNotActive();
    return internal.traverse(false);
  };
  core.NodeIterator.prototype.nextNode = function() {
    const internal = this[INTERNAL];
    internal.throwIfNotActive();
    return internal.traverse(true);
  };
  core.NodeIterator.prototype.detach = function() {};
  core.NodeIterator.prototype.toString = function() {
    return "[object NodeIterator]";
  };
};
