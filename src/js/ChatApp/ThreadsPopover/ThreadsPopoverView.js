var React = require('react'),
    cx = require('classnames'),
    ThreadsPopoverViewModel = require('./ThreadsPopoverViewModel'),
    ThreadList = require('../ThreadList/ThreadListView');

var ThreadsPopoverView = React.createClass({

  getInitialState: function() {
    return {
      visible: false
    }
  },

  componentWillMount: function() {
    this.viewModel = new ThreadsPopoverViewModel();
  },

  toggle: function() {
    this.viewModel.toggle();
    this.setState({
      visible: this.viewModel.visible
    })
  },

  onClickThreadPreView: function(thread) {
    this.viewModel.addChatBox(thread);
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
