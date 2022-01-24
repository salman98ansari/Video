import React, {useState, useRef} from 'react';
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
import Icons from 'react-native-vector-icons/Ionicons';
import Icons1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Modals from '../components/Modals';
import Button from '../components/Button';
import Video from 'react-native-video';

const VideoUpload = props => {
  const [uploadvideo, setUploadvideo] = useState([]);
  const [modal, setModal] = useState(false);
  const videoPlayer = useRef(null);
  const [time, setTime] = useState(4);
  const [pause, setPause] = useState(false);
  // console.log(uploadvideo, 'uploadedddddd');
  const [volumeon, setVolumeon] = useState(true);

  const [index, setIndex] = useState(0);

  const aspect_ratios = ['contain', 'stretch', 'cover'];
  const [aspect, setAspect] = useState(aspect_ratios[index]);

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
          launchImageLibrary(options, response => {
            if (response.didCancel) {
              reject(response);
            } else if (response.error) {
              reject(response);
            } else if (response.customButton) {
              reject(response);
            } else {
              console.log(response, 'response');
              const source = {
                uri: response.assets[0].uri,
                type: 'video',
                name: response.assets[0].fileName + '.mp4',
                filename: response.assets[0].fileName + '.mp4',
              };
              resolve(source);
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
                  ref={ref => (videoPlayer.current = ref)}
                  source={{uri: uploadvideo[0].uri}}
                  style={styles.backgroundVideo}
                  resizeMode={aspect}
                  volume={volumeon ? 1.0 : 0.0}
                  // onLoad={data => {
                  //   console.log(data.duration);
                  // }}
                  paused={pause}
                  onProgress={data => {
                    if (data.currentTime > time) {
                      setPause(true);
                    }
                  }}
                />
                <View style={{marginTop: 2}}>
                  <Text style={{color: 'gray', fontSize: 15}}>
                    Change Aspect Ratio*
                  </Text>
                </View>
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
              <View style={{marginTop: 30}}>
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
});
