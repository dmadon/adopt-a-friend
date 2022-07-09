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
                    animalCard.classList=("card horizontal animal-card border");
                        
                    // INSERT ANIMAL PHOTO ON LEFT SIDE OF CARD

                    // container that holds the photo, set to a fixed width and height
                    var photoContainer = document.createElement("div");
                    photoContainer.classList=("card-image justify-content-center border-right");
                    photoContainer.id=("photoContainer");



                    // animal photo to append to the photo container
                    var primPhoto = document.createElement("img");
                    primPhoto.classList=("card-image animal-info-item");
                        if(data.animals[i].primary_photo_cropped){
                            var thumbnail = data.animals[i].primary_photo_cropped.small;
                        }
                        else{
                            var thumbnail = "./images/paw-heart-gray.png";
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
                        nameWrapper.classList=("card-title green darken-2 white-text center-align border-bottom");

                            // animal name that appears inside the green header
                            var petName = document.createElement("p");
                            petName.classList=("animalCardName animal-info-item bold");
                            petName.textContent=(data.animals[i].name);
                            nameWrapper.appendChild(petName);

                            
                        
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
                            petBreed.classList=("animal-info-item");
                            petBreed.textContent=("Breed(s): "+data.animals[i].breeds.primary+secondaryBreed);
                            cardContent.appendChild(petBreed);

                            var petGender = document.createElement("p");
                            petGender.classList=("animal-info-item");
                            petGender.textContent=("Gender: "+data.animals[i].gender);
                            cardContent.appendChild(petGender);

                            var petAge = document.createElement("p");
                            petAge.classList=("animal-info-item");
                            petAge.textContent=("Age group: "+data.animals[i].age);
                            cardContent.appendChild(petAge);

                    
                    rightSide.appendChild(nameWrapper);    
                    
                    rightSide.appendChild(cardContent);

                    animalCard.appendChild(rightSide);

                    cardHolder.appendChild(animalCard);

                    animalInfoEl.appendChild(cardHolder);
                    
                }

            })
        }

    })

}

// breedInputEl.addEventListener("change",authorize);
authorize(getInfo);