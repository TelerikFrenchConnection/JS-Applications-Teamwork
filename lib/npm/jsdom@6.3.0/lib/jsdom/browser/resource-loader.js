/* */ 
(function(process) {
  "use strict";
  var resolveHref = require("../utils").resolveHref;
  var URL = require("url");
  var fs = require("fs");
  var request = require('browser-request');
  const documentBaseURL = require("../living/helpers/document-base-url").documentBaseURL;
  const NODE_TYPE = require("../living/node-type");
  var IS_BROWSER = Object.prototype.toString.call(process) !== "[object process]";
  function createResourceLoadHandler(element, resourceUrl, document, loadCallback) {
    return function(err, data) {
      var ev = document.createEvent("HTMLEvents");
      if (!err) {
        try {
          loadCallback.call(element, data, resourceUrl);
          ev.initEvent("load", false, false);
        } catch (e) {
          err = e;
        }
      }
      if (err) {
        ev.initEvent("error", false, false);
        ev.error = err;
        var error = new Error(`Could not load ${element.localName}: "${resourceUrl}"`);
        error.detail = err;
        document._defaultView._virtualConsole.emit("jsdomError", error);
      }
      element.dispatchEvent(ev);
    };
  }
  function readFile(url, callback) {
    var filePath = url.replace(/^file:\/\//, "").replace(/^\/([a-z]):\//i, "$1:/").replace(/%20/g, " ");
    fs.readFile(filePath, "utf8", callback);
  }
  function wrapCookieJarForRequest(cookieJar) {
    var jarWrapper = request.jar();
    jarWrapper._jar = cookieJar;
    return jarWrapper;
  }
  function fetch(urlObj, cookieJar, referrer, callback) {
    if (urlObj.hostname) {
      exports.download(urlObj, null, cookieJar, referrer, callback);
    } else {
      readFile(urlObj.pathname, callback);
    }
  }
  exports.enqueue = function(element, resourceUrl, callback) {
    var document = element.nodeType === NODE_TYPE.DOCUMENT_NODE ? element : element._ownerDocument;
    if (document._queue) {
      var loadHandler = createResourceLoadHandler(element, resourceUrl || document.URL, document, callback);
      return document._queue.push(loadHandler);
    } else {
      return function() {};
    }
  };
  exports.resolveResourceUrl = function(document, url) {
    if (url === null) {
      return "";
    }
    var baseUrl = documentBaseURL(document);
    return resolveHref(baseUrl, url);
  };
  exports.download = function(url, options, cookieJar, referrer, callback) {
    options = options || {};
    options.gzip = true;
    options.jar = wrapCookieJarForRequest(cookieJar);
    options.headers = options.headers || {};
    options.headers.referer = referrer && !IS_BROWSER ? referrer : void 0;
    request(url, options, function(error, response, data) {
      callback(error, data, response);
    });
  };
  exports.load = function(element, url, callback) {
    var document = element._ownerDocument;
    var documentImpl = document.implementation;
    if (!documentImpl._hasFeature("FetchExternalResources", element.tagName.toLowerCase())) {
      return;
    }
    var resourceUrl = exports.resolveResourceUrl(document, url);
    if (documentImpl._hasFeature("SkipExternalResources", resourceUrl)) {
      return false;
    }
    var urlObj = URL.parse(resourceUrl);
    var baseUrl = documentBaseURL(document);
    var cookieJar = document._cookieJar;
    var enqueued = exports.enqueue(element, resourceUrl, callback);
    var customLoader = document._customResourceLoader;
    if (typeof customLoader === "function") {
      customLoader.call(null, {
        url: urlObj,
        cookie: cookieJar.getCookieStringSync(urlObj, {http: true}),
        baseUrl: baseUrl,
        defaultFetch: function(callback) {
          fetch(urlObj, cookieJar, baseUrl, callback);
        }
      }, enqueued);
    } else {
      fetch(urlObj, cookieJar, baseUrl, enqueued);
    }
  };
})(require("process"));
