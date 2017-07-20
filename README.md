<p align="center">
  <img src="logo/logo.png?raw=true" alt="Selecter logo"/>
</p>

Selecter is made to select anything in a web page. You must give to it a jquery filter that
returns the elements that will be selectable and is it!

After created the object all select items are available by `selection` property.

### Options

#### select_class
When selecter selects something it adds a css class to the element.
The default value is 'active', You can change this value settings this option. Example:

```javascript
let selecter = new Selecter('#my-list li', {
    select_class: 'my_cool_css_class'
});
```

#### enable_ctrl
By default, any click in element will selects it. But you can configures selecter
to select elements only when control key is pressed. This is done by setting 'enable_ctrl'
to `true`.

#### add_mark
In selecter a "mark" is a HTML element that is appended to selected item. This is usefull
when you want show a image with a "check" or things like that. "add_mark" works together
with the options: `mark_html`, `mark_class`.

#### mark_html
`mark_html` is a string with the exact HTML code that will be appended to selected item.
In unselection selecter must remove this element, this is done using a class name.
So, the HTML code must have a element with a unique class name.

#### mark_class
In this option you must set the class name of mark element

An example of mark use follows:
```javascript
var selecter = new Selecter('ul li', {
    add_mark: true,
    mark_html: '<img width="32" style="position: absolute; top: -5px; right: -5px;" class="__mark_icon" src="imgs/check.png">',
    mark_class: '__mark_icon'
});
```

### Callbacks
#### on_unselect
This callback is triggered when the user unselects a item. The arguments are showed in following example:
```javascript
new Selecter('ul li', {
    on_unselect: function(html_element, js_event) {
        //
    }
});
```

#### on_select
The same of `on_unselect` callback but being called in selection.

#### on_unselecting_all
This function is called when the last item is unselected.
```javascript
new Selecter('ul li', {
    on_unselecting_all: function(html_element, js_event) {
        console.log('No more items selected');
        disable_edition_buttons();
    }
});
```

#### on_change
This function is called in any selection or unselection. Functions like `select_all`
**will call this callback many times**.
```javascript
new Selecter('ul li', {
    on_change: function(html_element, js_event, selected) {
        if (selected) {
            console.log(html_element.textContent + 'was selected!');
        }
    }
});
```

#### on_at_least_one_selection
This function is called when the first item is selected.
```javascript
new Selecter('ul li', {
    on_at_least_one_selection: function(html_element, js_event) {
        enable_all_item_edition_buttons();
    }
});
```

#### validate_selection
This functions is called before any selection. If defined, the item will be selected
only if this function returns true
```javascript
new Selecter('ul li', {
    validate_selection: function(html_element, js_event) {
        if (html_element.classList.contains('wrong_class')) {
            return false;
        }
        returns true;
    }
});
```

### Functions
#### unselect_all
Deselects all items. Items that are already deselected will not have the function `on_unselect` called for it.

#### select_all
Selects all items. This function have a aditional argument called 'reselect'. If reselect is true
items that are already selected will have the function 'on_select' called again. The default is 'false'.

#### is_selected
Receives a HTML elements and returns true if it is selected.