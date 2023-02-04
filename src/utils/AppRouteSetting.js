import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../pages/home/HomePage'
import AllStudentScreen from '../pages/all_of_student/AllStudentPage'
import SplashScreen from '../pages/splash/SplashPage'
import LoginScreen from '../pages/login/LoginPage'
import RegisterScreen from '../pages/sign_up/RegisterPage'
import Icon from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator(){
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor:'#063970',
                tabBarInactiveTintColor:'grey',
                tabBarLabelStyle:{marginBottom:10, fontSize:16},
                tabBarStyle:{padding:10, height:80},
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === 'HOME') {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (rn === 'FAVORITE') {
                        iconName = focused ? 'bookmark' : 'bookmark-outline'
                    } else if (rn === 'SETTING') {
                        iconName = focused ? 'settings' : 'settings-outline'
                    }

                    return <Icon
                        name={iconName}
                        size={25}
                        color={color} />
                },

            })}
            >
            <Tab.Screen name="HOME" component={HomeScreen} />
        </Tab.Navigator>

    );
}

const Router = () => (
    <NavigationContainer>
        <Stack.Navigator 
        initialRouteName='SplashScreen'
        screenOptions={{headerShown:false}}>
            <Stack.Screen name='Home' component={HomeScreen}/>
            <Stack.Screen name='Login' component={LoginScreen}/>
            <Stack.Screen name='SplashScreen' component={SplashScreen}/>
            <Stack.Screen name='Register' component={RegisterScreen}/>
            <Stack.Screen name='AllStudent' component={AllStudentScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
)

export default Router