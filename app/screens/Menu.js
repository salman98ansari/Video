import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

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
  },
  textcolor: {
    color: '#000',
  },
});
