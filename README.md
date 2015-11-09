v0.1.2

# Middle Gear
**Middle Gear** is a View Engine for NodeJs Web applications. It's in **beta** version, don't use it in production please.

* [Installation](#installation)
* [Let's Start](#lets-start)
* [Adding dynamic value to markup](#adding-dynamic-value-to-markup)
* [Sending data to markup from outside](#sending-data-to-markup-from-outside)
* [Inheritance](#inheritance)
* [Putting tags in a same line](#putting-tags-in-a-same-line)
* [Breaking line into multiple lines](#breaking-line-into-multiple-lines)
* [Plain text](#plain-text)
* [Using Script and Style blocks](#using-script-and-style-blocks)
* [Server Side JavaScript inside Script and Style tags](#server-side-javascript-inside-script-and-style-tags)
* [Using custom tags in Melody](#using-custom-tags-in-melody)
* [Shorthands](#Shorthands)
* [Commenting](#Commenting)
* [Third party framework support](#third-party-framework-support)
  * [Angular](#angular)
  * [SailsJs](#SailsJs)
  * [Lodash](#Lodash)
* [What about Controller code?](#what-about-Controller-code)

### Installation

`npm install middle-gear`

### Let's Start
*Middle Gear* has provided a language named **Melody**. But you will not forced to learn a new language. **Melody** is **HTML** plus **JavaScript**. With *Melody* You can **mix** JavaScript with HTML easily. There are a few simple rules to write *Melody*:

* Drop `<`, `>` or `/>` from your start tags (ex. ```</div> <br/>```).
* Remove end tags (ex. ```</div>```) entirely.
* Place tag's text (ex. ```<span>It's Text</span>```) inside quote marks `'` or `"` or even backtick `` ` ``.
* Use `indention` for applying HTML hierarchy. 
* When putting HTML tags inside a JavaScript block apply `indention` rule too. 

```
var colors = ['Blue','Green','Red'];
table
  for (var i = 0; i < colors.length; i++) {    
      tr
        td '@{colors[i]}'
  }
```
**Tip**: As you see, we have used `indention` to place the `for` expression inside of the `table` tag. We have done the same, for the `tr` to tell it's inside of the `for`. Note that placing a tag inside of code block(`{` ,`}`) will not make it as a subset of that code block, so using `indention` is a must everywhere.

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
div
  span "@{model.msg}"
```
**Note**: As you see we have used `model` object for accessing the data that has been sent from `controller`.

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
### Putting tags in a same line
Use `>` for separating tags that are in the same line:
```
ul.dropdown-menu
    li > a href="#" 'Action'
    li > a href="#" 'Another action'
```
### Breaking line into multiple lines
For doing this, use `,` at the end of line:
```
    button.btn.btn-default.dropdown-toggle,
type="button",
id="dropdownMenu2",
data-toggle="dropdown",
aria-haspopup="true" aria-expanded="false"
```
**Note**: As you see, it's not needed to follow `indention` rule for the broken lines.

### Plain text
Browsers eliminate whitespaces but not *Middle Gear*. Everything that is written inside quote marks will be rendered in the same way.
```
  div
    pre
"It's a 
    multi line
plain
text"
```

### Script and Style blocks
Using *Script* and *Style* is as same as other tags. 
```
Style
  body {
    font: "tahoma"
  }
Script
  alert('Hello world!')
```
### Server Side JavaScript inside Script and Style tags
You can control the rendering of the client-side JavaScript and also CSS using *Melody*. For this you should explicitly express that you are writing server side JavaScript expression by adding `\` to the start of your code lines.
```
var en_msg="Hello world!",
  fa_msg= درود بر شما!;
  
Style
  body {
    \if(model.lang==='en')
      font: "tahoma"
    \else if(model.lang==="fa")
      font: "b roya"
  }
Script  
  \if(model.lang==='en')
    alert('@{en_msg}')
  \else if(model.lang==="fa")
    alert('@{fa_msg}')
```
### Using custom tags in Melody
For adding non-HTML5 tags to your markup you should explicitly express it using `>` before the name of tag.
```
div
  > custom-tag 

```

### Shorthands
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

### Commenting
Like JavaScript, can use `//` and `/*..*/` for commenting.

### Third party framework support
#### **Angular**
Current version of *Middle Gear* compiler supports **Angular 2.0** syntax.

```
div
    span *ng-if="expression" #localValue [(two-way-binding)]="prop"
        'Hello Angular 2.0'
```

#### SailsJs
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

#### Lodash
*Middle Gear* compiles *Melody language* in Sand Box mode, so you can't access to your **npm packages** that you have added to your project. However **lodash** is injected to view by default, so you can use it in your view code.

```
var colors = ['Blue', 'Green', 'Red'];
table
    _.each(colors, function(color) {
        tr
            td '@{color}'
    })
```

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