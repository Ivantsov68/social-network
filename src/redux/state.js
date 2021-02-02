import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
   _callsubscriber() {
      console.log('State changed')
   },
   _state: {
      profilePage: {
         posts: [
            { id: 1, message: 'Hi, how are you?', likeCount: 15 },
            { id: 2, message: 'It`s my first post', likeCount: 25 },
            { id: 3, message: 'I`m fine', likeCount: 10 },
            { id: 4, message: 'I can fly', likeCount: 35 },
         ],
         newPostText: 'dimas'
      },
      dialogsPage: {
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
         ],
         newMessageBody: ''
      },
      sideber: {}
   },

   getState() {
      return this._state
   },
   subscribe(observer) {
      this._callsubscriber = observer;
   },

   dispatch(action) {
      profileReducer(this._state.profilePage, action);
      dialogsReducer(this._state.dialogsPage, action);
      sidebarReducer(this._state.sitebar, action);

      this._callsubscriber(this._state);
      
   }
}


export default store;
window.store = store;