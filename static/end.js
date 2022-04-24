function displayEnd(question, img){
    let question_div = $("<div id='end_body'>" + question + "</div>")
    $("#end_container").append(question_div)
    let new_img= $("<img class='end_img' src='" + img[0] + "'>")
    $("#end_container").append(new_img)
}

$(document).ready(function(){
    displayEnd(data['question'], data['images'])
})