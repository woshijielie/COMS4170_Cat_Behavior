function displayAll(data, choices, img){
    //insert all new data
    let i = 0
    $.each(data, function(key, value){
        let player_name = "Q5P" + i
        let audio_name = "Q5A" + i
        let type = "audio/" + value.substr(value.length - 3)
        if(type == "audio/mp3"){
            type = "audio/mpeg"
        }
        let new_player= $("<input type='text' name='" + player_name + "' class='quiz5_input'" +
            "id='" + player_name + "' maxlength='1' size='2'/><label for='" + player_name + "'>" + key + "</label>" +
            "<img src='" + img + "' class='quiz5_img' id='quiz5_img" + i + "'><br>")
        $("#quiz_5_player_container").append(new_player)
        let new_audio = $("<audio id='" + audio_name + "'><source src='" + value +
            "' type='" + type + "'></audio>")
        $("#quiz_5_audio_container").append(new_audio)
        i += 1
    })
    $.each(choices, function(index, value){
        let name = "Q5" + index
        let new_choice= $("<div class='quiz5_choice'" + "id='" + name + "'>" + value +"</div><br>")
        $("#quiz_5_choices_container").append(new_choice)
    })
}

$(document).ready(function(){
    displayAll(data, choices, img)
    $(document).on('click', '.quiz5_img', function (event) {
        let id = $(this).attr("id").substr($(this).attr("id").length - 1)
        $("#Q5A" + id)[0].play()
    })
})