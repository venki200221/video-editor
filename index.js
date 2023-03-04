const { Deepgram } = require("@deepgram/sdk");
const express=require('express');
const app=express();
const openai=require("openai");
const bodyParser=require('body-parser');
const axios=require("axios");


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));



app.get('/',(req,res)=>{
    res.send('Hello World');
});

var words=[];

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
            words.push(word.word);
        })
      let trans=response.results.channels[0].alternatives[0].topics;
      res.send(words);
    }
    catch(err){
        res.send(err);
}
});


app.get("/image",(req,res)=>{

  const url = 'https://api.envato.com/v1/discovery/search/search/item?term=aws,type=stock-video';
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






app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})


