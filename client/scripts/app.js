// YOUR CODE HERE:
const app = {
  init: function() {
    //init stuff
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

  fetch: function(url) {
    $.ajax({
      url: url,
      type: 'GET',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: got data from ' + url);
      },
      error: function(data) {
        console.error('chatterbox: failed to get data from' + url, data);
      }
    });
  },

  clearMessages: function() {
    $('#chats').empty();
  },

  renderMessage: function(message) {
    $('#chats').html('<p>' + '<span id="user">' + message.username + '</span>' + ': ' + message.text + '</p>');
    // $('#chats').html('<p id="someText">' + message.text + '</p>');
  },
  
  //This is so broken
  renderRoom: function(roomName) {
    $('#roomSelect').append('<p>' + roomName + '</p>');
  }
  

};
