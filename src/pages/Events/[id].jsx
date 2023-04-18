import { useRouter } from "next/router";
import { useEffect, useState } from "react";


function EventProfile () {
    const router = useRouter();
    const { id } = router.query;
    const [eventList, setEventList] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        
        
        const getEvents = async () => {
            const eventFromServer = await fetch('/api/events?id=' + id);
            const eventS = await eventFromServer.json();
            setEventList(eventS);
        }
        
        const getComments = async () => {
            const commentsFromServer = await fetch('/api/comments?id=' + id);
            const commentsS = await commentsFromServer.json();
            setComments(commentsS);
        }

        if (id) {
            getEvents();
            getComments();
        }
        
    }, [id]);

    return (
        <div className="eventProfile">
            <div>
                <h1> {id} </h1>
                <h1>{eventList.events_Name}</h1>
                <h2>{eventList.type}</h2>
                {eventList.rso && <h2>{eventList.rso}</h2>}
                <h2>{eventList.start_Time} - {eventList.end_Time}</h2>
                <h2>{eventList.description}</h2>
            </div>
            <div>
                <h1>Comments</h1>
                {comments.map((comment) => (
                    <div key={comment.event_ID}>
                        <h2>{comment.comments}</h2>
                        <h2>{comment.user_ID}</h2>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default EventProfile;
