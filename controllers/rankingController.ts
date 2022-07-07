import { Request, Response } from "express";
import { rankingService } from "../services/rankingService.js";

export async function getRanking(req: Request, res: Response) {
    const list = await rankingService.getRanking();
    res.send({
        fighters: list
    })
}