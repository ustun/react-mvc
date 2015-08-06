var React = require('react'),
    MenuRep = require('./MenuRep');

var MenuCulture = React.createClass({

  getInitialState: function() {
    return {
      count: 0
    }
  },

  componentWillMount: function() {
    this.rep = new MenuRep();
    this.rep.on(this.rep.EventType.UPDATE, this.onUpdate);
  },

  onUpdate: function() {
    this.setState({
      count: this.rep.unreadCount
    })
  },

  render: function() {
    return (
        <div className="menu">
          <h1 className="menu__heading">Chat</h1>
          <button className="menu__button">
            <span>
              Threads {this.state.count}
            </span>
          </button>
        </div>
    );
  }
});

module.exports = MenuCulture;
