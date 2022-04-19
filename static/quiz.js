function addButton(id){
    let next_id = id + 1
    let prev_id = id - 1
    let but_div = $("<div class='button_container'></div>")
    let submit_button = $("<button type='button' class='btn btn-primary btn-lg next_button' " +
        "onclick=\"location.href='" + next_id + "';\">Submit</button>")
    let next_button = $("<button type='button' class='btn btn-primary btn-lg next_button' " +
        "onclick=\"location.href='" + next_id + "';\">Next ></button>")
    let prev_button = $("<button type='button' class='btn btn-primary btn-lg prev_button' " +
        "onclick=\"location.href='" + prev_id + "';\">< Previous</button>")
    if(prev_id != 0 && prev_id != 6){
        $(but_div).append(prev_button)
    }
    if(next_id != 7 && next_id != 8){
        $(but_div).append(next_button)
    }
    if(next_id == 7){
        $(but_div).append(submit_button)
    }
    $("#quiz_container").append(but_div)
}

function addQuestion(data, id){
    if(id == 7){
        let question_div = $("<div id='quiz_7_body'>" + data + "</div>")
        $("#quiz_container").append(question_div)
    }
    else{
        console.log(data)
        let question_title = data.substr(0,4)
        let question_body = data.substr(4)
        let question_div = $("<div class='question_body'><span class='question_title'>" +
            question_title + "</span>" + question_body + "</div>")
        $("#quiz_container").append(question_div)
    }
}

function display123(data, id, answer) {
    let body_div = $("<div id='quiz_" + id + "_container'></div>")
    
    $.each(data, function(index, value){
        let name = "Q" + id + index
        let new_img= $("<input type='checkbox' name='" + name + "' class='quiz" + id +"_img'" +
                "id='" + name + "'/><label for='" + name + "'></label>")
        // check selections user has made
        if(answer.includes(index.toString())){
            new_img.prop('checked', true)
            console.log('Selected:'+index.toString())
        }
        $(new_img).css("background-image", "url('" + value + "')")
        $(body_div).append(new_img)
        $("#quiz_container").append(body_div)
    })
}

function display4(img, choices, answer){
    let body_div = $("<div id='quiz_4_container'></div>")
    let img_div = $("<div id='quiz_4_img_container'></div>")
    let choice_div = $("<div id='quiz_4_choices_container'></div>")
    let new_img= $("<img class='quiz4_img' src='" + img[0] + "'>")
    $(img_div).append(new_img)
    $.each(choices, function(index, value){
        let name = "Q4" + index
        let new_choice= $("<input type='checkbox' name='" + name + "' class='quiz4_choice'" +
            "id='" + name + "'/><label for='" + name + "'>" + value + "</label><br>")
        // check selections user has made
        if(answer.includes(index.toString())){
            new_choice.prop('checked', true)
            console.log('Selected:'+index.toString())
        }
        $(choice_div).append(new_choice)
    })
    $(body_div).append(img_div)
    $(body_div).append(choice_div)
    $("#quiz_container").append(body_div)
}

function display5(img, choices, audios, answer){
    let body_div = $("<div id='quiz_5_container'></div>")
    let player_div = $("<div id='quiz_5_player_container'></div>")
    let choice_div = $("<div id='quiz_5_choices_container'></div>")
    let audio_div = $("<div id='quiz_5_audio_container'></div>")
    let i = 0
    $.each(audios, function(key, value){
        let player_name = "Q5P" + i
        let audio_name = "Q5A" + i
        let type = "audio/" + value.substr(value.length - 3)
        if(type == "audio/mp3"){
            type = "audio/mpeg"
        }
        
        let new_player= $("<input type='text' name='" + player_name + "' class='quiz5_input'" +
            "id='" + player_name + "' maxlength='1' size='2'/><label for='" + player_name + "'>" + key + "</label>" +
            "<img src='" + img + "' class='quiz5_img' id='quiz5_img" + i + "'><br>")
        // show user ansers have made to server
        if(answer[i]!=" "){
            new_player.val(answer[i])
        }
        $(player_div).append(new_player)
        let new_audio = $("<audio id='" + audio_name + "'><source src='" + value +
            "' type='" + type + "'></audio>")
        $(audio_div).append(new_audio)
        i += 1
    })
    $.each(choices, function(index, value){
        let name = "Q5C" + index
        let new_choice= $("<div class='quiz5_choice'" + "id='" + name + "'>" + value +"</div><br>")
        $(choice_div).append(new_choice)
    })
    $(body_div).append(player_div)
    $(body_div).append(choice_div)
    $(body_div).append(audio_div)
    $("#quiz_container").append(body_div)
}

function display6(choices,answer){
    let body_div = $("<div id='quiz_6_container'></div>")
    $.each(choices, function(index, value){
        let name = "Q6" + index
        let new_choice= $("<input type='checkbox' name='" + name + "' class='quiz_6_choice'" +
            "id='" + name + "'/><label for='" + name + "'>" + value + "</label><br>")
        // check selections user has made
        if(answer.includes(index.toString())){
            new_choice.prop('checked', true)
            console.log('Selected:'+index.toString())
        }
        $(body_div).append(new_choice)
    })
    $("#quiz_container").append(body_div)
}

function display7(img){
    let body_div = $("<div id='quiz_7_container'></div>")
    let new_img= $("<img class='quiz7_img' src='" + img[0] + "'>")
    $(body_div).append(new_img)
    $("#quiz_container").append(body_div)
}

$(document).ready(function(){
    console.log(typeof(id))
    addButton(id)
    addQuestion(data['question'], id)
    if (id == 1 || id == 2 || id == 3) {
        display123(data['images'], id, user_answers[id-1])
    } else if (id == 4) {
        display4(data['images'], data['choices'], user_answers[id-1])
    } else if (id == 5) {
        display5(data['images'], data['choices'], data['audios'], user_answers[id-1])
        $(document).on('click', '.quiz5_img', function (event) {
            let id = $(this).attr("id").substr($(this).attr("id").length - 1)
            $("#Q5A" + id)[0].play()
        })
    } else if (id == 6) {
            display6(data['choices'], user_answers[id-1])
    } else{
        display7(data['images'])
    }
})