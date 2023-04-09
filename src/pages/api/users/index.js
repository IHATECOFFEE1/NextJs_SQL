import prisma from "@/lib/prisma";

export default async function handle(req, res) {
    
    const { email, name, username, password, type, rso } = req.body;
    // create with prisma

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
    // return the user
    res.json(user);
    
}
