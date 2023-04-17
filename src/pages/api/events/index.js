import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
    if (req.method === "POST") {
        const { events_Name, start_Time, end_Time, type, rso, at, description } = req.body;

        const event = await prisma.events.create({
            data: {
                events_Name: events_Name,
                start_Time: new Date(start_Time),
                end_Time: new Date(end_Time),
                type: type,
                rso: rso,
                description: description,
                locations_LName: {
                    connect: { lName: at },
                }

            },
        });
        // return the user
        res.json(event);
    } else if (req.method === "GET") {
        const eventType = req.query.type;
        const events = await prisma.events.findMany({
            where: {
                type: eventType,
            },
        });
        res.json(events);
    }
    else {
        res.status(405).json({ error: "Method not allowed" });
    }

}