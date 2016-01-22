var React = require('react'),
    cx = require('classnames'),
    ChatBoxViewModel = require('./ChatBoxViewModel'),
    ChatPaneView = require('../ChatPane/ChatPaneView');

var ChatBoxView = React.createClass({

  getInitialState: function() {
    return {
      active: true
    }
  },

  componentWillMount: function() {
    this.viewModel = new ChatBoxViewModel(this.props.thread);
    this.viewModel.on(this.viewModel.EventType.UPDATE, this.onUpdate);

    this.setState({
      thread: this.viewModel.thread,
      user: this.viewModel.user
    })
  },

  componentWillUnmount: function() {
    this.viewModel.off(this.viewModel.EventType.UPDATE, this.onUpdate);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextState.unread != this.state.unread ||
           nextState.active != this.state.active ||
           nextState.minimized != this.state.minimized;
  },

  onUpdate: function() {
    this.setState({
      active: this.viewModel.getActive(),
      unread: this.viewModel.thread.unread,
      minimized: this.viewModel.minimized
    })
  },

  focus: function(e) {
    e && e.stopPropagation();
    if(this.state.minimized)
      this.toggle();

    this.viewModel.setActive();
  },

  close: function(e) {
    e && e.stopPropagation();
    this.viewModel.close();
  },

  toggle: function(e) {
    e && e.stopPropagation();
    this.viewModel.minimize();
    this.setState({
      minimized: this.viewModel.minimized
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
            <ChatPaneView thread={this.state.thread} focus={this.state.active}/>
          </div>
        </div>
    );
  }
});

module.exports = ChatBoxView;
