import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Video from 'react-native-video';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Vid1 from '../assets/videos/vid1.mp4';
import Vid2 from '../assets/videos/vid2.mp4';

const VideoShow = props => {
  const {uploadvideo, aspect} = props.route.params || {};
  const [volumeon, setVolumeon] = useState(true);

  // const datas = {
  //   currentTime: 0,
  //   duration: 5,
  // };

  return (
    <View style={styles.container}>
      <View style={styles.margincontainer}>
        <View style={styles.headercontainer}>
          <Text style={styles.heading}>Video Show</Text>
        </View>
        <View style={styles.videocontainer}>
          <Video
            source={{uri: uploadvideo[0].uri}}
            // source={Vid2}
            style={styles.backgroundVideo}
            repeat
            resizeMode={aspect}
            volume={volumeon ? 1.0 : 0.0}
            // onLoad={() => {
            //   datas;
            // }}
          />
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
              <Icons
                name={volumeon ? 'volume-high' : 'volume-off'}
                size={20}
                color="#FFF"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.captioncontainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold', color: '#000'}}>
              salman.ansari :
            </Text>
            <Text style={{color: '#000', marginLeft: 5}}>Caption</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VideoShow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  textcolor: {
    color: '#000',
  },

  margincontainer: {
    marginHorizontal: 10,
  },
  heading: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headercontainer: {
    marginTop: 10,
  },
  videocontainer: {
    width: '100%',
    height: 500,
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
  captioncontainer: {
    width: '100%',
    // borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
  },
});
