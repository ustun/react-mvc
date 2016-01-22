var React = require('react'),
    cx = require('classnames'),
    ThreadPreviewViewModel = require('./ThreadPreviewViewModel');

var ThreadPreviewView = React.createClass({

  propTypes: {
    thread: React.PropTypes.object
  },

  componentWillMount: function() {
    this.viewModel = new ThreadPreviewViewModel(this.props.thread);
    this.viewModel.on(this.viewModel.EventType.SET_ACTIVE_THREAD, this.updateThread);
    this.viewModel.on(this.viewModel.EventType.NEW_MESSAGE, this.updateThread);
    this.viewModel.on(this.viewModel.EventType.SET_ACTIVE_CHAT_BOX, this.updateThread);

    this.setState({
      active: this.viewModel.getActive(),
      user: this.viewModel.user,
      lastMessage: this.viewModel.lastMessage
    })
  },

  componentWillUnmount: function() {
    this.viewModel.off(this.viewModel.EventType.SET_ACTIVE_THREAD, this.updateThread);
    this.viewModel.off(this.viewModel.EventType.NEW_MESSAGE, this.updateThread);
    this.viewModel.off(this.viewModel.EventType.SET_ACTIVE_CHAT_BOX, this.updateThread);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
      return this.state.unread != nextState.unread ||
             this.state.active != nextState.active
  },

  setActive: function() {
    this.props.onClickThreadPreview(this.viewModel.thread);
  },

  updateThread: function() {
    this.setState({
      active: this.viewModel.getActive(),
      lastMessage: this.viewModel.lastMessage,
      unread: this.viewModel.thread.unread
    })
  },

  render: function() {
    return (
        <div className={cx('thread-preView', {'active': this.state.active}, {'unread': this.state.unread})}
             onClick={this.setActive}>
          <img className="thread-preView__img" src={this.state.user.picture.thumbnail} />
          <span className="thread-preView__name">
            <strong>
              {this.state.user.getFullName()}
            </strong>
            <span className="thread-preView__last-message">
              {this.state.lastMessage}
            </span>
          </span>
        </div>
    );
  }
});

module.exports = ThreadPreviewView;
