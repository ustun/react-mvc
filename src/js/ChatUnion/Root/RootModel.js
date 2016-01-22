var React = require('react'),
    RootRep = require('./RootRep'),
    Menu = require('../Menu/Menuview'),
    MotherPane = require('../MotherPane/MotherPaneview'),
    ChatBoxview = require('../ChatBox/ChatBoxview');

var Rootview = React.createClass({

  getInitialState: function() {
    return {
      threads: []
    }
  },

  componentWillMount: function() {
    this.rep = new RootRep();
    this.rep.on(this.rep.EventType.ADD_CHAT_BOX, this.onAddChatBox);
    this.rep.on(this.rep.EventType.REMOVE_CHAT_BOX, this.onRemoveChatBox);
  },

  onAddChatBox: function(e) {

    var existingThread = this.state.threads.filter(function(thread) {
      return thread.id == e.thread.id;
    })[0];

    if(existingThread)
      return React.findDOMNode(this.refs[existingThread.id]).focus();

    // add thread
    var threads = React.addons.update(this.state.threads, {
      $push: [e.thread]
    });

    this.setState({
      threads: threads
    })
  },

  onRemoveChatBox: function(e) {

    // deep clone threads
    var threads = this.state.threads.slice(0);

    // take thread out
    threads.map(function(thread, i) {
      if(thread.id == e.thread.id) {
        threads.splice(i, 1)[0];
      }
    });

    this.setState({
      threads: threads
    })
  },

  render: function() {

    var chatBoxes = this.state.threads.map(function(thread) {
      return <ChatBoxview ref={thread.id} key={thread.id} thread={thread} />
    });

    return (
        <div className="root">
          <Menu />
          <MotherPane />
          <div className="root__chat-boxes">{chatBoxes}</div>
        </div>
    );
  }
});

module.exports = Rootview;
