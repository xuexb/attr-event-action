/**
 * @file 注册 window.my 工具集
 * @author xuexb <fe.xiaowu@gmail.com>
 */

define(function (require) {
    var Event = require('./event');

    // my.log
    Event.addAction('my', 'log', function () {
        console.log.apply(console, [].slice.call(arguments));
    });

    // my.print
    Event.addAction('my', 'print', function (event, a, b) {
        try {
            window.print();
        }
        catch (e) {
            console.error(e);
        }
    });
});