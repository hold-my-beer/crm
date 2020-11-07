import { combineReducers } from 'redux';
import auth from './auth';
import constant from './constant';
import alert from './alert';
import opportunity from './opportunity';
import company from './company';
import broker from './broker';
import reinsurer from './reinsurer';
import user from './user';
import del from './del';

export default combineReducers({
  auth,
  constant,
  alert,
  opportunity,
  company,
  broker,
  reinsurer,
  user,
  del
});
