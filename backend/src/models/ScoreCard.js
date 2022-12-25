import mongoose from "mongoose";

const Schema = mongoose.Schema;
let ScoreCardSchema = new Schema({
    // _id: Number,
    name: String,
    score: Number,
    subject: String,
});

ScoreCardSchema.statics.handleFindResults = function(type, results) {
    let ret = [];
    results.forEach(element => {
        ret.push(`Find card with ${type}: (${element.name}, ${element.subject}, ${element.score})`)
    });
    return ret;
}

const ScoreCard = mongoose.model('ScoreCard', ScoreCardSchema);
export default ScoreCard