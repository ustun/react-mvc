var React = require('react/addons'),
    Root = require('./ChatUnion/Root/Rootview'),
    Chatmodel = require('./ChatUnion/Chatmodel');

// Debuging tools
var debug = require('debug');

global.debug = debug;
global.log = debug('LOG:');
global.errorlog = debug('ERROR:');

Chatmodel.init();

React.render(
    <Root />,
    document.body
);