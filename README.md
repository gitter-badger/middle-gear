v0.1.2

# Middle Gear
**Middle Gear** is a View Engine for NodeJs Web applications. It's in **beta** version, don't use it in production please.

### Installation

`npm install middle-gear`

### Let's Start
*Middle Gear* has provided a language named **Melody**. But you will not forced to learn a new language. **Melody** is **HTML** plus **JavaScript**. With *Melody* You can **mix** JavaScript with HTML easily. There are a few simple rules to write *Melody*:

* Drop `<`, `>` or `/>` from your start tags (ex. ```</div> <br/>```).
* Remove end tags (ex. ```</div>```) entirely.
* Use `indention` for applying HTML hierarchy. 
* When putting HTML tags inside a JavaScript block apply indention rule too. 
* Place tag's text (ex. ```<span>It's Text</span>```) inside quote marks `'` or `"`.

```
var colors = ['Blue','Green','Red'];
table
  for (var i = 0; i < colors.length; i++) {    
      tr
        td '@{colors[i]}'
  }
```
**Tip**: As you see, the `for` block is using `indention` to place inside of `table` tag and `tr` tag doing the same to tell that it's inside of the `for`. Note that placing a tag inside of code block(`{` ,`}`) will not make it as a subset of that code block, so using `indention` is a must everywhere.

**Note:** It's not possible to mix JavaScript and HTML in one line.

### Adding dynamic value to markup
As you see in above example, we are using `@{}` for adding dynamic values to our markup. Inside the **Dynamic value block**, you can use any expression that returns a value. All of following expressions are acceptable:

```
span '1+1=@{1+1}'
'@{parsInt("1")}'
'@{1===1? true : false}'
input name="@{username}"
```

### Sending data to markup from outside
*Middle Gear* is supporting **MVC** architecture. It means you can send **Model** to a Melody **View**.
```
var __ = model;
div
  span "@{__.msg}"
```
**Note**: As you see We have used `model` object for accessing the data that has been sent from `controller`.

### Inheritance
```
//layout.mel
html
  head
    title 'Middle Gear - Hello World'
  body
    load name="content"
```
```
//index.mel
layout src="layout.mel"
sector name="content"
  span "Hello world!"
```
### Third party framework support
#### **Angular**
Current version of *Middle Gear* compiler supports **Angular 2.0** syntax.

```
div
    span *ng-if="expression" #localValue [(two-way-binding)]="prop"
        'Hello Angular 2.0'
```

#### SailsJs 0.11
For setting *Middle Gear* as **SailsJs** view engine, modify `view.js` file from `config folder` to look like this:

```
//view.js
module.exports.views = {
   engine: {
      ext: 'mel',
      fn: function(filename, options, fn) {
         var path = require('path');
         var basename = path.basename(filename);
         var viewEngine = new (require('middle-gear'))({
            rootDirname: path.dirname(filename)
         });
         if(!options.model) options.model = {};
         var markup = viewEngine.renderFile(basename, options.model);
         fn(null, markup);
      }
   }
 };
```

#### Lodash 3.10
*Middle Gear* compiles *Melody language* in Sand Box mode, so you can't access to your **npm packages** that you have added to your project. However **lodash** is injected to view by default, so you can use it in your view code.

```
var colors = ['Blue', 'Green', 'Red'];
table
    _.each(colors, function(color) {
        tr
            td '@{color}'
    })
```

#### Shorthands
Melody supports shorthand for writing tags:

* Use `#` after tag's name for adding id:
```
input#username
input #username
```

* Use `.` after tag's name or id for adding class:
```
input #username .class1 .class2
input.class1.class2#username 
```

---
### What about *Controller* code?
```
var viewEngine = new(require('middle-gear'))({
  rootDirname: __dirname
});
var markup = viewEngine.renderFile('index.mel', {
  msg: 'This message is from Controller'
});
console.log(markup);
```
**Note**: `.mel` prefix is abbreviation for **Melody**. You can drop it in `src` attributes and `renderFile` method but for it your file must perfixed with `.mel`.

---
*Any suggestion?*
*Have fun! :)*
*Behzad Eshan*