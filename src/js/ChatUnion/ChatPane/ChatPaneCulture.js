var React = require('react'),
    ChatPaneRep = require('./ChatPaneRep');

var ChatPaneCulture = React.createClass({

  propTypes: {
    thread: React.PropTypes.object
  },

  componentWillMount: function() {
    this.rep = new ChatPaneRep(this.props.thread);
    this.rep.on(this.rep.EventType.NEW_MESSAGE, this.onNewMessage);

    this.setState({
      thread: this.props.thread,
      user: this.props.thread.user,
      owner: this.rep.owner
    })
  },

  componentWillUnmount: function() {
    this.rep.off(this.rep.EventType.NEW_MESSAGE, this.onNewMessage);
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      thread: nextProps.thread
    })
  },

  componentDidMount: function() {
    var thread = React.findDOMNode(this.refs.thread);
    thread.scrollTop = thread.scrollHeight;

    if(this.props.focus)
      React.findDOMNode(this.refs.input).focus();
  },

  componentDidUpdate: function() {
    var thread = React.findDOMNode(this.refs.thread);
    thread.scrollTop = thread.scrollHeight;

    if(this.props.focus)
      React.findDOMNode(this.refs.input).focus();
  },

  onNewMessage: function() {
    this.setState({
      thread: this.rep.thread,
      user: this.rep.thread.user
    });
  },

  render: function() {

    var messages = this.state.thread.messages.map(function (message, index){
      return <div key={index} className="chat-pane__message">{message}</div>
    });

    return (
        <div className="chat-pane">
          <div ref="thread" className="chat-pane__thread">
            <img className="chat-pane__img" src={this.state.user.picture.thumbnail}/>
            <div className="chat-pane__username">
              <strong>{this.state.user.getFullName()}</strong>
            </div>
            <div className="chat-pane__messages">
                {messages}
            </div>
          </div>
          <div className="chat-pane__entry">
            <img className="chat-pane__img chat-pane__img--entry-img" src={this.state.owner.picture.thumbnail}/>
            <input ref="input" className="chat-pane__entry-reply" type="text" placeholder="This demo is for demonstrating unread threads synchronisation, so we left message typing out for the sake of brevity." />
          </div>
        </div>
    );
  }
});

module.exports = ChatPaneCulture;
