let recipeIngredients;
let shoppingBasket = [];
let searchInput = $("#foodSearch").val().trim();
const getRecipe = () => {


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
        $('#recipeCard').css('display', 'block');
        console.log(recipeTitle);
        listIngredients(recipeIngredients);
    })
};

function listIngredients(ingredients) {
    let list = $("#ingredients-list")
    list.empty();
    ingredients.forEach(element => {
        let item = [element.name, element.original]
        console.log(item)
            list.append("<p><label><input type='checkbox' class='add-item' data-item='" + item[0] +  "'/><span>" + item[0] );
    });
}


$(document).ready(() => {
    // Runs API calls
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
    // Adds ingredients to shopping list
    $("#ingredients-list").on('click', '.add-item', function() {
        shoppingBasket.push($(this).data('item'))
    })
})

//Hides the recipe if logo is clicked
$('#logoBtn').on("click", function(){
    event.preventDefault();
    $('#recipeCard').css("display", "none")
    $('.input-field').empty();
});

const historyDisplay = $('#recipeHistoryDisplay');
// setup history
const setupHistory = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const history = doc.data();
            console.log(history);
            const li = `
            <li>
                <div class="collapsible-header grey lighten-4"> ${history.title} </div>
                <div class="collapsible-body white"> ${history.content} </div>        
            </li>
            `;
            html += li;
        });

    historyDisplay.html(html);
} else {
    historyDisplay.html('<h5 class="center-align">Login to view your history</h5>')
  }

}
// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});


const loggedOutLinks = $('.logged-out');
const loggedInLinks = $('.logged-in');

const setupUI = (user) => {
    if (user) {
        loggedInLinks.each((index,item) => {
            $(item).css('display', 'block');
        });
        loggedOutLinks.each((index, item) => {
            $(item).css('display', 'none');
        });
    } else {
        loggedOutLinks.each((index, item) => {
            $(item).css('display', 'block');

        loggedInLinks.each((index, item) => {
            $(item).css('display', 'none');
        });
    })
    }
}