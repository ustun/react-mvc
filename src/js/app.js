var React = require('react/addons'),
    Root = require('./ChatUnion/Root/RootView'),
    ChatModel = require('./ChatUnion/ChatModel');

// Debuging tools
var debug = require('debug');

global.debug = debug;
global.log = debug('LOG:');
global.errorlog = debug('ERROR:');

ChatModel.init();

React.render(
    <Root />,
    document.body
);