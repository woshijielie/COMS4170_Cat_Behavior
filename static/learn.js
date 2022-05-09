function addButton(id) {
  let next_id = id + 1;
  let prev_id = id - 1;
  let but_div = $("<div class='button_container'></div>");
  let next_button = $(
    "<button type='button' class='btn btn-custom btn-lg next_button' " +
      "onclick=\"location.href='" +
      next_id +
      "';\">Next ></button>"
  );
  let prev_button = $(
    "<button type='button' class='btn btn-custom btn-lg prev_button' " +
      "onclick=\"location.href='" +
      prev_id +
      "';\">< Previous</button>"
  );

  if (prev_id != 0 && prev_id != 3 && prev_id != 6 && prev_id != 11 && prev_id != 12 && prev_id != 13) {
    $(but_div).append(prev_button);
  }
  if (next_id != 4 && next_id != 7 && next_id != 12 && next_id != 13 && next_id != 14 && next_id != 15) {
    $(but_div).append(next_button);
  }
  $("#learn_container").append(but_div);
}

function nextPage() {
  var next_id = id + 1;
  window.location.href = '/learn/' + next_id;
}

function navTitle(type) {
  //   let part = $("<div class='nav-section'>" + type + "</div>");
  $("#part").append(type);
}

function display(data, id) {
  let top = $("<div class='top-div'><div>");
  let btm = $("<div class='btm-div'><div>");

  let body_div = $("<div id='quiz_4_container'></div>");
  let img_div = $("<div class='left-div'></div>");
  let text_div = $("<div class='right-div'></div>");
  let img = $("<img class='learn_img' src='" + data["img"] + "'>");
  let gif = $("<img class='learn_gif' src='" + data["gif"] + "'>");

  $(top).append(img);
  $(btm).append(gif);

  if (id == 2) {
    for (var i=0;i<2;i++) {
      $(btm).append(gif);
    }
  }

  $(img_div).append(top);
  $(img_div).append(btm);
  let title = $("<div class='title big'>" + data["behavior"] + "</div>");
  let explain = $("<div class='learn_text'>" + data["explanation"] + "</div>");
  let example = $(
    "<div class='learn_text'><span class='big'>Example: </span><span>" +
      data["example"] +
      "</div>"
  );
  $(text_div).append(title);
  $(text_div).append(explain);
  $(text_div).append(example);

  if (id == 3 || id == 6 || id == 11) {
    next_id = id + 1;
    let fin_buttton = $(
      "<button type='button' class='btn btn-custom btn-lg next_button' data-toggle='modal' data-target='#exampleModal'>Session Finish</button>"
    );
    $(text_div).append(fin_buttton);
  }

  $(body_div).append(img_div);
  $(body_div).append(text_div);
  $("#learn_container").append(body_div);
}

function display12(data) {
  let video_div = $(
    "<div class='center'><iframe src='" +
      data +
      "' allowfullscreen='true' width='735' height='560'></iframe></div>"
  );

  let fin_buttton = $(
    "<button type='button' class='btn btn-custom btn-lg next_button' data-toggle='modal' data-target='#exampleModal'>Session Finish</button>"
  );

  $("#learn_container").append(video_div);
  $("#learn_container").append(fin_buttton);
}

function display14(data) {
  let title = $("<div class='title big'>If you want to know more...</div>");
  let img_div = $("<div class='center'></div>")
  let button_div = $("<div class='button_container center'></div>");

  let img = $("<img src='" + data["img"] + "' width='525' height='404'>");
  img_div.append(img);

  // let ear_but = $(
  //   "<button type='button' class='btn btn-custom btn-lg more_button' onclick='window.open(\"" +
  //     data["videos"][0] +
  //     "\")'>Eye</button>"
  // );

  let ear_but = $(
    "<button type='button' class='btn btn-custom btn-lg more_button' data-toggle='modal' data-target='#earModal'>ear</button>"
    );

  let eye_but = $(
    "<button type='button' class='btn btn-custom btn-lg more_button' data-toggle='modal' data-target='#eyeModal'>eye</button>"
  );
  let tail_but = $(
    "<button type='button' class='btn btn-custom btn-lg more_button' data-toggle='modal' data-target='#tailModal'>tail</button>"
  );

  let quiz_button = $(
    "<button type='button' class='btn btn-custom btn-lg next_button' data-toggle='modal' data-target='#quizModal'>Quiz ></button>"
  );

  $(button_div).append(ear_but);
  $(button_div).append(eye_but);
  $(button_div).append(tail_but);

  $("#learn_container").append(title);
  $("#learn_container").append(img_div);
  $("#learn_container").append(button_div);
  $("#learn_container").append(quiz_button);
}

function update_learning_stage_to_server(learning_stage) {
  $.ajax({
      type: "POST",
      url: "/update_learning_stage",
      dataType : "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(learning_stage),
      success: function (response) {
          console.log("success");
          console.log(response);
      },
      error: function(request, status, error){
          console.log("Error");
          console.log(request)
          console.log(status)
          console.log(error)
      }
  });
}

$(document).ready(function () {
  console.log(typeof id);
  addButton(id);
  navTitle(data["part"].toUpperCase());

  if (id!=14) {
    // record timestamp if it's start/end page for each section (ear, eye, tail)
    let visit_time = Math.floor(Date.now() / 1000);//ts in second
    let part = data["part"].toLowerCase()
    if (id==learning_stage[part]["start"][0]) {
      console.log(part+" start page: "+id);
      // keep the earliest timestamp so avoid overwriting
      if (learning_stage[part.toLowerCase()]["start"][1] == null) {
        learning_stage[part]["start"][1]=visit_time;
      }
    }
    if (id==learning_stage[part]["finish"][0]) {
      console.log(part+" last page: "+id);
      // always overwrite to keep the most recent finish ts
      learning_stage[part]["finish"][1]=visit_time;
    }
    update_learning_stage_to_server(learning_stage);
  }

  if (id == 12 || id == 13) {
    display12(data["video"]);
  } else if (id == 14) {
    display14(data);
  } else {
    display(data, id);
  }
});
