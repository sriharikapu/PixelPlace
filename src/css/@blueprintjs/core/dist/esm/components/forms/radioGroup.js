/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { AbstractComponent } from "../../common/abstractComponent";
import * as Classes from "../../common/classes";
import * as Errors from "../../common/errors";
import { Radio } from "./controls";
var counter = 0;
function nextName() {
    return RadioGroup.displayName + "-" + counter++;
}
var RadioGroup = (function (_super) {
    tslib_1.__extends(RadioGroup, _super);
    function RadioGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // a unique name for this group, which can be overridden by `name` prop.
        _this.autoGroupName = nextName();
        return _this;
    }
    RadioGroup.prototype.render = function () {
        var label = this.props.label;
        return (React.createElement("div", { className: this.props.className },
            label == null ? null : React.createElement("label", { className: Classes.LABEL }, label),
            Array.isArray(this.props.options) ? this.renderOptions() : this.renderChildren()));
    };
    RadioGroup.prototype.validateProps = function () {
        if (this.props.children != null && this.props.options != null) {
            console.warn(Errors.RADIOGROUP_WARN_CHILDREN_OPTIONS_MUTEX);
        }
    };
    RadioGroup.prototype.renderChildren = function () {
        var _this = this;
        return React.Children.map(this.props.children, function (child) {
            if (isRadio(child)) {
                return React.cloneElement(child, _this.getRadioProps(child.props));
            }
            else {
                return child;
            }
        });
    };
    RadioGroup.prototype.renderOptions = function () {
        var _this = this;
        return this.props.options.map(function (option) { return (React.createElement(Radio, tslib_1.__assign({}, option, _this.getRadioProps(option), { key: option.value }))); });
    };
    RadioGroup.prototype.getRadioProps = function (optionProps) {
        var name = this.props.name;
        var value = optionProps.value, disabled = optionProps.disabled;
        return {
            checked: value === this.props.selectedValue,
            disabled: disabled || this.props.disabled,
            inline: this.props.inline,
            name: name == null ? this.autoGroupName : name,
            onChange: this.props.onChange,
        };
    };
    RadioGroup.displayName = "Blueprint.RadioGroup";
    return RadioGroup;
}(AbstractComponent));
export { RadioGroup };
function isRadio(child) {
    return child != null && child.type === Radio;
}
