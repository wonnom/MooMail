import express from "express";
import {spawn} from "child_process";


const app = express();
const port = 3000;

app.use(express.static("public"));

app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
})

app.get("/", (req,res)=>{
    const python = spawn('python', ['../client.py']);
    let mystr = '';
    let parsedData = [];

    python.stdout.on('data', (data) => {
    mystr += data.toString();
    
    
    // myjson = JSON.parse(mystr);
    // console.log(`JSON is: ${myjson}`);
    // console.log(myjson.assets);
  });
    
 
  python.stdout.on('end', () => {
    const lines = mystr.trim().split('\n');
    const middleLines = lines.slice(1,-1);

    // console.log('Final output:', middleLines);
    parsedData = JSON.parse(middleLines);
    // console.log('parsed output:', parsedData);

    console.log('user_id: ', parsedData[0].user_id);
    console.log('currency: ', parsedData[1].currency);
    console.log('total assets: ', parsedData[2].assets);
    console.log('unrealized_pl: ', parsedData[3].unrealized_pl);
    console.log('cash_bp: ', parsedData[4].cash_bp);
    console.log('positions: ', parsedData[5]);

});

  

  python.stderr.on('data', (err) => {
    console.error('Python error:', err.toString());
  });

  python.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).send('Python script failed');
    };



    res.render("index.ejs", {
        updatedDate: new Date(),
        user_id: parsedData[0].user_id,
        currency: parsedData[1].currency,
        Total_assets: parsedData[2].assets,
        unrealized_pl: parsedData[3].unrealized_pl,
        cash_bp: parsedData[4].cash_bp,
        holdings: parsedData[5]
    }); 

});

});