/**
 * @file 自定义元素注册入口
 * @author xuexb <fe.xiaowu@gmail.com>
 */

define(function (require) {
    var base = require('./element');
    var create = function (name, props, el) {
        function BaseClass() {
            base.apply(this, [].slice.call(arguments));
        }
        Object.assign(BaseClass.prototype, base.prototype, props);
        return new BaseClass(name, el);
    };

    return function (name, props) {
        document.registerElement(name, {
            prototype: Object.create(
                HTMLElement.prototype,
                {
                    createdCallback: {
                        value: function () {
                            this.customElement = create(name, props, this);
                            this.customElement.createdCallback();
                        }
                    },
                    attachedCallback: {
                        value: function () {
                            this.customElement.attachedCallback();
                        }
                    },
                    detachedCallback: {
                        value: function () {
                            this.customElement.detachedCallback();
                        }
                    },
                    attributeChangedCallback: {
                        value: function (name, previousValue, value) {
                            this.customElement.attributeChangedCallback(name, previousValue, value);
                        }
                    }
                }
            )
        });
    };
});
