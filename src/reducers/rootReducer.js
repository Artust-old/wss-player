
import { combineReducers } from 'redux';
import errors from './errorsReducer';
import media from './mediaReducer';
import playSettings from './playSettingsReducer';
import webrtcPlay from './webrtcPlayReducer';

const rootReducer = combineReducers({
  errors,
  media,
  playSettings,
  webrtcPlay,
})

export default rootReducer;
