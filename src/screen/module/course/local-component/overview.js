import React from 'react';
import { useParams } from "react-router-dom";

export default function CourseOverview() {
    const { id } = useParams()
    return <div className="overview-container col" >
        <div className='overview-header row' style={{justifyContent: 'space-between'}}>
            <div></div>
            <div className='card-button-2 row'></div>
        </div>
    </div>
}