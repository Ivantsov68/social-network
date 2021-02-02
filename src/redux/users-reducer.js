import { usersAPI } from "../api/api";

const FOLLOW = 'user-reducer/FOLLOW';
const UNFOLLOW = 'user-reducer/UNFOLLOW';
const SET_USERS = 'user-reducer/SET-USERS';
const SET_CURRENT_PAGE = 'user-reducer/SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'user-reducer/SET-TOTAL-USERS-COUNT';
const TOOGLE_IS_FETCHING = 'user-reducer/TOOGLE-IS-FETCHING';
const TOOGLE_IS_FOLLOWING_PROGRESS = 'user-reducer/TOOGLE-IS-FOLLOWING-PROGRESS';

let initialState = {
   users: [],
   pageSize: 10,
   totalUsersCount: 0,
   currentPage: 1,
   isFetching: false,
   followingInProgress: []
};


const usersReducer = (state = initialState, action) => {

   switch (action.type) {
      case FOLLOW:
         return {
            ...state,
            users: state.users.map(u => {
               if (u.id === action.userId) {
                  return { ...u, followed: true }
               }
               return u;
            })
         }

      case UNFOLLOW:
         return {
            ...state,
            users: state.users.map(u => {
               if (u.id === action.userId) {
                  return { ...u, followed: false }
               }
               return u;
            })
         }

      case SET_USERS:
         return { ...state, users: action.users }

      case SET_CURRENT_PAGE:
         return { ...state, currentPage: action.currentPage }

      case SET_TOTAL_USERS_COUNT:
         return { ...state, totalUsersCount: action.count }

      case TOOGLE_IS_FETCHING:
         return { ...state, isFetching: action.isFetching }

      case TOOGLE_IS_FOLLOWING_PROGRESS:
         return {
            ...state, followingInProgress: action.isFetching
               ? [...state.followingInProgress, action.userId]
               : state.followingInProgress.filter(id => id != action.userId)
         }

      default:
         return state;
   }
}

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });
export const toogleIsFetching = (isFetching) => ({ type: TOOGLE_IS_FETCHING, isFetching });
export const toogleFollowingProgress = (isFetching, userId) => ({ type: TOOGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

export const getRequestUsers = (currentPage, pageSize) => {

   return (dispatch) => {

      dispatch(toogleIsFetching(true));
      dispatch(setCurrentPage(currentPage));

      usersAPI.getRequestUsers(currentPage, pageSize).then(data => {
         dispatch(toogleIsFetching(false));
         dispatch(setUsers(data.items));
         dispatch(setTotalUsersCount(data.totalCount));
      });
   }
};
export const follow = (userId) => {

   return async (dispatch) => {

      dispatch(toogleFollowingProgress(true, userId));
      let response = await usersAPI.follow(userId)

      if (response.data.resultCode == 0) {
         dispatch(followSuccess(userId));
      }
      dispatch(toogleFollowingProgress(false, userId));
   }
}

export const unfollow = (userId) => {

   return async (dispatch) => {

      dispatch(toogleFollowingProgress(true, userId));
      let response = await usersAPI.unfollow(userId)

      if (response.data.resultCode == 0) {
         dispatch(unfollowSuccess(userId));
      }
      dispatch(toogleFollowingProgress(false, userId));
   }
}

export default usersReducer;