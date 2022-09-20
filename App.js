/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/pages/HomeScreen';
import SettingsScreen from './src/pages/SettingsScreen';
import SettingsService from './src/model/SettingsService';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import ScanzyBarcodeScannerPlugin from 'react-native-scanzy-barcode-scanner-plugin';
const Stack = createStackNavigator();

const App = props => {
  SettingsService.init();
  ScanzyBarcodeScannerPlugin.setLicense("BdyCh9eyxw$9#k2qX79Z") //NOTE: BdyCh9eyxw$9#k2qX79Z is just a 7 days free trial key, you should purchase a valid key from Scanzy
  return (
    <ActionSheetProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={'Screen_Home'}
            screenOptions={{
              headerTintColor: '#ffffff',
              headerStyle: {backgroundColor: '#db6400'},
            }}>
            <Stack.Screen
              name={'Screen_Home'}
              component={HomeScreen}
              options={({navigation}) => ({
                title: 'Scanzy Barcode Scanner Sample',
                headerRight: () => (
                  <Pressable
                    onPress={() => {
                      navigation.navigate('Screen_Settings');
                    }}>
                    <Icon style={styles.settingsIcon} name={'settings'} />
                  </Pressable>
                ),
              })}
            />
            <Stack.Screen
              name={'Screen_Settings'}
              component={SettingsScreen}
              options={{title: 'Settings'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ActionSheetProvider>
  );
};

const styles = StyleSheet.create({
  settingsIcon: {
    fontSize: 25,
    color: 'white',
    paddingRight: 10,
  },
});

export default App;
