import React, {useContext, useState, useEffect} from 'react';
import {ApplicationContext} from 'src/context/ApplicationContext';
import {firebaseDBErrorStatus} from 'src/services/api/firebase';
import {ActivityIndicator} from 'react-native-paper';
import {StyleSheet, View, Modal} from 'react-native';
import colors from 'src/static/colors';
import {Text, LargeSpinner} from 'src/components/common';

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
      const fcmid = await actions.storage.getFCMID();
      if (fcmid) {
        await actions.firebase.updateProfile({...profile!, FCMID: fcmid});
      }
      const storedSettings = await actions.storage.getSettings();
      actions.setters.setSettings!(storedSettings);

      const notifications = await actions.storage.getNotifications();
      actions.setters.setNotifications!(notifications);

      setLoadingProfile(false);

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
  console.log(profile);

  return (
    <Modal visible={true}>
      <LargeSpinner message={message} />
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
