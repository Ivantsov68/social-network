import { connect } from 'react-redux';
import { compose } from 'redux';
import { witAuthRedirect } from '../../hoc/withAuthRedirect';
import {sendMessageCreater } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';


let mapStateToProps = (state) => {
   return {
      dialogsPage: state.dialogsPage
   }
}
let mapDispatchToProps = (dispatch) => {
   return {
      sendMessage: (newMessageBody) => {
         dispatch(sendMessageCreater(newMessageBody));
      }
   }
}

export default compose (
   connect(mapStateToProps, mapDispatchToProps),
   witAuthRedirect
) (Dialogs);
