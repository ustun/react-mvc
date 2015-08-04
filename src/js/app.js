var React = require('react/addons'),
    Root = require('./ChatUnion/Root/RootCulture');

// Debuging tools
var debug = require('debug');

global.debug = debug;
global.log = debug('LOG:');
global.errorlog = debug('ERROR:');
global.routelog = debug('ROUTE:');

React.render(
    <Root />,
    document.body
);