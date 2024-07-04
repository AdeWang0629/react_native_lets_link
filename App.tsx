/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// org.reactjs.native.example.com.arborental
// import React, {useState} from 'react';
// import {
//   LogBox,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   StatusBar,
// } from 'react-native';
// import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/integration/react';
// // import {store, persistor } from './src/store';
// import {store, persistor} from './src1/store';
// import MainNav from './src1/navigation';
// import {AlertNotificationRoot} from 'react-native-alert-notification';

// const App = () => {
//   LogBox.ignoreAllLogs();
//   return (
//     <>
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <AlertNotificationRoot>
//             <MainNav />
//           </AlertNotificationRoot>
//         </PersistGate>
//       </Provider>
//     </>
//   );
// };

// export default App;

import "react-native-gesture-handler";

import { theme } from "./theme";
import React, { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";

import { LogBox,SafeAreaView } from "react-native";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store";
import AppStack from "./src/navigation/AppStack";
function App() {
  LogBox.ignoreAllLogs();

  return (
    <SafeAreaView style={{flex:1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AlertNotificationRoot>
            <PaperProvider theme={theme}>
              <AppStack />
            </PaperProvider>
          </AlertNotificationRoot>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}

export default App;


// +        def lintVitalAnalyzeTask = tasks.findByName("lintVitalAnalyze${targetName}")
// +        if (lintVitalAnalyzeTask) {
// +            lintVitalAnalyzeTask.dependsOn(fontCopyTask)
// +        }


// Aa3FVSb-eS1lXl5H0D3ZAR4YX0AKx-8lGeS7eQYG56Ri2sMLrkKftj7P0l-BklRae4pdEKDOBfBaZKKi



// ECyt6bQNiEC1uj1yysl0sElDXEaXcJWec1JYj5AIlbFn3QWgZxOQjEQMP8FdyrZwo98j2zbgI_7Oagwt


// sb-434qxo29803428@business.example.com
// al_.&8zS

// 1041886742
// d5a3c8d4ffa9b0e7ce99d3951321bce4a02c1a66a9e88f3ad128429abe2bf71d