var animalInfoEl = document.querySelector("#animalInfo");
var breedInputEl = document.querySelector("#breed");


var APIkey = "iRFrneB2mkJOOzVLPMTPpShKXk7easKfumf7IM75Xnwba8w8tq";
var secret = "sEVE2RVHpkQuVbJkDVdwWZQDMCoyNgYk5EGdVvqP";
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJpUkZybmVCMm1rSk9PelZMUE1UUHBTaEtYazdlYXNLZnVtZjdJTTc1WG53YmE4dzh0cSIsImp0aSI6IjE2ZjdhZWIwNzcwMDFmNjY3ZTYxYTI0NDgzYmNlMDg3NjZmNTNhN2MzMmMxNTJiMWY4OTNjMjc5MzFiYjFhMjhkZmMxNTg1MjQ0MTA5OTgzIiwiaWF0IjoxNjU3MzEzNTUwLCJuYmYiOjE2NTczMTM1NTAsImV4cCI6MTY1NzMxNzE1MCwic3ViIjoiIiwic2NvcGVzIjpbXX0.oX2YCJgqndppTNcC1XL6h_TApnRbCh3XcM8n3poyWEalFAazhO4f64E36_jbTk0AAdTd7F4VjMN_4nBSvEqctJAyf_hhyYj53FF1Q3Ilc7BCJosi0xj8Q5HsRHhl5U-x4GZAGMmsDuJucDodn0wCf7LgPLaxvTi0bZMYHxJzDaMZZ6eVVcZYR4f2ZN9Oj-eoVerQSufFjVShI6GD_jsl4_E0nmNM6hkvBD4_1RohcqDkqwuDbIhHaTEn-Ji9xgifeGGz7jvd-dW_4d0SUVU9bVDu9xU3EvW8a1Y9-vwZ1CLAxvGkSnlphSsic0Zl6NOAnDln44Uw5im1200WycnTnw";

// get new access token by requesting from the command line (copy and paste this into the command line prompt):
// curl -d "grant_type=client_credentials&client_id=iRFrneB2mkJOOzVLPMTPpShKXk7easKfumf7IM75Xnwba8w8tq &client_secret=sEVE2RVHpkQuVbJkDVdwWZQDMCoyNgYk5EGdVvqP" https://api.petfinder.com/v2/oauth2/token
// once you have been granted a new access token, replace the "token" variable above with the new token


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
                    animalCard.classList=("card horizontal col s12 m6 l4 animal-card border");
                        
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

                    animalInfoEl.appendChild(animalCard);
                }

            })
        }

    })

}

// breedInputEl.addEventListener("change",getInfo);
getInfo();