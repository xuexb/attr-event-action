/**
 * @file 工具集
 * @author xuexb <fe.xiaowu@gmail.com>
 */

define(function () {
    var util = {};

    /**
     * 解析 attr 属性事件值
     *
     * @param  {string} content 值
     *
     * @return {Array} [{event, target, args}]
     */
    util.parseAttr = function (content) {
        var arr = [];

        if (!content || 'string' !== typeof content) {
            return arr;
        }

        content.split(/\s*;\s*/).forEach(function (events) {
            var event = events.match(/([\w-]+):([^\n\r]+\.[^\n\r]+)/);
            if (!event) {
                return;
            }

            var name = event[1];

            (event[2].match(/[\w-]+\.[\w-]+(\([^\)]*\))?/g) || []).forEach(function (target) {
                var action = target.match(/([\w-]+)\.([\w-]+)(\(([^\)]*)\))?/);
                arr.push({
                    event: name,
                    target: action[1],
                    action: action[2],
                    args: util.parseArgs(action[3])
                });
            });
        });

        return arr;
    };

    /**
     * 解析 args 的字符串
     *
     * @description 感谢 @乱码 提供的思路，http://www.52cik.com/
     * @param  {string} [content=''] 字符串
     *
     * @return {Array}
     */
    util.parseArgs = function (content) {
        return [].slice.call(new Function('return (function () {return arguments})' + (content || ''))());
    };

    /**
     * 匹配规则判定
     *
     * @param  {string || Function} expression 规则
     * @param  {string} value      目标值
     * @param  {Object} context    上下文
     *
     * @return {boolean}
     */
    util.match = function (expression, value, context) {
        var flag = true;
        if (expression === '*') {
        }
        else if ('string' === typeof expression && expression === value) {

        }
        else if ('string' === typeof expression && expression.substr(0, 1) === '<' && expression.slice(-1) === '>') {
            var el = document.getElementById(value);
            if (!el) {
                flag = false;
            }
            else if (expression.slice(1, -1).split(/\s*,\s*/).indexOf(el.tagName.toLowerCase()) === -1) {
                flag = false;
            }
        }
        else if ('function' === typeof expression && expression(context)) {
        }
        else {
            flag = false;
        }

        return flag;
    };

    /**
     * 节流
     *
     * @param  {Function} fn    [description]
     * @param  {[type]}   delay [description]
     *
     * @return {[type]}         [description]
     */
    util.throttle = function(fn, delay){
        var timer = null;
        return function(){
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function(){
                fn.apply(context, args);
            }, delay);
        };
     };

    return util;
});
