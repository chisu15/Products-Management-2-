"use strict";

var createTree = function createTree(arr) {
  var parentId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var tree = [];
  arr.forEach(function (item) {
    if (item.parent_id === parentId) {
      var newItem = item;
      var children = createTree(arr, item.id);

      if (children.length > 0) {
        newItem.children = children;
      }

      tree.push(newItem);
    }
  });
  return tree;
};

module.exports.tree = function (arr) {
  var parentId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var tree = createTree(arr, parentId = "");
  return tree;
};