
var homeBot = BotUI('home-demo');

homeBot.message.add({
  content: 'Welcome to Plotana. I am here to provide you analytics of your dream plot.'
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'Wanna see a demo of what Plotana can do?'
  });
}).then(function () {
  return homeBot.action.button({
    delay: 1000,
    action: [{
      text: 'Sure!',
      value: 'sure'
    }, {
      text: 'No',
      value: 'skip'
    }]
  });
}).then(function (res) {
  ga_record('btn_click', res.value);
  if(res.value == 'sure') {
    tutorial();
  }
  if(res.value == 'skip') {
    end();
  }
});

var tutorial = function () {
  homeBot.message.add({
    delay: 1000,
    content: "Are you planning to buy or sell?"
  }).then(function () {
    return homeBot.action.button({
      delay: 1000,
      action: [{
        text: 'Buy',
        value: 'buy'
      }, {
        text: 'Sell',
        value: 'sell'
      }, {
        text: 'I am poor',
        value: 'nothing'
      }]
    });
  }).then(function () {
    return homeBot.message.add({
      delay: 1500,
      content: 'Where is your plot?'
    });
  }).then(function () {
    return homeBot.action.text({
      delay: 800,
      action: {
        value: 'BTM Layout',
        placeholder: 'Your name'
      }
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 500,
      content: res.value + '. Aha, you are a rich fellow. Now please wait while I am pulling satellite images for analysis'
    });
  }).then(function (res) {
    return homeBot.message.add({
      delay: 1200,
      type: 'embed',
      content: 'https://giphy.com/embed/HzMfJIkTZgx8s'
    
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 4000,
      content: 'Almost there.'
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 4000,
      content: 'Here you go!'
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 4000,
      content: 'There are 5000 new homes built in past 2 years around your plot with in the Radius of 2 Kilometers.'
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 2500,
      content: 'The area is densely populated and expected to grow. Further, huge night light intensity detected, seems like people here are nocturnal.'
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 1000,
      content: 'Spread the word. Its coming soon.'
    });
  }).then(end);
};

var end = function () {
  ga_record('message', 'end');
  homeBot.message.add({
    delay: 1000,
    content: 'I dont care. I am awesome and you need to see it.'
  });
  tutorial();
};

var ga_record = function(type, action) {
  if(ga) {
    ga('send', {
      hitType: 'event',
      eventCategory: type,
      eventAction: action
    });
  }
}
