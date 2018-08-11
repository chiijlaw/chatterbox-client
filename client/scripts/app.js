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
    app.fetch();
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
        for (let i = 0; i < 100; i++) {
          //Checks to ensure username is not undefined before rendering message
          if (storeMessages.results[i].username !== undefined) {
            app.renderMessage(storeMessages.results[i]);
            //Checks all messages for room name to populate select-box
            if (!roomList.hasOwnProperty(storeMessages.results[i].roomname)) {
              roomList[storeMessages.results[i].roomname] = true;
              app.renderRoom(storeMessages.results[i]);
            }
          }
          //Loop through friend list to highlight friends in fetched messages
        }
        for (let prop in friendList) {
          $('.' + prop).addClass('friend');
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
    let cleanName = app.washUsername(message.username);
    if (message.roomname === $('#selectRoom').val() || $('#selectRoom').val() === 'Lobby') {
      $('#main').append(`<p class="${app.sanitize(message.roomname)}">` + `<span class="username ${cleanName}">` + cleanName + '</span>' + ': ' + app.sanitize(message.text) + '</p>');
    }  
  },
  
  //This is so broken
  renderRoom: function(roomName) {
    $('#selectRoom').append('<option>' + app.sanitize(roomName.roomname) + '</option>');
  },

  handleUsernameClick: function(username) {
    let cleanName = app.washUsername(username);
    if (!friendList.hasOwnProperty(cleanName)) {
      friendList[username] = true;
      $('#friendList').append('<li class="username">' + cleanName + '</li>');
    }
  },

  handleSubmit: function() {
    let message = {
      username: window.location.search.slice(10),
      text: $('input#chats').val(),
      roomname: $('#selectRoom').val()
    };
    app.send(message);
    app.clearMessages('#chats');
  },

  sanitize: function(html) {
    return $( $.parseHTML(html)).text();
  },

  addFriend: function (username) {
    let cleanUsername = app.washUsername(username);
    $(`.${cleanUsername}`).addClass('friend');
  },

  washUsername: function(username) {
    let nameArray = username.split('');
    let washedArray = [];
    nameArray.forEach(function(element) {
      washedArray.push(element.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''));
    });
    return washedArray.join('');
  }
};


app.fetch();
$('input#chats').val('This is a value');
var friendList = {};
setInterval(app.fetch, 10000);
var roomList = {Lobby: true};