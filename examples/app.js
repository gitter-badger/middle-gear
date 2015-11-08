var viewEngine = new(require('../index'))({
	rootDirname: __dirname
});
var markup = viewEngine.renderFile('ex-5', {
	msg: 'This message is from Controller'
});
console.log(markup);