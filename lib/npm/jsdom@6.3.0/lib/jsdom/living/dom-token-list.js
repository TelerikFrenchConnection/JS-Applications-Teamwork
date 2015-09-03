/* */ 
"use strict";
const DOMException = require("../web-idl/DOMException");
const INTERNAL = Symbol("DOMTokenList internal");
class DOMTokenList {
  constructor() {
    throw new TypeError("Illegal constructor");
  }
  item(index) {
    const length = this.length;
    return length <= index || index < 0 ? null : this[index];
  }
  contains(token) {
    token = String(token);
    validateToken(token);
    return indexOf(this, token) !== -1;
  }
  add() {
    for (let i = 0; i < arguments.length; i++) {
      const token = String(arguments[i]);
      validateToken(token);
      if (indexOf(this, token) === -1) {
        push(this, token);
      }
    }
    update(this);
  }
  remove() {
    for (let i = 0; i < arguments.length; i++) {
      const token = String(arguments[i]);
      validateToken(token);
      const index = indexOf(this, token);
      if (index !== -1) {
        spliceLite(this, index, 1);
      }
    }
    update(this);
  }
  toggle(token, force) {
    token = String(token);
    force = force === undefined ? undefined : Boolean(force);
    validateToken(token);
    const index = indexOf(this, token);
    if (index !== -1) {
      if (force === false || force === undefined) {
        spliceLite(this, index, 1);
        update(this);
        return false;
      }
      return true;
    }
    if (force === false) {
      return false;
    }
    push(this, token);
    update(this);
    return true;
  }
  get length() {
    return this[INTERNAL].tokens.length;
  }
  toString() {
    return this[INTERNAL].tokens.join(" ");
  }
}
function validateToken(token) {
  if (token === "") {
    throw new DOMException(DOMException.SYNTAX_ERR, "The token provided must not be empty.");
  }
  if (/\s/.test(token)) {
    const whitespaceMsg = "The token provided contains HTML space characters, which are not valid in tokens.";
    throw new DOMException(DOMException.INVALID_CHARACTER_ERR, whitespaceMsg);
  }
}
function update(list) {
  const attribute = list[INTERNAL].attribute;
  if (attribute !== undefined) {
    list[INTERNAL].element.setAttribute(attribute, list.toString());
  }
}
function indexOf(dtl, token) {
  return dtl[INTERNAL].tokens.indexOf(token);
}
function push(dtl, token) {
  const len = dtl[INTERNAL].tokens.push(token);
  dtl[len - 1] = token;
  return len;
}
function spliceLite(dtl, start, deleteCount) {
  const tokens = dtl[INTERNAL].tokens;
  const removedTokens = tokens.splice(start, deleteCount);
  const re = /^\d+$/;
  for (let prop in dtl) {
    if (re.test(prop)) {
      delete dtl[prop];
    }
  }
  const len = tokens.length;
  for (let i = 0; i < len; i++) {
    dtl[i] = tokens[i];
  }
  return removedTokens;
}
exports.DOMTokenList = DOMTokenList;
exports.reset = function resetDOMTokenList(list, value) {
  const tokens = list[INTERNAL].tokens;
  spliceLite(list, 0, tokens.length);
  value = (value || "").trim();
  if (value !== "") {
    const tokens = value.split(/\s+/);
    const len = tokens.length;
    for (let i = 0; i < len; i++) {
      const token = tokens[i];
      if (indexOf(list, token) === -1) {
        push(list, token);
      }
    }
  }
};
exports.create = function createDOMTokenList(element, attribute) {
  const list = Object.create(DOMTokenList.prototype);
  list[INTERNAL] = {
    element: element,
    attribute: attribute,
    tokens: []
  };
  exports.reset(list, element.getAttribute(attribute));
  return list;
};
