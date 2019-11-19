let recipeIngredients;
let shoppingBasket = [];
const getRecipe = () => {

    let searchInput = $("#foodSearch").val().trim();

    let xhr = $.get("https://api.spoonacular.com/recipes/random?number=1&tags=" + searchInput + "&apiKey=8613c8f2619d45889d1bdf4d6db0c2a0");
    xhr.done(function (response) {
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
        listIngredients(recipeIngredients);
    })
};

function listIngredients(ingredients) {
    ingredients.forEach(element => {
        let item = [element.name, element.original]
        console.log(item)
        let list = $("#ingredients-list")
            list.append("<p><label><input type='checkbox' class='add-item' data-item='" + item[0] +  "'/><span>" + item[0] );
    });
}

function addToCart(list) {

}

$(document).ready(() => {
    $('#foodSearch').keyup(function () {
        if (event.keyCode === 13) {
            console.log('value', $("#foodSearch").val().trim())
            getRecipe();
        }
    })
    $("#search-btn").on("click", function () {
        console.log('value', $("#foodSearch").val().trim())
        getRecipe()
    })
    
    $("#ingredients-list").on('click', '.add-item', function() {
        shoppingBasket.push($(this).data('item'))
    })
})
