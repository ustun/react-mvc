var React = require('react'),
    RootRep = require('./RootRep'),
    Menu = require('../Menu/MenuCulture'),
    MotherPane = require('../MotherPane/MotherPaneCulture');

var ChatBoxCulture = React.createClass({

  componentWillMount: function() {
    this.rep = new RootRep();
  },

  render: function() {
    return (
        <div className="root">
          <Menu />
          <MotherPane />
        </div>
    );
  }
});

module.exports = ChatBoxCulture;
