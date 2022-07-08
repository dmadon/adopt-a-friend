var animalInfoEl = document.querySelector("#animalInfo");
var breedInputEl = document.querySelector("#breed");


var APIkey = "iRFrneB2mkJOOzVLPMTPpShKXk7easKfumf7IM75Xnwba8w8tq";
var secret = "sEVE2RVHpkQuVbJkDVdwWZQDMCoyNgYk5EGdVvqP";
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJpUkZybmVCMm1rSk9PelZMUE1UUHBTaEtYazdlYXNLZnVtZjdJTTc1WG53YmE4dzh0cSIsImp0aSI6IjU5M2MwZTY3ZmU4YzllOThjMmFjNjRkYWJiZDg4OTU2ZWVkM2ExODUyZDBiYmI4ZGM1ZThhOWI4ZThhNWVlYmJjMzRkOTJjNzAyZTM1NWU4IiwiaWF0IjoxNjU3MzA2MDIyLCJuYmYiOjE2NTczMDYwMjIsImV4cCI6MTY1NzMwOTYyMiwic3ViIjoiIiwic2NvcGVzIjpbXX0.bPku9sqn9XfxS1vQV0H57ztMee4-qGiP_0J4ZMioKAPuAr-_fehUcQP8GOXrs46jX1-KKv7aHs4_lB1yuzRT8LrkBM1mEZmYjwFrbpYQa3H6O7FD52e4pBe9qelkc0yKlOpMm1B4P3hwZ5OS-Z8_DABwkh9Wl4EWuM8QAoAjoNVNytqfvxq9dwNnrOXikzFakSVeAy1mZ-XEmb20_Y8JWLZ3XLCSWH5KH8al-th_6sro8OTAX8gassPsi0MZD5zc7kHUIPBYYc4kgfsfn3RUYu0Wz5HjXpfvQGDoNtqP6l4rlDBHVCrsQfeb0Aggxw0VCKAOqdMruqkfU-4CfRPvug";

// get new access token by requesting from the command line (copy and paste this into the command line prompt):
// curl -d "grant_type=client_credentials&client_id=iRFrneB2mkJOOzVLPMTPpShKXk7easKfumf7IM75Xnwba8w8tq &client_secret=sEVE2RVHpkQuVbJkDVdwWZQDMCoyNgYk5EGdVvqP" https://api.petfinder.com/v2/oauth2/token
// once you have been granted a new access token, set the "token" variable above to the new token


var getInfo = function(){

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
                    // CREATE ANIMAL CARD
                    var animalCard = document.createElement("div");
                    animalCard.id=(data.animals[i].id);
                    animalCard.classList=("card horizontal col s12 m6 l4 animal-card ");
                        // INSERT ANIMAL PHOTO ON LEFT SIDE OF CARD
                        var primPhoto = document.createElement("img");
                        primPhoto.classList=("card-image animal-info-item");
                        if(data.animals[i].primary_photo_cropped){
                            var thumbnail = data.animals[i].primary_photo_cropped.small;
                        }
                        else{
                            var thumbnail = "./images/paw-heart-gray.png";
                        }
                        primPhoto.src=(thumbnail);
                        primPhoto.height=(240);
                        animalCard.appendChild(primPhoto);                    


                    // RIGHT SIDE OF CARD
                    var rightSide = document.createElement("div");
                    rightSide.classList=("card-stacked");

                    
                    


                    // BEGIN CARD TEXT CONTENTS
                    var cardContent = document.createElement("div");
                    cardContent.classList=("card-content");
                        // this is the green header on the animal card that contains the animal's name
                        var nameWrapper = document.createElement("div");
                        nameWrapper.classList=("card-title green darken-2 white-text center-align");
                            // animal name that appears inside the green header
                            var petName = document.createElement("p");
                            petName.classList=("animalCardName animal-info-item bold");
                            petName.textContent=(data.animals[i].name);
                            nameWrapper.appendChild(petName);

                        rightSide.appendChild(nameWrapper);


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

                    
                    rightSide.appendChild(cardContent);

                    animalCard.appendChild(rightSide);

                    animalInfoEl.appendChild(animalCard);
                }

            })
        }

    })

}

// breedInputEl.addEventListener("change",getInfo);
getInfo();