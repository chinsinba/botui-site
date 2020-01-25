
var homeBot = BotUI('home-demo');

homeBot.message.add({
  content: 'Hi, I am Plotana.\n I analyze plots and help you invest your hard-earned money at a good location.'
}).then(function () {
  return homeBot.message.add({
    delay: 2000,
    loading: true,
    content: 'Do you want to see what I can do?'
  });
}).then(function () {
  return homeBot.action.button({
    delay: 1000,
    action: [{
      text: 'Yes',
      value: 'sure'
    }, {
      text: 'No, I only believe myself.',
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
      delay: 2000,
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
      delay: 1000, 
      action: [{
        text: 'Tell me more!',
        value: 'tmore'
      }]
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 2000,
      loading: true,
      content: 'The population within 2 kms has gone up from 120 people/sqKm in 2015 to 180people/sqKm. The location is growing very fast'
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
      content: 'The night lights intensity in last 2 years is growing fast. This means there is high economic activity happening in the location.'
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
      content: 'I can show other comparable locations for you to invest. But for that I want to know your budget?'
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

   if (res.value=== '10l')
    {
    return homeBot.message.bot({
      delay: 1000,
      content: 'Your budget is too low for any good plot in Bangalore. You need to go and look for in the suburbs.'
    });
    }
   if (res.value=== '1020')
   {
    return homeBot.message.bot({
    delay: 1000,
    content: 'coming soon!'
   });
   }
   if (res.value=== '2050')
   {
    return homeBot.message.bot({
    delay: 1000,
    content: 'coming soon!'
   });
   }
   if (res.value=== 'rich')
   {
    return homeBot.message.bot({
    delay: 1000,
    content: 'coming soon!'
   });
   }
   }).then(function (res) {
    return homeBot.message.bot({
      delay: 1000,
      content: 'Meanwhile, you can help me spread the word by introducing me to your family and friedns.'
    });
  }).then(function () {
    ga_record('message', 'share');
    return homeBot.message.bot({
      delay: 1000,
      type:'html',
      content:'<a href="whatsapp://send?text=Hi, I am Plotana, I analyze plots. I am available at http://plotana.com " data-action="share/whatsapp/share"><img src="https://img.icons8.com/color/48/000000/whatsapp.png"></img></a>'
    });
  })
};

var end = function () {
  ga_record('message', 'end');
  homeBot.message.add({
    delay: 1000,
    loading: true,
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
