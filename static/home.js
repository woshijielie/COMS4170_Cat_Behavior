function clickQuiz() {
  let con = confirm("Take a quiz?");
  if (con == true) {
    window.location.href = "/quiz/1";
  }
}

$(document).ready(function () {
  $('#cat').maphilight();

  // change shade to green after user finishing learning the corresponding section
  for (var part in learning_stage) {
    if(learning_stage[part]["start"][1]!=null &&learning_stage[part]["finish"][1]!=null){
      console.log("finish learning part "+part);
      $('.'+part).attr('data-maphilight', '{"fillColor":"63e663","alwaysOn":true,"stroke":false}');
    }
  }
});