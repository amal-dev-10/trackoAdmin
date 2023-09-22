import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import RootNavigator from './src/navigations/RootNavigator';
import { primaryColor } from './src/styles/colors';
import { StripeProvider } from '@stripe/stripe-react-native';
import Config from 'react-native-config';


function App(): JSX.Element {
  const stripePublishableKey = Config.STRIPE_PUBLISHABLE_KEY;
  return (
    <StripeProvider
      publishableKey={stripePublishableKey || ''}
    >
      <Provider store={store}> 
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={primaryColor}
          />
          <RootNavigator/>
      </Provider>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
});

export default App;
