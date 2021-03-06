import React, { useState } from 'react';
import Preloader from '../../../common/loading/Preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import userPhoto from '../../../assets/images/user.png';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = (props) => {

   const [editMode, setEditMode] = useState(false);

   if (!props.profile) {
      return <Preloader />
   }

   const onMainPhotoSelected = (e) => {
      if (e.target.files.length) {
         props.savePhoto(e.target.files[0]);
      }
   }

   const onSubmit=(formData) => {
      props.saveProfile(formData).then(
         ()=>{
            setEditMode(false)
         }
      ) 
   }

   return (
      <div>
         <div>
            <img className={classes.Img} src='https://i.ytimg.com/vi/RtLRMAMzzKk/maxresdefault.jpg' />
         </div>
         <div className={classes.descriptionBlock}>
            <img src={props.profile.photos.large || userPhoto} className={classes.mainPhoto} />
            <br /> {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
            {editMode
               ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
               : <ProfileData goToEditMode={()=>{setEditMode(true)}} profile={props.profile} isOwner={props.isOwner} />}
            <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
         </div>

      </div>
   )
}

const ProfileData = (props) => {
   return (
      <div>
         {props.isOwner && <div><button onClick={props.goToEditMode}>Edit</button></div>}
         <div>
            <b>Full name</b>: {props.profile.fullName}
         </div>
         <div>
            <b>Looking for a job</b>: {props.profile.lookingForAJob ? 'yes' : 'no'}
         </div>
         {props.profile.lookingForAJob &&
            <div>
               <b>My professional skills</b> : {props.profile.lookingForAJobDescription}
            </div>}
         <div>
            <b>About me</b>: {props.profile.aboutMe}
         </div>
         <div>
            <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
               return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
            })}
         </div>
      </div>
   )
}


const Contact = ({ contactTitle, contactValue }) => {
   return <div className={classes.contact}><b>{contactTitle}</b>:{contactValue}</div>
}

export default ProfileInfo;