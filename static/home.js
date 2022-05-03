$(document).ready(function () {
  $('#cat').maphilight();

  // hover effect
  $('.mapping').mouseover(function() {
    var part = $(this).attr('class').split(" ")[0];
    $('#user_part').text(part);
    if(learning_stage[part]["start"][1]==null || learning_stage[part]["finish"][1]==null) {
      var data = $('.'+part).data('maphilight');
      data.fillColor="A9A9A9";
      data.fillOpacity=0.6;
      $('.'+part).data('maphilight', data).trigger('alwaysOn.maphilight');
    } else {
      $('#query').html("You have known my <span id='user_part'>"+part+"</span>. Good work!");
    }
  }).mouseout(function(){
    var part = $(this).attr('class').split(" ")[0];
    $('#query').html("Do you want to know more about my <span id='user_part'>_____</span> ?");
    if(learning_stage[part]["start"][1]==null || learning_stage[part]["finish"][1]==null) {
      var data = $('.'+part).data('maphilight');
      data.fillColor="b6948d";
      data.fillOpacity=0.65;
      $('.'+part).data('maphilight', data).trigger('alwaysOn.maphilight');
    }
  });

  // change shade to green after user finishing learning the corresponding section
  for (var part in learning_stage) {
    if(learning_stage[part]["start"][1]!=null &&learning_stage[part]["finish"][1]!=null){
      console.log("finish learning part "+part);
      var data = $('.'+part).data('maphilight') || {"alwaysOn":true, "fillColor":"A9A9A9","fillOpacity": 0.3,"strokeColor": "DCDCDC","strokeWidth": 6,"strokeOpacity": 0.7};
      data.fillColor="A9A9A9";
      data.fillOpacity=0.6;
      // data.strokeColor="78919c";
      // data.strokeOpacity=0.6;
      $('.'+part).data('maphilight', data).trigger('alwaysOn.maphilight');
    }
  }
});