/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as classNames from "classnames";
import * as React from "react";
import * as Classes from "../../common/classes";
import { isFunction } from "../../common/utils";
import { TreeNode } from "./treeNode";
var Tree = (function (_super) {
    tslib_1.__extends(Tree, _super);
    function Tree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeRefs = {};
        _this.handleNodeCollapse = function (node, e) {
            _this.handlerHelper(_this.props.onNodeCollapse, node, e);
        };
        _this.handleNodeClick = function (node, e) {
            _this.handlerHelper(_this.props.onNodeClick, node, e);
        };
        _this.handleContentRef = function (node, element) {
            if (element != null) {
                _this.nodeRefs[node.props.id] = element;
            }
            else {
                // don't want our object to get bloated with old keys
                delete _this.nodeRefs[node.props.id];
            }
        };
        _this.handleNodeContextMenu = function (node, e) {
            _this.handlerHelper(_this.props.onNodeContextMenu, node, e);
        };
        _this.handleNodeDoubleClick = function (node, e) {
            _this.handlerHelper(_this.props.onNodeDoubleClick, node, e);
        };
        _this.handleNodeExpand = function (node, e) {
            _this.handlerHelper(_this.props.onNodeExpand, node, e);
        };
        return _this;
    }
    Tree.nodeFromPath = function (path, treeNodes) {
        if (path.length === 1) {
            return treeNodes[path[0]];
        }
        else {
            return Tree.nodeFromPath(path.slice(1), treeNodes[path[0]].childNodes);
        }
    };
    Tree.prototype.render = function () {
        return (React.createElement("div", { className: classNames(Classes.TREE, this.props.className) }, this.renderNodes(this.props.contents, [], Classes.TREE_ROOT)));
    };
    /**
     * Returns the underlying HTML element of the `Tree` node with an id of `nodeId`.
     * This element does not contain the children of the node, only its label and controls.
     * If the node is not currently mounted, `undefined` is returned.
     */
    Tree.prototype.getNodeContentElement = function (nodeId) {
        return this.nodeRefs[nodeId];
    };
    Tree.prototype.renderNodes = function (treeNodes, currentPath, className) {
        var _this = this;
        if (treeNodes == null) {
            return null;
        }
        var nodeItems = treeNodes.map(function (node, i) {
            var elementPath = currentPath.concat(i);
            return (React.createElement(TreeNode, tslib_1.__assign({}, node, { key: node.id, contentRef: _this.handleContentRef, depth: elementPath.length - 1, onClick: _this.handleNodeClick, onContextMenu: _this.handleNodeContextMenu, onCollapse: _this.handleNodeCollapse, onDoubleClick: _this.handleNodeDoubleClick, onExpand: _this.handleNodeExpand, path: elementPath }), _this.renderNodes(node.childNodes, elementPath)));
        });
        return React.createElement("ul", { className: classNames(Classes.TREE_NODE_LIST, className) }, nodeItems);
    };
    Tree.prototype.handlerHelper = function (handlerFromProps, node, e) {
        if (isFunction(handlerFromProps)) {
            var nodeData = Tree.nodeFromPath(node.props.path, this.props.contents);
            handlerFromProps(nodeData, node.props.path, e);
        }
    };
    return Tree;
}(React.Component));
export { Tree };
export var TreeFactory = React.createFactory(Tree);
