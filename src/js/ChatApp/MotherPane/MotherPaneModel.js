var React = require('react'),
    MotherPaneRep = require('./MotherPaneRep'),
    ThreadList = require('../ThreadList/ThreadListView'),
    ChatPane = require('../ChatPane/ChatPaneView');

var MotherPaneView = React.createClass({

  getInitialState: function() {
    return {
      threads: []
    }
  },

  componentWillMount: function() {
    this.rep = new MotherPaneRep();
    this.rep.on(this.rep.EventType.UPDATE, this.onUpdate);
  },

  componentWillUnmount: function() {
    this.rep.off(this.rep.EventType.UPDATE, this.onUpdate);
  },

  onUpdate: function() {
    this.setState({
      threads: this.rep.getThreads()
    })
  },

  onClickThreadPreView: function(thread) {
    this.rep.setActive(thread);
  },

  render: function() {

    var activeThread = this.rep.getActiveThread();
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
