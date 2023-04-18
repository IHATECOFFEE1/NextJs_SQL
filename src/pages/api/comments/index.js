import prisma from "@/lib/prisma";

export default async function handle(req, res) {

    if (req.method === 'GET') {
        const eventId = req.query.id;
        
        const comments = await prisma.comments.findMany(
            {
                where: {
                    event_ID: parseInt(eventId),
                },
            }
        );
        res.json(comments);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
