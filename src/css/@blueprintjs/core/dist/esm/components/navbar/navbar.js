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
import { NavbarDivider } from "./navbarDivider";
import { NavbarGroup } from "./navbarGroup";
import { NavbarHeading } from "./navbarHeading";
// this component is simple enough that tests would be purely tautological.
/* istanbul ignore next */
var Navbar = (function (_super) {
    tslib_1.__extends(Navbar, _super);
    function Navbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Navbar.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, htmlProps = tslib_1.__rest(_a, ["children", "className"]);
        return (React.createElement("div", tslib_1.__assign({ className: classNames(Classes.NAVBAR, className) }, htmlProps), children));
    };
    Navbar.displayName = "Blueprint.Navbar";
    Navbar.Divider = NavbarDivider;
    Navbar.Group = NavbarGroup;
    Navbar.Heading = NavbarHeading;
    Navbar = tslib_1.__decorate([
        PureRender
    ], Navbar);
    return Navbar;
}(React.Component));
export { Navbar };
