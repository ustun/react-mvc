var React = require('react'),
    MotherPaneRep = require('./MotherPaneRep'),
    ThreadList = require('../ThreadList/ThreadListCulture'),
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
  },

  componentWillUnmount: function() {
    this.rep.off(this.rep.EventType.INITIAL_DATA, this.onInit);
  },

  onInit: function() {
    this.setState({
      threads: this.rep.threads
    })
  },

  render: function() {

    var chatPane = this.rep.activeThread ?
                   <ChatPane thread={this.rep.activeThread}
                             owner={this.rep.owner}/> :
                   '';

    return (
        <div className="mother-pane">
          <ThreadList />
          {chatPane}
        </div>
    );
  }
});

module.exports = MotherPaneCulture;
