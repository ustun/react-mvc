var React = require('react'),
    MotherPaneRep = require('./MotherPaneRep'),
    ThreadPreview = require('../ThreadPreview/ThreadPreviewCulture'),
    ChatPane = require('../ChatPane/ChatPaneCulture');

var MotherPaneCulture = React.createClass({

  getInitialState: function() {
    return {
      threads: []
    }
  },

  componentWillMount: function() {
    this.rep = new MotherPaneRep();
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
    var threads = React.addons.update(this.state.threads, {});

    // find and replace thread messages
    threads.map(function(thread, i) {
      params.data.map(function(data) {
        if(thread.id == data.thread.id) {
          thread.updateMessages(data.thread.messages);
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

    var chatPane = this.rep.activeThread ?
                   <ChatPane thread={this.rep.activeThread} /> :
                   '';

    return (
        <div className="mother-pane">
          <div className="mother-pane__users-list">
            {threads.length ? threads : 'User List'}
          </div>
          {chatPane}
        </div>
    );
  }
});

module.exports = MotherPaneCulture;
