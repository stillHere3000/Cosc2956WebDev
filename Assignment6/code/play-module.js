/* In this module, create three classes: Play, Act, and Scene. */

/*
    To make the code more manageable, create classes named Play, Act, and 
    Scene, which will be responsible for outputting the relevant DOM elements. 
    Using object-oriented techniques, the Play class will contain a list of Act 
    objects, the Act class will contain a list of Scene objects, while the Scene 
    class will contain a list of speeches. These classes will reside within a 
    JavaScript module named play-module.js
*/
//export default playModule;
export var playsArray = [ "hamlet", "jcaesar"];
export var actArray = [];
export var sceneArray = [];
export var speechArray = [];
export var linesArray = [];
export var oObjActArray = [];
export var oObjSceneArray = [];
export var oObjSpeechArray = [];
export var oObjLinesArray = [];
var JSONData;


document.addEventListener('DOMContentLoaded', function() {
    //alert('play-module.js loaded');
    const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';

   // Get reference to the select element for plays
   const playListSelect = document.getElementById('playList');
   let i = 0;

   playsArray.forEach((play, index) => {
        fetch(`${url}?name=${play}`)
        .then(response => response.json())
        .then(playData => {
            JSONData = playData;
        playData.acts.forEach((act, index2) => {
            
            actArray[index2] = act; 
            oObjActArray[index2] = new Act(act.title, act.scenes);
            //console.log(oObjActArray[index2]);

            //alert(actArray[index2].name);

            playData.acts[index2].scenes.forEach((scene, index3) => {
                
                sceneArray[index3] = scene;
                oObjSceneArray[index3] = new Scene(scene.title, scene.speeches);
                //console.log(oObjSceneArray[index3]);

                //alert(sceneArray[index3].name);
                const speeches = playData.acts[index2].scenes[index3].speeches;
              

               speeches.forEach((speech, index4) => {
                    speechArray[index4] = speech;
                    oObjSpeechArray[index4] = speech;
                    //console.log(oObjSpeechArray[index4]);
                    //linesArray[index4] = lines;
                    //alert(linesArray[index4]);
                });

            });
            
        });
    
        })
        .catch(error => console.error('Error fetching play data:', error));
   });
   // Fetch play data with selected play's name as query parameter

   setupActHandlers();
    setupSceneHandlers();

   
   

});

function setupActHandlers(){

    // Get reference to the select element for plays
   const playListSelect = document.getElementById('playList');

    const actListSelect = document.getElementById('actList');


    actListSelect.addEventListener('change', function(event) {
        const selectedAct = event.target.value;
        //alert(selectedAct);
        // Populate the sceneList select element with scenes from the first act of the selected play
        const sceneListSelect = document.getElementById('sceneList');
        sceneListSelect.innerHTML = ''; // Clear previous options
        oObjActArray[selectedAct].scenes.forEach((scene, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = scene.title;
            sceneListSelect.appendChild(option);
        });       

    });    
}

function setupSceneHandlers(){

    //alert(playData);
     // Get reference to the select element for plays
   const playListSelect = document.getElementById('playList');

   const actListSelect = document.getElementById('actList');

    const sceneListSelect = document.getElementById('sceneList');

    sceneListSelect.addEventListener('change', function(event) {

        // Get the selected play's value
      const selectedScene = event.target.value;

        // Populate the playHere, actHere, and sceneHere elements with the first scene from the first act
        const playHereSection = document.getElementById('playHere');
        const actHereArticle = document.getElementById('actHere');
        const sceneHereDiv = document.getElementById('sceneHere');

        playHereSection.querySelector('h2').textContent = (playListSelect.selectedIndex == 1  )? "The Tragedy of Hamlet, Prince of Denmark" : "The Tragedy of Julius Caesar" ;
        actHereArticle.querySelector('h3').textContent = actListSelect.selectedIndex.textContent;
        //sceneHereDiv.querySelector('h4').textContent = event.target.textContent;

        const speeches = JSONData.acts[actListSelect.selectedIndex].scenes[sceneListSelect.selectedIndex].speeches;
        sceneHereDiv.innerHTML = ''; // Clear previous content
        speeches.forEach(speech => {
            //alert(speech.speaker);
            const speechDiv = document.createElement('div');
            speechDiv.classList.add('speech');
            const speakerSpan = document.createElement('span');
            speakerSpan.textContent = speech.speaker;
            const speechParagraphs = speech.lines.map(line => `<p>${line}</p>`).join('');
            speechDiv.innerHTML = `<span>${speech.speaker}</span>${speechParagraphs}`;
            sceneHereDiv.appendChild(speechDiv);
        });

    });



    
}

//





function testExport() {
    alert('testImport in play-module.js');
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







 export class Play {
    constructor(title, acts) {
        this.title = title;
        this.acts = acts;
    }
    render() {
        const playTitle = document.createElement('h2');
        playTitle.textContent = this.title;
        return playTitle;
    }
}

export class Act {
    constructor(title, scenes) {
        this.title = title;
        this.scenes = scenes;
    }

    render() {
        const actTitle = document.createElement('h3');
        actTitle.textContent = this.title;
        return actTitle;
    }
}

export class Scene {
    constructor(title, speeches) {
        this.title = title;
        this.speeches = speeches;
    }

    render() {
        const sceneTitle = document.createElement('h4');
        sceneTitle.textContent = this.title;

        const sceneDiv = document.createElement('div');
        sceneDiv.id = 'sceneHere';
        sceneDiv.appendChild(sceneTitle);

        this.speeches.forEach(speech => {
            const speechDiv = document.createElement('div');
            speechDiv.classList.add('speech');
            const speakerSpan = document.createElement('span');
            speakerSpan.textContent = speech.speaker;
            const speechParagraphs = speech.lines.map(line => `<p>${line}</p>`).join('');
            speechDiv.innerHTML = `<span>${speech.speaker}</span>${speechParagraphs}`;
            sceneDiv.appendChild(speechDiv);
        });

        return sceneDiv;
    }
}

/*
// Populate the playHere, actHere, and sceneHere elements with the first scene from the first act
        const playHereSection = document.getElementById('playHere');
        const actHereArticle = document.getElementById('actHere');
        const sceneHereDiv = document.getElementById('sceneHere');

        playHereSection.querySelector('h2').textContent = ( playListSelect.selectedIndex == 0  )? "hamlet" : "jcaesar" ;
        actHereArticle.querySelector('h3').textContent = event.target.textContent;
        sceneHereDiv.querySelector('h4').textContent = .title;

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
*/
