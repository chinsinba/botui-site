
var homeBot = BotUI('home-demo');

homeBot.message.add({
  content: 'Welcome to PLOTANA. I can analyse the plot you looking to buy/sell.'
}).then(function () {
  return homeBot.message.add({
    delay: 4000,
    loading: true,
    content: 'Wanna see a demo of what I can do?'
  });
}).then(function () {
  return homeBot.action.button({
    delay: 1000,
    action: [{
      text: 'Yes',
      value: 'sure'
    }, {
      text: 'No, I dont believe you.',
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
    loading: true,
    content: "Alright, are you looking to buy or sell?"
  }).then(function () {
    return homeBot.action.button({
      delay: 200,
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
  }).then(function (res) {
    if(res.value == 'nothing') {
      return homeBot.message.add({
        delay: 1500,
        loading: true,
        content: 'You are not poor, you are lazy. Now tell me which location you would buy? '
      });
    }
    return homeBot.message.add({
      delay: 1000,
      loading: true,
      content: 'Where is your plot?'
    });

  }).then(function () {
    return homeBot.action.text({
      delay: 1000,
      action: {
        value: 'BTM Layout',
        placeholder: 'location'
      }
    });
  }).then(function (res) {
    if(res.value == 'BTM Layout') {
    return homeBot.message.bot({
      delay: 1500,
      loading: true,
      content: res.value + '. Aha, you are a rich fellow. Now please wait while I am pulling satellite images for analysis'
    });
  }
  return homeBot.message.bot({
    delay: 1500,
    loading: true,
    content: 'Smart Ass!! you changed the location huh!. You will only get analysis of BTM Layout for free!!. I am analysing BTM Layout'
  });
  }).then(function (res) {
    return homeBot.message.add({
      delay: 4000,
      type: 'embed',
      content: 'https://giphy.com/embed/HzMfJIkTZgx8s'
    
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 4000,
      loading: true,
      content: 'Almost there.'
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 4000,
      loading: true,
      content: 'Here you go!'
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 500,
      loading: true,
      content: 'There are 500 new homes built in past 2 years within 2 KM radius around your plot.'
    });
  }).then(function () {
    return homeBot.action.button({
      delay: 1000, 
      action: [{
        text: 'Tell me more!',
        value: 'more'
      }]
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 5000,
      loading: true,
      content: 'The area is densely populated and expected to grow. Further, huge night light intensity detected, seems like people are nocturnal here.'
    });
  }).then(function () {
    return homeBot.action.button({
      delay: 1000,
      action: [{
        text: 'Some more',
        value: 'smore'
      }]
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 1000,
      content: 'Thats it for now. I am working on comparative analytics, Slope and Flood analysis and much more. Bookmark me sweetheart!.'
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 1000,
      content: 'Bye! 😒'
    });
  })
};

var end = function () {
  ga_record('message', 'end');
  homeBot.message.add({
    delay: 1000,
    loading: true,
    content: 'Dumbass, I dont care. I am awesome and you need to see it.'
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
