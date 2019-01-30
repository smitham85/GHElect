import { createStackNavigator, createAppContainer } from 'react-navigation';
import { SignUp } from './screens/signUp';
import { Login } from './screens/login';
import { Tasks } from './screens/tasks';
import { Task } from './screens/task';

const AppNavigator = createStackNavigator({
  Login: { screen: Login },
  SignUp: { screen: SignUp },
  Tasks: { screen: Tasks },
  Task: { screen: Task },
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
