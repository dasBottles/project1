const getRecipe = () => {

let searchInput = $("#foodSearch").val().trim();

let xhr = $.get("https://api.spoonacular.com/recipes/random?number=1&tags=" + searchInput + "&apiKey=77fce6bcdb4442558b5fc882a707acbc");
    xhr.done(function(response) { 
            console.log("success got data", response); 
    })
};



$(document).ready(() => {
    $('#foodSearch').keyup(function(){
        if (event.keyCode === 13) {
            console.log('value', $("#foodSearch").val().trim()) 
        }
    })
    $("#search-btn").on("click", function() {
        console.log('value', $("#foodSearch").val().trim())
    })
})