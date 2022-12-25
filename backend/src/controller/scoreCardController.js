import ScoreCard from '../models/ScoreCard'

export default{
  create: async (req, res) => {
    console.log("add" + req.body.name)
    let existing = await ScoreCard.findOne({name: req.body.name, subject: req.body.subject});
    if (existing) {
      try {
        const filter = {name: req.body.name, subject: req.body.subject};
        const update = { $set: {score: req.body.score}}; 
        const updatedCard = await ScoreCard.updateOne(filter, update)
        const person = await ScoreCard.find({
          name: req.body.name
        })
        res.json({message: `Updating(${req.body.name},${req.body.subject},${req.body.score})`, 
                  card: updatedCard,
                  info: person}).send();
      } catch(e) {
        throw new Error("ScoreCard update error: " + e);
      }
    }else if (!existing) {
      try {
        const newScoreCard = new ScoreCard({ name: req.body.name, score: req.body.score, subject: req.body.subject});
        const createdCard = await newScoreCard.save();
        const person = await ScoreCard.find({
          name: req.body.name
        })
        res.json({message: `Adding(${createdCard.name},${createdCard.subject},${createdCard.score})`, card: createdCard, info: person}).send();
      } catch (e) { 
        throw new Error("ScoreCard creation error: " + e); 
      }
    }
   
    },

  deleteDB: async (req, res) => {
    try {
      await ScoreCard.deleteMany({});
      console.log("Database deleted");
    } catch (e) { 
      throw new Error("Database deletion failed"); 
    }
    res.json({message: "Database deleted"}).send();
  },

  query: async(req, res) => {
    
    console.log("query")
    try {
      const findResult = await ScoreCard.find({
        [req.body.type]: req.body.queryString
      })
      if(findResult.length > 0){
        const returnMsg = await ScoreCard.handleFindResults(req.body.type, findResult);
        res.json({messages: returnMsg, message: `${req.body.type}(${req.body.queryString}) not found!`, info: findResult}).send();  
      }else{
        res.json({messages: [], message: `${req.body.type}(${req.body.queryString}) not found!`, info: []}).send();
      }
    } catch(e){
      console.log(e)
    }
    
      
    }
  
}