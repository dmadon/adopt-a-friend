var pf = new petfinder.Client({apiKey: "iRFrneB2mkJOOzVLPMTPpShKXk7easKfumf7IM75Xnwba8w8tq", secret: "sEVE2RVHpkQuVbJkDVdwWZQDMCoyNgYk5EGdVvqP"});

var animalInfoEl = document.querySelector("#animalInfo");
var breedInputEl = document.querySelector("#breed");

// THIS FUNCTION GETS THE ACCESS TOKEN FOR THE SESSION AND SAVES IT TO A VARIABLE CALLED "TOKEN"
var authorize = function(nextFunction){
    pf.authenticate()
        .then(resp => {
        var token = resp.data.access_token;
        nextFunction(token);
    });    
}

// THIS FUNCTION MAKES A CALL TO THE PETFINDER API AND DISPLAYS ANIMALS THAT MATCH THE SEARCH CRITERIA SPECIFIED BY THE USER 
var getInfo = function(token){
    // remove any animal cards that were already on the page from the previous search
    if(document.getElementsByClassName("animal-card")){
        document.querySelectorAll(".animal-card").forEach(function(a){
            a.remove()
          })
        }


// var animalbreed = breedInputEl.value; 
var animalbreed = "boxer";

var queryURL = "https://api.petfinder.com/v2/animals?breed="+animalbreed;

fetch(queryURL,{headers:{"Authorization":"Bearer "+token}})
    .then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
                for(i=0; i<data.animals.length; i++){
                    
                    // ANIMAL CARD HOLDER COLUMN
                    var cardHolder = document.createElement("div");
                    cardHolder.classList=("col s12 m6 l4 ");
                    
                    // CREATE ANIMAL CARD
                    var animalCard = document.createElement("div");
                    animalCard.id=(data.animals[i].id);
                    animalCard.classList=("card horizontal animal-card border hoverable");
                        
                    // INSERT ANIMAL PHOTO ON LEFT SIDE OF CARD

                    // container that holds the photo, set to a fixed width and height in style.css
                    var photoContainer = document.createElement("a");
                    photoContainer.classList=("card-image justify-content-center border-right");
                    photoContainer.id=("photoContainer");
                    photoContainer.setAttribute("href", "./single.html?animalId="+data.animals[i].id);

                    // animal photo to append to the photo container
                    var primPhoto = document.createElement("img");
                        if(data.animals[i].primary_photo_cropped){
                            var thumbnail = data.animals[i].primary_photo_cropped.small;
                        }
                        else{
                            var thumbnail = "./images/paw-heart-gray-padded.png";
                        }
                    primPhoto.src=(thumbnail);
                    primPhoto.height=(180);
                    photoContainer.appendChild(primPhoto);    
                    
                    animalCard.appendChild(photoContainer);


                    // INSERT ANIMAL INFO ON RIGHT SIDE OF CARD

                    // container that holds the two div elements on the right side of the card
                    var rightSide = document.createElement("div");
                    rightSide.classList=("card-stacked");
                     
                        // first div on right side of card: this is the green header on the animal card that contains the animal's name
                        var nameWrapper = document.createElement("div");
                        nameWrapper.classList=("card-title green-gradient white-text center-align border-bottom");

                            // animal name that appears inside the green header
                            var petName = document.createElement("p");
                            petName.classList=("animalCardName bold");
                            petName.textContent=(data.animals[i].name);
                            nameWrapper.appendChild(petName);

                            var savFav = document.createElement("button");
                            savFav.innerHTML=("<i class='material-icons favBtn' data-fav-id="+data.animals[i].id+">favorite_border</i>")
                            savFav.classList=("btn-floating btn-medium waves-effect waves-light grey right halfway-fab");
                            nameWrapper.appendChild(savFav);

                                                        
                        // second div on right side of card: this contains the animal info below the animal's name
                        var cardContent = document.createElement("div");
                        cardContent.classList=("card-content");

                            if(data.animals[i].breeds.secondary){
                                var secondaryBreed = (", "+data.animals[i].breeds.secondary);
                            }
                            else {
                                var secondaryBreed = ("");
                            }

                            var petBreed = document.createElement("p");
                            petBreed.classList=(" ");
                            petBreed.textContent=("Breed(s): "+data.animals[i].breeds.primary+secondaryBreed);
                            cardContent.appendChild(petBreed);

                            var petGender = document.createElement("p");
                            petGender.classList=(" ");
                            petGender.textContent=("Gender: "+data.animals[i].gender);
                            cardContent.appendChild(petGender);

                            var petAge = document.createElement("p");
                            petAge.classList=(" ");
                            petAge.textContent=("Age group: "+data.animals[i].age);
                            cardContent.appendChild(petAge);

                            var petLocation = document.createElement("p");
                            petLocation.classList=(" ");
                            petLocation.textContent=("Location: "+data.animals[i].contact.address.city+", "+data.animals[i].contact.address.state);
                            cardContent.appendChild(petLocation);

                    rightSide.appendChild(nameWrapper);    
                    
                    rightSide.appendChild(cardContent);

                    animalCard.appendChild(rightSide);

                    cardHolder.appendChild(animalCard);

                    animalInfoEl.appendChild(cardHolder);

                    
                    
                    



                }// end of for loop of animal data
                markFavs();
            })

        }

    })

}

