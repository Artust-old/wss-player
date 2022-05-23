import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import * as PlaySettingsActions from "../../actions/playSettingsActions";

const playUrlParametersMap = {
  signalingURL: "playSignalingURL",
  applicationName: "playApplicationName",
  streamName: "playStreamName",
  play: "play",
};

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const PlaySettingsForm = () => {
  let query = useQuery();

  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);
  const playSettings = useSelector((state) => state.playSettings);
  const webrtcPlay = useSelector((state) => state.webrtcPlay);

  // load play settings from query params URL
  useEffect(() => {
    playSettings.signalingURL = query.get("url")
    playSettings.applicationName = query.get("app")
    playSettings.streamName = query.get("stream")

    for (let paramKey in playUrlParametersMap) {
      // if (savedValues[playUrlParametersMap[paramKey]] != null) {
      switch (playUrlParametersMap[paramKey]) {
        case "playSignalingURL":
          dispatch({
            type: PlaySettingsActions.SET_PLAY_SIGNALING_URL,
            signalingURL: playSettings.signalingURL,
          });
          break;
        case "playApplicationName":
          dispatch({
            type: PlaySettingsActions.SET_PLAY_APPLICATION_NAME,
            applicationName: playSettings.applicationName,
          });
          break;
        case "playStreamName":
          dispatch({
            type: PlaySettingsActions.SET_PLAY_STREAM_NAME,
            streamName: playSettings.streamName,
          });
          break;
        default:
          dispatch(PlaySettingsActions.startPlay());
          break;
      }
      // }
    }
    setInitialized(true);
  }, [dispatch]);

  if (!initialized) return null;

  return (
    <div id="play-settings">
      <form id="play-settings-form">
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="playSdpURL">Signaling URL</label>
              <input
                type="text"
                className="form-control"
                id="playSignalingURL"
                name="playSignalingURL"
                maxLength="1024"
                placeholder="wss://[ssl-certificate-domain-name]/webrtc-session.json"
                value={playSettings.signalingURL}
                disabled
                onChange={(e) =>
                  dispatch({
                    type: PlaySettingsActions.SET_PLAY_SIGNALING_URL,
                    signalingURL: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="playApplicationName">Application Name</label>
              <input
                type="text"
                className="form-control"
                id="playApplicationName"
                name="playApplicationName"
                maxLength="256"
                value={playSettings.applicationName}
                disabled
                onChange={(e) =>
                  dispatch({
                    type: PlaySettingsActions.SET_PLAY_APPLICATION_NAME,
                    applicationName: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="playStreamName">Stream Name</label>
              <input
                type="text"
                className="form-control"
                id="playStreamName"
                name="playStreamName"
                maxLength="256"
                value={playSettings.streamName}
                disabled
                onChange={(e) =>
                  dispatch({
                    type: PlaySettingsActions.SET_PLAY_STREAM_NAME,
                    streamName: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            {!webrtcPlay.connected && (
              <button
                id="play-toggle"
                type="button"
                className="btn"
                disabled={playSettings.playStarting}
                onClick={(e) => dispatch(PlaySettingsActions.startPlay())}
              >
                Play
              </button>
            )}
            {webrtcPlay.connected && (
              <button
                id="play-toggle"
                type="button"
                className="btn"
                onClick={(e) => dispatch(PlaySettingsActions.stopPlay())}
              >
                Stop
              </button>
            )}
          </div>
          {/* <div className="col-2">
            <button id="play-share-link" type="button" className="control-button mt-0">
              <img alt="" className="noll" id="mute-off" src={fileCopy} />
            </button>
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default PlaySettingsForm;
