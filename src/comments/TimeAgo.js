import React from 'react';
import { fromUnixTime, formatDistanceToNow } from 'date-fns';

export const TimeAgo = ({ timeStamp }) => {
    let timeAgo = '';
    if (timeStamp) {
        const date = fromUnixTime(timeStamp);
        const timePeriod = formatDistanceToNow(date);
        timeAgo = `${timePeriod} ago`
    }

    return (
        <span style={{fontSize: '0.7em', color: '#ccc', marginLeft: -5}} title={timeStamp}>
             &nbsp; <i>{timeAgo}</i>
        </span>
    )
}
