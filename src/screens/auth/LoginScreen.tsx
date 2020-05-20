import React, {useState, useRef} from 'react';
import {
  ScreenComponent,
  Card,
  Navbar,
  LinkText,
  Button,
  CheckBox,
} from '../../components/common';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import metrics from '../../static/metrics';
import {ApplicationContext} from '../../context/ApplicationContext';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../../navigation';
import colors from 'src/static/colors';

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

const LoginScreen: React.FC<AuthProps> = () => {
  const [showLogin, setShowLogin] = useState<boolean>(true);

  const [email, setEmail] = useState<string>('');
  const emailRef = useRef<TextInput>(null);

  const [password, setPassword] = useState<string>('');
  const passwordRef = useRef<TextInput>(null);

  const [fName, setFName] = useState<string>('');
  const fNameRef = useRef<TextInput>(null);

  const [lName, setLName] = useState<string>('');
  const lNameRef = useRef<TextInput>(null);

  return (
    <ApplicationContext.Consumer>
      {context => (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Card label={showLogin ? 'Login' : 'Register'}>
            <View />
            <TextInput
              ref={emailRef}
              value={email}
              style={styles.inputStyle}
              onChangeText={setEmail}
              placeholder="Email"
              blurOnSubmit={false}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordRef.current?.focus()
              }}
              caretHidden
              keyboardType="email-address"
              autoCapitalize="none"
            />
             <TextInput
              ref={passwordRef}
              value={password}
              style={styles.inputStyle}
              onChangeText={setPassword}
              placeholder="Password"
              blurOnSubmit={showLogin}
              returnKeyType={showLogin ? "done" :  "next"}
              secureTextEntry
              onSubmitEditing={() => {
                if(!showLogin){

                  fNameRef.current?.focus()
                }
              }}
              autoCapitalize="none"
            />
             {!showLogin && (
             <> 
             <TextInput
              ref={fNameRef}
              value={fName}
              style={styles.inputStyle}
              onChangeText={setFName}
              placeholder="First name"
              blurOnSubmit={false}
              returnKeyType="next"
              onSubmitEditing={() => {
                lNameRef.current?.focus()
              }}
            />
             <TextInput
              ref={lNameRef}
              value={lName}
              style={styles.inputStyle}
              onChangeText={setLName}
              placeholder="Last name"
              
            />
            </>)}
            <LinkText
              action={() => setShowLogin(!showLogin)}
              text={showLogin ? 'Register?' : 'Login?'}
            />
          </Card>
          <View>
            <Button
              action={async () => {
                if(showLogin){
                  
                  const result = await context.actions.firebase.login(email, password)
                  if(!result.error){
                    await context.actions.firebase.getProfile(result.uid!,context.actions.setters.setProfile!)
                  }
                }
                else{
                  const fcmid = await context.actions.storage.getFCMID()
                  if(fcmid){
                    const result = await context.actions.firebase.register(email,password,fName,lName,fcmid)
                    if(!result.error){
                      context.actions.setters.setProfile!(result.profile!)
                    } 
                  }
                    
                }
              }}
              extraStyle={{height: 50, width: metrics.screenWidth * 0.6}}
              rounded>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: 25,
                  letterSpacing: 1.4,
                }}>
                {showLogin ? 'Login' : 'Register'}
              </Text>
            </Button>
          </View>
        </View>
      )}
    </ApplicationContext.Consumer>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: colors.lightGreyBackground,
    width: '100%',
    height: 40,
    marginBottom: 5
  },
});

export default LoginScreen;
