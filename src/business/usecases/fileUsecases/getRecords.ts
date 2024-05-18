import { Request, Response } from "express";
import { getRecordsFromDB } from "../../../adapters/data-access/repositories/documentRepository";
import { getUserIdByEmail } from "../../../adapters/data-access/repositories/userRepositories";

import { Types } from 'mongoose';

export async function getRecords(req: Request, res: Response) {
    try {
        const email = req.query.email;

        const userId: Types.ObjectId | null = await getUserIdByEmail(email);
        if (userId) {
            const records = await getRecordsFromDB(userId);
            if (records) res.status(200).json(records)
        } else {
            throw new Error("User not found in the database");
        }
    } catch (error) {
        console.error("Error fetching records:", error);
        throw error;
    }
}
