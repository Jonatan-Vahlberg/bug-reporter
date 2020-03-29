import * as React from 'react';
import Colors from 'src/static/colors';
import {Text} from 'src/components/common';
import {Avatar} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardParamList} from 'src/navigation';
import {View} from 'react-native';
import {ApplicationContext} from 'src/context/ApplicationContext';

type HeaderProps = {naviagtion: StackNavigationProp<DashboardParamList>};

const DashHeader: React.FC<HeaderProps> = ({naviagtion}) => {
  return (
    <ApplicationContext.Consumer>
      {context => {
        const {profile, featuredTeam} = context;
        return (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              paddingVertical: 10,
              backgroundColor: Colors.backGroundColor,
              marginVertical: 15,
            }}>
            <Avatar.Image
              size={100}
              source={{uri: 'https://picsum.photos/808'}}
            />
            {/* {<Text.Title>{profile?.firstName}</Text.Title>
            <Text.LinkText>
              {featuredTeam?.members.find(
                member => profile?.uuid == member.uuid,
              )}
            </Text.LinkText>} */}
            <Text.Title>
              {profile?.firstName} {profile?.lastName}
            </Text.Title>
            <Text.LinkText onPress={() => naviagtion.navigate('TEAMS')}>
              ZIM &copy;, Lead Developer
            </Text.LinkText>
          </View>
        );
      }}
    </ApplicationContext.Consumer>
  );
};

export default DashHeader;
