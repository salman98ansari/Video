import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Vid1 from '../assets/videos/vid1.mp4';

const Menu = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textcolor}>Menu</Text>
    </View>
  );
};

export default Menu;

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
