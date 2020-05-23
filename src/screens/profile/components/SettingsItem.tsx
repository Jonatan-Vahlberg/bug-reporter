import * as React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from 'react-native-paper';

export type SettingsProps = {
  onPress: () => void | Function;
  name: string;
  iconName: string;
  color?: string;
};

const SettingsItem: React.FC<SettingsProps> = ({
  onPress,
  name,
  iconName,
  color,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.containerStyle}>
        <View style={styles.innerContainerStyle}>
          <Icon name={iconName} size={25} color={color} />
          <Text style={styles.titleStyle}>{name}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  innerContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  titleStyle: {
    fontSize: 25,
    fontWeight: '800',
    marginHorizontal: 20,
    lineHeight: 40,
    textAlignVertical: 'center',
  },
});

export default SettingsItem;
