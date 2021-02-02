const SEND_MESSAGE = 'dialogs-reducer/SEND-MESSAGE';

let initialState = {
   messages: [
      { id: 1, message: 'Hi' },
      { id: 2, message: 'How are you' },
      { id: 3, message: 'Yo' },
      { id: 4, message: 'Yo' },
      { id: 5, message: 'Yo' }
   ],
   dialogs: [
      { id: 1, name: 'Dima', src: 'https://yt3.ggpht.com/a/AATXAJzvllV-xA9r3dw4EvsFiHQGDsjA7SHfRszdC4l_2g=s900-c-k-c0xffffffff-no-rj-mo' },
      { id: 2, name: 'Vadim', src: 'https://www.ejin.ru/wp-content/uploads/2018/11/avatarki_dlya_devushek_4_19105932.jpg' },
      { id: 3, name: 'Vanya', src: 'https://pbs.twimg.com/profile_images/913861131005022209/iaBdZZn1.jpg' },
      { id: 4, name: 'Nikita', src: 'https://i03.fotocdn.net/s119/11a097ff366bfb24/user_l/2713047325.jpg' },
      { id: 5, name: 'Leha', src: 'https://topwar.ru/uploads/posts/2014-07/thumbs/1404711070_art-krasivye-kartinki-putin-politika-1331294.jpeg' }
   ]
};

const dialogsReducer = (state = initialState, action) => {

   switch (action.type) {
      case SEND_MESSAGE:
         let body = action.newMessageBody;
         return {
            ...state,
            messages: [...state.messages, { id: 6, message: body }]
         }
      default:
         return state;
   }
}


export const sendMessageCreater = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody });

export default dialogsReducer;