import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/pages/home';
import TaskDetailPage from './src/pages/task-detail';

type RootStackNavigatorParamsList = {
  Home: undefined;
  TaskDetail: undefined;
};

const Stack = createNativeStackNavigator<RootStackNavigatorParamsList>();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen name="TaskDetail" component={TaskDetailPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
