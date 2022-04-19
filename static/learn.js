function addButton(id) {
  let next_id = id + 1;
  let prev_id = id - 1;
  let but_div = $("<div class='button_container'></div>");
  let next_button = $(
    "<button type='button' class='btn btn-primary btn-lg next_button' " +
      "onclick=\"location.href='" +
      next_id +
      "';\">Next ></button>"
  );
  let prev_button = $(
    "<button type='button' class='btn btn-primary btn-lg prev_button' " +
      "onclick=\"location.href='" +
      prev_id +
      "';\">< Previous</button>"
  );
  let quiz_button = $(
    "<button type='button' class='btn btn-primary btn-lg next_button' onclick='clickQuiz()'>Quiz ></button>"
  );
  if (prev_id != 0 && prev_id != 13) {
    $(but_div).append(prev_button);
  }
  if (next_id != 14) {
    $(but_div).append(next_button);
  }
  if (next_id == 14) {
    $(but_div).append(quiz_button);
  }
  $("#learn_container").append(but_div);
}

function clickQuiz() {
  let con = confirm("Take a quiz?");
  if (con == true) {
    window.location.href = "/quiz/1";
  }
}

function navTitle(type) {
  //   let part = $("<div class='nav-section'>" + type + "</div>");
  $("#part").append(type);
}

function display(data) {
  let body_div = $("<div id='quiz_4_container'></div>");
  let img_div = $("<div id='col-md-6'></div>");
  let text_div = $("<div id='col-sm-6 text_block'></div>");
  let img = $("<img class='quiz4_img' src='" + data["img"] + "'>");
  let gif = $("<img class='quiz4_img' src='" + data["gif"] + "'>");
  $(img_div).append(img);
  $(img_div).append(gif);
  let title = $("<div class='title big'>" + data["behavior"] + "</div>");
  let explain = $("<div class='learn_text'>" + data["explanation"] + "</div>");
  let example = $(
    "<div class='learn_text'><span class='big'>Example:</span><span>" +
      data["example"] +
      "</div>"
  );
  $(text_div).append(title);
  $(text_div).append(explain);
  $(text_div).append(example);

  $(body_div).append(img_div);
  $(body_div).append(text_div);
  $("#learn_container").append(body_div);
}

function display12(data) {
  let video_div = $(
    "<div class='center '><embed src='" +
      data +
      "' allowfullscreen='true' width='525' height='404'>"
  );

  $("#learn_container").append(video_div);
}

function display13(data) {
  let title = $("<div class='title big'>If you want to know more...</div>");
  let button_div = $("<div class='button_container center'></div>");

  let ear_but = $(
    "<button type='button' class='btn btn-primary btn-lg home_button' onclick='window.open(\"" +
      data[0] +
      "\")'>Ear</button>"
  );
  let eye_but = $(
    "<button type='button' class='btn btn-primary btn-lg home_button' onclick='window.open(\"" +
      data[1] +
      "\")'>Eye</button>"
  );
  let tail_but = $(
    "<button type='button' class='btn btn-primary btn-lg home_button' onclick='window.open(\"" +
      data[2] +
      "\")'>Tail</button>"
  );

  $(button_div).append(ear_but);
  $(button_div).append(eye_but);
  $(button_div).append(tail_but);

  $("#learn_container").append(title);
  $("#learn_container").append(button_div);
}

$(document).ready(function () {
  console.log(typeof id);
  addButton(id);
  navTitle(data["part"]);
  if (id == 12) {
    display12(data["video"]);
  } else if (id == 13) {
    display13(data["videos"]);
  } else {
    display(data);
  }
});