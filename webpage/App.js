import express from "express";
import { spawn } from "child_process";
import { getRandomQuote } from "./quotes.js";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import ejs from "ejs";
import juice from "juice";
import fs from "fs";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

function getPortfolioData() {
  return new Promise((resolve, reject) => {
    const python = spawn("python", ["../client.py"]);
    let mystr = "";
    let parsedData = [];

    python.stdout.on("data", (data) => {
      mystr += data.toString();
    });

    python.stdout.on("end", () => {
      try {
        const lines = mystr.trim().split("\n");
        const middleLines = lines.slice(1, -1);
        parsedData = JSON.parse(middleLines);

        const portfolioData = {
          updatedDate: new Date(),
          dailyQuote: getRandomQuote(),
          user_id: parsedData[0].user_id,
          currency: parsedData[1].currency,
          Total_assets: parsedData[2].assets,
          unrealized_pl: parsedData[3].unrealized_pl,
          cash_bp: parsedData[4].cash_bp,
          holdings: parsedData[5],
          pie_chart: parsedData[6],
        };

        resolve(portfolioData);
      } catch (error) {
        reject(new Error(`Failed to parse Python output: ${error.message}`));
      }
    });

    python.stderr.on("data", (err) => {
      console.error("Python error:", err.toString());
      reject(new Error(`Python script error: ${err.toString()}`));
    });

    python.on("close", (code) => {
      if (code !== 0) {
        reject(new Error("Python script failed"));
      }
    });
  });
}


app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});


app.get("/", async (req, res) => {
  try {
    const portfolioData = await getPortfolioData();
    res.render("index.ejs", portfolioData);
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    res.status(500).send("Failed to load portfolio data");
  }
});


app.post("/send", async (req, res) => {
  const email = req.body["email"];
  const password = req.body["appPassword"];
  console.log(email);
  console.log(password);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });

    const emailData = await getPortfolioData();
    const htmlContent = await ejs.renderFile("./views/mail.ejs", emailData);
    const cssContent = fs.readFileSync("./public/styles/styles.css", "utf8");

    const inlinedHTML = juice.inlineContent(htmlContent, cssContent);

    const mailOptions = {
      from: email,
      to: email,
      subject: "MooMail Summary",
      html: inlinedHTML,
      text: "email client does not support HTML",
    };


      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully!");
      console.log("Message sent:", info.messageId);

      

      res.json({ success: true, message: "Email sent successfully!" });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});
