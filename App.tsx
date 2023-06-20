import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import RootNavigator from './src/navigations/RootNavigator';

function App(): JSX.Element {

  return (
    <Provider store={store}> 
        <StatusBar
          barStyle={'light-content'}
        />
        <RootNavigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({
});

export default App;
