import * as React from 'react';
import {
  ScreenComponent,
  Card,
  TextInput,
  Navbar,
  LinkText,
  Button,
  CheckBox,
} from '../../components/common';
import {Text, View, TextInput as Input} from 'react-native';
import metrics from '../../static/metrics';
import {ApplicationContext} from '../../context/ApplicationContext';
import {AuthParamList} from '..';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

export interface AuthProps {
  navigation: StackNavigationProp<AuthParamList>;
  route: RouteProp<AuthParamList, 'LOGIN'>;
}

export interface AuthState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  stayLoggedIn: boolean;
  loading: boolean;
  showLogin: boolean;
}

class LoginScreen extends React.Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      stayLoggedIn: false,
      loading: false,
      showLogin: false,
    };
  }
  render() {
    return (
      <ApplicationContext.Consumer>
        {context => (
          <ScreenComponent>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Card label="Register">
                <View
                  style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <CheckBox
                    checked={this.state.stayLoggedIn}
                    name="stayLoggedIn"
                    setValue={() =>
                      this.setValue('stayLoggedIn', !this.state.stayLoggedIn)
                    }
                    size={30}
                  />
                  <Text>Stay logged in?</Text>
                </View>
                <LinkText
                  action={() =>
                    this.setValue('showLogin', !this.state.showLogin)
                  }
                  text={this.state.showLogin ? 'Register?' : 'Login?'}
                />
              </Card>
              <View>
                <Button
                  action={() =>
                    context.profileActions?.registerUser(
                      this.state.email,
                      this.state.password,
                    )
                  }
                  extraStyle={{height: 50, width: metrics.screenWidth * 0.6}}
                  rounded>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: 25,
                      letterSpacing: 1.4,
                    }}>
                    {this.state.showLogin ? 'Login' : 'Register'}
                  </Text>
                </Button>
              </View>
            </View>
          </ScreenComponent>
        )}
      </ApplicationContext.Consumer>
    );
  }
  setValue = (key: keyof AuthState, value: any | string) => {
    this.setState({[key]: value} as Pick<AuthState, keyof AuthState>);
  };
}

export default LoginScreen;
