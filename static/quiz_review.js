function displayAll(choices){
    //insert all new data
    $.each(choices, function(index, value){
        let name = "QR" + index
        let new_choice= $("<input type='checkbox' name='" + name + "' class='quiz_review_choice'" +
            "id='" + name + "'/><label for='" + name + "'>" + value + "</label><br>")
        $("#quiz_review_container").append(new_choice)
    })
}

$(document).ready(function(){
    displayAll(choices)
})