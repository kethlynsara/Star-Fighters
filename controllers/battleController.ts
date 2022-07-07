import { Request, Response } from "express";
import { battleService } from "../services/battleService.js";


export async function postBattle(req: Request, res: Response) {
    const { firstUser, secondUser }: {firstUser: string, secondUser: string}= req.body;

    console.log(firstUser, secondUser)

    const stars = await battleService.postBattle(firstUser, secondUser);
    
    if (stars) {
        return res.send(stars);
    } else {
        return res.status(404).send("User not found!");
    }
}