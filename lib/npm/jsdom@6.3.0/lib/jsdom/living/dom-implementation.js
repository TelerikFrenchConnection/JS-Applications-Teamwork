/* */ 
"use strict";
var validateNames = require("./helpers/validate-names");
var createDocumentTypeInternal = require("./document-type").create;
module.exports = function(core) {
  core.DOMImplementation.prototype.hasFeature = function() {
    return true;
  };
  core.DOMImplementation.prototype.createDocumentType = function(qualifiedName, publicId, systemId) {
    qualifiedName = String(qualifiedName);
    publicId = String(publicId);
    systemId = String(systemId);
    validateNames.qname(qualifiedName);
    return createDocumentTypeInternal(core, this._ownerDocument, qualifiedName, publicId, systemId);
  };
  core.DOMImplementation.prototype.createDocument = function(namespace, qualifiedName, doctype) {
    namespace = namespace !== null ? String(namespace) : namespace;
    qualifiedName = qualifiedName === null ? "" : String(qualifiedName);
    if (doctype === undefined) {
      doctype = null;
    }
    var document = new core.Document({parsingMode: "xml"});
    var element = null;
    if (qualifiedName !== "") {
      element = document.createElementNS(namespace, qualifiedName);
    }
    if (doctype !== null) {
      document.appendChild(doctype);
    }
    if (element !== null) {
      document.appendChild(element);
    }
    return document;
  };
  core.DOMImplementation.prototype.createHTMLDocument = function(title) {
    var document = new core.HTMLDocument({parsingMode: "html"});
    var doctype = createDocumentTypeInternal(core, this, "html", "", "");
    document.appendChild(doctype);
    var htmlElement = document.createElementNS("http://www.w3.org/1999/xhtml", "html");
    document.appendChild(htmlElement);
    var headElement = document.createElement("head");
    htmlElement.appendChild(headElement);
    if (title !== undefined) {
      var titleElement = document.createElement("title");
      headElement.appendChild(titleElement);
      titleElement.appendChild(document.createTextNode(title));
    }
    htmlElement.appendChild(document.createElement("body"));
    return document;
  };
};
