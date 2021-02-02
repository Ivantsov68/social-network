import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Textarea } from '../../../common/FormsControls/FormsControl';
import { required } from '../../../utils/validators';
import styles from '../../../common/FormsControls/FormsControls.module.css'

const ProfileDataForm = (props) => {
   return (
      <form onSubmit={props.handleSubmit}>
         <div><button>Save</button></div>
         {props.error && <div className={styles.formSummaryError}>
         {props.error}
         </div>
         }
         <div>
            <b>Full name</b>:
            <Field placeholder={'Fullname'} name={'fullName'} component={Input} validate={[required]} />
         </div>
         <div>
            <b>Looking for a job</b>:
            <Field name={'lookingForAJob'} component={Input} validate={[required]} type='checkbox' />
         </div>
         <div>
            <b>My professional skills</b> : <Field placeholder={'My professional skills'}
               name={'lookingForAJobDescription'} component={Textarea} validate={[required]} type='textarea' />
         </div>
         <div>
            <b>About me</b>: <Field placeholder={'About me'}
               name={'aboutMe'} component={Textarea} validate={[required]} type='textarea' />
         </div>
         <div>
            <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
               return <div key={key}>
                  <b>{key}: <Field placeholder={key}
                     name={'contacts.' + key} component={Input}  /> </b>
               </div>
            })}
         </div>
      </form>
   )
}

const ProfileDataFormReduxForm = reduxForm({ form: 'edit-profile' })(ProfileDataForm)

export default ProfileDataFormReduxForm;