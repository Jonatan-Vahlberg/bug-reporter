import React, {useContext, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {TeamsParamList} from 'src/navigation';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'src/static/colors';
import {ApplicationContext} from 'src/context/ApplicationContext';
import {LightTeam} from 'src/models/Team';
import Dialog from 'react-native-dialog';
import {Text} from 'src/components/common';

const SelectTeamModal: React.FC<{
  team: LightTeam;
  navigation: StackNavigationProp<TeamsParamList>;
  visible: boolean;
  setvisible: React.Dispatch<React.SetStateAction<boolean>>;
  onAccept: () => void;
}> = props => {
  const {settings, actions} = useContext(ApplicationContext);
  const {
    navigation,
    visible,
    setvisible,
    team: {uuid, personalPositionValue, name},
  } = props;
  const [neverShow, setNeverShow] = useState<boolean>(false);
  return (
    <>
      <Dialog.Container visible={visible}>
        <Dialog.Title>{`Select ${name} as featured team?`}</Dialog.Title>
        <Dialog.Description>
          this action will unload current team in favor of this one. You can
          switch teams at any time.
        </Dialog.Description>
        {/*
            // @ts-ignore */}
        <Dialog.Switch
          onValueChange={setNeverShow}
          value={neverShow}
          label="Don't show me this message again."
        />
        <Dialog.Button onPress={() => setvisible(false)} label="Cancel" />
        <Dialog.Button label="Go Ahead" onPress={() => {}} />
      </Dialog.Container>
    </>
  );
};

const styles = StyleSheet.create({
  bar: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  icon: {
    padding: 10,
  },
});

export default SelectTeamModal;
