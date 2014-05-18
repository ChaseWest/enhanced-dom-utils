Enhanced-DOM-Utils
==================

The utility methods provided are fairly basic and should be pretty familiar to
most. However, there are a few performance enhancements that happen behind the
scenes to help make things quicker.

1. Since most DOM manipulation happens within the `body` tag, we clone it into a
`documentFragment`. This object is what we'll query when you call one of the
methods below.

2. Performance querying a documentFragment vs the live DOM is quite faster.

3. When a `mutation` is observed on the `body`, we set a flag to update our
fragment next time you query for an object. We wouldn't want to do this each
time the DOM changes, because a lot could happen without actually querying for
a new object.

4. The `append` method will take either an HTML String or DOM node(s) and
determine the best way to append them to the parent element.


### `util.$(selector [, parent])`

> Simple wrapper around `querySelector`

-  **selector** - css selector to search the parent (or document) for.
-  **parent** - parent to search within

```javascript
  //get the first div found in the DOM
  util.$("div");
```

### `util.$$(selector [, parent])`

> Simple wrapper around `querySelectorAll`

-  **selector** - css selector to search the parent (or document) for.
-  **parent** - parent to search within

```javascript
  var ul = util.$("ul");

  //all li tags within the parent ul
  util.$$("li", ul);

  //all li tags in the document
  util.$$("li");
```

###`util.append(HTML, parent)`

> Append html (string or node(s)) to the DOM within the specified parent.

-  **HTML** - String or Nodes to be added
-  **parent** - parent to append nodes to

```javascript
  //append html string to document.body
  util.append("<div><ul><li></li></ul></div>", document.body);

  //find a div
  var div = util.$("div");

  //append a new div to the above div
  util.append("<div></div>", div);

  //append a span node to our div
  var span = document.createElement("span");
  util.append(span, div);

```
