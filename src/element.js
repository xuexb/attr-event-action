/**
 * @file 自定义元素基类
 * @author xuexb <fe.xiaowu@gmail.com>
 */

define(function (require) {
    var Event = require('./event');

    var Element = function (name, el) {
        // 注入DOM元素
        this.el = el;

        // 注入事件对象
        this.event = {
            trigger: function (event, data) {
                Event.trigger(event, {
                    target: el,
                    isPropagationStopped: true,
                    data: data
                });
            }.bind(this),
            addAction: function (action, handle) {
                Event.addAction(function (event) {
                    var target = document.getElementById(event.target);
                    return target && target === el;
                }, action, handle);
            }.bind(this)
        };
    };

    Element.prototype.createdCallback = function () {};

    Element.prototype.attachedCallback = function () {};

    Element.prototype.detachedCallback = function () {};

    Element.prototype.attributeChangedCallback = function () {};

    return Element;
});
