import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
    const { eventName, start_Time, end_Time, type, rso, locations_LName, description } = req.body;
    // create with prisma

    const event = await prisma.events.create({
        data: {
            events_Name: eventName,
            start_Time: start_Time,
            end_Time: end_Time,
            type: type,
            rso: rso,
            locations_LName: locations_LName,
            description: description,

        },
    });
    // return the user
    res.json(event);
}