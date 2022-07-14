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
                    petPageTitleEl.classList=("green-text text-darken-2 darken-5 bold center-align ");
                    petPageTitleEl.id=("about-me");
                    petPageTitleEl.textContent=("About "+data.animal.name);
                    aboutPetTitleEl.appendChild(petPageTitleEl);

                    var savFav = document.createElement("button");
                    savFav.innerHTML=("<i class='material-icons favBtn' data-fav-id="+data.animal.id+">favorite_border</i>")
                    savFav.classList=("btn-floating btn-large waves-effect waves-light grey right top");
                    petPageTitleEl.appendChild(savFav);
                   
                        
                    // ANIMAL PHOTO ROW
                    var photoRowEl = document.createElement("div");
                    photoRowEl.classList=("row center-align grey lighten-3");

                    
                    
                    // LOOP THROUGH ANIMAL PHOTOS AND APPEND THEM TO THE PHOTO ROW
                    for(i=0;i<data.animal.photos.length;i++){
                        
                            var animalPhoto = document.createElement("img");
                            animalPhoto.classList=("carousel-item col-4 multi-photo-img center-align responsive-img");
                            animalPhoto.src=(data.animal.photos[i].medium);
                            // animalPhoto.innerHTML=("width='650'")
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
                    breedLocationRow.innerHTML=("<h2 class='bold white-text center '>"+data.animal.breeds.primary+secondaryBreed+" | "+data.animal.contact.address.city+", "+data.animal.contact.address.state+"</h2>");

                    


                    // LEFT SIDE STATS
                    var typeEl = document.createElement("div");
                    typeEl.classList=("col s12");
                    typeEl.innerHTML=("<h4 class='green-text text-darken-2 bold left flow-text'>Type: </h4><span><h4 class='left flow-text'>"+data.animal.type+"</h4><span>");
                    mainLeftEl.appendChild(typeEl);

                    var ageEl = document.createElement("div");
                    ageEl.classList=("col s12");
                    ageEl.innerHTML=("<h4 class='green-text text-darken-2 bold left flow-text'>Age: </h4><span><h4 class='left flow-text'>"+data.animal.age+"</h4><span>");
                    mainLeftEl.appendChild(ageEl);

                    var genderEl = document.createElement("div");
                    genderEl.classList=("col s12");
                    genderEl.innerHTML=("<h4 class='green-text text-darken-2 bold left flow-text'>Gender: </h4><span><h4 class='left flow-text'>"+data.animal.gender+"</h4><span>");
                    mainLeftEl.appendChild(genderEl);

                    var sizeEl = document.createElement("div");
                    sizeEl.classList=("col s12");
                    sizeEl.innerHTML=("<h4 class='green-text text-darken-2 bold left flow-text'>Size: </h4><span><h4 class='left flow-text'>"+data.animal.size+"</h4><span>");
                    mainLeftEl.appendChild(sizeEl);


                    var spayNeuterEl = document.createElement("div");
                    spayNeuterEl.classList=("col s12");
                    
                        var attrSpayNeuter=(JSON.stringify(data.animal.attributes.spayed_neutered));
                  

                        if(attrSpayNeuter === "true"){
                            spayNeuterEl.innerHTML=("<h4 class='green-text text-darken-2 bold left flow-text'>Spayed/Neutered: </h4><span><h4 class='left flow-text'>Yes</h4><span>");
                        }
                        else{
                            spayNeuterEl.innerHTML=("<h4 class='green-text text-darken-2 bold left flow-text'>Spayed/Neutered: </h4><span><h4 class='left flow-text'>No</h4><span>");
                        }
                        mainLeftEl.appendChild(spayNeuterEl);
                    
                    var houseTrainedEl = document.createElement("div");
                    houseTrainedEl.classList=("col s12");
                    
                        var attrHouseTrained=(JSON.stringify(data.animal.attributes.house_trained));
                  

                        if(attrHouseTrained === "true"){
                            houseTrainedEl.innerHTML=("<h4 class='green-text text-darken-2 bold left flow-text'>House Trained: </h4><span><h4 class='left flow-text'>Yes</h4><span>");
                        }
                        else{
                            houseTrainedEl.innerHTML=("<h4 class='green-text text-darken-2 bold left flow-text'>House Trained: </h4><span><h4 class='left flow-text'>No</h4><span>");
                        }
                        mainLeftEl.appendChild(houseTrainedEl);   
                    
                    var specialNeedsEl = document.createElement("div");
                    specialNeedsEl.classList=("col s12");
                    
                        var attrSpecialNeeds=(JSON.stringify(data.animal.attributes.special_needs));
                 

                        if(attrSpecialNeeds === "true"){
                            specialNeedsEl.innerHTML=("<h4 class='green-text text-darken-2 bold left flow-text'>Special Needs: </h4><span><h4 class='left flow-text'>Yes</h4><span>");
                        }
                        else{
                            specialNeedsEl.innerHTML=("<h4 class='green-text text-darken-2 bold left flow-text'>Special Needs: </h4><span><h4 class='left flow-text'>No</h4><span>");
                        }
                        mainLeftEl.appendChild(specialNeedsEl);

                    var shotsCurrentEl = document.createElement("div");
                    shotsCurrentEl.classList=("col s12");
                    
                        var attrShotsCurrent=(JSON.stringify(data.animal.attributes.shots_current));


                        if(attrShotsCurrent === "true"){
                            shotsCurrentEl.innerHTML=("<h4 class='green-text text-darken-2 bold left flow-text'>Shots Current: </h4><span><h4 class='left flow-text'>Yes</h4><span>");
                        }
                        else{
                            shotsCurrentEl.innerHTML=("<h4 class='green-text text-darken-2 bold left flow-text'>Shots Current: </h4><span><h4 class='left flow-text'>No</h4><span>");
                        }
                        mainLeftEl.appendChild(shotsCurrentEl);
                        
                    var declawedEl = document.createElement("div");
                    declawedEl.classList=("col s12");

                        var attrDeclawed=(JSON.stringify(data.animal.attributes.declawed));


                        if(attrDeclawed === "true"){
                            declawedEl.innerHTML=("<h4 class='green-text text-darken-2 bold left flow-text'>Declawed: </h4><span><h4 class='left flow-text'>Yes</h4><span>");
                            mainLeftEl.appendChild(declawedEl);
                        }


                    // RIGHT SIDE STATS

                    // var descriptionEl = document.createElement("div");
                    // descriptionEl.classList=("col s12");
                    //     if(data.animal.description){
                    //     descriptionEl.innerHTML=("<h4 class=''>"+data.animal.description+"</h4>");
                    //     mainRightEl.appendChild(descriptionEl);
                    //     };

                    
                    var tagsEl = document.createElement("div");
                    tagsEl.classList=("col s12");
                        if(data.animal.tags.length>0){
                            var list = document.createElement("div");
                            list.innerHTML=("<h4 class='bold flow-text'>My friends describe me as:</h4>");
                                for(i=0;i<data.animal.tags.length;i++){
                                    var listItem = document.createElement("div");
                                    listItem.innerHTML=("<h5><li>"+data.animal.tags[i]+"</li></h5>");
                                    list.appendChild(listItem);
                                }
                        tagsEl.appendChild(list);
                        
                        };
                        

                    // get organization id and make another API call to search for that organization's information
                    var orgId = data.animal.organization_id
                    console.log(orgId);

                        var orgQueryURL = "https://api.petfinder.com/v2/organizations/"+orgId;
                    
                        fetch(orgQueryURL, {headers:{"Authorization":"Bearer "+token}})
                            .then(function(response){
                                if(response.ok){
                                    response.json().then(function(data){
                                        console.log(data);
                    
                                            // container for the organization information
                                            var orgWrapperEl = document.createElement("div");
                                            orgWrapperEl.classList=("row");
                                            orgWrapperEl.id=("orgWrapperEl");

                                                var orgName = document.createElement("h4");
                                                orgName.classList=("bold green-text text-darken-2 text-darken-2 center flow-text");
                                                orgName.textContent=(data.organization.name)
                                                orgWrapperEl.appendChild(orgName);


                                                var orgAddress1 = document.createElement("h5");
                                                orgAddress1.classList=("bold center flow-text");
                                                orgAddress1.textContent=(data.organization.address.address1);
                                                orgWrapperEl.appendChild(orgAddress1);

                                                    if(data.organization.address.address2){
                                                    var orgAddress2 = document.createElement("h5");
                                                    orgAddress2.classList=("bold center flow-text");
                                                    orgAddress2.textContent=(data.organization.address.address2);
                                                    orgWrapperEl.appendChild(orgAddress2);
                                                    };

                                                var orgCitySt = document.createElement("h5");
                                                orgCitySt.classList=("bold center flow-text");
                                                orgCitySt.textContent=(data.organization.address.city+", "+data.organization.address.state+" "+data.organization.address.postcode);
                                                orgWrapperEl.appendChild(orgCitySt);

                                                        
                                                        if(data.organization.address.address1){
                                                            var adEl1 = data.organization.address.address1.replaceAll(" ","+").replaceAll(".","").trim();
                                                            console.log("adEl1 = "+adEl1);
                                                        }
                                                        else{
                                                            var adEl1 = "";
                                                            console.log("adEl1 = "+adEl1);
                                                        };

                                                        if(data.organization.address.address2){
                                                            var adEl2 = ("+"+data.organization.address.address2.replaceAll(" ","+").replaceAll(".","").trim());
                                                            console.log("adEl2 = "+adEl2);
                                                        }
                                                        else{
                                                            var adEl2 = "";
                                                            console.log("adEl2 = "+adEl2);
                                                        };

                                                        if(data.organization.address.city){
                                                            var adEl3 = ("+"+data.organization.address.city.replaceAll(" ","+").replaceAll(".","").trim());
                                                            console.log("adEl3 = "+adEl3);
                                                        }
                                                        else{
                                                            var adEl3 = "";
                                                            console.log("adEl3 = "+adEl3);
                                                        };

                                                        if(data.organization.address.state){
                                                            var adEl4 = ("+"+data.organization.address.state.replaceAll(" ","+").replaceAll(".","").trim());
                                                            console.log("adEl4 = "+adEl4);
                                                        }
                                                        else{
                                                            var adEl4 = "";
                                                            console.log("adEl4 = "+adEl4);
                                                        };

                                                        if(data.organization.address.postcode){
                                                            var adEl5 = ("+"+data.organization.address.postcode.replaceAll(" ","+").replaceAll(".","").trim());
                                                            console.log("adEl5 = "+adEl5);
                                                        }
                                                        else{
                                                            var adEl5 = "";
                                                            console.log("adEl5 = "+adEl5);
                                                        };


                                                        var googleAPIKey="AIzaSyB6hIDzd5qQI16qMIaOl13UqxaKcSFLg54"
                                                        var addressString = (adEl1+adEl2+adEl3+adEl4+adEl5);
                                                        console.log(addressString);
                                                        var googleMapURL = "https://www.google.com/maps/embed/v1/place?key="+googleAPIKey+"&q="+addressString;
                                                        console.log("url: "+googleMapURL);

                                                var mapWrapper =document.createElement("div");
                                                mapWrapper.id=("mapWrapper");
      

                                                var mapEmbed = document.createElement("iframe");
                                                mapEmbed.src=(googleMapURL);
                                                mapEmbed.classList=("center responsive-img");
                                                mapEmbed.id=("mapEmbed");
                                                mapWrapper.appendChild(mapEmbed);

                               
                                                orgWrapperEl.appendChild(mapWrapper);

                                                var orgPhone = document.createElement("a");
                                                if(data.organization.phone){
                                                orgPhone.href=("tel:"+data.organization.phone);
                                                orgPhone.innerHTML=("<h5><i class='material-icons flow-text'>phone</i>"+" "+data.organization.phone+"</h5>");
                                                orgPhone.classList=("block center contact flow-text");
                                                orgWrapperEl.appendChild(orgPhone);
                                                }

                                                var orgEmail = document.createElement("a");
                                                if(data.organization.email){
                                                orgEmail.href=("mailto:"+data.organization.email);
                                                orgEmail.innerHTML=("<h5><i class='material-icons flow-text'>mail</i>"+" "+data.organization.email+"</h5>");
                                                orgEmail.classList=("block center contact flow-text");
                                                orgWrapperEl.appendChild(orgEmail);
                                                }

                                                var orgUrl = document.createElement("a");
                                                if(data.organization.website){
                                                orgUrl.href=(data.organization.website);
                                                orgUrl.innerHTML=("<h5><i class='material-icons'>computer</i>"+" "+data.organization.website+"</h5>")
                                                orgUrl.classList=(" block center contact flow-text");
                                                orgWrapperEl.appendChild(orgUrl);
                                                }


                                            // mainRightEl.appendChild(tagsEl);

                                            mainRightEl.appendChild(orgWrapperEl);

                    
                                    })// end of .then(function.data)
                    
                                }// end of if response.ok
                    
                            })// end of .then(function(response))
                                        
                                 

                    animalInfoEl.appendChild(photoRowEl);
                    animalInfoEl.appendChild(breedLocationRow);
                    
                    markFavs();
                  
                })// end of .then(function.data)

            }// end of if response.ok

        })// end of .then(function(response))

    }// end of getOrg function


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






aboutPetTitleEl.addEventListener("click", saveFavorite);
M.AutoInit();
