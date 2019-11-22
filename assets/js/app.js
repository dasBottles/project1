let
recipeIngredients;
shoppingBasket = [];

const getRecipe = () => {
    let searchInput = $("#food").val().trim();
    let xhr = $.get("https://api.spoonacular.com/recipes/random?number=1&tags=" + searchInput + "&apiKey=2d8d3142730b438384ef40435e90239b");
    xhr.done(function (response) {
        //Variables
        let
        recipeTitle = response.recipes[0].title;
        recipeImg = response.recipes[0].image;
        recipeId = response.recipes[0].id
        recipeTime = response.recipes[0].readyInMinutes;
        recipeIngredients = response.recipes[0].extendedIngredients;
        recipeInstructions = response.recipes[0].analyzedInstructions[0].steps;
        // Saving recipe to database
        const user = firebase.auth().currentUser;
        db.collection('history').add({
            title: recipeTitle,
            id: recipeId,
            userId: user.uid
    });
        console.log("success got data", response);
        // Write to DOM
        $('#recipeName').text(recipeTitle);
        $('#recipeImg').attr('src', recipeImg);
        $('#recipeCard').css('display', 'block');
        listIngredients(recipeIngredients);
        parseInstructions(recipeInstructions);
    })
};


// Write ingrediants to the DOM
function listIngredients(ingredients) {
    let list = $("#ingredients-list")
    list.empty();
    ingredients.forEach(element => {
        let item = element.name
        let item2 = element.original
            list.append("<p><label><input type='checkbox' class='add-item' data-item='" + item +  "'/><span class='bigFont'>" + item2);
    });
}

// Write instructions to the DOM
const parseInstructions = () => {
    $('#instructions').empty();
    $(recipeInstructions).each((index, item) => {
        $('#instructions').append("<p>Step " + item['number'] + ": " + "<label class='instruction'><span>" +item['step']);
    });
};



$(document).ready(() => {
    // Runs API calls
    $('#food').keyup(function () {
        if (event.keyCode === 13) {
            console.log('value', $("#food").val().trim())
            getRecipe();
        }
    })
    $("#search-btn").on("click", function () {
        console.log('value', $("#food").val().trim())
        getRecipe()
    })
    // Adds ingredients to shopping list
    $("#ingredients-list").on('click', '.add-item', function() {
        shoppingBasket.push($(this).data('item'))
    })
})

// Write recipeTitles to the History tab
const historyDisplay = $('#recipeHistoryDisplay');
// setup history
const setupHistory = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const history = doc.data();
            console.log(history);
            const li = `
            <ul class= 'collapsible'>
                <li>
                    <div>${history.title} </div>       
                </li>
            </ul>
            `;

            const btn = `
            <ul>
                <li>
                    <a href="#" class="grey-text modal-trigger historyBtn bigFont" data-target="${history.title}" data-id='${doc.id}'>${history.title}</a>
                </li>
            </ul>
            `
            // html += li;
            html += btn;

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

//Hides the recipe if logo is clicked
$('#logoBtn').on("click", function(){
    event.preventDefault();
    $('#recipeCard').css("display", "none");
});

