var React = require('react'),
    MenuRep = require('./MenuRep'),
    Popover = require('../ThreadsPopover/ThreadsPopoverView');

var MenuView = React.createClass({

  getInitialState: function() {
    return {
      count: 0
    }
  },

  componentWillMount: function() {
    this.rep = new MenuRep();
    this.rep.on(this.rep.EventType.UPDATE, this.onUpdate);
  },

  componentWillUnmount: function() {
    this.rep.off(this.rep.EventType.UPDATE, this.onUpdate);
  },

  onUpdate: function() {
    this.setState({
      count: this.rep.unreadCount
    })
  },

  togglePopover: function () {
    this.refs.popover.toggle();
  },

  render: function() {
    return (
        <div className="menu">
          <h1 className="menu__heading">Chat</h1>
          <button className="menu__button"
                  onClick={this.togglePopover}>
            <span>
              Threads ({this.state.count})
            </span>
          </button>
          <Popover ref="popover"/>
        </div>
    );
  }
});

module.exports = MenuView;
