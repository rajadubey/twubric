import React from 'react';
import './App.css';
import {userList} from './data/users';
import User from "./components/user";

const TWUBRIC_SCORE = "Twubric Score";
const FRIENDS = "Friends";
const INFLUENCES = "Influences";
const CHIRPINESS = "Chirpiness";


export default function App(props) {
    const [users, setUsers] = React.useState(userList);

    const getFormattedDate = (totalSeconds) =>{ // taking ref of epoch time, it retuns an array of day, month and year
        const dateObj = new Date(totalSeconds);
        const date = dateObj.getDate();
        const month = dateObj.getMonth()+1;
        const year = dateObj.getFullYear();
        return [date, month, year];
    }

    const sortUserList = (key) =>{ //soring user according to the give twubric scores

        let newUserList = [...users];
        if(key === TWUBRIC_SCORE){
            newUserList.sort((user1, user2) => user1.twubric.total - user2.twubric.total);
        }
        else if(key === FRIENDS){
            newUserList.sort((user1, user2) => user1.twubric.friends - user2.twubric.friends);
        }else if(key === INFLUENCES){
            newUserList.sort((user1, user2) => user1.twubric.influence - user2.twubric.influence);
        }else if(key === CHIRPINESS){
            newUserList.sort((user1, user2) => user1.twubric.chirpiness - user2.twubric.chirpiness);
        }
        setUsers(newUserList);
    }

    const handleUserDelete = (uid)=>{
        const newUserList = users.filter(user=> user.uid !== uid);
        setUsers(newUserList);
    }

    const handleStartDateChange = (event) =>{
        const [startYear, startMonth, startDay] = (event.target.value).split('-').map(d=>parseInt(d));
//        console.log(year, month, day);
        const newUserList = users.filter(user=> {
            const [userDay, userMonth, userYear] = getFormattedDate(user.join_date);
            if(userYear<startYear) return false;
            else{
                if(userMonth<startMonth) return false;
                else {
                    if(userDay<startDay) return false;
                }
            }
            return true;
        })
        setUsers(newUserList);
    }
    const handleEndDateChange = (event) =>{
        const [endYear, endMonth, endDay] = (event.target.value).split('-').map(d=>parseInt(d));
//        console.log(year, month, day);
        const newUserList = users.filter(user=> {
            const [userDay, userMonth, userYear] = getFormattedDate(user.join_date);
            if(userYear>endYear) return false;
            else{
                if(userMonth>endMonth) return false;
                else {
                    if(userDay>endDay) return false;
                }
            }
            return true;
        })
        setUsers(newUserList);
    }



    return (
        <div className='main-container'>
            <div className='controllers'>
                <div className='score-sort'>
                    <span>{'Sort By'}</span>
                    <div className='sort-buttons'>
                        <button onClick={()=>sortUserList(TWUBRIC_SCORE)}>{TWUBRIC_SCORE}</button>
                        <button onClick={()=>sortUserList(FRIENDS)}>{FRIENDS}</button>
                        <button onClick={()=>sortUserList(INFLUENCES)}>{INFLUENCES}</button>
                        <button onClick={()=>sortUserList(CHIRPINESS)}>{CHIRPINESS}</button>
                    </div>
                </div>
                <div className='join-sort'>
                    <span>{'Joined Twitter between'}</span>
                    <div className='join-sort-dates'>
                        <span>Start Date &nbsp;
                                <input type={'date'}  onChange={handleStartDateChange}/>
                        </span>
                        <span>End Date &nbsp;
                                <input type={'date'} onChange={handleEndDateChange}/>
                        </span>
                    </div>
                </div>
            </div>
            <div className='users'>
                {users.map((user)=>(
                    <User key={user.uid} user={user} handleDelete={handleUserDelete}/>

                ))}
            </div>
        </div>
    );
}
