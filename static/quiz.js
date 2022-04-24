function addButton(id){
    let next_id = id + 1
    let prev_id = id - 1
    let but_div = $("<div class='button_container'></div>")
    let submit_button = $("<button type='button' class='btn btn-custom btn-lg next_button' " +
        "onclick=\"location.href='" + next_id + "';\">Submit</button>")
    let next_button = $("<button type='button' class='btn btn-custom btn-lg next_button' " +
        "onclick=\"location.href='" + next_id + "';\">Next ></button>")
    let prev_button = $("<button type='button' class='btn btn-custom btn-lg prev_button' " +
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
    let body_div = $("<div id='quiz_" + id + "_choices_container'></div>")
    
    $.each(data, function(index, value){
        let name = "Q" + id + index
        let new_img= $("<input type='checkbox' name='" + name + "' class='quiz" + id +"_choice'" +
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
    $("input[type='checkbox']").css("display", "none")
}

function display4(img, choices, answer){
    let body_div = $("<div id='quiz_4_container'></div>")
    let img_div = $("<div id='quiz_4_img_container'></div>")
    let choice_div = $("<div id='quiz_4_choices_container'></div>")
    let form_div = $("<form></form>")
    let new_img= $("<img class='quiz4_img' src='" + img[0] + "'>")
    $(img_div).append(new_img)
    $.each(choices, function(index, value){
        let name = "Q4" + index
        let new_choice= $("<input type='radio' name='Q4' class='quiz4_choice'" +
            "id='" + name + "' style='margin-right: 30px'/><label for='" + name + "'>" + value + "</label><br>")
        // check selections user has made
        if(answer.includes(index.toString())){
            new_choice.prop('checked', true)
            console.log('Selected:'+index.toString())
        }
        $(form_div).append(new_choice)
    })
    $(choice_div).append(form_div)
    $(body_div).append(img_div)
    $(body_div).append(choice_div)
    $("#quiz_container").append(body_div)
}

function display5(color, img, choices, audios, sleep_list){
    let body_div = $("<div id='quiz_5_container'></div>")
    let player_div = $("<div id='quiz_5_player_container'></div>")
    // div for draggable
    let left_div = $("<div id='quiz_5_left_container'></div>")
    // div for droppable
    let right_div = $("<div id='quiz_5_right_container'></div>")
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
        let new_player= $("<div class='quiz5_player_text'><span class='" + player_name + "'>" + key + "</span>" +
            "<img src='" + img[0] + "' class='quiz5_img' id='quiz5_img" + i + "'><br></div>")
        $(new_player).css('color', color[i])
        $(player_div).append(new_player)

        let new_audio = $("<audio id='" + audio_name + "'><source src='" + value +
            "' type='" + type + "'></audio>")
        $(audio_div).append(new_audio)

        let new_draggable = $("<div class='quiz5_move'>" +
            "<img src='" + img[1] + "' class='quiz5_drag' id='quiz5_drag" + i + "'><br></div>")
        $(left_div).append(new_draggable)

        let new_droppable = $("<div class='quiz5_drop' id='quiz5_drop" + i + "'></div>")
        $(new_droppable).css("background-image", "url('" + img[2] + "')")
        $(right_div).append(new_droppable)

        i += 1
    })
    $.each(choices, function(index, value){
        let name = "Q5C" + index
        let new_choice= $("<div class='quiz5_choice'" + "id='" + name + "'>" + value +"</div><br>")
        $(choice_div).append(new_choice)
    })

    $(body_div).append(player_div)
    $(body_div).append(left_div)
    $(body_div).append(right_div)
    $(body_div).append(choice_div)
    $(body_div).append(audio_div)
    $("#quiz_container").append(body_div)
    $("input[type='checkbox']").css("display", "inline-block")
    $(".quiz5_drag").draggable({
        appendTo: "body",
        cursor: "move",
        revert: "invalid"
    })
    $(".quiz5_drop").droppable({
        tolerance: "intersect",
        hoverClass: "quiz5_drop_hover",
        drop: function (event, ui) {
            let drag_id = $(ui.draggable).attr('id').substr(10)
            let drop_id = $(this).attr('id').substr(10)
            $(ui.draggable).animate({
                top: "0px",
                left: "0px"
            });
            sleep_list[drag_id] = drop_id
            addColor(sleep_list, color, img)
        }
    })
    // show user answers stored
    if (sleep_list) {
        addColor(sleep_list, color, img)
    }

}

function addColor(sleep_list, color, img){
    $.each(sleep_list, function (key, value) {
        if (value != " ") {
            $("#quiz5_drag" + key).hide()
            $("#quiz5_drop" + value).css("background-image", "url('" + img[3] + "')")
            $("#Q5C" + value).css('color', color[key])
        }
    })
}

function display6(choices,answer){
    let body_div = $("<div id='quiz_6_choices_container'></div>")
    $.each(choices, function(index, value){
        let name = "Q6" + index
        let new_choice= $("<input type='checkbox' name='" + name + "' class='quiz6_choice'" +
            "id='" + name + "'/><label for='" + name + "'>" + value + "</label><br>")
        // check selections user has made
        if(answer.includes(index.toString())){
            new_choice.prop('checked', true)
            console.log('Selected:'+index.toString())
        }
        $(body_div).append(new_choice)
    })
    $("#quiz_container").append(body_div)
    $("input[type='checkbox']").css("vertical-align", "middle")
}

function display7(img, score){
    $("#quiz_7_body").prepend("<h1>Quiz Score: "+score+"</h1><br>")
    let body_div = $("<div id='quiz_7_container'></div>")
    let new_img= $("<img class='quiz7_img' src='" + img[0] + "'>")
    $(body_div).append(new_img)
    $("#quiz_container").append(body_div)
}

function update_answers_to_server(user_answers) {
    $.ajax({
        type: "POST",
        url: "/update_user_answers",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(user_answers),
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


function update_answers(qid, user_answers, colors) {
    let class_name = '.quiz'+qid+'_choice';
    let id = qid-1; // index in user_answers data structure

    if (qid == 5) {
        $(document).on('click', '#quiz_5_container', function (event) {
            console.log('... changing answers on quiz'+qid);
            user_answers[id] = '';
            for (var i = 0; i < 5; i++) {
                let color = $("#Q5C" + i).css("color")
                if(colors.includes(color)){
                    user_answers[id]=user_answers[id].concat(colors.indexOf(color));
                }
                else{
                    user_answers[id]=user_answers[id].concat(' ');
                }
            }
            console.log(user_answers);
            // update to flask with ajax
            update_answers_to_server(user_answers);
        })
    } else {
        // other cases
        console.log(class_name);
        $(document).on('click', '#quiz_'+qid+'_choices_container', function (event) {
            console.log('... clicking on quiz'+qid);
            user_answers[id] = '';
            $(class_name).each((index, element) => {
                console.log(index, element);
                    if($(element).is(":checked")) {
                        user_answers[id]=user_answers[id].concat(index.toString());
                    }
                });
            console.log(user_answers);
            // update to flask with ajax
            update_answers_to_server(user_answers);
        })
    }
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
        let sleep_list = {}
        if(user_answers[id-1]){
            for (var i = 0; i < user_answers[id-1].length; i++) {
                sleep_list[i] = user_answers[id-1][i]
            }
        }
        display5(data['colors'], data['images'], data['choices'], data['audios'], sleep_list)
        // revert draggable
        $(document).on('click', '.quiz5_drop', function (event) {
            let id = $(this).attr("id").substr($(this).attr("id").length - 1)
            $("#quiz5_drop" + id).css("background-image", "url('" + data['images'][2] + "')")
            let color_id = data['colors'].indexOf($("#Q5C" + id).css("color"))
            $("#Q5C" + id).css("color", "")
            $("#quiz5_drag" + color_id).show()
        })
        //play audio
        $(document).on('click', '.quiz5_img', function (event) {
            let id = $(this).attr("id").substr($(this).attr("id").length - 1)
            $("#Q5A" + id)[0].play()
        })
    } else if (id == 6) {
            display6(data['choices'], user_answers[id-1])
    } else{
        display7(data['images'],score)
    }
    //update user answers
    update_answers(id, user_answers, data['colors']);
})