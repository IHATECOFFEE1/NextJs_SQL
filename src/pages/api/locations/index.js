import prisma from "@/lib/prisma";

export default async function handle(req, res) {

    if (req.method === 'GET') {
        const locations = await prisma.location.findMany();
        res.json(locations);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
