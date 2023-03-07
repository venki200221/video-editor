const { Deepgram } = require("@deepgram/sdk");
const express=require('express');
const app=express();
const openai=require("openai");
const bodyParser=require('body-parser');
const axios=require("axios");

// find all the adjectives from an array of words

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));



app.get('/',(req,res)=>{
    res.send('Hello World');
});

// let adjectives = [];

// app.post("/",async(req,res)=>{
//    try{
//     const url=req.body.url;
//     const deepgram = new Deepgram("ecd31834c4e1c18f545ac8a4d1b06d8151197352");
//     const fileSource = { url: url };
//     const response = await deepgram.transcription.preRecorded(fileSource, {
//         punctuate: true,
//         detect_topics:true,
//       });
//       let getwords=response.results.channels[0].alternatives[0].words;
//         getwords.forEach(word=>{
//             words.push(word.word);
//         })
//       let trans=response.results.channels[0].alternatives[0].topics;

// for (var i = 0; i < words.length; i++) {
//   if (words[i].endsWith("y") || words[i].endsWith("ed")) {
//     adjectives.push(words[i]);
//   }
// }
//       res.send(adjectives);
//     }
//     catch(err){
//         res.send(err);
// }
// });

let adjectives = [];
let words = [];
let verbs = [];
let largestWord = "";
app.post("/",async(req,res)=>{
   try{
    const url=req.body.url;
    const deepgram = new Deepgram("ecd31834c4e1c18f545ac8a4d1b06d8151197352");
    const fileSource = { url: url };
    const response = await deepgram.transcription.preRecorded(fileSource, {
        punctuate: true,
        detect_topics:true,
      });
      let getwords=response.results.channels[0].alternatives[0].words;
        getwords.forEach(word=>{
            words.push(word.word); // push word to words array instead of adjectives array 
        })

      let trans=response.results.channels[0].alternatives[0].topics;

      for (var i = 0; i < words.length; i++) { // use .endsWith() method on elements of words array 
        if (words[i].endsWith("y") || words[i].endsWith("ed")) {  // push to adjectives array instead of words array 
          adjectives.push(words[i]);   //  push to adjectives array instead of words array 

        }
        if (words[i].endsWith('ed') || words[i].endsWith('ing')) {
          verbs.push(words[i]);
        }

        // find the largest word from the paragraph
        if (words[i].Length > largestWord.Length) 
    { 
        largestWord = words[i]; 
    } 

      }
    console.log(largestWord);
    console.log(verbs);
    console.log(adjectives);
    res.send(response.results.channels[0].alternatives[0]);

    } catch(err){

        res.send(err);

    }});

app.get("/image",(req,res)=>{

  const url = `https://api.envato.com/v1/discovery/search/search/item?term="databases",type=stock-video`;
  const headers = {
    'Authorization':'Bearer TBR7vSbLt5ABo9Y5NFbxFYMnAvCYF887'
  };
  var videos=[];
  axios.get(url, { headers })
  .then(response => {
    
    var matches=response.data.matches;
     matches.forEach(match=>{
      
       if(match.previews.icon_with_video_preview){
        videos.push(match.previews.icon_with_video_preview.video_url)
       }
      
     })
     res.send(videos);
  })
  .catch(error => {
    res.send(error.message).status(500);
  });
})



// find the verbs in the paragraph using javascript


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})


