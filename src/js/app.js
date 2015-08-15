var React = require('react/addons'),
    Root = require('./ChatUnion/Root/RootCulture'),
    ChatRegime = require('./ChatUnion/ChatRegime');

// Debuging tools
var debug = require('debug');

global.debug = debug;
global.log = debug('LOG:');
global.errorlog = debug('ERROR:');

ChatRegime.init();

React.render(
    <Root />,
    document.body
);