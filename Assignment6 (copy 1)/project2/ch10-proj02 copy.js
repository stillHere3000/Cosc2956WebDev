
/*
   Add a change event handler to the first <select>, which contains a preset list 
of plays. When the user selects a play, fetch the play data by adding the value 
attribute of the <option> for the play as a query string, as shown in the 
comments in ch10-proj02.js. When the fetched play is retrieved, populate the 
three other <select> elements from this data. Also populate the <section 
id="playHere">, <article id="actHere">, and <div id="sceneHere"> 
elements with the first scene from the first act of the selected play
*/

//alert('play-module.js loaded');
// import functions and variables from play-module.js
//import { Play, Act, Scene } from './play-module.js';
import { playsArray } from './play-module.js';
import { actArray } from './play-module.js';
import { sceneArray } from './play-module.js';
import { speechArray } from './play-module.js';
import { linesArray } from './play-module.js';
//import { oObjPlayArray } from './play-module.js';
import { oObjActArray } from './play-module.js';
import { oObjSceneArray } from './play-module.js';
import { oObjSpeechArray } from './play-module.js';
import { oObjLinesArray } from './play-module.js';

import { Play, Act, Scene } from './play-module.js';




document.addEventListener("DOMContentLoaded", function() {

	
	const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';

   // Get reference to the select element for plays
   const playListSelect = document.getElementById('playList');
   // Add event listener for change event
   playListSelect.addEventListener('change', function(event) {
      // Get the selected play's value
      const selectedPlay = event.target.value;

      // Fetch play data with selected play's name as query parameter
      fetch(`${url}?name=${selectedPlay}`)
          .then(response => response.json())
          .then(playData => {
              // Populate the actList select element with acts from the selected play
              const actListSelect = document.getElementById('actList');
               if(actListSelect) {
                  //alert('actListSelect found');
                  //alert(playData.acts);
                  actListSelect.innerHTML = ''; // Clear previous options
                  playData.acts.forEach((act, index) => {
                        const option = document.createElement('option');
                        option.value = index;
                        option.textContent = act.name;
                        actListSelect.appendChild(option);
                  });
               }

              // Populate the sceneList select element with scenes from the first act of the selected play
              const sceneListSelect = document.getElementById('sceneList');
              sceneListSelect.innerHTML = ''; // Clear previous options
              playData.acts[0].scenes.forEach((scene, index) => {
                  const option = document.createElement('option');
                  option.value = index;
                  option.textContent = scene.title;
                  sceneListSelect.appendChild(option);
              });

              // Populate the playHere, actHere, and sceneHere elements with the first scene from the first act
              const playHereSection = document.getElementById('playHere');
              const actHereArticle = document.getElementById('actHere');
              const sceneHereDiv = document.getElementById('sceneHere');

              playHereSection.querySelector('h2').textContent = playData.title;
              actHereArticle.querySelector('h3').textContent = playData.acts[0].title;
              sceneHereDiv.querySelector('h4').textContent = playData.acts[0].scenes[0].title;

              const speeches = playData.acts[0].scenes[0].speeches;
              sceneHereDiv.innerHTML = ''; // Clear previous content
              speeches.forEach(speech => {
                  const speechDiv = document.createElement('div');
                  speechDiv.classList.add('speech');
                  const speakerSpan = document.createElement('span');
                  speakerSpan.textContent = speech.speaker;
                  const speechParagraphs = speech.lines.map(line => `<p>${line}</p>`).join('');
                  speechDiv.innerHTML = `<span>${speech.speaker}</span>${speechParagraphs}`;
                  sceneHereDiv.appendChild(speechDiv);
              });
          })
          .catch(error => console.error('Error fetching play data:', error));
  });
    /*
     To get a specific play, add play name via query string, 
	   e.g., url = url + '?name=hamlet';
	 
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
     
   */
	 
   
    /* note: you may get a CORS error if you test this locally (i.e., directly from a
       local file). To work correctly, this needs to be tested on a local web server.  
       Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
       use built-in Live Preview.
    */
        //set timeout to allow for data to be fetched
        //setTimeout(testImport(), 10000);
       
});

/*document.addEventListener('click', function() {
    testImport();
});*/

function testImport() {
    alert('testImport in ch10-proj02.js');
    alert(playsArray.length);
    alert(actArray.length);
    alert(sceneArray);
    alert(speechArray);
    alert(linesArray);
    //alert(oObjPlayArray.length);
    alert(oObjActArray.length);
    alert(oObjSceneArray);
    alert(oObjSpeechArray);
    alert(oObjLinesArray);

}