import { combineReducers } from 'redux';
import auth from './auth';
import constant from './constant';
import alert from './alert';
import opportunity from './opportunity';
import lead from './lead';
import contract from './contract';
import company from './company';
import broker from './broker';
import reinsurer from './reinsurer';
import entity from './entity';
import activityType from './activityType';
import user from './user';
import del from './del';

export default combineReducers({
  auth,
  constant,
  alert,
  opportunity,
  lead,
  contract,
  company,
  broker,
  reinsurer,
  entity,
  activityType,
  user,
  del
});
