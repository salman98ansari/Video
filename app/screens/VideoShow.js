import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Video from 'react-native-video';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Vid1 from '../assets/videos/vid1.mp4';
import Vid2 from '../assets/videos/vid2.mp4';

const VideoShow = () => {
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

  return (
    <View style={styles.container}>
      <View style={styles.margincontainer}>
        <View style={styles.headercontainer}>
          <Text style={styles.heading}>Video Show</Text>
        </View>
        <View style={styles.videocontainer}>
          <Video
            source={Vid1}
            style={styles.backgroundVideo}
            repeat
            resizeMode={aspect}
            volume={volumeon ? 1.0 : 0.0}
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
              <Icons name="aspect-ratio" size={20} color="#FFF" />
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
              <Icons
                name={volumeon ? 'volume-high' : 'volume-off'}
                size={20}
                color="#FFF"
              />
            </View>
          </TouchableOpacity>
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
});
