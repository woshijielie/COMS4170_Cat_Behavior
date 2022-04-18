function displayAll(data, choices){
    //insert all new data
    let new_img= $("<img class='quiz4_img' src='" + data[0] + "'>")
    $("#quiz_4_img_container").append(new_img)
    $.each(choices, function(index, value){
        let name = "Q4" + index
        let new_choice= $("<input type='checkbox' name='" + name + "' class='quiz4_choice'" +
            "id='" + name + "'/><label for='" + name + "'>" + value + "</label><br>")
        $("#quiz_4_choices_container").append(new_choice)
    })
}

$(document).ready(function(){
    displayAll(data, choices)
})