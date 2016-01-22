var React = require('react'),
    cx = require('classnames'),
    ThreadsPopoverRep = require('./ThreadsPopoverRep'),
    ThreadList = require('../ThreadList/ThreadListview');

var ThreadsPopoverview = React.createClass({

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

  onClickThreadPreview: function(thread) {
    this.rep.addChatBox(thread);
  },

  render: function() {
    return (
        <div className={cx('threads-popover', {'visible': this.state.visible})}>
          <ThreadList onClickThreadPreview={this.onClickThreadPreview}/>
        </div>
    );
  }
});

module.exports = ThreadsPopoverview;
