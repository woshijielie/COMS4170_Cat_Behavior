function addButton(id){
    let but_div = $("<div class='button_container'></div>")
    let back_button = $("<button type='button' class='btn btn-custom btn-lg next_button' " +
        "onclick=\"location.href='/quiz/score';\">Back</button>")
    $(but_div).append(back_button)
    $("#solution_container").append(but_div)
}


function addQuestion(data, id){
    if (id == 6) {
        console.log(data)
        let question_title = data.substr(0, 8)
        let question_body = data.substr(8)
        let question_div = $("<div class='question_body'><span class='question_title'>" +
            question_title + "</span>" + question_body + "</div>")
        $("#solution_container").append(question_div)
    }
    else{
        console.log(data)
        let question_title = data.substr(0, 4)
        let question_body = data.substr(4)
        let question_div = $("<div class='question_body'><span class='question_title'>" +
            question_title + "</span>" + question_body + "</div>")
        $("#solution_container").append(question_div)
    }
}


function display123(data, id, answer, solution) {
    console.log(answer)
    $.each(data, function(index, value){
        let new_img= $("<img src='" + value + "' class='solution" + id +"'>")
        // check selections user has made
        if(answer.includes(index.toString())){
            $(new_img).css('border', 'border: 7px solid cornflowerblue')
        }
        $("#solution_container").append(new_img)
    })
}

function display4(img, choices, answer, solution){
    let body_div = $("<div id='solution_4_container'></div>")
    let img_div = $("<div id='solution_4_img_container'></div>")
    let choice_div = $("<div id='solution_4_choices_container'></div>")
    let form_div = $("<form></form>")
    let new_img= $("<img class='quiz4_img' src='" + img[0] + "'>")
    $(img_div).append(new_img)
    $.each(choices, function(index, value){
        let name = "S4" + index
        let new_choice= $("<input type='radio' name='Q4' class='quiz4_choice'" +
            "id='" + name + "' style='margin-right: 30px'/><label for='" + name + "'>" + value + "</label><br>")
        // check selections user has made
        if(answer.includes(index.toString())){
            new_choice.prop('checked', true)
            console.log('Selected:'+index.toString())
        }
        new_choice.prop('disabled', true)
        $(form_div).append(new_choice)
    })
    $(choice_div).append(form_div)
    $(body_div).append(img_div)
    $(body_div).append(choice_div)
    $("#solution_container").append(body_div)
}

function display5(color, img, choices, audios, sleep_list, solution){
    let body_div = $("<div id='solution_5_container'></div>")
    let player_div = $("<div id='solution_5_player_container'></div>")
    // div for draggable
    let left_div = $("<div id='solution_5_left_container'></div>")
    // div for droppable
    let right_div = $("<div id='solution_5_right_container'></div>")
    let choice_div = $("<div id='solution_5_choices_container'></div>")
    let audio_div = $("<div id='solution_5_audio_container'></div>")
    let i = 0
    $.each(audios, function(key, value){
        let player_name = "S5P" + i
        let audio_name = "S5A" + i
        let type = "audio/" + value.substr(value.length - 3)
        if(type == "audio/mp3"){
            type = "audio/mpeg"
        }
        let new_player= $("<div class='quiz5_player_text'><span class='" + player_name + "'>" + key + "</span>" +
            "<img src='" + img[0] + "' class='quiz5_img' id='solution5_img" + i + "'><br></div>")
        $(new_player).css('color', color[i])
        $(player_div).append(new_player)

        let new_audio = $("<audio id='" + audio_name + "'><source src='" + value +
            "' type='" + type + "'></audio>")
        $(audio_div).append(new_audio)

        let new_draggable = $("<div class='quiz5_move'>" +
            "<img src='" + img[1] + "' class='quiz5_drag' id='solution5_drag" + i + "'><br></div>")
        $(left_div).append(new_draggable)

        let new_droppable = $("<div class='quiz5_drop' id='solution5_drop" + i + "'></div>")
        $(new_droppable).css("background-image", "url('" + img[2] + "')")
        $(right_div).append(new_droppable)

        i += 1
    })
    $.each(choices, function(index, value){
        let name = "S5C" + index
        let new_choice= $("<div class='quiz5_choice'" + "id='" + name + "'>" + value +"</div><br>")
        $(choice_div).append(new_choice)
    })

    $(body_div).append(player_div)
    $(body_div).append(left_div)
    $(body_div).append(right_div)
    $(body_div).append(choice_div)
    $(body_div).append(audio_div)
    $("#solution_container").append(body_div)

    // show user answers stored
    if (sleep_list) {
        addColor(sleep_list, color, img)
    }

}

function addColor(sleep_list, color, img){
    $.each(sleep_list, function (key, value) {
        if (value != " ") {
            $("#solution5_drag" + key).hide()
            $("#solution5_drop" + value).css("background-image", "url('" + img[3] + "')")
            $("#S5C" + value).css('color', color[key])
        }
    })
}

function display6(choices, answer, solution){
    let body_div = $("<div id='quiz_6_choices_container'></div>")
    $.each(choices, function(index, value){
        let name = "S6" + index
        let new_choice= $("<input type='checkbox' name='" + name + "' class='quiz6_choice'" +
            "id='" + name + "'/><label for='" + name + "'>" + value + "</label><br>")
        // check selections user has made
        if(answer.includes(index.toString())){
            new_choice.prop('checked', true)
            console.log('Selected:'+index.toString())
        }
        new_choice.prop('disabled', true)
        $(body_div).append(new_choice)
    })
    $("#solution_container").append(body_div)
    $("input[type='checkbox']").css("vertical-align", "middle")
}


$(document).ready(function(){
    addButton(id)
    addQuestion(data['question'], id)
    if (id == 1 || id == 2 || id == 3) {
        display123(data['images'], id, user_answers[id-1], solutions[id-1][0])
    } else if (id == 4) {
        display4(data['images'], data['choices'], user_answers[id-1], solutions[id-1][0])
    } else if (id == 5) {
        let sleep_list = {}
        if(user_answers[id-1]){
            for (var i = 0; i < user_answers[id-1].length; i++) {
                sleep_list[i] = user_answers[id-1][i]
            }
        }
        display5(data['colors'], data['images'], data['choices'], data['audios'], sleep_list, solutions[id-1][0])
        //play audio
        $(document).on('click', '.quiz5_img', function (event) {
            let id = $(this).attr("id").substr($(this).attr("id").length - 1)
            $("#S5A" + id)[0].play()
        })
    } else if (id == 6) {
            display6(data['choices'], user_answers[id-1], solutions[id-1][0])
    }
})