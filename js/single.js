var pf = new petfinder.Client({apiKey: "iRFrneB2mkJOOzVLPMTPpShKXk7easKfumf7IM75Xnwba8w8tq", secret: "sEVE2RVHpkQuVbJkDVdwWZQDMCoyNgYk5EGdVvqP"});

var animalInfoEl = document.querySelector("#animalInfo");
var breedInputEl = document.querySelector("#breed");
var aboutPetTitleEl = document.querySelector("#page-title");
var mainLeftEl = document.querySelector("#main-left");
var mainRightEl = document.querySelector("#main-right");




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
   
    var animalId=""
    
    var getAnimalId = function(){
        // grab animal id from url query string
        var queryString = document.location.search;
        var id = queryString.split("=")[1];
        animalId=id;
    }
    getAnimalId();

    

    console.log(animalId);


    var queryURL = "https://api.petfinder.com/v2/animals/"+animalId;

    fetch(queryURL,{headers:{"Authorization":"Bearer "+token}})
        .then(function(response){
            if(response.ok){
                response.json().then(function(data){
                    console.log(data);

                    // ANIMAL PAGE TITLE
                    var petPageTitleEl = document.createElement("h1");
                    petPageTitleEl.classList=("green-text darken-5 bold center-align");
                    petPageTitleEl.id=("about-me");
                    petPageTitleEl.textContent=("About "+data.animal.name);
                    aboutPetTitleEl.appendChild(petPageTitleEl);


                   
                        
                    // ANIMAL PHOTO ROW
                    var photoRowEl = document.createElement("div");
                    photoRowEl.classList=("row center-align grey lighten-3");

                    
                    
                    // LOOP THROUGH ANIMAL PHOTOS AND APPEND THEM TO THE PHOTO ROW
                    for(i=0;i<data.animal.photos.length;i++){
                        
                            var animalPhoto = document.createElement("img");
                            animalPhoto.classList=("carousel-item col-4 multi-photo-img center-align");
                            animalPhoto.src=(data.animal.photos[i].medium);
                            photoRowEl.appendChild(animalPhoto);
                    }


                        
                    // BREED AND LOCATION ROW UNDER PHOTO ROW

                    if(data.animal.breeds.secondary){
                        var secondaryBreed = (", "+data.animal.breeds.secondary);
                    }
                    else {
                        var secondaryBreed = ("");
                    }

                    var breedLocationRow=document.createElement("div");
                    breedLocationRow.classList=("row green-gradient");
                    breedLocationRow.id=("#breed-location-row");
                    breedLocationRow.innerHTML=("<h2 class='bold white-text center'>"+data.animal.breeds.primary+secondaryBreed+" | "+data.animal.contact.address.city+", "+data.animal.contact.address.state+"</h2>");

                    // LEFT SIDE STATS
                    var typeEl = document.createElement("div");
                    typeEl.classList=("col s12");
                    typeEl.innerHTML=("<h4 class='green-text bold left'>Type: </h4><span><h4 class='left'>"+data.animal.type+"</h4><span>");
                    mainLeftEl.appendChild(typeEl);

                    var ageEl = document.createElement("div");
                    ageEl.classList=("col s12");
                    ageEl.innerHTML=("<h4 class='green-text bold left'>Age: </h4><span><h4 class='left'>"+data.animal.age+"</h4><span>");
                    mainLeftEl.appendChild(ageEl);

                    var genderEl = document.createElement("div");
                    genderEl.classList=("col s12");
                    genderEl.innerHTML=("<h4 class='green-text bold left'>Gender: </h4><span><h4 class='left'>"+data.animal.gender+"</h4><span>");
                    mainLeftEl.appendChild(genderEl);

                    var sizeEl = document.createElement("div");
                    sizeEl.classList=("col s12");
                    sizeEl.innerHTML=("<h4 class='green-text bold left'>Size: </h4><span><h4 class='left'>"+data.animal.size+"</h4><span>");
                    mainLeftEl.appendChild(sizeEl);


                    var spayNeuterEl = document.createElement("div");
                    spayNeuterEl.classList=("col s12");
                    
                        var attrSpayNeuter=(JSON.stringify(data.animal.attributes.spayed_neutered));
                        console.log(attrSpayNeuter);

                        if(attrSpayNeuter === "true"){
                            spayNeuterEl.innerHTML=("<h4 class='green-text bold left'>Spayed/Neutered: </h4><span><h4 class='left'>Yes</h4><span>");
                        }
                        else{
                            spayNeuterEl.innerHTML=("<h4 class='green-text bold left'>Spayed/Neutered: </h4><span><h4 class='left'>No</h4><span>");
                        }
                        mainLeftEl.appendChild(spayNeuterEl);
                    
                    var houseTrainedEl = document.createElement("div");
                    houseTrainedEl.classList=("col s12");
                    
                        var attrHouseTrained=(JSON.stringify(data.animal.attributes.house_trained));
                        console.log(attrHouseTrained);

                        if(attrHouseTrained === "true"){
                            houseTrainedEl.innerHTML=("<h4 class='green-text bold left'>House Trained: </h4><span><h4 class='left'>Yes</h4><span>");
                        }
                        else{
                            houseTrainedEl.innerHTML=("<h4 class='green-text bold left'>House Trained: </h4><span><h4 class='left'>No</h4><span>");
                        }
                        mainLeftEl.appendChild(houseTrainedEl);   
                    
                    var specialNeedsEl = document.createElement("div");
                    specialNeedsEl.classList=("col s12");
                    
                        var attrSpecialNeeds=(JSON.stringify(data.animal.attributes.special_needs));
                        console.log(attrSpecialNeeds);

                        if(attrSpecialNeeds === "true"){
                            specialNeedsEl.innerHTML=("<h4 class='green-text bold left'>Special Needs: </h4><span><h4 class='left'>Yes</h4><span>");
                        }
                        else{
                            specialNeedsEl.innerHTML=("<h4 class='green-text bold left'>Special Needs: </h4><span><h4 class='left'>No</h4><span>");
                        }
                        mainLeftEl.appendChild(specialNeedsEl);

                    var shotsCurrentEl = document.createElement("div");
                    shotsCurrentEl.classList=("col s12");
                    
                        var attrShotsCurrent=(JSON.stringify(data.animal.attributes.shots_current));
                        console.log(attrShotsCurrent);

                        if(attrShotsCurrent === "true"){
                            shotsCurrentEl.innerHTML=("<h4 class='green-text bold left'>Shots Current: </h4><span><h4 class='left'>Yes</h4><span>");
                        }
                        else{
                            shotsCurrentEl.innerHTML=("<h4 class='green-text bold left'>Shots Current: </h4><span><h4 class='left'>No</h4><span>");
                        }
                        mainLeftEl.appendChild(shotsCurrentEl);
                        
                    var declawedEl = document.createElement("div");
                    declawedEl.classList=("col s12");

                        var attrDeclawed=(JSON.stringify(data.animal.attributes.declawed));
                        console.log(attrDeclawed);

                        if(attrDeclawed === "true"){
                            declawedEl.innerHTML=("<h4 class='green-text bold left'>Declawed: </h4><span><h4 class='left'>Yes</h4><span>");
                            mainLeftEl.appendChild(declawedEl);
                        }


                    // RIGHT SIDE STATS
                    var descriptionEl = document.createElement("div");
                    descriptionEl.classList=("col s12");
                    descriptionEl.innerHTML=("<h4 class=''>"+data.animal.description+"</h4>");
                    mainRightEl.appendChild(descriptionEl);

                    animalInfoEl.appendChild(photoRowEl);
                    animalInfoEl.appendChild(breedLocationRow);
                    
                    markFavs();
                  
                })

            }

        })

    }


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
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems );
  });
