import { Request, Response } from "express";

export async function handleError(error, req: Request, res: Response, next) {
    console.log('error', error);
    return res.status(500).send("Internal Server Error");
}