import { createSelector } from 'reselect';

const getCurrentUserId = state => state.auth.currentUserId;
const getUsersById = state => state.users.byId;
const getUser = (state, props) => state.users.byId[props.id];

export const selectCurrentUser = createSelector(
  [getCurrentUserId, getUsersById],
  (currentUserId, usersById) => usersById[currentUserId]
);

export const getUserById = createSelector([getUser], user => user);
