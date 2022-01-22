import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Button = ({text, onPress, color}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        onPress();
      }}>
      <View style={[styles.buttoncontainer, {backgroundColor: color}]}>
        <Text
          style={{
            fontFamily: 'Roboto-Bold',
            color: '#FFF',
            textAlign: 'center',
            fontSize: 16,
          }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttoncontainer: {
    width: '90%',
    height: 45,
    backgroundColor: '#de1f26',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
