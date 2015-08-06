var React = require('react'),
    ThreadListRep = require('./ThreadListRep'),
    ThreadPreview = require('../ThreadPreview/ThreadPreviewCulture'),
    ChatPane = require('../ChatPane/ChatPaneCulture');

var ThreadsListCulture = React.createClass({

  getInitialState: function() {
    return {
      threads: []
    }
  },

  componentWillMount: function() {
    this.rep = new ThreadListRep();
    this.rep.on(this.rep.EventType.INITIAL_DATA, this.onInit);
    this.rep.on(this.rep.EventType.UPDATE, this.onUpdate);
  },

  componentWillUnmount: function() {
    this.rep.off(this.rep.EventType.INITIAL_DATA, this.onInit);
    this.rep.off(this.rep.EventType.UPDATE, this.onUpdate);
  },

  onInit: function() {
    this.setState({
      threads: this.rep.threads
    })
  },

  onUpdate: function(params) {

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
      return <ThreadPreview key={thread.id} thread={thread} />
    });

    return (
        <div className="thread-list">
          {threads.length ? threads : 'User List'}
        </div>
    );
  }
});

module.exports = ThreadsListCulture;
