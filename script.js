$(document).ready(function() {

// Start your code from here

    var animals = ["dog", "cat", "rabbit","frog","chicken","bird","turtle"];

    populateButtons(animals,"animal-button","#animal-buttons")

    function populateButtons(arrayToUse,classToAdd,placeHolder){
        $(placeHolder).empty();

        for(var i= 0; i< arrayToUse.length; i++){
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type",arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(placeHolder).append(a);
        }
    }

    $("#animal-buttons").on("click",".animal-button", function(){
        $("#animals").empty()
        var search = $(this).attr("data-type");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=NfjiT2dkDJkLf7bGsL5wD3s5aQBYMyzB&limit=10";

        $.ajax({url:queryUrl})
        .then(function(response) {

            var results = response.data

            for (var i = 0; i <results.length; i++) {


                var animalDiv = $("<div class=\"animal-item\">");
                var rating = results[i].rating
                var p = $("<p>").text("Rating: "+ rating)

                var animated = results[i].images.fixed_height.url
                var still = results[i].images.fixed_height_still.url

                var animalImage = $("<img>")
                animalImage.attr("src",still)
                animalImage.attr("data-still",still)
                animalImage.attr("data-animate",animated)
                animalImage.attr("data-isAnimated","false")
                animalImage.addClass("animal-image")

                animalDiv.append(p)
                animalDiv.append(animalImage)

                $("#animals").append(animalDiv)

            }


        });
    });

    // Registro del evento para la imagen
    $("#animals").on("click", ".animal-item", function(){
        if ($(this).children("img.animal-image").attr("data-isAnimated") == "false") {
            $(this).children("img.animal-image").attr("src", $(this).children("img.animal-image").attr("data-animate"))
            $(this).children("img.animal-image").attr("data-isAnimated", "true")
            
        }
        else {
            $(this).children("img.animal-image").attr("src", $(this).children("img.animal-image").attr("data-still"))
            $(this).children("img.animal-image").attr("data-isAnimated", "false")
        
        }
    })

    $("#add-animal").on("click", function(e) {
        e.preventDefault()
        if(animals.indexOf($('input:text').val()) < 0){
            console.log(animals.indexOf($('input:text').val()))
            animals.push($('input:text').val());
            populateButtons(animals, "animal-button", "#animal-buttons")
        }else{
            alert("That animal is already on the list")
        }
        $("#animal-input").val("")
    });

});
