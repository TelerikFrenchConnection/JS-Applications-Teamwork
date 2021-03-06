/* */ 
var CSSOM = {
  CSSRule: require("./CSSRule").CSSRule,
  CSSStyleDeclaration: require("./CSSStyleDeclaration").CSSStyleDeclaration
};
CSSOM.CSSKeyframeRule = function CSSKeyframeRule() {
  CSSOM.CSSRule.call(this);
  this.keyText = '';
  this.style = new CSSOM.CSSStyleDeclaration;
  this.style.parentRule = this;
};
CSSOM.CSSKeyframeRule.prototype = new CSSOM.CSSRule;
CSSOM.CSSKeyframeRule.prototype.constructor = CSSOM.CSSKeyframeRule;
CSSOM.CSSKeyframeRule.prototype.type = 9;
Object.defineProperty(CSSOM.CSSKeyframeRule.prototype, "cssText", {get: function() {
    return this.keyText + " {" + this.style.cssText + "} ";
  }});
exports.CSSKeyframeRule = CSSOM.CSSKeyframeRule;
