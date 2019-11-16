const getRecipe = () => {

let searchInput = $("#foodSearch").val().trim();

let xhr = $.get("https://api.spoonacular.com/recipes/random?number=1&tags=" + searchInput + "&apiKey=77fce6bcdb4442558b5fc882a707acbc");
    xhr.done(function(response) { 
            console.log("success got data", response); 
            let 
            recipeTitle = response.recipes[0].title;
            recipeImg = response.recipes[0].image;
            recipeServings = response.recipes[0].servings
            recipeTime = response.recipes[0].readyInMinutes;
            recipeIngredients = response.recipes[0].extendedIngredients;
            recipeInstructions = response.recipes[0].analyzedInstructions;
            $('#recipeName').text(recipeTitle);
            $('#recipeImg').attr('src', recipeImg);
            console.log(recipeTitle);
        })
    };
    
    
$(document).ready(() => {
    $('#foodSearch').keyup(function(){
        if (event.keyCode === 13) {
            console.log('value', $("#foodSearch").val().trim())
            getRecipe(); 
        }
    })
    $("#search-btn").on("click", function() {
        console.log('value', $("#foodSearch").val().trim())
        getRecipe()
    })
})
