# attr-event-action

HTML 事件属性驱动器。

## 格式

```html
<div on="event:target.action"></div>
<div on="event:target.action(1, '2', true, {})"></div>
<div on="event:target.action,target2.action2;event2:target.action"></div>
<div on="event:target.action,target2.action2"></div>
```

## 示例

```html
<div id="demo"></div>
<button on="click:demo.show"></button>
```

```html
<stats id="stats"></stats>
<button on="click:stat.send('click', 'button1'), xxx.go('url')">统计并跳转url</button>
<button on="click:stat.send('click', 'print'); click:xxx.print">打印</button>
```

```html
<body on="load:stats.send"></body>
```

```html
<toast id="toast">确认成功</toast>
<dialog id="dialog" on="confirm:toast.show">
    <p>删除后不可恢复哦。</p>
    <button on="click:dialog.cancel">取消</button>
    <button on="click:dialog.confirm">确认</button>
</dialog>
<button on="click:dialog.open">删除</button>

<script>
    dialog.addAction('confirm', event => {
        dialog.trigger('confirm');
    });
</script>
```

```html
<input on="change:text.set(1, '2', true)">
<mytext id="text"></mytext>

<script>
    mytext.addAction('set', (event, number, string, boolean) => {
        // input value
        event.value;
        // 1
        number;
        // '2'
        string;
        // true
        boolean;
    });
</script>
```

```html
<dialog id="tips">提交中...</dialog>
<form on="submit:tips.open" id="form">
    <button type="submit">原生提交</button>
    <span on="click:form.submit">span标签提交</span>
</form>
```

## 参考

- [AMP Event Action](https://www.ampproject.org/docs/interaction_dynamic/amp-actions-and-events)
- [MIP Event Action](https://www.mipengine.org/doc/3-widget/6-help/3-mip-normal.html)
