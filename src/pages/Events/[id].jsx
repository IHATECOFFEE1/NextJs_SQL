import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./EventProfile.module.scss";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";


function EventProfile () {
    const { data } = useSession();
    const router = useRouter();
    const { id } = router.query;
    const [eventList, setEventList] = useState([]);
    const [comments, setComments] = useState([]);
    const { register, handleSubmit, reset, formState } = useForm();

    function formatDateTime(dateTimeStr) {
        const dateTime = new Date(dateTimeStr);
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString();
        return `${date} at ${time}`;
    }

    const handle = async (comments) => {
        const res = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                comments: comments.comments,
                user: data.user.id,
            }),
        });
        const json = await res.json();
        setComments(comments => [...comments, json]);
        reset();
    }

    const handleDelete = async (id) => {
        const res = await fetch('/api/comments?id=' + id, {
            method: 'DELETE',
        });
        const json = await res.json();
        setComments(comments.filter(comment => comment.comments_ID !== json.comments_ID));
        console.log(json);
    }

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
        <div className={styles.eventProfile}>
            <div>
                <h1>{eventList.events_Name}</h1>
                <h2>{eventList.type}</h2>
                {eventList.rso && <h2>{eventList.rso}</h2>}
                <h2>{formatDateTime(eventList.start_Time)} - {formatDateTime(eventList.end_Time)}</h2>
                <h2>Location: {eventList.at}</h2>
                <h2>Description: </h2>
                <h2>{eventList.description}</h2>
            </div>
            <div>
                <h1>Create Comment</h1>
                <form onSubmit={handleSubmit(handle)}>
                    <label>Comment</label>
                    <input 
                        type="text"
                        name="comments"
                        placeholder="Comment"
                        {...register("comments", { required: true })}
                    />
                    <button>Submit</button>
                </form>
            </div>
            <div>
                <h1>Comments</h1>
                {comments.map((comment) => (
                    <div key={comment.event_ID}>
                        <h2>{comment.user_ID}</h2>
                        <h2>{comment.comments}</h2>
                        {data && data.user.id === comment.user_ID && 
                            <div>
                                <button onClick={() => handleDelete(comment.comments_ID)}> Delete </button>
                                <button> Edit </button>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>

    );
}

export default EventProfile;
