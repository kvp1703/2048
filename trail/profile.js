import React from 'react';
import {useState, useEffect} from 'react';
import Cover from './Cover.png'
import "./ProfileImage.css";
import { getProfile } from "./helper.js";


const Profile = () => {
    
    const [curId, setCurId] = useState(0);
    const [curName, setCurName] = useState(0);
    const [curTitle, setCurTitle] = useState(0);
    const [curEmail, setCurEmail] = useState();
    const [curPlace, setCurPlace] = useState('');
    const [curPoints, setCurPoints] = useState(0);
    const [curRank, setCurRank] = useState(0);
    const [curBadges, setCurBadges] = useState(0);
    const [curUpvotes, setCurUpvotes] = useState(0);
    const [curCategory, setCurCategory] = useState('');

    const loadProfile = () => {
        getProfile().then(data => {
            if (data.error) {
              setError(data.error);
            } else {
              setCurId(data.name);
              setCurEmail(data.email);
              setCurTitle(data.titles);
              setCurPoints(data.finalScore);
              setCurRank(data.rank);
              setCurBadges(data.totalBadgeScore);
              setCurUpvotes(data.upVoteScore);
              setCurCategory(data.token);
            }
        });
    }

  useEffect(() => {
    loadProfile();
  },[])

  return (
    <div className="Profile">
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={Cover} alt="" />
        
      </div>

      <div className="ProfileName">
        <span>{curName}</span>
        <span>Title:{curName}</span>
      </div>

      <div className="Information">
        <table>
        
        <tr>
          <th>User ID</th>
          <th>{curId}</th>
        </tr>
        <tr>
          <th>Email</th>
          <th>{curEmail}</th>
        </tr>
        <tr>
          <th>Place</th>
          <th>{curPlace}</th>
        </tr>
        <tr>
          <th>Points</th>
          <th>{curPoints}</th>
        </tr>
        <tr>
          <th>Rank</th>
          <th>{curRank}</th>
        </tr>
        
        <tr>
          <th>Badges</th>
          <th>{curBadges}</th>
        </tr>
        <tr>
          <th>Upvote</th>
          <th>{curUpvotes}</th>
        </tr>
        <tr>
          <th>Category of Interest</th>
          <th>{curCategory}</th>
        </tr>
      </table>      </div>
      
    </div>
    <div className="history">
    <h3> Consultation History</h3>
     <div className="center-col">
      <span>
      <ul>Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius;
    dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
    Hendrerit parturient habitant pharetra rutrum gravida porttitor eros feugiat. Mollis elit
    sodales taciti duis praesent id. Consequat urna vitae morbi nunc congue.</ul>
<ul>Lorem ipsum odor amet, consectetuer adipiscing elit. Primis eros nunc fringilla id rutrum nibh.
    Orci convallis pulvinar urna fusce at purus neque nam leo? Suspendisse semper facilisi
    parturient sit euismod placerat. Orci ante luctus praesent torquent orci commodo aptent blandit.
    Placerat arcu dui potenti; nullam taciti taciti amet.</ul>
    </span>
      
    </div>
    </div>
    </div>
  );
};

export default ProfileCard;

