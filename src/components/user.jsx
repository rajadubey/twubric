import React from 'react';
import './user.css';

export default function User(props) {
    const {user, handleDelete} = props;
    const getFormattedDate = (totalSeconds)=>{
        const date = new Date(totalSeconds).toString().split(' ');
        return `${date[2]} ${date[1]}, ${date[3]}`;
    }

    return (
        <div className='user-card'>
            <div className='user-info'>
                <span>{user.username}</span>
                <span>{user.twubric.total}</span>
            </div>
            <div className='user-body'>
                <div className='user-criteria'>
                    <div>
                        <span>{user.twubric.friends}</span>
                        <span>{'Friends'}</span>
                    </div>
                    <div>
                        <span>{user.twubric.influence}</span>
                        <span>{'Influence'}</span>
                    </div>
                    <div>
                        <span>{user.twubric.chirpiness}</span>
                        <span>{'chirpiness'}</span>
                    </div>

                </div>
                <div className='user-control'>
                    <div className='join-date'>
                        {getFormattedDate(user.join_date)}
                    </div>
                    <div className='remove-btn'>
                        <button onClick={()=>props.handleDelete(user.uid)}>Remove</button>
                    </div>
                </div>

            </div>

        </div>
    );
}
