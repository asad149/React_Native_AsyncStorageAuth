import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text>About Us</Text>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
