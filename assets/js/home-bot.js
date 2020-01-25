
var homeBot = BotUI('home-demo');

homeBot.message.add({
  content: 'Hi, I am Plotana 👩🏻‍🎤. I analyze plots and help you invest your hard-earned money at a good location.'
}).then(function () {
  return homeBot.message.add({
    delay: 1000,
    loading: true,
    content: 'Do you want to see what I can do?'
  });
}).then(function () {
  return homeBot.action.button({
    delay: 1000,
    action: [{
      text: 'Yes, Show me the money',
      value: 'sure'
    }, {
      text: 'No, I only believe myself',
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
    delay: 2000,
    loading: true,
    content: "Alright, are you looking to buy or sell?"
  }).then(function () {
    return homeBot.action.button({
      delay: 200,
      action: [{
        text: 'Buy, I have money',
        value: 'buy'
      }, {
        text: 'Sell, I want money',
        value: 'sell'
      }, {
        text: 'I am poor',
        value: 'nothing'
      }]
    });
  }).then(function (res) {
    if(res.value == 'nothing') {
      return homeBot.message.add({
        delay: 500,
        loading: true,
        content: 'You are not poor, you are lazy. Now tell me which location you would buy? '
      });
    }
    return homeBot.message.add({
      delay: 500,
      loading: true,
      content: 'Where is the plot?'
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
      content: res.value + '. Aha, you are a rich fellow. Now please wait while I am pulling satellite images for analysis.'
    });
  }
  return homeBot.message.bot({
    delay: 1500,
    loading: true,
    content: 'Smart!! you changed the location huh!. For now, you will only get analysis of BTM Layout. Now please wait while I am pulling satellite images for analysis'
  });
  }).then(function (res) {
    return homeBot.message.add({
      delay: 1000,
      loading: true,
      type: 'embed',
      content: 'https://giphy.com/embed/HzMfJIkTZgx8s'
    
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 2000,
      loading: true,
      content: 'Almost there.'
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 2000,
      loading: true,
      content: 'Here you go!'
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 500,
      loading: true,
      content: 'I can see in past 2 years (from 2018 to 2019) 500 new homes have been constructed within 2 KM radius of your plot.'
    });
  }).then(function () {
    return homeBot.action.button({
      delay: 200, 
      action: [{
        text: 'Tell me more!',
        value: 'tmore'
      }]
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 2000,
      loading: true,
      content: 'The population within 2 kms has gone up from 3900 persons/sqKm in 2015 to 4381 persons/sqKm in 2019. This place is over crowded, whats the matter?'
    });
  }).then(function () {
    return homeBot.action.button({
      delay: 1000,
      action: [{
        text: 'more',
        value: 'more'
      }]
    });
  }).then(function () {
    return homeBot.message.bot({
      delay: 2000,
      loading: true,
      content: 'The night lights intensity in last 2 years is growing fast. This means there is high economic activity happening in the location. People are becoming noctornal here.'
    });
  }).then(function () {
    return homeBot.action.button({
      delay: 1000,
      action: [{
        text: 'Some more',
        value: 'smore'
      }]
    });
  }).then(function () {
    return homeBot.message.bot({
      delay: 2000,
      loading: true,
      content: 'I can show other comparable locations for you to invest. But for that I have to know your budget? 💵'
    });
  }).then(function () {
    return homeBot.action.button({
      delay: 200,
      action: [{
        text: '5-10 lakh',
        value: '10l'
      },
      {text: '10-20 lakh',
      value: '1020'
    },{
      text: '20-50 lakh',
      value: '2050'
    },{
      text: 'I am very rich',
      value: 'rich'
    }]
    });
  }).then(function (res) {

   if (res.value=== 'rich')
    {
    return homeBot.message.bot({
      delay: 1000,
      content: 'That was a trick to know how rich you are 🤪. I am still in early Beta stage. My creator is working on this feature to make you further rich. I can notify you when its made available to me'
    });
   }
   return homeBot.message.bot({
    delay: 1000,
    content: 'I am still in early Beta stage. My creator is working on this feature.  I can notify you when its made available to me. Do not worry I wont share it with anyone.'
  });
   }).then(function () {
    return homeBot.action.text({
      delay: 1000,
      action: {
        value: 'Your Email',
        placeholder: 'email'
      }
    });
  }).then(function (res) {
    ga_record('email', res.value);
    return homeBot.message.bot({
      delay: 1000,
      content: 'Thanks, I hope you did not give me wrong mail id. Meanwhile, you can help me spread the word by introducing me to your family and friedns.'
    });
  }).then(function () {
    ga_record('message', 'share');
    return homeBot.message.bot({
      delay: 1000,
      type:'html',
      content:'Touch me! <a href="whatsapp://send?text=Hi, I am Plotana, I analyze plots. I am available at http://plotana.com " data-action="share/whatsapp/share"><img src="https://img.icons8.com/color/48/000000/whatsapp.png"></img></a>'
    });
  })
};

var end = function () {
  ga_record('message', 'end');
  homeBot.message.add({
    delay: 1000,
    loading: true,
    content: 'OK smarty pants.But I am awesome and you need to see it.'
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
