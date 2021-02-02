import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators';
import { Textarea } from '../../common/FormsControls/FormsControl';


const Dialogs = (props) => {

   let state = props.dialogsPage;

   let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} images={d.src} />);
   let messagesElements = state.messages.map(m => <Message message={m.message} />);

   let addNewMessage = (values) => {
      props.sendMessage(values.newMessageBody);
   }

   if (!props.isAuth) return <Redirect to='/login' />;

   return (
      <div className={classes.dialogs}>
         <div className={classes.dialogsItems}>
            {dialogsElements}
         </div>
         <div className={classes.messages}>
            <div>{messagesElements}</div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
         </div>
      </div>

   )
}

const maxLength15 = maxLengthCreator(15);

const AddMessageForm = (props) => {
   return (
      <form onSubmit={props.handleSubmit}>
         <div>
            <Field component={Textarea} name='newMessageBody' placeholder='Enter your message' 
                  validate={[required, maxLength15]} />
         </div>
         <div><button>Send</button></div>
      </form>
   )
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)

export default Dialogs;