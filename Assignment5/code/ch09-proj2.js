/* add your code here */

var oJSONdata;
//var JSON_path = "./paintings.json";



document.addEventListener('DOMContentLoaded', function() {
    var oUl = document.getElementsByTagName("ul").item(0);
    //alert(oUl);
    
    oJSONdata = JSON.parse(content);

    oJSONdata.forEach(item => {
        
        var oLi = document.createElement("li");
        var oImg = document.createElement("img");        
        liSTR= "<li><img id='"+item.id+"' src='./images/small/"+item.id +".jpg' alt='"+item.title+" by "+item.artist+"'></li>";
      
        oUl.innerHTML += liSTR;       

    });

    init();


});  







function init(){
    
    var oImg = document.getElementsByTagName("img");
    //alert(oJSONdata);
    oJSONdata = JSON.parse(content);

    
    // Convert NodeList to an array using Array.from()
    var imgArray = Array.from(oImg);

    imgArray.forEach(item => {
        item.addEventListener('click', function(event) {
            //alert(item.id+" "+JSONdata[item.id].title);
            var oSection = document.getElementById("details");
            var oTitle = document.getElementById("title");
            var oArtist = document.getElementById("artist");
            //var oFigure = document.getElementBytagName("figure").item(0);
            var oImage = document.getElementById("full");
            var oDescription = document.getElementById("description");

            //oFigure.innerHTML = "";
            oTitle.innerHTML = getTitleById(item.id);
            oArtist.innerHTML = getArtistById(item.id);
            oImage.src = "./images/large/"+item.id +".jpg";
            oDescription.innerHTML = getDescriptionById(item.id);
            processFeatures(getFeaturesById(item.id));

            //stop event propagation
            event.stopPropagation();



            

        });
    });  

}

function getTitleById(id) {
    // Find the artwork object with the given id
    const oObj = oJSONdata.find(item => item.id === id);

    // If the artwork with the given id is found, return its title
    if (oObj) {
        return oObj.title;
    } else {
        // If the artwork with the given id is not found, return null or handle the case accordingly
        return null;
    }
}

function getArtistById(id) {
    // Find the artwork object with the given id
    const oObj = oJSONdata.find(item => item.id === id);

    // If the artwork with the given id is found, return its artist
    if (oObj) {
        return oObj.artist;
    } else {
        // If the artwork with the given id is not found, return null or handle the case accordingly
        return null;
    }
}

function getDescriptionById(id) {
    // Find the artwork object with the given id
    const oObj = oJSONdata.find(item => item.id === id);

    // If the artwork with the given id is found, return its description
    if (oObj) {
        // Assuming you want to get the description of the first feature
        if (oObj.features.length > 0) {
            return oObj.features[0].description;
        } else {
            return "No description available";
        }
    } else {
        // If the artwork with the given id is not found, return null or handle the case accordingly
        return null;
    }
}

function getFeaturesById(id) {
    // Find the artwork object with the given id
    const oObj = oJSONdata.find(item => item.id === id);

    // If the artwork with the given id is found, return its features
    if (oObj) {
        return oObj.features;
    } else {
        // If the artwork with the given id is not found, return null or handle the case accordingly
        return null;
    }
}

function processFeatures(features) {
    
    

    // Iterate over the features array
    features.forEach(feature => {
        const upperLeft = feature.upperLeft;
        const lowerRight = feature.lowerRight;
        const description = feature.description;

        var oDiv= document.createElement("div");
        var oTxt = document.createTextNode(description);

        oDiv.style.position = "relative";
        oDiv.className = "box";
        oDiv.style.left = upperLeft[0] + "px";
        oDiv.style.top = upperLeft[1] + "px";
        oDiv.style.width = parseInt(parseInt(lowerRight[0]) - parseInt(upperLeft[0])) + "px";
        oDiv.style.height = parseInt(parseInt(lowerRight[1]) - parseInt(upperLeft[1])) + "px";
        

        oDiv.addEventListener('mouseover', function() {
            //alert(oDiv);
            oDiv.appendChild(oTxt);
        });

        oDiv.addEventListener('mouseout', function() {
            //alert(oDiv);
            oDiv.removeChild(oTxt);
        });


        
    });
}



/*

<section id="details">
         <div id="summary">
            <h2 id="title"></h2>
            <h3 id="artist"></h3>
         </div>         
      <figure>
         <image id="full">
         
      </figure>
      <div id="description"></div>
*/


/*
function testData (){
    // Iterate over the array of objects
    oJSONdata.forEach(item => {
    // Extract values from each object
    const id = item.id;
    const artist = item.artist;
    const year = item.year;
    const title = item.title;
    const museum = item.museum;
  
    // Output or process the extracted values
    console.log(`ID: ${id}`);
    console.log(`Artist: ${artist}`);
    console.log(`Year: ${year}`);
    console.log(`Title: ${title}`);
    console.log(`Museum: ${museum}`);
  
    // Iterate over features array if needed
    item.features.forEach(feature => {
      const upperLeft = feature.upperLeft;
      const lowerRight = feature.lowerRight;
      const description = feature.description;
  
      // Output or process the feature values
      console.log(`Upper Left: ${upperLeft}`);
      console.log(`Lower Right: ${lowerRight}`);
      console.log(`Description: ${description}`);
    });
  
    // Separate entries for better readability
    console.log('--------------------------------------------');
  });
}*/
