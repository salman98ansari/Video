import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const {height, width} = Dimensions.get('screen');
export const widths = width;
import Icons from 'react-native-vector-icons/Ionicons';

const Modals = ({onPress}) => {
  return (
    <View style={styles.modal1}>
      <View style={styles.modalcontainer}>
        <View style={styles.modalarea1}>
          <View style={styles.crosscontainer}>
            <TouchableOpacity
              onPress={() => {
                onPress();
              }}>
              <Icons name="close" size={30} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Modals;

const styles = StyleSheet.create({
  modal1: {
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    flex: 1,
  },
  modalcontainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 20,
    // paddingBottom: 20,
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalarea1: {
    width: widths / 1,
    height: height / 1.2,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 4,
  },
  imagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  crosscontainer: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
  textinputcontainer: {
    width: '95%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  textinput: {
    borderWidth: 0.5,
    borderRadius: 10,
    width: '100%',
    height: 45,
    color: '#000',
    paddingHorizontal: 15,
  },
});
