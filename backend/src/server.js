import cors from 'cors'
import express from 'express'
import db from './db';
import router from './routes/index';
import ScoreCardRouter from './routes/scoreCard';
import bodyParser from 'body-parser'
import path from "path"
const port = process.env.PORT || 4000;

const app = express();
if (process.env.NODE_ENV == "development")
    app.use(cors());
app.use(bodyParser.json());
app.use('/', router);


if (process.env.NODE_ENV == "production"){
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function(req, res){
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"))
    })
}

app.listen(port, () => {
    console.log(`Listening at port ${port}!`)
});

db.connect();