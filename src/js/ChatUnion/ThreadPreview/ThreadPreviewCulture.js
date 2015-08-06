var React = require('react'),
    cx = require('classnames'),
    ThreadPreviewRep = require('./ThreadPreviewRep');

var ThreadPreviewCulture = React.createClass({

  propTypes: {
    thread: React.PropTypes.object
  },

  componentWillMount: function() {
    this.rep = new ThreadPreviewRep(this.props.thread);
    this.rep.on(this.rep.EventType.UPDATE_ACTIVE_THREAD, this.updateThread);
    this.rep.on(this.rep.EventType.UPDATE, this.updateThread);

    this.setState({
      active: this.rep.active,
      user: this.rep.user,
      lastMessage: this.rep.lastMessage
    })
  },

  componentWillUnmount: function() {
    this.rep.off(this.rep.EventType.UPDATE_ACTIVE_THREAD, this.updateThread);
    this.rep.off(this.rep.EventType.UPDATE, this.updateThread);
  },

  setActive: function() {
    this.rep.setActive();
  },

  updateThread: function() {
    this.setState({
      active: this.rep.active,
      lastMessage: this.rep.lastMessage,
      unread: this.rep.thread.unread
    })
  },

  render: function() {
    return (
        <div className={cx('thread-preview', {'active': this.state.active}, {'unread': this.state.unread})} onClick={this.setActive}>
          <img className="thread-preview__img" src={this.state.user.picture.thumbnail} />
          <span className="thread-preview__name">
            <strong>{this.state.user.getFullName()}</strong>
            <span className="thread-preview__last-message">{this.state.lastMessage}</span>
          </span>
        </div>
    );
  }
});

module.exports = ThreadPreviewCulture;
