//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//unterseiten
import Startpage from './components/Startpage';
import Homepage from './components/Homepage';
import MilestoneOverview from './components/MilestoneOverview'
import MilestoneScreen from './components/MilestoneScreen'
import CreateTask from './components/CreateTask';
import QuestsScreen from './components/QuestsScreen';
import QuestionScreen from './components/QuestionScreen';

//contexts
import { AccountTypeProvider } from './AccountTypeContext';
import { MilestoneContextProvider } from './MilestoneContext';
import { TaskContextProvider } from './TaskContext';
import { QuestionContextProvider } from './QuestionContext';


const Stack = createNativeStackNavigator()

export default function App() {
  return (

    <NavigationContainer>
      <AccountTypeProvider>
        <TaskContextProvider>
          <MilestoneContextProvider>
            <QuestionContextProvider>
              <Stack.Navigator>
                <Stack.Screen name = "Startpage" component= {Startpage}/>
                <Stack.Screen name = "Home" component= {Homepage}/>
                <Stack.Screen name = "MilestoneOverview" component= {MilestoneOverview}/>
                <Stack.Screen name = "MilestoneScreen" component= {MilestoneScreen}/>
                <Stack.Screen name = "CreateTask" component= {CreateTask}/>
                <Stack.Screen name = "QuestsScreen" component= {QuestsScreen}/>
                <Stack.Screen name = "QuestionScreen" component= {QuestionScreen}/>
              </Stack.Navigator>
            </QuestionContextProvider>
          </MilestoneContextProvider>
        </TaskContextProvider>
      </AccountTypeProvider>
    </NavigationContainer>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


