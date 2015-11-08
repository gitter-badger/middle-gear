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