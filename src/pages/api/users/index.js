import prisma from "@/lib/prisma";

export default async function handle(req, res) {
    

    // create with prisma

    if (req.method === 'POST') {
        try {
            const { email, name, username, password, type, rso } = req.body;

            const user = await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    username: username,
                    password: password,
                    type: type,
                    rso: rso,

                },
            });
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'GET') {
        
        const userId = req.query.id;
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: parseInt(userId),
                },
            });
            res.json(user);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    
    } else if (req.method === 'PATCH') {
        const { rso } = req.body;
        const id = req.query.id;
        try {
            const user = await prisma.user.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    rso: rso,
                },
            });
            res.json(user);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
        
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
