function addButton(){
    let but_div = $("<div class='button_container'></div>")
    let next_button = $("<button type='button' class='btn btn-custom btn-lg next_button' " +
        "onclick=\"location.href='/end';\">Next ></button>")
    $(but_div).append(next_button)
    $("#score_container").append(but_div)
}

function displayScore(score, solution){
    let table_div = $("<table></table>")
    let header_div = $("<tr><th>Quiz Number</th><th>Score</th></tr>")
    $(table_div).append(header_div)
    $.each(score, function(index, value){
        if(index != 6){
            let score_div = $("<tr><td><span class='score_but' id='" + (index + 1) +
                "'>Question " + (index + 1) + "</span></td><td>" + value + " / " +
                solution[index][1] + "</td></tr>")
            $(table_div).append(score_div)
        }
        else{
            let score_div = $("<tr><td><span class='total_score'>Total Score</span></td><td><span class='total_score'>" + value + " / 100" +
                "</span></td></tr>")
            $(table_div).append(score_div)
        }
    })
    $("#score_container").append(table_div)
    let modal_div = $("<div class='score_modal_container'></div>")
    let new_modal = $("<div class='score_modal' style='cursor: pointer;'></div>")
    $(modal_div).append(new_modal)
    $("#score_container").append(modal_div)
}


function displayModal(quiz_data, solution, id) {
    $(".score_modal").empty()
    let question_div = $("<div class='score_question'>" + quiz_data["question"] + "</div>")
    $(".score_modal").append(question_div)
    if(id == '1' || id == '2' || id == '3'){
        let data = quiz_data['images']
        let level = 1
        let mid = 3
        if(data.length > 3){
            level = 2
            mid = Math.ceil(data.length / 2)
        }

        for (var i = 0; i < level; i++) {
            let img_div = $("<div id='score" + id + i + "_img_div'></div>")
            for (var j = 0 + i * mid; j < mid + i * mid && j < data.length; j++) {
                let name = "Q" + id + j
                let new_img= $("<img src='" + data[j] + "' class='solution" + id + "'>")
                // check selections user has made
                if (solution.includes(j.toString())) {
                    $(new_img).css('border', '7px solid green')
                }
                $(img_div).append(new_img)
            }
            $(".score_modal").append(img_div)
        }
    }
    else if(id == '4'){
        let choices = quiz_data["choices"]
        let img = quiz_data["images"]
        let img_div = $("<div id='score_4_img_container'></div>")
        let choice_div = $("<div id='score_4_choices_container'></div>")
        let form_div = $("<form></form>")
        let new_img = $("<img class='score4_img' src='" + img[0] + "'>")
        $(img_div).append(new_img)
        $.each(choices, function (index, value) {
            let name = "S4" + index
            let new_choice = $("<input type='radio' name='Q4' class='score4_choice'" +
                "id='" + name + "' style='margin-right: 30px'/><label for='" + name + "'>" + value + "</label><br>")
            // check selections user has made
            if (solution.includes(index.toString())) {
                new_choice.prop('checked', true)
                new_choice.css('color', 'green')
                console.log('Selected:' + index.toString())
            }
            new_choice.prop('disabled', true)
            $(form_div).append(new_choice)
        })
        $(choice_div).append(form_div)
        $(".score_modal").append(img_div)
        $(".score_modal").append(choice_div)
    }
    else if(id == '5'){
        let choices = quiz_data["choices"]
        let img = quiz_data["images"]
        let audios = quiz_data["audios"]
        let player_div = $("<div id='score_5_player_container'></div>")
        let left_div = $("<div id='score_5_left_container'></div>")
        let choice_div = $("<div id='score_5_choices_container'></div>")
        let i = 0
        $.each(audios, function (key, value) {
            let player_name = "S5P" + i
            let new_player = $("<div class='score5_player_text'><span class='" + player_name + "'>" + key + "</span>" +
                "<br></div>")
            $(player_div).append(new_player)

            let new_draggable = $("<div class='score5_move'>" +
                "<img src='" + img[4] + "' class='quiz5_arrow' id='solution5_drag" + i + "'><br></div>")
            $(left_div).append(new_draggable)
            i += 1
        })
        for (var j = 0; j < solution.length; j++) {
            let name = "S5C" + j
            let index = choices[parseInt(solution[j])]
            let new_choice = $("<div class='score5_choice'" + "id='" + name + "'>" + index + "</div><br>")
            $(choice_div).append(new_choice)
        }

        $(player_div).css("margin-left", "50px")
        $(choice_div).css("margin-left", "70px")
        $(choice_div).css("margin-right", "30px")

        $(".score_modal").append(player_div)
        $(".score_modal").append(left_div)
        $(".score_modal").append(choice_div)
    }
    else if(id == '6'){
        let choices = quiz_data["choices"]
        let body_div = $("<div id='score_6_choices_container'></div>")
        $.each(choices, function (index, value) {
            let name = "S6" + index
            let new_choice = $("<input type='checkbox' name='" + name + "' class='score6_choice'" +
                "id='" + name + "'/>")
            let new_text = $("<div class='score6_text'>" + value + "</div><br>")
            // check selections user has made
            if (solution.includes(index.toString())) {
                new_choice.prop('checked', true)
                new_text.css('color', 'green')
                console.log('Selected:' + index.toString())
            }
            new_choice.prop('disabled', true)
            $(body_div).append(new_choice)
            $(body_div).append(new_text)
        })
        $(".score_modal").append(body_div)
        $("label").css("display", "inline-block")
        $("input[type='checkbox']").css("vertical-align", "middle")
        $("input[type='checkbox']").css("position", "relative")
        $("label").css("height", "3px")
        $("label").css("opacity", "1")
        $("label").css("cursor", "default")
    }

    let but_div = $("<div class='close_button_container'></div>")
    let next_button = $("<button type='button' class='btn btn-custom btn-lg close_button' " +
        ">Close</button>")
    $(but_div).append(next_button)
    $(".score_modal").append(but_div)

    if(id == '1'){
        $(".score_modal").css("height", "360px")
    }
    else if(id == '2'){
        $(".score_modal").css("height", "450px")
    }
    else if(id == '3'){
        $(".score_modal").css("height", "450px")
    }
    else if(id == '4'){
        $(".score_modal").css("height", "350px")
    }
    else if(id == '5'){
        $(".score_modal").css("height", "410px")
        $(".close_button_container").css("margin-top", "15px")
    }
    else if(id == '6'){
        $(".score_modal").css("height", "350px")
        $(".close_button_container").css("margin-top", "30px")
    }
    $(".score_modal_container").addClass("score_modal_show")
}

$(document).ready(function(){
    displayScore(score, solution)
    addButton()
    $(document).on('click', '.score_but', function (event) {
        let id = $(this).attr("id")
        displayModal(data[id], solution[id - 1][0], id)
    })
    $(document).on('click', '.close_button', function (event) {
        $(".score_modal_container").removeClass("score_modal_show")
    })
})