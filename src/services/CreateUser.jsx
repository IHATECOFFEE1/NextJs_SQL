import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser(data) {
    const user = await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            username: data.username,
            password: data.password,
            type: data.type,
            rso: data.rso,
        },
    });

    return user;
}

export default createUser;
