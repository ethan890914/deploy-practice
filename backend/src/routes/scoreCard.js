import { Router } from "express";
import scoreCardController from "../controller/scoreCardController";

const ScoreCardRouter = Router();
ScoreCardRouter.delete("/cards", scoreCardController.deleteDB);
ScoreCardRouter.post("/card", scoreCardController.create);
ScoreCardRouter.post("/cards", scoreCardController.query);

export default ScoreCardRouter;