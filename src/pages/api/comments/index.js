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
    } else if (req.method === 'POST') {
        const { comments, user, id } = req.body;
        
        const newComment = await prisma.comments.create({
            data: {
                comments: comments,

                written_By : {
                    connect: { id: parseInt(user) },
                },
                events: {
                    connect: { events_ID: parseInt(id) },
                },
                rating: 0,
            },
        });
        res.json(newComment);
    } else if (req.method === 'PATCH') {
        const { comment, event_ID, user_ID, rating } = req.body;
        const updatedComment = await prisma.comments.update({
            where: {
                event_ID_user_ID: {
                    event_ID: event_ID,
                    user_ID: user_ID,
                },
            },
            data: {
                comments: comment,
                rating: rating,
            },
        });
        res.json(updatedComment);
    } else if (req.method === 'DELETE') {
        const deletedComment = await prisma.comments.delete({
            where: {
                comments_ID: parseInt(req.query.id),
            },
        });
        res.json(deletedComment);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
