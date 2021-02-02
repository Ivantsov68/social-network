import React, { useEffect, useState } from 'react';

export const ProfileStatus = (props) => {

   const [editMode, setEditMode] = useState(false);
   const [status, setStatus] = useState(props.status);

   useEffect( () => {
      setStatus(props.status);
   }, [props.status]);

   const activateEditMode = () => {
      setEditMode (true);
   }

   const deactivateEditMode = () => {
      setEditMode (false);
      props.updateStatus(status);
   }

   const onStatusChange = (e) => {
      setStatus(e.currentTarget.value);
   }
   
   return (
      <div>
         {!editMode &&
            <div>
               <b>Status:</b> <span onDoubleClick={activateEditMode}>{status || '*****'}</span>
            </div>
         }
         {editMode &&
            <div>
               <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
            </div>
         }
      </div>
   )
}


export default ProfileStatus;