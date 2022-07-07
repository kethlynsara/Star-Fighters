import { Request, Response } from "express";

export async function handleError(error, req: Request, res: Response, next) {
    console.log('error', error);
    if (error.type === "not found") {
        return res.status(404).send("Not found");
    }
    return res.status(500).send("Internal Server Error");
}