var BOT_ID = process.env.GM_BOT_ID;
var API_KEY = process.env.GM_API_KEY;
var request = require('request');
var URI = "https://api.groupme.com/v3/bots/post";
function validateMessage(requestBody) {
  if (requestBody && requestBody.name && requestBody.text) {
    return requestBody;
  }
  return { name: "", text: "" };
}

function sendMessage(message) {
  var data = { form: { text: message, bot_id: BOT_ID } };
  console.log("Sending ", data);
  request.post(URI, data, function(err, res, body) {
    if(err)
      console.log("Error sending message to group");
  });
}

exports.callback = function(req, res) {
  var message = validateMessage(req.body);
  if (message.text.split(' ')[0] == '!topic') {
    msgText = message.text.split(' ');
    msgText.shift();
    msgText = msgText.join(' ');
    sendMessage(message.name + ' set topic to ' + msgText);
  }
  res.end();
};

