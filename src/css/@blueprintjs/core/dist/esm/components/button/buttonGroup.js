/**
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";
import * as Classes from "../../common/classes";
// this component is simple enough that tests would be purely tautological.
/* istanbul ignore next */
var ButtonGroup = (function (_super) {
    tslib_1.__extends(ButtonGroup, _super);
    function ButtonGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonGroup.prototype.render = function () {
        var _a = this.props, className = _a.className, fill = _a.fill, minimal = _a.minimal, large = _a.large, vertical = _a.vertical, htmlProps = tslib_1.__rest(_a, ["className", "fill", "minimal", "large", "vertical"]);
        var buttonGroupClasses = classNames(Classes.BUTTON_GROUP, (_b = {},
            _b[Classes.FILL] = fill,
            _b[Classes.MINIMAL] = minimal,
            _b[Classes.LARGE] = large,
            _b[Classes.VERTICAL] = vertical,
            _b), className);
        return (React.createElement("div", tslib_1.__assign({}, htmlProps, { className: buttonGroupClasses }), this.props.children));
        var _b;
    };
    ButtonGroup.displayName = "Blueprint.ButtonGroup";
    ButtonGroup = tslib_1.__decorate([
        PureRender
    ], ButtonGroup);
    return ButtonGroup;
}(React.Component));
export { ButtonGroup };
