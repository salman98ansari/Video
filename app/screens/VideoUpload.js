import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const VideoUpload = props => {
  const [uploadvideo, setUploadvideo] = useState([]);
  console.log(uploadvideo, 'uploadedddddd');

  const UploadVideo = () => {
    new Promise((resolve, reject) => {
      const options = {
        mediaType: 'video',
        includeBase64: true,
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
              const source = {
                uri: response.assets[0].uri,
                type: 'video',
                name: response.assets[0].fileName + '.mp4',
                filename: response.assets[0].fileName + '.mp4',
              };
              console.log(source, 'sourceeeeeeeeeeeeeee');
              resolve(source);
            }
          });
      }
    })
      .then(video => {
        console.log(video, 'in then');
        setUploadvideo([...uploadvideo, video]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textcolor}>Salman</Text>
      <View style={{marginTop: 10}}>
        <Button
          title="upload"
          onPress={() => {
            UploadVideo();
          }}
        />
      </View>
      <View style={{marginTop: 20}}>
        <Button
          title="videoshow"
          onPress={() => {
            props.navigation.navigate('VideoShow', {
              uploadvideo: uploadvideo,
            });
          }}
        />
      </View>
    </View>
  );
};

export default VideoUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textcolor: {
    color: '#000',
  },
});
