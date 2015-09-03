/* */ 
(function(process) {
  "use strict";
  var path = require("path");
  const URL = require("whatwg-url-compat").createURLConstructor();
  const domSymbolTree = require("./living/helpers/internal-constants").domSymbolTree;
  const SYMBOL_TREE_POSITION = require("symbol-tree").TreePosition;
  exports.URL = URL;
  exports.toFileUrl = function(fileName) {
    var pathname = path.resolve(process.cwd(), fileName).replace(/\\/g, "/");
    if (pathname[0] !== "/") {
      pathname = "/" + pathname;
    }
    return "file://" + encodeURI(pathname);
  };
  exports.defineSetter = function defineSetter(object, property, setterFn) {
    var descriptor = Object.getOwnPropertyDescriptor(object, property) || {
      configurable: true,
      enumerable: true
    };
    descriptor.set = setterFn;
    Object.defineProperty(object, property, descriptor);
  };
  exports.defineGetter = function defineGetter(object, property, getterFn) {
    var descriptor = Object.getOwnPropertyDescriptor(object, property) || {
      configurable: true,
      enumerable: true
    };
    descriptor.get = getterFn;
    Object.defineProperty(object, property, descriptor);
  };
  exports.createFrom = function createFrom(prototype, properties) {
    properties = properties || {};
    var descriptors = {};
    Object.getOwnPropertyNames(properties).forEach(function(name) {
      descriptors[name] = Object.getOwnPropertyDescriptor(properties, name);
    });
    return Object.create(prototype, descriptors);
  };
  exports.inheritFrom = function inheritFrom(Superclass, Subclass, properties) {
    properties = properties || {};
    Object.defineProperty(properties, "constructor", {
      value: Subclass,
      writable: true,
      configurable: true
    });
    Subclass.prototype = exports.createFrom(Superclass.prototype, properties);
  };
  exports.define = function define(object, properties) {
    Object.getOwnPropertyNames(properties).forEach(function(name) {
      var propDesc = Object.getOwnPropertyDescriptor(properties, name);
      Object.defineProperty(object, name, propDesc);
    });
  };
  exports.addConstants = function addConstants(Constructor, propertyMap) {
    for (var property in propertyMap) {
      var value = propertyMap[property];
      addConstant(Constructor, property, value);
      addConstant(Constructor.prototype, property, value);
    }
  };
  function addConstant(object, property, value) {
    Object.defineProperty(object, property, {
      configurable: false,
      enumerable: true,
      value: value,
      writable: false
    });
  }
  var memoizeQueryTypeCounter = 0;
  exports.memoizeQuery = function memoizeQuery(fn) {
    if (fn.length > 2) {
      return fn;
    }
    var type = memoizeQueryTypeCounter++;
    return function() {
      if (!this._memoizedQueries) {
        return fn.apply(this, arguments);
      }
      if (!this._memoizedQueries[type]) {
        this._memoizedQueries[type] = Object.create(null);
      }
      var key;
      if (arguments.length === 1 && typeof arguments[0] === "string") {
        key = arguments[0];
      } else if (arguments.length === 2 && typeof arguments[0] === "string" && typeof arguments[1] === "string") {
        key = arguments[0] + "::" + arguments[1];
      } else {
        return fn.apply(this, arguments);
      }
      if (!(key in this._memoizedQueries[type])) {
        this._memoizedQueries[type][key] = fn.apply(this, arguments);
      }
      return this._memoizedQueries[type][key];
    };
  };
  exports.resolveHref = function resolveHref(baseUrl, href) {
    try {
      return new URL(href, baseUrl).href;
    } catch (e) {
      return href;
    }
  };
  exports.mapper = function(parent, filter, recursive) {
    function skipRoot(node) {
      return node !== parent && (!filter || filter(node));
    }
    return function() {
      if (recursive !== false) {
        return domSymbolTree.treeToArray(parent, {filter: skipRoot});
      } else {
        return domSymbolTree.childrenToArray(parent, {filter: filter});
      }
    };
  };
  function isValidAbsoluteURL(str) {
    try {
      new URL(str);
      return true;
    } catch (e) {
      return false;
    }
  }
  exports.isValidTargetOrigin = function(str) {
    return (str === "*" || str === "/" || isValidAbsoluteURL(str));
  };
  exports.simultaneousIterators = function*(first, second) {
    while (true) {
      const firstResult = first.next();
      const secondResult = second.next();
      if (firstResult.done && secondResult.done) {
        return;
      }
      yield [firstResult.done ? null : firstResult.value, secondResult.done ? null : secondResult.value];
    }
  };
  exports.treeOrderSorter = function(a, b) {
    const compare = domSymbolTree.compareTreePosition(a, b);
    if (compare & SYMBOL_TREE_POSITION.PRECEDING) {
      return 1;
    }
    if (compare & SYMBOL_TREE_POSITION.FOLLOWING) {
      return -1;
    }
    return 0;
  };
})(require("process"));
