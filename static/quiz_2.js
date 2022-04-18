function displayImages(data){
    //insert all new data
    $.each(data, function(index, value){
        let name = "Q2" + index
        let new_img= $("<input type='checkbox' name='" + name + "' class='quiz2_img'" +
            "id='" + name + "'/><label for='" + name + "'></label>")
        $(new_img).css("background-image", "url('" + value + "')")
        $("#quiz_2_container").append(new_img)
    })
}

$(document).ready(function(){
    displayImages(data)
})