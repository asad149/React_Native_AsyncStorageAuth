import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const PracticeScreen = ({navigation, route}) => {
  const data = route.params;


  const handleLogOut=()=>{
      navigation.push("Login")
  }
  // console.warn(data)
  console.log(data);
  return (
    <View style={styles.container}>
      <Text>{data.details.email}</Text>
      <Text>{data.details.accountTitle}</Text>
      <Text>{data.details.mobileNumber}</Text>
      <Button title="LOG OUT" onPress={handleLogOut} />
    </View>
  );
};

export default PracticeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