// breedInputEl.addEventListener("change",authorize);
authorize(getInfo);

// SAVE PETS TO FAVORITES
var favArray = [];

var saveFavorite = function(event){

    var clicked = event.target;

    // this function toggles the favorite animal button, adding or removing an animal from the list of favorites
    if(clicked.getElementsByClassName("favBtn"))
    var target = event.target.getAttribute("data-fav-id");
        if(target){
            // if there are already favorites saved in favArray
            if(favArray.length>0){
                // look and see if the animal is already saved in favArray
                var index = favArray.indexOf(target);
                    // if the animal was not already in favArray, add the animal to it and set the "favorite" icon color to green
                    if(index <0){
                        favArray.push(target);
                        var icon=document.querySelector('[data-fav-id = "'+target+'"]');
                        icon.classList.remove("grey");
                        icon.classList.add("green","darken-2");
                        localStorage.setItem("storedFavorites",JSON.stringify(favArray));
                        return;
                    }
                    // if the animal was already in favArray, delete it and set the "favorite" icon color back to grey
                    else{
                        favArray.splice(index,1);
                        var icon=document.querySelector('[data-fav-id = "'+target+'"]');
                        icon.classList.remove("green","darken-2");
                        icon.classList.add("grey");
                        localStorage.setItem("storedFavorites",JSON.stringify(favArray));
                        return;
                    }
            } 
            // if favArray was empty, add animal to favArray and set the "favorite" icon color to green
            else{
                favArray.push(target);
                var icon=document.querySelector('[data-fav-id = "'+target+'"]');
                icon.classList.remove("grey");
                icon.classList.add("green","darken-2");
                localStorage.setItem("storedFavorites",JSON.stringify(favArray));
                return;
            } 
    } 
}



// LOAD SAVED FAVORITES ON STARTUP
var loadFavorites = function(){

    var stored = localStorage.getItem("storedFavorites");
    storedFavs = JSON.parse(stored);

    if(storedFavs){

        favArray=storedFavs;
        console.log(favArray);
    }
};

loadFavorites();

// WHEN PETS CARDS ARE DISPLAYED, CHECK TO SEE IF ANY OF THEM ARE SAVED AS FAVORITES AND MAKE THEIR "FAVORITE" ICONS GREEN
var markFavs = function(){
    for(i=0;i<favArray.length;i++){
        var icon = document.querySelector('[data-fav-id = "'+favArray[i]+'"]');
        if(icon){
        // console.log("found "+icon.getAttribute("data-fav-id"));
        icon.classList.remove("grey");
        icon.classList.add("green","darken-2");
        }
    }
}




animalInfoEl.addEventListener("click", saveFavorite);