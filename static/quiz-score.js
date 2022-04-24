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
            let score_div = $("<tr><td><a href='/solution/" + (index + 1) +"'>Quiz " +
                (index + 1) + "</a></td><td>" + value + " / " + solution[index][1] +
                "</td></tr>")
            $(table_div).append(score_div)
        }
        else{
            let score_div = $("<tr><td>Total Score</td><td>" + value + " / 100" +
                "</td></tr>")
            $(table_div).append(score_div)
        }
    })
    $("#score_container").append(table_div)
}

$(document).ready(function(){
    addButton()
    displayScore(score, solution)
})