import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Button from '../components/Button';

const slides = [
  {
    key: 1,
    text: 'Demo Video Upload',
    Desc: 'Upload Video In React Native',
    image: require('../assets/images/image3.png'),
  },
  {
    key: 2,
    text: 'Make Your Purchase',
    Desc: 'We Use React-native-video Library',
    image: require('../assets/images/image2.png'),
  },
  {
    key: 3,
    text: 'Demo Video Upload',
    Desc: 'Upload Video In React Native',
    image: require('../assets/images/image3.png'),
  },
];

const Slider = props => {
  const renderitem = ({item}) => (
    <View style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={item.image} style={{height: 300, width: 300}} />
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'Roboto-Bold',
            color: '#000',
            fontSize: 20,
            textAlign: 'center',
          }}>
          {item.text}
        </Text>
      </View>
      <View style={{marginHorizontal: 20, marginTop: 20}}>
        <Text
          style={{
            color: '#000',
            textAlign: 'center',
            fontSize: 18,
            fontFamily: 'Roboto-Regular',
          }}>
          {item.Desc}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <View style={{flex: 0.7}}>
        <AppIntroSlider
          renderItem={renderitem}
          data={slides}
          showNextButton={false}
          showDoneButton={false}
          activeDotStyle={{backgroundColor: '#808080'}}
          dotStyle={{backgroundColor: '#D3D3D3'}}
        />
      </View>
      <View style={styles.secondcontainer}>
        <View style={{marginTop: 30}}>
          <Button
            text="Get Started"
            color="#6C63FF"
            onPress={() => {
              props.navigation.navigate('VideoShow');
            }}
          />
        </View>
      </View>
    </>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  secondcontainer: {
    flex: 0.3,
    backgroundColor: '#FFF',
  },
  textcolor: {
    color: '#000',
  },
});
