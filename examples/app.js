var viewEngine = new(require('../index'))({
	rootDirname: __dirname
});
var markup = viewEngine.renderFile('ex-1', {
	msg: 'This message is from Controller'
});
console.log(markup);