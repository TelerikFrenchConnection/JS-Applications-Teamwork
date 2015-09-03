/* */ 
var core = require("../level1/core");
var memoizeQuery = require("../utils").memoizeQuery;
var validateAndExtract = require("../living/helpers/validate-names").validateAndExtract;
var mapper = require("../utils").mapper;
const NODE_TYPE = require("../living/node-type");
core.Element.prototype.getElementsByTagNameNS = memoizeQuery(function(namespaceURI, localName) {
  function filterByTagName(child) {
    var localMatch = child.localName === localName,
        nsMatch = child.namespaceURI === namespaceURI;
    if ((localMatch || localName === "*") && (nsMatch || namespaceURI === "*")) {
      if (child.nodeType === NODE_TYPE.ELEMENT_NODE) {
        return true;
      }
    }
    return false;
  }
  return new core.NodeList(this.ownerDocument || this, mapper(this, filterByTagName));
});
core.Document.prototype.createAttributeNS = function(namespace, qualifiedName) {
  namespace = namespace !== null ? String(namespace) : namespace;
  qualifiedName = String(qualifiedName);
  var extracted = validateAndExtract(namespace, qualifiedName);
  var attribute = this._createAttributeNoNameValidation(extracted.qualifiedName);
  attribute._namespaceURI = extracted.namespace;
  attribute._prefix = extracted.prefix;
  attribute._localName = extracted.localName;
  attribute._name = extracted.qualifiedName;
  return attribute;
};
core.Document.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
  return core.Element.prototype.getElementsByTagNameNS.call(this, namespaceURI, localName);
};
core.Document.prototype.getElementById = function(id) {
  return (this._ids && this._ids[id] && this._ids[id].length > 0 ? this._ids[id][0] : null);
};
