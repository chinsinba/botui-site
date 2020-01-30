
var homeBot = BotUI('home-demo');

var geocoder = new google.maps.Geocoder();
 
var my_loc;
var my_decision;
 


homeBot.message.add({
  content: 'Hi, I am Plotana. I analyze property and help you invest your hard-earned money at a good location.'
}).then(function () {
  return homeBot.message.add({
    delay: 1000,
    loading: true,
    content: 'Do you want to see what I can do?'
  });
}).then(function () {
  ga_record('message', "welcome");
  return homeBot.action.button({
    delay: 1000,
    action: [{
      text: 'Yes',
      value: 'sure'
    }, {
      text: 'No',
      value: 'skip'
    }]
  });
}).then(function (res) {
  my_decision = res.value
  if (navigator.geolocation) {
   var pos = navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
  console.log( "Geolocation is not supported by this browser.")
  }
  if(my_decision== 'sure') {
  return homeBot.message.add({
    delay: 500,
    loading: true,
    content: 'Please provide me access to Location.'
  });
}
}).then(function () {
  ga_record('btn_click', my_decision);
  if(my_decision== 'sure') {
    tutorial();
  }
  if(my_decision== 'skip') {
    end();
  }
});

var tutorial = function () {
  homeBot.message.add({
    delay: 4000,
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
    ga_record('btn_click', res.value);
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

  }).then(function (res) {
    ga_record('location', my_loc);
    console.log(my_loc)

      if (my_loc){
        return homeBot.message.add({
          delay: 500,
          loading: true,
          type:'html',
          content: '<img src="assets/images/marker.png"><br> <h3>'+ my_loc +'</h3>'
        });
      }
      return homeBot.message.bot({
        delay: 500,
        loading: true,
        type: 'html',
        content: "You did not provided acess to your location. Do you want to see for a sample location?"
      });
      
  }).then(function () {
    return homeBot.action.button({
      delay: 200,
      action: [{
        text: 'Yes',
        value: 'yesSampleLocation'
      }]
    });
  }).then(function (res) {
    my_loc =res.value
    return homeBot.message.bot({
      delay: 1500,
      loading: true,
      content: ' Please wait while I am pulling satellite images for analysis'
    });
  }).then(function (res) {
    return homeBot.message.add({
      delay: 1500,
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
      type: 'html',
      content: '<h3><img src="assets/images/home-page.png"> <br>I can see in the past 2 years (from 2018 to 2019) 500 new homes have been constructed within 2 KM radius of your plot.</h3>'
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
      delay: 500,
      loading: true,
      type: 'html',
      content: '<h3><img src="assets/images/deciduous-tree.png"><br> There are approximately 500 trees within 2 KM radius of your plot.</h3>'
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
    ga_record('btn_click', res.value);
    return homeBot.message.bot({
      delay: 2000,
      loading: true,
      type: 'html',
      content: "<h3> <img src='assets/images/people.png'> <br>The population within 2 KM has gone up from 3900 persons/sqKm in 2015 to 4381 persons/sqKm in 2019. This place is overcrowded.</h3>"
    });
  }).then(function () {
    return homeBot.action.button({
      delay: 1000,
      action: [{
        text: 'more',
        value: 'more'
      }]
    });
  }).then(function (res) {
    ga_record('btn_click', res.value);
    return homeBot.message.bot({
      delay: 2000,
      loading: true,
      type: 'html',
      content: '<h3><img src="assets/images/light-on.png"> <br>The night lights intensity in the last 2 years is growing fast.</h3>'
    });
  }).then(function (res) {
    ga_record('btn_click', res.value);
    return homeBot.message.bot({
      delay: 2000,
      loading: true,
      type: 'html',
      content: '<h3>This means there is high economic activity happening in the location. People are becoming nocturnal here.</h3>'
    });
  }).then(function () {
    return homeBot.action.button({
      delay: 200,
      action: [{
        text: 'Some more',
        value: 'somemore'
      }]
    });
  }).then(function (res) {
    ga_record('btn_click', res.value);
    return homeBot.message.bot({
      delay: 1000,
      loading: true,
      content: 'My creator is working on identifying better locations for you to invest in.'
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 1000,
      loading: true,
      content: " Would you like to be notified?"
    });
  }).then(function () {
    return homeBot.action.button({
      delay: 1000,
      action: [{
        text: 'Yes',
        value: 'sure'
      }, {
        text: 'No',
        value: 'skip'
      }]
    });
  }).then(function (res) {
    ga_record('Notify', res.value);

    if (res.value=== 'sure'){
    return homeBot.action.text({
      delay: 1000,
      action: {
        // sub_type: 'email',
        placeholder: 'Enter your mail id'
      }
    });
  }
  }).then(function () {
   
    return homeBot.message.bot({
      delay: 1000,
      content: 'Thanks. Meanwhile, follow and introduce me to your family and friends.'
    });
  }).then(function () {
    ga_record('message', 'share');
    return homeBot.message.bot({
      delay: 1000,
      type:'html',
      content:'<b>Touch Me!</b> <a href="whatsapp://send?text=Hi, I am Plotana, virtual property advisor. Available at your service on http://plotana.com " data-action="share/whatsapp/share"><img src="https://img.icons8.com/color/48/000000/whatsapp.png"></img></a> <a href="https://twitter.com/plotana_lab?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false"><img src="https://img.icons8.com/color/48/000000/twitter.png"></a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'
    });
  })
};

var end = function () {

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

var fetch_location = function(){ 
  
  
}

function showPosition(position){
   codeLatLng(position.coords.latitude,position.coords.longitude)
}


function codeLatLng(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if(status == google.maps.GeocoderStatus.OK) {
          console.log(results)
          if(results[1]) {
              //formatted address
              var address = results[0].formatted_address;
              my_loc=  address
          } else {
              alert("No results found");
          }
      } else {
          alert("Geocoder failed due to: " + status);
      }
    });
}