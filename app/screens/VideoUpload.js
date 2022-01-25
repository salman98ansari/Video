import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {request, RESULTS, PERMISSIONS} from 'react-native-permissions';
import Icons from 'react-native-vector-icons/Ionicons';
import Icons1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Modals from '../components/Modals';
import Button from '../components/Button';
import Video from 'react-native-video';
import Slider from 'rn-range-slider';

import Thumb from '../components/gesture/Thumb';
import Rail from '../components/gesture/Rail';
import RailSelected from '../components/gesture/RailSelected';
import Label from '../components/gesture/Label';
import Notch from '../components/gesture/Notch';

const VideoUpload = props => {
  const [uploadvideo, setUploadvideo] = useState([]);
  const [modal, setModal] = useState(false);
  const [time, setTime] = useState(0);
  const [pause, setPause] = useState(false);
  const [duration, setDuration] = useState(0);
  console.log(duration, time);
  const [volumeon, setVolumeon] = useState(true);

  const [index, setIndex] = useState(0);
  const aspect_ratios = ['contain', 'stretch', 'cover'];
  const [aspect, setAspect] = useState(aspect_ratios[index]);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    setTime(low);
  }, []);

  const changeaspect = () => {
    setIndex((index + 1) % aspect_ratios.length);
    let num = (index + 1) % aspect_ratios.length;
    const item = aspect_ratios[num];
    setAspect(item);
  };

  const UploadVideo = () => {
    new Promise((resolve, reject) => {
      const options = {
        mediaType: 'video',
        includeBase64: true,
        videoQuality: 'High',
      };
      {
        Platform.OS === 'android' &&
          request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                break;
              case RESULTS.DENIED:
                break;
              case RESULTS.GRANTED:
                launchImageLibrary(options, response => {
                  if (response.didCancel) {
                    reject(response);
                  } else if (response.error) {
                    reject(response);
                  } else if (response.customButton) {
                    reject(response);
                  } else {
                    const source = {
                      uri: response.assets[0].uri,
                      type: 'video',
                      name: response.assets[0].fileName + '.mp4',
                      filename: response.assets[0].fileName + '.mp4',
                    };
                    resolve(source);
                  }
                });
                break;
              case RESULTS.BLOCKED:
                break;
            }
          });
      }
    })
      .then(video => {
        setUploadvideo([video]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.margincontainer}>
          <View
            style={{marginTop: 15, flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}>
              <Icons name="arrow-back" size={30} color="#000" />
            </TouchableOpacity>
            <View style={{marginLeft: 20}}>
              <Text style={styles.heading}>Video Upload Screen</Text>
            </View>
          </View>
          {uploadvideo.length === 0 && (
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  UploadVideo();
                }}>
                <Icons name="add-circle" size={30} color="#6C63FF" />
              </TouchableOpacity>
              <View style={{marginLeft: 5}}>
                <Text style={{color: '#6C63FF'}}>Add Video</Text>
              </View>
            </View>
          )}

          {uploadvideo.length !== 0 && (
            <>
              <View style={styles.videocontainer}>
                <Video
                  source={{uri: uploadvideo[0].uri}}
                  style={styles.backgroundVideo}
                  resizeMode={aspect}
                  volume={volumeon ? 1.0 : 0.0}
                  onLoad={data => {
                    setDuration(data.duration);
                    if (data.duration < 30) {
                      setTime(data.duration);
                    }
                  }}
                />

                <TouchableOpacity
                  onPress={() => {
                    changeaspect();
                  }}
                  style={{position: 'absolute', bottom: 10, left: 10}}>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 15,
                      backgroundColor: '#000',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icons1 name="aspect-ratio" size={20} color="#FFF" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVolumeon(!volumeon);
                  }}
                  style={{position: 'absolute', bottom: 10, right: 10}}>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 15,
                      backgroundColor: '#000',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icons1
                      name={volumeon ? 'volume-high' : 'volume-off'}
                      size={20}
                      color="#FFF"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 2}}>
                <Text style={{color: 'gray', fontSize: 15}}>
                  Change Aspect Ratio*
                </Text>
              </View>
              <View style={{marginTop: 2}}>
                {duration < 30 && (
                  <Text style={{color: 'gray', fontSize: 15}}>
                    You are good to Go Video Duration is {duration} Sec , less
                    Than 30 Sec
                  </Text>
                )}
                {duration > 30 && (
                  <>
                    <Text style={{color: 'gray', fontSize: 15}}>
                      The Video Duration {duration}sec and is Greater than 30
                      sec, can crop between 10 to 30 sec to move forward
                    </Text>
                    <View style={styles.slidercontainer}>
                      <Slider
                        min={10}
                        max={30}
                        step={1}
                        disableRange={true}
                        floatingLabel
                        renderThumb={renderThumb}
                        renderRail={renderRail}
                        renderRailSelected={renderRailSelected}
                        renderLabel={renderLabel}
                        renderNotch={renderNotch}
                        onValueChanged={handleValueChange}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          padding: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            color: '#000',
                          }}>
                          10(sec)
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            color: '#000',
                          }}>
                          30
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={styles.textcolor}>Croped : {time} Sec</Text>
                    </View>
                  </>
                )}
              </View>
              <View style={{marginTop: 25}}>
                <Button
                  text="Proceed"
                  color="#6C63FF"
                  onPress={() => {
                    props.navigation.navigate('VideoShow', {
                      uploadvideo: uploadvideo,
                      aspect: aspect,
                      time: time,
                    });
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setUploadvideo([]);
                  }}>
                  <Text style={{fontSize: 20, color: 'gray'}}>DISCARD</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default VideoUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  textcolor: {
    color: '#000',
  },
  margincontainer: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  heading: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  videocontainer: {
    width: '100%',
    height: 400,
    borderWidth: 0.5,
    marginTop: 20,
    borderRadius: 10,
    shadowOpacity: 1,
    shadowColor: '#fff',
  },

  backgroundVideo: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  slidercontainer: {
    elevation: 2,
    borderRadius: 1,
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    marginHorizontal: 10,
  },
});
