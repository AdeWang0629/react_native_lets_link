import React from 'react';
import {StyleSheet, View} from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
const Loader = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 100,
          width: 100,
          backgroundColor: 'rgba(45, 45, 45, 0.7)',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <UIActivityIndicator color={'white'} size={30} />
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 222,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    opacity: 1,
  },
  image: {
    width: 68,
    height: 68,
    resizeMode: 'contain',
    marginTop: -50,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});