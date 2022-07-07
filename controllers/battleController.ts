import { Request, Response } from "express";
import { battleService } from "../services/battleService.js";


export async function postBattle(req: Request, res: Response) {
    const { firstUser, secondUser }: {firstUser: string, secondUser: string}= req.body;

    const result = await battleService.postBattle(firstUser, secondUser);
    
    if (result) {
        return res.send(result);
    } else {
        return res.status(404).send("User not found!");
    }
}