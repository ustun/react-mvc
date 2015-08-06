var React = require('react'),
    cx = require('classnames'),
    ThreadsPopoverRep = require('./ThreadsPopoverRep'),
    ThreadList = require('../ThreadList/ThreadListCulture');

var ThreadsPopoverCulture = React.createClass({

  getInitialState: function() {
    return {
      visible: false
    }
  },

  componentWillMount: function() {
    this.rep = new ThreadsPopoverRep();
  },

  toggle: function() {
    this.rep.toggle();
    this.setState({
      visible: this.rep.visible
    })
  },

  render: function() {
    return (
        <div className={cx('threads-popover', {'visible': this.state.visible})}>
          <ThreadList />
        </div>
    );
  }
});

module.exports = ThreadsPopoverCulture;
