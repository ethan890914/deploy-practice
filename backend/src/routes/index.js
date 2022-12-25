import { Router } from "express";
import ScoreCardRouter from "./scoreCard"

const router = Router();
router.use('/api', ScoreCardRouter);

export default router;