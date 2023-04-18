import { useState, useEffect } from 'react';
import styles from './Events.module.scss';
import Router from 'next/router';
import { Link } from 'next/link';



function Events() {
    const [privateEvents, setPrivateEvents] = useState([]);
    const [publicEvents, setPublicEvents] = useState([]);
    const [rsoEvents, setRsoEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('private'); 
    
    // default to private events tab
    function formatDateTime(dateTimeStr) {
        const dateTime = new Date(dateTimeStr);
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString();
        return `${date} at ${time}`;
    }

    useEffect(() => {
        async function fetchEvents() {
            // Fetch private events
            const privateResponse = await fetch('/api/events?type=private');
            const privateData = await privateResponse.json();
            setPrivateEvents(privateData);

            // Fetch public events
            const publicResponse = await fetch('/api/events?type=public');
            const publicData = await publicResponse.json();
            setPublicEvents(publicData);

            // Fetch RSO events
            const rsoResponse = await fetch('/api/events?type=rso');
            const rsoData = await rsoResponse.json();
            setRsoEvents(rsoData);
        }

        fetchEvents();
    }, []);

    function handleTabClick(tab) {
        setActiveTab(tab);
    }

    let eventsToRender = [];

    if (activeTab === 'private') {
        eventsToRender = privateEvents;
    } else if (activeTab === 'public') {
        eventsToRender = publicEvents;
    } else if (activeTab === 'rso') {
        eventsToRender = rsoEvents;
    }

    return (
        <div className={styles.events}>
            <button onClick={() => Router.replace("/Protected")}>
                Hpme Page
            </button>
            <h1>Events</h1>
            <div className={styles.eventTabs}>
                <button onClick={() => handleTabClick('private')}>Private Events</button>
                <button onClick={() => handleTabClick('public')}>Public Events</button>
                <button onClick={() => handleTabClick('rso')}>RSO Events</button>
            </div>
            {eventsToRender.length === 0 && <p>No events to display</p>}
            
            <ul className={styles.eventList}>
                {eventsToRender.map(event => (
                    <li>
                        
                        <div key={event.id} className={styles.event}>
                               
                            <h2>{event.events_Name}</h2>
                            
                            Date: {formatDateTime(event.start_Time)} - {formatDateTime(event.end_Time)}
                            <br />
                            Location: {event.at}
                            <p>{event.description}</p>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Events;