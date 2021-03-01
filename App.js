/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  useReducer,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import ToastExample from './ToastExample';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from './components/context';
import OnboardingScreen from './screens/OnboardingScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AboutScreen from './screens/AboutScreen';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import PracticeScreen from './screens/PracticeScreen';
function HomeScreen({navigation}) {
  const {signOut} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Welcome</Text>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          signOut();
        }}>
        <Text style={styles.loginText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const LoginScreen = ({navigation}) => {
  const {signIn} = useContext(AuthContext);

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState();
  const loginHandle = (username, password) => {
    signIn(username, password);
  };


  const handleAsad = () => {
    const headers = {
     
    };

    axios
      .post('', null, {
        headers: headers,
      })
      .then((response) => {
        console.log(
          'reactNativeDemo',
          'response get details:',
          response.data.data.token,
        );
        setData(response.data);
        // console.log("Dataaaa =>>>>>>>>",response.data.data)
        // console.log("Dasadfasdsadsataaaa =>>>>>>>>",data)
        navigation.push('Practice', response.data.data);
      })
      .catch((error) => {
        console.log('axios error:', error);
      });
  };

  console.log("This is Asad's Data  ===>>> ", data);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>LOGIN</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          value={username}
          onChangeText={(username) => setUserName(username)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          loginHandle(username, password);
        }}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAsad}>
        <Text style={(styles.loginText, {color: 'white'})}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          ToastExample.show(
            'Awesome',
            (err) => {
              alert(err);
            },
            (message) => {
              alert(message);
            },
          );
        }}>
        <LinearGradient
          colors={['#9900cc', '#660066']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradient}>
          <Text style={styles.text}>CLICK ME</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Text style={{fontSize: 20, color: 'white'}}>
        {!data ? 'Loading....' : data.token}
      </Text>
    </View>
  );
};

const Stack = createStackNavigator();

function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: (userName, password) => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        let userToken;
        userToken = null;
        if (userName === 'user' && password === 'pass') {
          userToken = 'dfgdfg';
        }
        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },
      signOut: () => {
        // setUserToken(null);
        // setIsLoading(false);
        dispatch({type: 'LOGOUT'});
      },
      SignUp: () => {
        setUserToken('fgkj');
        setIsLoading(false);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(() => {
      // setIsLoading(false);
      dispatch({type: 'RETRIEVE_TOKEN', token: 'dfklj'});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#fb5b5a" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {loginState.userToken !== null ? (
            <>
              <Stack.Screen
                name="Tabs"
                component={MyTabs}
                options={{headerShown: false}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="OnBoarding"
                component={OnboardingScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen name="Practice" component={PracticeScreen} />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  title: 'Login',
                  headerStyle: {
                    backgroundColor: '#fb5b5a',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fb5b5a"
      inactiveColor="white"
      barStyle={{backgroundColor: 'black', paddingBottom: 10}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarLabel: 'About Us',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="phone" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },

  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  button: {
    width: '70%',
    height: 45,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
export default App;
