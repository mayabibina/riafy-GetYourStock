const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const request = require('request')
const axios = require('axios');
const cheerio = require('cheerio');
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {




  const getPostTitles = async () => {
    try {
      const { data } = await axios.get(
        'https://www.screener.in/screens/178/Growth-Stocks/'
      );
      const $ = cheerio.load(data);
      const postTitles = [];
  
     const datarecord= $(".data-table>tbody")[0].children;
     for(i=1;i<datarecord.length;i++){
        const postTitle =datarecord[i].innerText;
        postTitles.push(postTitle);
      };
  
      return postTitles;
    } catch (error) {
      throw error;
    }
  };
  
  var post=getPostTitles()
  .then((postTitles) => console.log(postTitles));



  res.json(post);
});

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});