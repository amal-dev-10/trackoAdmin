import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import {store} from './src/redux/store';
import RootNavigator from './src/navigations/RootNavigator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { primaryColor, textColorPrimary } from './src/styles/colors';

function App(): JSX.Element {
  useEffect(() => {
    const loadCustomFont = async () => {
      await FontAwesome.loadFont(); // Load the custom font
      // You can also load other custom fonts if you have more
    };
    loadCustomFont();
  }, []);
  return (
    <Provider store={store}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={primaryColor}
        />
        <RootNavigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({
});

export default App;
