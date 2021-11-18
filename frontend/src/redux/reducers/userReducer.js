import {
  SET_USER
} from '../actions/userActions'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, action.info)
    default:
      return state
  }
}
export default userReducer