import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';

const THUMB_RADIUS = 6;

const Thumb = () => {
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 2,
    borderColor: '#6C63FF',
    backgroundColor: '#6C63FF',
  },
});

export default memo(Thumb);
