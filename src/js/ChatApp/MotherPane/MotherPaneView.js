var React = require('react'),
    MotherPaneViewModel = require('./MotherPaneViewModel'),
    ThreadList = require('../ThreadList/ThreadListView'),
    ChatPane = require('../ChatPane/ChatPaneView');

var MotherPaneView = React.createClass({

  getInitialState: function() {
    return {
      threads: []
    }
  },

  componentWillMount: function() {
    this.viewModel = new MotherPaneViewModel();
    this.viewModel.on(this.viewModel.EventType.UPDATE, this.onUpdate);
  },

  componentWillUnmount: function() {
    this.viewModel.off(this.viewModel.EventType.UPDATE, this.onUpdate);
  },

  onUpdate: function() {
    this.setState({
      threads: this.viewModel.getThreads()
    })
  },

  onClickThreadPreView: function(thread) {
    this.viewModel.setActive(thread);
  },

  render: function() {

    var activeThread = this.viewModel.getActiveThread();
    var chatPane = activeThread ? <ChatPane thread={activeThread}/> : '';

    return (
        <div className="mother-pane">
          <ThreadList onClickThreadPreView={this.onClickThreadPreView}/>
          {chatPane}
        </div>
    );
  }
});

module.exports = MotherPaneView;
