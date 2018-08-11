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
      data: 'order=-createdAt',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        var storeMessages;
        storeMessages = data;
        app.clearMessages('#main');
        console.log(data);
        var roomList = {};
        for (let i = 0; i < 100; i++) {
          if (storeMessages.results[i].username !== undefined) {
            app.renderMessage(storeMessages.results[i]);
            if (!roomList.hasOwnProperty(storeMessages.results[i].roomname)) {
              roomList[storeMessages.results[i].roomname] = true;
              app.renderRoom(storeMessages.results[i]);
            }
          }
        }
      },
      error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  clearMessages: function(where) {
    $(where).empty();
  },

  renderMessage: function(message) {
    if (message.roomname === $('#selectRoom').val() || $('#selectRoom').val() === 'Lobby') {
      $('#main').append(`<p class="${app.sanitize(message.roomname)}">` + `<span class="username ${app.sanitize(message.username)}">` + app.sanitize(message.username) + '</span>' + ': ' + app.sanitize(message.text) + '</p>');
    }  
  },
  
  //This is so broken
  renderRoom: function(roomName) {
    $('#selectRoom').append('<option>' + app.sanitize(roomName.roomname) + '</option>');
  },

  handleUsernameClick: function(username) {
    
    if (!friendList.hasOwnProperty(username)) {
      friendList[username] = true;
      $('#friendList').append('<li class="username">' + username + '</li>');
    }
  },

  handleSubmit: function() {
    let message = {
      username: 'barbiegirl',
      text: $('input#chats').val(),
      roomname: 'lobby'
    };
    app.send(message);
    app.clearMessages('#chats');
  },

  sanitize: function(html) {
    return $( $.parseHTML(html)).text();
  },

  addFriend: function (username) {
    $(`.${username}`).addClass('friend');
  }
};


app.fetch();
$('input#chats').val('This is a value');
var friendList = {};
// setInterval(app.fetch, 3000);