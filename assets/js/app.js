const getRecipe = () => {

let searchInput = $("#foodSearch").val().trim();

let xhr = $.get("https://api.spoonacular.com/recipes/random?number=1&tags=" + searchInput + "&apiKey=77fce6bcdb4442558b5fc882a707acbc");
    xhr.done(function(response) { 
            console.log("success got data", response); 
    })
};

$('#foodSearch').keyup(function(event){
    if (event.keyCode === 13) {
        event.preventDefault();
        console.log('test test 1 2 3 ');
    }
})