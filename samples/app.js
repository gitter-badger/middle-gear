var viewEngine = new(require('../index'))({
	rootDirname: __dirname
});
var markup = viewEngine.renderFile('index', {
	msg: 'This message is from Controller'
});
console.log(markup);