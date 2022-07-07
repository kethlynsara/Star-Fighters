import { Request, Response } from "express";

export async function validateUsernames(req: Request, res: Response, next) {
    const { firstUser, secondUser }: {firstUser: string, secondUser: string}= req.body;

    if (!firstUser || !secondUser) {
        return res.sendStatus(422);
    }

    next();
}