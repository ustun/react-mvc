var React = require('react'),
    cx = require('classnames'),
    ThreadsPopoverRep = require('./ThreadsPopoverRep'),
    ThreadList = require('../ThreadList/ThreadListView');

var ThreadsPopoverView = React.createClass({

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

  onClickThreadPreView: function(thread) {
    this.rep.addChatBox(thread);
  },

  render: function() {
    return (
        <div className={cx('threads-popover', {'visible': this.state.visible})}>
          <ThreadList onClickThreadPreView={this.onClickThreadPreView}/>
        </div>
    );
  }
});

module.exports = ThreadsPopoverView;
