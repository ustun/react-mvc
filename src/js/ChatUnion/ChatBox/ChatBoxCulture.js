var React = require('react'),
    cx = require('classnames'),
    ChatBoxRep = require('./ChatBoxRep'),
    ChatPaneCulture = require('../ChatPane/ChatPaneCulture');

var ChatBoxCulture = React.createClass({

  getInitialState: function() {
    return {
      active: true
    }
  },

  componentWillMount: function() {
    this.rep = new ChatBoxRep(this.props.thread);
    this.rep.on(this.rep.EventType.UPDATE, this.onUpdate);

    this.setState({
      thread: this.rep.thread,
      user: this.rep.user
    })
  },

  componentWillUnmount: function() {
    this.rep.off(this.rep.EventType.UPDATE, this.onUpdate);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextState.unread != this.state.unread ||
           nextState.active != this.state.active ||
           nextState.minimized != this.state.minimized;
  },

  onUpdate: function() {
    this.setState({
      active: this.rep.getActive(),
      unread: this.rep.thread.unread,
      minimized: this.rep.minimized
    })
  },

  focus: function(e) {
    e && e.stopPropagation();
    if(this.state.minimized)
      this.toggle();

    this.rep.setActive();
  },

  close: function(e) {
    e && e.stopPropagation();
    this.rep.close();
  },

  toggle: function(e) {
    e && e.stopPropagation();
    this.rep.minimize();
    this.setState({
      minimized: this.rep.minimized
    });
  },

  render: function() {
    return (
        <div className={cx('chat-box', {'active': this.state.active}, {'unread': this.state.unread}, {'minimized': this.state.minimized})}
             onClick={this.focus}>
          <div className="chat-box__header">
            <img className="chat-box__image" src={this.state.user.picture.thumbnail}/>
            <strong>{this.state.user.getFullName()}</strong>
            <div className="chat-box__close"
                 onClick={this.close}>✖</div>
            <div className="chat-box__minimize"
                 onClick={this.toggle} />
          </div>
          <div className="chat-box__content">
            <ChatPaneCulture thread={this.state.thread} focus={this.state.active || this.state.unread || this.state.minimized}/>
          </div>
        </div>
    );
  }
});

module.exports = ChatBoxCulture;
