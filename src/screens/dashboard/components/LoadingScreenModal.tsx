import React, {useContext, useState, useEffect} from 'react';
import {ApplicationContext} from 'src/context/ApplicationContext';
import {firebaseDBErrorStatus} from 'src/services/api/firebase';
import {ActivityIndicator} from 'react-native-paper';
import {StyleSheet, View, Modal} from 'react-native';
import colors from 'src/static/colors';
import {Text} from 'src/components/common';

const LoadingScreenModal: React.FC<{
  userID: string;
  visible: boolean;
  setVisability: () => void | Function;
}> = props => {
  const {actions, settings, profile, featuredTeam} = useContext(
    ApplicationContext,
  );
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const [loadingFeaturedTeam, setLoadingFeaturedTeam] = useState<boolean>(
    false,
  );
  let message: string = '';
  message =
    loadingProfile && !loadingFeaturedTeam ? 'Loading user profile' : message;
  message =
    !loadingProfile && loadingFeaturedTeam ? 'Loading selected team' : message;
  useEffect(() => {
    (async () => {
      const storedSettings = await actions.storage.getSettings();
      actions.setters.setSettings!(storedSettings);
      setLoadingProfile(true);
      const firebaseProfile = await actions.firebase.getProfile(
        'IvM9aSjjVCXZ9Up6szWhmGtIjl13',
      );
      //const firebaseProfile = await actions.firebase.getProfile(props.userID);
      if (firebaseProfile.error === firebaseDBErrorStatus.NO_ERROR) {
        actions.setters.setProfile!(firebaseProfile.profile!);
        setLoadingProfile(false);
      }

      if (storedSettings.feautredTeamId !== 'UNSET') {
        setLoadingFeaturedTeam(true);
        const firebaseTeam = await actions.firebase.getTeanOnId(
          storedSettings.feautredTeamId,
        );
        console.log(firebaseTeam);

        if (firebaseTeam.payload !== undefined) {
          actions.setters.setFeaturedTeam!(firebaseTeam.payload);
        }
        setLoadingFeaturedTeam(false);
      }
      props.setVisability();
    })();
  }, []);

  return (
    <Modal visible={true}>
      <View style={styles().base}>
        <ActivityIndicator style={styles().spinner} />
        <Text.Caption>{message}</Text.Caption>
      </View>
    </Modal>
  );
};

const styles = () =>
  StyleSheet.create({
    base: {
      flex: 1,
      backgroundColor: colors.backGroundColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    spinner: {
      transform: [{scale: 2.5}],
      margin: 50,
    },
  });

export default LoadingScreenModal;
