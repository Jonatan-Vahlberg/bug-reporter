import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  ScreenComponent,
  Card,
  Navbar,
  LinkText,
  Button,
} from '../../components/common';
import {Text, View, TextInput, StyleSheet, StatusBar} from 'react-native';
import metrics from '../../static/metrics';
import {ApplicationContext} from '../../context/ApplicationContext';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../../navigation';
import colors from 'src/static/colors';
import { Checkbox } from 'react-native-paper';
import { emptySettings, Settings } from 'src/models/settings';
import Keychain from 'react-native-keychain'

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
  const {actions} = useContext(ApplicationContext)
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tempSettings, setTempSettings] = useState<Settings>()
  

  const [email, setEmail] = useState<string>('');
  const emailRef = useRef<TextInput>(null);

  const [password, setPassword] = useState<string>('');
  const passwordRef = useRef<TextInput>(null);

  const [fName, setFName] = useState<string>('');
  const fNameRef = useRef<TextInput>(null);

  const [lName, setLName] = useState<string>('');
  const lNameRef = useRef<TextInput>(null);

  useEffect(() => {
    (async () => {
      const settings = await actions.storage.getSettings()
      console.log(settings);
      
      if(settings.stayLoggedIn){
        setRememberMe(true)
        setTempSettings(settings)
        const credentials = await Keychain.getGenericPassword()
        console.log(credentials);
        if(credentials){
          setEmail(credentials.username)
          setPassword(credentials.password)
        }
      }
      setIsLoading(false)
    })()
  },[])
  const loadingOrAutheticating = isLoading || isAuthenticating
  return (
    <ApplicationContext.Consumer>
      {context => (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: colors.lightGreyBackground
          }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.lightGreyBackground}/>
          <Card label={showLogin ? 'Login' : 'Register'}>
            <View style={{width: "100%"}} pointerEvents={loadingOrAutheticating ? "none" : "auto"}>
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
            <View style={styles.remeberMeBox}>      
            <Checkbox disabled={loadingOrAutheticating} status={rememberMe ? "checked" : "unchecked"} color={colors.darkerBasicBlue} onPress={() => setRememberMe(!rememberMe)}/>
            <Text>Remeber me?</Text>
            </View>
            <LinkText
              action={() => setShowLogin(!showLogin)}
              text={showLogin ? 'Register?' : 'Login?'}
            />
            </View>
          </Card>
          <View>
            <Button
              loading={loadingOrAutheticating}
              action={async () => {
                setIsAuthenticating(true)
                
                if(showLogin){
                  
                  const result = await context.actions.firebase.login(email, password)
                  if(!result.error){
                    await context.actions.firebase.getProfile(result.uid!,context.actions.setters.setProfile!)
                  setIsAuthenticating(false)
                  if(rememberMe){
                    
                    await Keychain.setGenericPassword(email,password)
                    await actions.storage.setSettings({...tempSettings!,stayLoggedIn: rememberMe})
  
                  }
                  }
                }
                else{
                  const fcmid = await context.actions.storage.getFCMID()
                  if(fcmid){
                    const result = await context.actions.firebase.register(email,password,fName,lName,fcmid)
                    if(!result.error){
                      context.actions.setters.setProfile!(result.profile!)
                      setIsAuthenticating(false)
                      if(rememberMe){
                        console.log("Got to Keychain");
                        
                        await Keychain.setGenericPassword(email,password)
                        await actions.storage.setSettings({...tempSettings!,stayLoggedIn: rememberMe})
      
                      }
                    } 
                  }
                    
                }
                if(!rememberMe){
                  await Keychain.resetGenericPassword()
                  await actions.storage.setSettings({...tempSettings!, stayLoggedIn: rememberMe})
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
  remeberMeBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%"
  }
});

export default LoginScreen;
