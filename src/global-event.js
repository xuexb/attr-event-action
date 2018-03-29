/**
 * @file 注册全局元素事件
 * @author xuexb <fe.xiaowu@gmail.com>
 */

define(function (require) {
    var $ = require('zepto');
    var Event = require('./event');
    var util = require('./util');

    $(document).on('click', function (event) {
        Event.trigger('click', {
            target: event.target,
            data: event
        });
    });

    $(document).on('input change', util.throttle(function (event) {
        Event.trigger('change', {
            target: event.target,
            isPropagationStopped: true
        });
    }));

    $(document).on('keydown', (function (event) {
        Event.trigger('keydown', {
            target: event.target,
            isPropagationStopped: true,
            data: event
        });
    }));

    $(document).ready(function (event) {
        Event.trigger('load', {
            target: document.body,
            isPropagationStopped: true
        });
    });

    Event.addAction('*', 'addClass', function (event, className) {
        $('#' + event.target).addClass(className);
    });
    Event.addAction('*', 'removeClass', function (event, className) {
        $('#' + event.target).removeClass(className);
    });
    Event.addAction('*', 'toggleClass', function (event, className) {
        $('#' + event.target).toggleClass(className);
    });

    Event.addAction('*', 'toggle', function (event) {
        $('#' + event.target).toggle();
    });
    Event.addAction('*', 'show', function (event) {
        $('#' + event.target).show();
    });
    Event.addAction('*', 'hide', function (event) {
        $('#' + event.target).hide();
    });

    Event.addAction('<form>', 'submit', function (event) {
        $('#' + event.target).submit();
    });

    Event.addAction('*', 'val', function (event, content) {
        $('#' + event.target).val(content);
    });

    Event.addAction('*', 'text', function (event, content) {
        $('#' + event.target).text(content);
    });

    Event.addAction('*', 'width', function (event, content) {
        $('#' + event.target).width(content);
    });

    Event.addAction('*', 'height', function (event, content) {
        $('#' + event.target).height(content);
    });

    Event.addAction('*', 'attr', function (event, key, value) {
        $('#' + event.target).attr(key, value);
    });

    Event.addAction('event', 'stopPropagation', function (event) {
        event.stopPropagation();
    });

    Event.addAction('event', 'preventDefault', function (event) {
        event.preventDefault();
    });
});