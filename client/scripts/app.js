// YOUR CODE HERE:
const app = {
  init: function() {
    //init stuff
    // $('#main').append('<span class="username">' + message.username + '</span>')
  },

  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        var storeMessages;
        storeMessages = data;
        app.clearMessages();
        for (let i = 2; i < 12; i++) {
          app.renderMessage(storeMessages.results[i]);
        }
      },
      error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  clearMessages: function() {
    $('#main').empty();
  },

  renderMessage: function(message) {
    $('#main').append('<p>' + '<span class="username">' + message.username + '</span>' + ': ' + message.text + '</p>');
    // $('#chats').html('<p id="someText">' + message.text + '</p>');
  },
  
  //This is so broken
  renderRoom: function(roomName) {
    $('#roomSelect').append('<p>' + roomName + '</p>');
  },

  handleUsernameClick: function() {
    alert('working');
    return true;
  },

  handleSubmit: function() {
    alert('submit button working');
    return true;
  }
};

app.fetch();
setInterval(app.fetch, 5000);