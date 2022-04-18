function displayImages(data){
    //insert all new data
    $.each(data, function(index, value){
        let new_img= $("<img class='quiz_end_img' src='" + value + "'>")
        $("#quiz_end_container").append(new_img)
    })
}

$(document).ready(function(){
    displayImages(data)
})