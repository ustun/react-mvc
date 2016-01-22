var React = require('react/addons'),
    Root = require('./ChatApp/Root/RootView'),
    ChatModel = require('./ChatApp/ChatModel');

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