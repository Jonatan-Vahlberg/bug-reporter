import React, {useState, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardParamList} from 'src/navigation';
import {ReportLine} from 'src/models/BugReport';
import {
  ScreenComponent,
  Navbar,
  LinkText,
  FormWrapper,
  ScrollInput,
} from 'src/components/common';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RouteProp} from '@react-navigation/native';
import metrics from 'src/static/metrics';
import colors from 'src/static/colors';
import ReportContentBox from './components/Report/ReportContentBox';
import Collapsible from 'react-native-collapsible';
import SourceReportBox from './components/Report/SourceReportBox';
import SourceQuuteBox from './components/Report/SourceQouteBox';
import {Switch} from 'react-native-paper';

type ModalProps = {
  navigation: StackNavigationProp<DashboardParamList>;
  route: RouteProp<DashboardParamList, 'CONTENT_FLAG'>;
};

const ContentFlaggingModalScreen: React.FC<ModalProps> = props => {
  const [lines, setLines] = useState<ReportLine[]>([]);
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    if (props.route.params.lines !== undefined) {
      setLines(props.route.params.lines);
    } else {
      setLines(
        props.route.params.content.split(/\n/).map(line => {
          if (line.includes('&&;/')) {
            return line;
          } else {
            return line + '&&;/hashtag';
          }
        }),
      );
    }
  }, []);

  const LeftItem = (
    <LinkText
      text="Cancel"
      action={() => {
        props.navigation.goBack();
      }}
    />
  );
  const RightItem = (
    <LinkText
      text="Save"
      action={() => {
        props.route.params.setLines(lines);
        props.route.params.setContent(props.route.params.content);
        props.navigation.goBack();
      }}
    />
  );
  return (
    <>
      <Navbar
        navigation={props.navigation}
        root={false}
        leftItem={LeftItem}
        title="Flag Content"
        rightItem={RightItem}
      />
      <ScreenComponent>
        <ScrollView>
          {props.route.params.originalLines && (
            <SourceReportBox lines={props.route.params.originalLines} />
          )}
          <FormWrapper>
            <Text style={styles.subtitleStyle}>Flag Tools</Text>
            <ScrollView>
              <Text>Content flagging</Text>
              <ReportContentBox
                onOutput={lines => setLines([...lines])}
                editable
                lines={lines}
                maxLines={1000}
                movable={true}
              />
              <Text style={styles.subtitleStyle}>Comment Tools</Text>
              <Text>Quote source</Text>
              <SourceQuuteBox
                start={start}
                end={end}
                setStart={setStart}
                setEnd={setEnd}
              />

              <Text style={styles.subtitleStyle}>Action tools</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <Text>Report as Done</Text>
                <Switch value={done} onValueChange={setDone} />
              </View>
            </ScrollView>
          </FormWrapper>
        </ScrollView>
      </ScreenComponent>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: -15,
    left: -15,
    right: -15,
  },
  buttonTextStyle: {
    fontWeight: '700',
    fontSize: 25,
    color: '#fff',
    letterSpacing: 1.4,
  },
  textInput: {
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: colors.backGroundColor,
    width: '100%',
  },
  dateSelectorText: {
    color: colors.severityColors.NONE,
  },
  subtitleStyle: {
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: 2.5,
  },
  arrowSideContainer: {
    //marginHorizontal: 5,
    flex: 1,
    height: 1.9,
    backgroundColor: colors.severityColors.NONE,
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});

export default ContentFlaggingModalScreen;
