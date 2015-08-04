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
    this.rep.on(this.rep.EventType.INITIAL_DATA, this.updateThreads);
    this.rep.on(this.rep.EventType.UPDATE_ACTIVE_THREAD, this.updateThreads);
  },

  componentWillUnmount: function() {
    this.rep.removeListener(this.rep.EventType.INITIAL_DATA, this.onInit);
  },

  updateThreads: function() {
    this.setState({
      threads: this.rep.threads
    })
  },

  render: function() {

    var threads = [],
        chatPane = '';

    this.state.threads.map(function(thread, index) {
      threads.push(<ThreadPreview key={index}
                                  thread={thread} />);
    });

    if(this.rep.activeThread)
      chatPane = <ChatPane thread={this.rep.activeThread} />;

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
