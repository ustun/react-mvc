var React = require('react'),
    MenuRep = require('./MenuRep');

var MenuCulture = React.createClass({

  componentWillMount: function() {
    this.rep = new MenuRep();
  },

  render: function() {
    return (
        <div className="menu">
          <h1 className="menu__heading">Chat</h1>
          <button className="menu__button">Threads</button>
        </div>
    );
  }
});

module.exports = MenuCulture;
