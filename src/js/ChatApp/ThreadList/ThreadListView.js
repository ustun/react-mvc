var React = require('react'),
    ThreadListViewModel = require('./ThreadListViewModel'),
    ThreadPreview = require('../ThreadPreview/ThreadPreviewView'),
    ChatPane = require('../ChatPane/ChatPaneView');

var ThreadsListView = React.createClass({

  propTypes: {
    onClickThreadPreview: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      threads: []
    }
  },

  componentWillMount: function() {
    this.viewModel = new ThreadListViewModel();
    this.viewModel.on(this.viewModel.EventType.INITIAL_DATA, this.onInit);
    this.viewModel.on(this.viewModel.EventType.NEW_MESSAGE, this.onNewMessage);
  },

  componentWillUnmount: function() {
    this.viewModel.off(this.viewModel.EventType.INITIAL_DATA, this.onInit);
    this.viewModel.off(this.viewModel.EventType.NEW_MESSAGE, this.onNewMessage);
  },

  onInit: function() {
    this.setState({
      threads: this.viewModel.threads
    })
  },

  onNewMessage: function(params) {

    // deep clone threads
    var threads = this.state.threads.slice(0);

    // find and replace thread messages
    threads.map(function(thread, i) {
      params.data.map(function(data) {
        if(thread.id == data.thread.id) {
          thread.updateMessages(data.thread.messages);
          // move updated thread on top of threads
          threads.unshift(threads.splice(i, 1)[0]);
        }
      });
    });

    // set new state
    this.setState({
      threads: threads
    });
  },

  render: function() {

    var threads = this.state.threads.map(function(thread) {
      return <ThreadPreview key={thread.id}
                            thread={thread}
                            onClickThreadPreview={this.props.onClickThreadPreview}/>
    }.bind(this));

    return (
        <div className="thread-list">
          {threads.length ? threads : 'User List'}
        </div>
    );
  }
});

module.exports = ThreadsListView;
