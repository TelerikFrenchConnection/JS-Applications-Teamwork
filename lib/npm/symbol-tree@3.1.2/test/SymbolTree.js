/* */ 
'use strict';
const SymbolTree = require("../lib/SymbolTree");
const test = require("tape");
test('initialize', function(t) {
  const tree = new SymbolTree();
  const obj = {foo: 'bar'};
  t.equal(obj, tree.initialize(obj));
  t.deepEqual(['foo'], Object.getOwnPropertyNames(obj), 'initialize() should not introduce any enumerable properties');
  t.end();
});
test('unassociated object', function(t) {
  const tree = new SymbolTree();
  const a = {};
  t.equal(false, tree.hasChildren(a));
  t.equal(null, tree.firstChild(a));
  t.equal(null, tree.lastChild(a));
  t.equal(null, tree.previousSibling(a));
  t.equal(null, tree.nextSibling(a));
  t.equal(null, tree.parent(a));
  t.end();
});
test('insertBefore without parent or siblings', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const b = {};
  t.equal(a, tree.insertBefore(b, a));
  t.equal(false, tree.hasChildren(a));
  t.equal(null, tree.firstChild(a));
  t.equal(null, tree.lastChild(a));
  t.equal(null, tree.parent(a));
  t.equal(false, tree.hasChildren(b));
  t.equal(null, tree.firstChild(b));
  t.equal(null, tree.lastChild(b));
  t.equal(null, tree.parent(b));
  t.equal(null, tree.previousSibling(a));
  t.equal(b, tree.nextSibling(a));
  t.equal(a, tree.previousSibling(b));
  t.equal(null, tree.nextSibling(b));
  t.end();
});
test('insertAfter without parent or siblings', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const b = {};
  t.equal(b, tree.insertAfter(a, b));
  t.equal(false, tree.hasChildren(a));
  t.equal(null, tree.firstChild(a));
  t.equal(null, tree.lastChild(a));
  t.equal(null, tree.parent(a));
  t.equal(false, tree.hasChildren(b));
  t.equal(null, tree.firstChild(b));
  t.equal(null, tree.lastChild(b));
  t.equal(null, tree.parent(b));
  t.equal(null, tree.previousSibling(a));
  t.equal(b, tree.nextSibling(a));
  t.equal(a, tree.previousSibling(b));
  t.equal(null, tree.nextSibling(b));
  t.end();
});
test('prependChild without children', function(t) {
  const tree = new SymbolTree();
  const parent = {};
  const a = {};
  t.equal(a, tree.prependChild(parent, a));
  t.equal(false, tree.hasChildren(a));
  t.equal(null, tree.firstChild(a));
  t.equal(null, tree.lastChild(a));
  t.equal(null, tree.previousSibling(a));
  t.equal(null, tree.nextSibling(a));
  t.equal(parent, tree.parent(a));
  t.equal(true, tree.hasChildren(parent));
  t.equal(a, tree.firstChild(parent));
  t.equal(a, tree.lastChild(parent));
  t.equal(null, tree.previousSibling(a));
  t.equal(null, tree.nextSibling(parent));
  t.equal(null, tree.parent(parent));
  t.end();
});
test('appendChild without children', function(t) {
  const tree = new SymbolTree();
  const parent = {};
  const a = {};
  t.equal(a, tree.appendChild(parent, a));
  t.equal(false, tree.hasChildren(a));
  t.equal(null, tree.firstChild(a));
  t.equal(null, tree.lastChild(a));
  t.equal(null, tree.previousSibling(a));
  t.equal(null, tree.nextSibling(a));
  t.equal(parent, tree.parent(a));
  t.equal(true, tree.hasChildren(parent));
  t.equal(a, tree.firstChild(parent));
  t.equal(a, tree.lastChild(parent));
  t.equal(null, tree.previousSibling(a));
  t.equal(null, tree.nextSibling(parent));
  t.equal(null, tree.parent(parent));
  t.end();
});
test('prependChild with children', function(t) {
  const tree = new SymbolTree();
  const parent = {};
  const a = {};
  const b = {};
  tree.prependChild(parent, b);
  tree.prependChild(parent, a);
  t.equal(true, tree.hasChildren(parent));
  t.equal(a, tree.firstChild(parent));
  t.equal(b, tree.lastChild(parent));
  t.equal(parent, tree.parent(a));
  t.equal(null, tree.previousSibling(a));
  t.equal(b, tree.nextSibling(a));
  t.equal(parent, tree.parent(b));
  t.equal(a, tree.previousSibling(b));
  t.equal(null, tree.nextSibling(b));
  t.end();
});
test('appendChild with children', function(t) {
  const tree = new SymbolTree();
  const parent = {};
  const a = {};
  const b = {};
  tree.appendChild(parent, a);
  tree.appendChild(parent, b);
  t.equal(true, tree.hasChildren(parent));
  t.equal(a, tree.firstChild(parent));
  t.equal(b, tree.lastChild(parent));
  t.equal(parent, tree.parent(a));
  t.equal(null, tree.previousSibling(a));
  t.equal(b, tree.nextSibling(a));
  t.equal(parent, tree.parent(b));
  t.equal(a, tree.previousSibling(b));
  t.equal(null, tree.nextSibling(b));
  t.end();
});
test('insertBefore with parent', function(t) {
  const tree = new SymbolTree();
  const parent = {};
  const a = {};
  const b = {};
  tree.prependChild(parent, b);
  tree.insertBefore(b, a);
  t.equal(true, tree.hasChildren(parent));
  t.equal(a, tree.firstChild(parent));
  t.equal(b, tree.lastChild(parent));
  t.equal(parent, tree.parent(a));
  t.equal(null, tree.previousSibling(a));
  t.equal(b, tree.nextSibling(a));
  t.equal(parent, tree.parent(b));
  t.equal(a, tree.previousSibling(b));
  t.equal(null, tree.nextSibling(b));
  t.end();
});
test('insertAfter with parent', function(t) {
  const tree = new SymbolTree();
  const parent = {};
  const a = {};
  const b = {};
  tree.appendChild(parent, a);
  tree.insertAfter(a, b);
  t.equal(true, tree.hasChildren(parent));
  t.equal(a, tree.firstChild(parent));
  t.equal(b, tree.lastChild(parent));
  t.equal(parent, tree.parent(a));
  t.equal(null, tree.previousSibling(a));
  t.equal(b, tree.nextSibling(a));
  t.equal(parent, tree.parent(b));
  t.equal(a, tree.previousSibling(b));
  t.equal(null, tree.nextSibling(b));
  t.end();
});
test('insertBefore with siblings', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const b = {};
  const c = {};
  tree.insertBefore(c, a);
  tree.insertBefore(c, b);
  t.equal(null, tree.previousSibling(a));
  t.equal(b, tree.nextSibling(a));
  t.equal(a, tree.previousSibling(b));
  t.equal(c, tree.nextSibling(b));
  t.equal(b, tree.previousSibling(c));
  t.equal(null, tree.nextSibling(c));
  t.end();
});
test('insertAfter with siblings', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const b = {};
  const c = {};
  tree.insertAfter(a, c);
  tree.insertAfter(a, b);
  t.equal(null, tree.previousSibling(a));
  t.equal(b, tree.nextSibling(a));
  t.equal(a, tree.previousSibling(b));
  t.equal(c, tree.nextSibling(b));
  t.equal(b, tree.previousSibling(c));
  t.equal(null, tree.nextSibling(c));
  t.end();
});
test('remove with previous sibling', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const b = {};
  tree.insertAfter(a, b);
  tree.remove(b);
  t.equal(null, tree.previousSibling(a));
  t.equal(null, tree.nextSibling(a));
  t.equal(null, tree.parent(a));
  t.equal(null, tree.previousSibling(b));
  t.equal(null, tree.nextSibling(b));
  t.equal(null, tree.parent(b));
  t.end();
});
test('remove with next sibling', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const b = {};
  tree.insertAfter(a, b);
  tree.remove(a);
  t.equal(null, tree.previousSibling(a));
  t.equal(null, tree.nextSibling(a));
  t.equal(null, tree.parent(a));
  t.equal(null, tree.previousSibling(b));
  t.equal(null, tree.nextSibling(b));
  t.equal(null, tree.parent(b));
  t.end();
});
test('remove with siblings', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const b = {};
  const c = {};
  tree.insertAfter(a, b);
  tree.insertAfter(b, c);
  tree.remove(b);
  t.equal(null, tree.previousSibling(a));
  t.equal(c, tree.nextSibling(a));
  t.equal(null, tree.parent(a));
  t.equal(null, tree.previousSibling(b));
  t.equal(null, tree.nextSibling(b));
  t.equal(null, tree.parent(b));
  t.equal(a, tree.previousSibling(c));
  t.equal(null, tree.nextSibling(c));
  t.equal(null, tree.parent(c));
  t.end();
});
test('remove with parent', function(t) {
  const tree = new SymbolTree();
  const parent = {};
  const a = {};
  tree.prependChild(parent, a);
  tree.remove(a);
  t.equal(null, tree.parent(a));
  t.equal(null, tree.firstChild(parent));
  t.equal(null, tree.lastChild(parent));
  t.end();
});
test('remove with children', function(t) {
  const tree = new SymbolTree();
  const parent = {};
  const a = {};
  tree.prependChild(parent, a);
  tree.remove(parent);
  t.equal(parent, tree.parent(a));
  t.equal(a, tree.firstChild(parent));
  t.equal(a, tree.lastChild(parent));
  t.end();
});
test('remove with parent and siblings', function(t) {
  const tree = new SymbolTree();
  const parent = {};
  const a = {};
  const b = {};
  const c = {};
  tree.prependChild(parent, a);
  tree.insertAfter(a, b);
  tree.insertAfter(b, c);
  tree.remove(b);
  t.equal(a, tree.firstChild(parent));
  t.equal(c, tree.lastChild(parent));
  t.equal(null, tree.previousSibling(a));
  t.equal(c, tree.nextSibling(a));
  t.equal(parent, tree.parent(a));
  t.equal(null, tree.previousSibling(b));
  t.equal(null, tree.nextSibling(b));
  t.equal(null, tree.parent(b));
  t.equal(a, tree.previousSibling(c));
  t.equal(null, tree.nextSibling(c));
  t.equal(parent, tree.parent(c));
  t.end();
});
test('inserting an already associated object should fail', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const b = {};
  tree.insertBefore(b, a);
  t.throws(function() {
    tree.insertBefore(b, a);
  }, /already present/);
  t.throws(function() {
    tree.insertAfter(b, a);
  }, /already present/);
  t.throws(function() {
    tree.prependChild(b, a);
  }, /already present/);
  t.throws(function() {
    tree.appendChild(b, a);
  }, /already present/);
  t.throws(function() {
    tree.insertBefore(a, b);
  }, /already present/);
  t.throws(function() {
    tree.insertAfter(a, b);
  }, /already present/);
  t.throws(function() {
    tree.prependChild(a, b);
  }, /already present/);
  t.throws(function() {
    tree.appendChild(a, b);
  }, /already present/);
  tree.remove(a);
  tree.prependChild(b, a);
  t.throws(function() {
    tree.insertBefore(b, a);
  }, /already present/);
  t.throws(function() {
    tree.insertAfter(b, a);
  }, /already present/);
  t.throws(function() {
    tree.prependChild(b, a);
  }, /already present/);
  t.throws(function() {
    tree.appendChild(b, a);
  }, /already present/);
  t.end();
});
test('Multiple SymbolTree instances should not conflict', function(t) {
  const tree1 = new SymbolTree();
  const tree2 = new SymbolTree();
  const a = {};
  const b = {};
  tree1.insertBefore(b, a);
  tree2.insertBefore(a, b);
  t.equal(null, tree1.previousSibling(a));
  t.equal(b, tree1.nextSibling(a));
  t.equal(a, tree1.previousSibling(b));
  t.equal(null, tree1.nextSibling(b));
  t.equal(null, tree2.previousSibling(b));
  t.equal(a, tree2.nextSibling(b));
  t.equal(b, tree2.previousSibling(a));
  t.equal(null, tree2.nextSibling(a));
  t.end();
});
test('lastInclusiveDescendant', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const aba = {};
  const abaa = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(aba, abaa);
  tree.insertAfter(a, b);
  t.equal(abaa, tree.lastInclusiveDescendant(a));
  t.end();
});
test('look up preceding with a previous sibling', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const b = {};
  tree.insertAfter(a, b);
  t.equal(null, tree.preceding(a));
  t.equal(a, tree.preceding(b));
  t.end();
});
test('look up preceding with a previous sibling with a child', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.insertAfter(a, b);
  t.equal(null, tree.preceding(a));
  t.equal(a, tree.preceding(aa));
  t.equal(aa, tree.preceding(ab));
  t.equal(ab, tree.preceding(b));
  t.end();
});
test('look up preceding with a previous sibling with a descendants', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const aba = {};
  const abaa = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(aba, abaa);
  tree.insertAfter(a, b);
  t.equal(abaa, tree.preceding(b));
  t.end();
});
test('look up preceding using a specified root', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  tree.appendChild(a, aa);
  t.equal(null, tree.preceding(a, {root: a}));
  t.equal(a, tree.preceding(aa, {root: a}));
  t.equal(null, tree.preceding(aa, {root: aa}));
  t.end();
});
test('following with a child', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  tree.appendChild(a, aa);
  t.equal(aa, tree.following(a));
  t.equal(null, tree.following(aa));
  t.end();
});
test('following with a nextSibling sibling', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const b = {};
  tree.insertAfter(a, b);
  t.equal(b, tree.following(a));
  t.equal(null, tree.following(b));
  t.end();
});
test('following with sibling of parent', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.insertAfter(a, b);
  t.equal(b, tree.following(aa));
  t.end();
});
test('following with sibling of grandparent', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const aaa = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(aa, aaa);
  tree.insertAfter(a, b);
  t.equal(b, tree.following(aaa));
  t.end();
});
test('following using a specified root', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const aaa = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(aa, aaa);
  tree.insertAfter(a, b);
  t.equal(null, tree.following(aaa, {root: aaa}));
  t.equal(null, tree.following(aaa, {root: aa}));
  t.equal(null, tree.following(aaa, {root: a}));
  t.equal(aa, tree.following(a, {root: a}));
  t.equal(aaa, tree.following(aa, {root: a}));
  t.end();
});
test('following with skipChildren', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.insertAfter(a, b);
  t.equal(b, tree.following(a, {skipChildren: true}));
  t.end();
});
test('childrenToArray', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const aba = {};
  const ac = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(a, ac);
  tree.insertAfter(a, b);
  t.deepEqual([aa, ab, ac], tree.childrenToArray(a));
  const arr = ['a', 5];
  tree.childrenToArray(a, {array: arr});
  t.deepEqual(['a', 5, aa, ab, ac], arr);
  t.end();
});
test('childrenToArray with filter', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const aba = {};
  const ac = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(a, ac);
  tree.insertAfter(a, b);
  const filter = function(object) {
    t.equal(this, undefined);
    return object !== ab;
  };
  t.deepEqual([aa, ac], tree.childrenToArray(a, {filter: filter}));
  const thisArg = {a: 123};
  const filterThis = function(object) {
    t.equal(this, thisArg);
    return object !== ab;
  };
  t.deepEqual([aa, ac], tree.childrenToArray(a, {
    filter: filterThis,
    thisArg: thisArg
  }));
  t.end();
});
test('children iterator', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const aba = {};
  const ac = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(a, ac);
  tree.insertAfter(a, b);
  const results = [];
  for (const object of tree.childrenIterator(a)) {
    results.push(object);
  }
  t.deepEqual([aa, ab, ac], results);
  t.end();
});
test('children iterator reverse', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const aba = {};
  const ac = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(a, ac);
  tree.insertAfter(a, b);
  const results = [];
  for (const object of tree.childrenIterator(a, {reverse: true})) {
    results.push(object);
  }
  t.deepEqual([ac, ab, aa], results);
  t.end();
});
test('children iterator return value using a generator', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const ac = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(a, ac);
  function* generator(it) {
    const returnValue = yield* it;
    t.equal(a, returnValue);
  }
  const results = [];
  for (const object of generator(tree.childrenIterator(a))) {
    results.push(object);
  }
  t.deepEqual([aa, ab, ac], results);
  t.end();
});
test('previous sibling iterator', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const aba = {};
  const ac = {};
  const ad = {};
  const ae = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(a, ac);
  tree.appendChild(a, ad);
  tree.appendChild(a, ae);
  tree.insertAfter(a, b);
  const results = [];
  for (const object of tree.previousSiblingsIterator(ad)) {
    results.push(object);
  }
  t.deepEqual([ac, ab, aa], results);
  t.end();
});
test('nextSibling sibling iterator', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const aba = {};
  const ac = {};
  const ad = {};
  const ae = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(a, ac);
  tree.appendChild(a, ad);
  tree.appendChild(a, ae);
  tree.insertAfter(a, b);
  const results = [];
  for (const object of tree.nextSiblingsIterator(ab)) {
    results.push(object);
  }
  t.deepEqual([ac, ad, ae], results);
  t.end();
});
test('ancestorsToArray', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const aba = {};
  const abaa = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(aba, abaa);
  tree.insertAfter(a, b);
  t.deepEqual([abaa, aba, ab, a], tree.ancestorsToArray(abaa));
  t.deepEqual([aba, ab, a], tree.ancestorsToArray(aba));
  t.deepEqual([b], tree.ancestorsToArray(b));
  const arr = ['a', 5];
  tree.ancestorsToArray(abaa, {array: arr});
  t.deepEqual(['a', 5, abaa, aba, ab, a], arr);
  t.end();
});
test('ancestorsToArray with filter', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const aba = {};
  const abaa = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(aba, abaa);
  tree.insertAfter(a, b);
  const thisArg = {foo: 'bar'};
  const filter = function(object) {
    t.equal(this, thisArg);
    return object !== abaa && object !== ab;
  };
  t.deepEqual([aba, a], tree.ancestorsToArray(abaa, {
    filter: filter,
    thisArg: thisArg
  }));
  t.end();
});
test('ancestors iterator', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const aba = {};
  const abaa = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(aba, abaa);
  tree.insertAfter(a, b);
  const results = [];
  const iterator = tree.ancestorsIterator(abaa);
  for (const object of iterator) {
    results.push(object);
  }
  t.deepEqual([abaa, aba, ab, a], results);
  t.deepEqual({
    done: true,
    value: abaa
  }, iterator.next());
  t.deepEqual({
    done: true,
    value: abaa
  }, iterator.next());
  t.end();
});
test('treeToArray', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const aba = {};
  const abaa = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(aba, abaa);
  tree.insertAfter(a, b);
  t.deepEqual([a, aa, ab, aba, abaa], tree.treeToArray(a));
  const arr = ['a', 5];
  tree.treeToArray(a, {array: arr});
  t.deepEqual(['a', 5, a, aa, ab, aba, abaa], arr);
  t.end();
});
test('treeToArray with filter', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const aba = {};
  const abaa = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(aba, abaa);
  tree.insertAfter(a, b);
  const filter = function(object) {
    t.equal(this, undefined);
    return object !== a && object !== aba;
  };
  t.deepEqual([aa, ab, abaa], tree.treeToArray(a, {filter: filter}));
  const thisArg = {foo: 'bar'};
  const filterThis = function(object) {
    t.equal(this, thisArg);
    return object !== a && object !== aba;
  };
  t.deepEqual([aa, ab, abaa], tree.treeToArray(a, {
    filter: filterThis,
    thisArg: thisArg
  }));
  t.end();
});
test('tree iterator', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const aba = {};
  const abaa = {};
  const ac = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(aba, abaa);
  tree.appendChild(a, ac);
  tree.insertAfter(a, b);
  const results = [];
  const iterator = tree.treeIterator(a);
  for (const object of iterator) {
    results.push(object);
  }
  t.deepEqual([a, aa, ab, aba, abaa, ac], results);
  t.deepEqual({
    done: true,
    value: a
  }, iterator.next());
  t.deepEqual({
    done: true,
    value: a
  }, iterator.next());
  t.end();
});
test('tree iterator reverse', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const aba = {};
  const abaa = {};
  const ac = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(aba, abaa);
  tree.appendChild(a, ac);
  tree.insertAfter(a, b);
  const results = [];
  const iterator = tree.treeIterator(a, {reverse: true});
  for (const object of iterator) {
    results.push(object);
  }
  t.deepEqual([ac, abaa, aba, ab, aa, a], results);
  t.deepEqual({
    done: true,
    value: a
  }, iterator.next());
  t.deepEqual({
    done: true,
    value: a
  }, iterator.next());
  t.end();
});
test('look up the index of an object', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const aba = {};
  const ac = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(a, ac);
  tree.insertAfter(a, b);
  t.equal(-1, tree.index(a), 'should return -1 if an object has no parent');
  t.equal(0, tree.index(aa));
  t.equal(1, tree.index(ab));
  t.equal(0, tree.index(aba));
  t.equal(2, tree.index(ac));
  t.equal(-1, tree.index(b));
  t.end();
});
test('cached index', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const aba = {};
  const ac = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(a, ac);
  tree.insertAfter(a, b);
  t.equal(2, tree.index(ac));
  t.equal(1, tree.index(ab));
  t.equal(0, tree.index(aa));
  tree.remove(ab);
  t.equal(1, tree.index(ac));
  t.equal(-1, tree.index(ab));
  t.equal(0, tree.index(aa));
  tree.insertAfter(aa, ab);
  t.equal(0, tree.index(aa));
  t.equal(1, tree.index(ab));
  t.equal(2, tree.index(ac));
  const foo = {};
  tree.insertBefore(ab, foo);
  t.equal(0, tree.index(aa));
  t.equal(2, tree.index(ab));
  t.equal(3, tree.index(ac));
  t.end();
});
test('cached index warmed up by childrenToArray', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const aba = {};
  const ac = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(a, ac);
  tree.insertAfter(a, b);
  tree.childrenToArray(a);
  t.equal(0, tree.index(aa));
  t.equal(1, tree.index(ab));
  t.equal(2, tree.index(ac));
  tree.appendChild(a, {});
  t.equal(2, tree.index(ac));
  tree.childrenToArray(a);
  t.equal(2, tree.index(ac));
  t.end();
});
test('children count', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const ab = {};
  const aba = {};
  const ac = {};
  const b = {};
  tree.appendChild(a, aa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(a, ac);
  tree.insertAfter(a, b);
  t.equal(3, tree.childrenCount(a), 'foo');
  t.equal(0, tree.childrenCount(aa));
  t.equal(1, tree.childrenCount(ab));
  t.equal(0, tree.childrenCount(b));
  t.end();
});
test('compare tree position', function(t) {
  const tree = new SymbolTree();
  const a = {};
  const aa = {};
  const aaa = {};
  const ab = {};
  const aba = {};
  const abaa = {};
  const ac = {};
  const b = {};
  const ba = {};
  tree.appendChild(a, aa);
  tree.appendChild(aa, aaa);
  tree.appendChild(a, ab);
  tree.appendChild(ab, aba);
  tree.appendChild(aba, abaa);
  tree.appendChild(a, ac);
  tree.insertAfter(a, b);
  tree.appendChild(b, ba);
  t.equal(0, tree.compareTreePosition(a, a), 'object equal');
  t.equal(1, tree.compareTreePosition(a, {}), 'object disconnected');
  t.equal(1, tree.compareTreePosition(a, b), 'object disconnected');
  t.equal(20, tree.compareTreePosition(a, aa), 'contained by & following');
  t.equal(10, tree.compareTreePosition(aa, a), 'contains & preceding');
  t.equal(20, tree.compareTreePosition(a, abaa), 'contained by & following');
  t.equal(10, tree.compareTreePosition(abaa, a), 'contains & preceding');
  t.equal(4, tree.compareTreePosition(aa, ab), 'following');
  t.equal(2, tree.compareTreePosition(ab, aa), 'preceding');
  t.equal(4, tree.compareTreePosition(aa, aba), 'following');
  t.equal(2, tree.compareTreePosition(aba, aa), 'preceding');
  t.equal(4, tree.compareTreePosition(aa, abaa), 'following');
  t.equal(2, tree.compareTreePosition(abaa, aa), 'preceding');
  t.equal(4, tree.compareTreePosition(aaa, abaa), 'following');
  t.equal(2, tree.compareTreePosition(abaa, aaa), 'preceding');
  t.end();
});
