This examples goes even further on directive cooperation. Until now, we connected directives sharing a tag. AngularJS makes it possible to connect directives at different levels:

```html
<ul fa-select="selection">
  <li><input type="checkbox" fa-select-option></li>
  <li><input type="checkbox" fa-select-option></li>
  <li><input type="checkbox" fa-select-option></li>
</ul>
```

The `<fa-select>` directive exposes a controller that is required by all child `<fa-select-option>`. It gathers the list of currently selectioned options. This is done by passing '^' to require (to search a matching controller on parent tags).