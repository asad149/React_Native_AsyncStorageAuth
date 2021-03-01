import React from 'react';
import {View, Text, StyleSheet, Button, Image,TouchableOpacity} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
export default function OnboardingScreen({navigation}) {
  const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
      <View
        style={{
          width: 6,
          height: 6,
          marginHorizontal: 3,
          backgroundColor,
        }}
      />
    );
  };

  const Skip = ({...props}) => (
    <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
      <Text style={{fontSize: 16}}>Skip</Text>
    </TouchableOpacity>
  );

  const Next = ({...props}) => (
    <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
      <Text style={{fontSize: 16}}>Next</Text>
    </TouchableOpacity>
  );

  const Done = ({...props}) => (
    <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
      <Text style={{fontSize: 16}}>Done</Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: (
            <Image
              style={styles.boardingImage}
              source={require('../assets/onBoarding3.png')}
            />
          ),
          title: 'Onboarding 1',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fdeb93',
          image: (
            <Image
              style={styles.boardingImage}
              source={require('../assets/onBoarding3.png')}
            />
          ),
          title: 'Onboarding 2',
          subtitle: 'Done with React Native Onboarding Swiper',
        },

        {
          backgroundColor: '#e9bcbe',
          image: (
            <Image
              style={styles.boardingImage}
              source={require('../assets/onBoarding3.png')}
            />
          ),
          title: 'Onboarding 3',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
      ]}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardingImage: {
    width: 350,
    height: 270,
  },
});
