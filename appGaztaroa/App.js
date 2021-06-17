import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Campobase from './componentes/CampobaseComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react'

const {store, persistor} = ConfigureStore();


export default function App() {
  return (
    <Provider store={store}>
    <View style={styles.container}>
     <PersistGate loading={null} persistor={persistor}>
        <Campobase/>
        <StatusBar style="auto" />
    </PersistGate>
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});