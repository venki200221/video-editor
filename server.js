const { Deepgram } = require("@deepgram/sdk");
const express = require("express");
const app = express();
const openai = require("openai");
const bodyParser = require("body-parser");
const axios = require("axios");
const { json } = require("body-parser");

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended:false,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

let adjectives = [];
let words = [];
let verbs = [];
let largestWord = "";
var topics = [];
var videos = [];


app.post("/", async (req, res) => {
  try {
    const url = req.body.url;
    const deepgram = new Deepgram("ecd31834c4e1c18f545ac8a4d1b06d8151197352");
    const fileSource = { url: url };
    const response = await deepgram.transcription.preRecorded(fileSource, {
      punctuate: true,
      detect_topics: true,
    });
    let getwords = response.results.channels[0].alternatives[0].words;
    getwords.forEach((word) => {
      words.push(word.word); 
    });

    let trans = response.results.channels[0].alternatives[0].topics;
    console.log(trans);
    topic_array = response.results.channels[0].alternatives[0].topics;
    topic_array.forEach((topic) => {
      
      topic.topics.forEach((t) => {
        topics.push(t.topic);
      });
    });
    res.send(response);
    // res.send(topics);
  } catch (err) {
    res.send(err);
  }
});


app.get("/image", async (req, res) => {
  if (topics) {
    try{
    
      console.log(topics);

      for (const topic of topics) {
        const url = `https://api.envato.com/v1/discovery/search/search/item?term=${topic}`;
        const headers = { Authorization: "Bearer TBR7vSbLt5ABo9Y5NFbxFYMnAvCYF887" };

        const response = await axios.get(url, { headers });

        for (const match of response.data.matches) {
          if (match.previews.icon_with_video_preview && match.previews.icon_with_video_preview.image_urls) {
            for (const imgurl of match.previews.icon_with_video_preview.image_urls) {
              videos.push(imgurl.url);

            }   
          }   

        }   

      }
      if(videos.length > 0){
      res.send(videos); 
    }
      else{
        res.send("No images found").status(404);
      }
    } catch(err){   
      res.send(err).status(500);  
    }    

  }   
});    

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


