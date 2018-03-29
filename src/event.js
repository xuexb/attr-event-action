/**
 * @file 事件驱动
 * @author xuexb <fe.xiaowu@gmail.com>
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('./util');
    var Event = {};

    /**
     * 缓存的 action
     *
     * @type {Array}
     * @example
     *     {
     *         target: '*', // function (event) {}
     *         action: '*', // function (event) {}
     *         handle: function (event) {}
     *     }
     */
    Event._actions = [];

    /**
     * 添加自定义 action
     *
     * @param {string || Function} target 目标元素
     * @param {string || Function} action 目标行为
     * @param {Function} handle 回调
     *
     * @example
     *     addAction('my', 'log', function (event, arg1, arg2) {});
     *     addAction('*', 'show', function (event, arg1, arg2) {});
     *     addAction('*', function (event) {return true}, function (event, arg1, arg2) {});
     */
    Event.addAction = function (target, action, handle) {
        if ('function' === typeof handle) {
            Event._actions.push({
                target: target,
                action: action,
                handle: handle
            });
        }
    };

    /**
     * 触发事件
     *
     * @param  {string} name   事件名
     * @param  {HTMLElement||Object} params 触发目标元素或者配置参数
     * @param {HTMLElement} params.target 触发目标元素
     * @param {*} params.data 触发源数据，会携带到 event.data 中
     * @param {boolean} [params.isPropagationStopped=false] 是否阻止向上冒泡触发
     */
    Event.trigger = function (name, params) {
        var isPropagationStopped;
        if (!$.isPlainObject(params)) {
            params = {
                target: params
            };
        }

        if (!params.target) {
            return;
        }

        if (params.target.getAttribute('on')) {
            isPropagationStopped = Event._exec(name, params.target, params);
        }

        if (!params.isPropagationStopped && !isPropagationStopped) {
            params.target = $(params.target).parent().closest('[on]').get(0);
            Event.trigger(name, params);
        }
    };

    /**
     * 执行元素中的事件
     *
     * @param  {string} name   事件名
     * @param  {HTMLElement} el     触发元素
     * @param  {Object} params 触发源参数
     */
    Event._exec = function (name, el, params) {
        var events = util.parseAttr(el.getAttribute('on'));
        var isPropagationStopped = false;

        events.filter(function (data) {
            return data.event === name;
        }).forEach(function (data) {
            var event = {
                event: name,
                target: data.target,
                action: data.action,
                el: el,
                data: params.data,
                stopPropagation: function () {
                    isPropagationStopped = true;
                },
                preventDefault: function () {
                    if (params.data && 'function' === typeof params.data.preventDefault) {
                        params.data.preventDefault();
                    }
                }
            };
            Event._getAction(data.target, data.action, event).forEach(function (task) {
                task.handle.apply(el, [event].concat(data.args));
            });
        });

        return isPropagationStopped;
    };

    /**
     * 筛选缓存中符合条件的 action
     *
     * @param {string || Function} target 目标元素
     * @param {string || Function} action 目标行为
     * @param  {*} context 上下文
     *
     * @return {Array}
     */
    Event._getAction = function (target, action, context) {
        var events = [];
        Event._actions.forEach(function (data) {
            if (util.match(data.target, target, context) && util.match(data.action, action, context)) {
                events.push(data);
            }
        });
        return events;
    };

    return Event;
});