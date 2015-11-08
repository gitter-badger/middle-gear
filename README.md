######v0.1.2

Welcome to Middle Gear!
==

>**Middle Gear** is a View Engine for NodeJs Web applications. It's in **beta** version, don't use it in production please.

----------

**Installation**

`npm install middle-gear`

**`Hello world` using Middle Gear**
```
middle-gear-hello-world
│   app.js
│   layout.mel   
│   index.mel
```
######*app.js*
```
var viewEngine = new(require('middle-gear'))({
	rootDirname: __dirname
});
var markup = viewEngine.renderFile('index.mel');
console.log(markup);
```
######*layout.mel*
```
html
	head
		title 'Middle Gear - Hello World'
	body
		load name="content"
```

######*index.mel*
```
layout src="layout.mel"
component name="content"
	span "Hello world!"
```
> **Tip:**  The shorthand syntax is named **Melody Language** and `.mel` prefix is its abbreviation. You can drop .mel in `src` attributes and for it your file must perfixed with `.mel`. 

----------
###Let's Start
> **Melody** uses **JavaScript** for coding.

You can **mix** `JavaScript` with `Melody`. This is one of the unique and powerful features of Melody. It means you don't have to learn a new language. **Melody** is **HTML** plus **JavaScript**. There are a few rules to write Melody. It is simple:

> - Drop `<`, `>` or `/>` from your tags.
> - Remove end tags (ex. ```</div>```)
> - Use `indention` for applying HTML hierarchy. 
> - When putting HTML tags inside a JavaScript block apply indention rule. 
> *We will support CoffeeScript as coding language in later versions to prevent such mistakes.*
> - Place tag's text inside quote marks `'` or `"`.

#####**Example 1**:
######*app.js*
```
var viewEngine = new(require('middle-gear'))({
	rootDirname: __dirname
});
var markup = viewEngine.renderFile('ex-1');
console.log(markup);
```
######*ex-1.mel*
```
var colors = [
	'Blue',
	'Green',
	'Red',
];

table
	for (var i = 0; i < colors.length; i++) {
		var color = colors[i];
		
		tr
			td '@{color}'
	}
```
> **Tip**: As you see, `for` block must use `indention` to place inside of `table` tag and `tr` tag must also use `indention` to tell that it's inside of the `for`. Note that placing a tag inside of code block(`{` ,`}`) will not make it as a subset of that code block, so using `indention` is a must everywhere. 

> *It's not possible to mix JavaScript and HTML in one line **yet***. 

---
###Adding dynamic value to markup
As you saw in the `Example 1`, we are using `@{}` for adding code values to our markup. Inside the `Dynamic value block`, you can use any expression that returns a value. All of following expressions are acceptable:
#####**Example 2**:
######*ex-2.mel*	
    '@{1+1}'
    '@{parsInt("1")}'
    '@{1===1? true : false}'

---
###Sending data to markup from outside
`Middle Gear` is supporting `MVC` architecture. It means you can send `Model` to a Melody `View`.
#####**Example 3**:
######*app.js*	
```
var viewEngine = new(require('middle-gear'))({
	rootDirname: __dirname
});
var markup = viewEngine.renderFile('ex-3', {
	msg: 'This message is from Controller'
});
console.log(markup);
```
######*ex-3.mel*	
	var __ = model;
    div
	    span "@{__.msg}"
	   
> **Tip**: As you see for accessing to the data that has came from `app`, we should use `model` object. 

---
###Using layout
See Hello world sample.

---

###Third party frameworks support
####**Angular 2.0**
Current version of `Middle Gear` compiler, supports `Angular 2` syntax and you can use `Angular 2` without problem.

#####**Example 4**:
######*ex-4.mel*	
```
var show = true;
div
    span *ng-if="@{show}" #is-angular
        'Hello Angular 2.0'
```

####**SailsJs 0.11**
For setting `Middle Gear` as `Sails`' view engine, modify `view.js` file from `config folder` to look like this:

######*view.js*	
```
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

####**Lodash 3.10**
`Middle Gear` compiles `Melody` in Sand Box mode, so you can't access to your npm packages that you have added to your project. However `lodash` is injected to view by default, so you can use it in your view code.

#####**Example 5**:
######*ex-5.mel*	
```
var colors = [
    'Blue',
    'Green',
    'Red',
];

table
    _.each(colors, function(color) {
        tr
            td '@{color}'
    })
```

-----
####**Shorthands**
There are some shorthand for writing tags:
>- use `#` after tag's name for adding id: 
*example: **input #username***

>- use `.` after tag's name for adding class: 
*example: **input #username .class1.class2***


---
*Any suggestion?*

*Have fun! :)*
*Behzad Eshan*