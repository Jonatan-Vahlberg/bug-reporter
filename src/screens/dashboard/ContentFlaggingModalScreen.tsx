import React, {useState, useEffect, useContext} from 'react';
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
import {RouteProp, useIsFocused} from '@react-navigation/native';
import metrics from 'src/static/metrics';
import colors from 'src/static/colors';
import ReportContentBox from './components/Report/ReportContentBox';
import Collapsible from 'react-native-collapsible';
import SourceReportBox from './components/Report/SourceReportBox';
import SourceQuuteBox from './components/Report/SourceQouteBox';
import {Switch} from 'react-native-paper';
import { ApplicationContext } from 'src/context/ApplicationContext';
//@ts-ignore
import uuid from "uuid"

type ModalProps = {
  navigation: StackNavigationProp<DashboardParamList>;
  route: RouteProp<DashboardParamList, 'CONTENT_FLAG'>;
};

const ContentFlaggingModalScreen: React.FC<ModalProps> = props => {
  const {actions, profile, featuredTeam,} = useContext(ApplicationContext)
  const [lines, setLines] = useState<ReportLine[]>([]);
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [done, setDone] = useState<boolean>(props.route.params.originalReport?.closed || false);
  const isUpdate =
    props.route.params.type === 'COMMENT' ||
    props.route.params.type === 'COMMENT_UPDATE';
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
      text={isUpdate ? 'Send' : 'Save'}
      action={() => {
        (async () => {

          if (isUpdate) {
            //props.navigation.navigate('DASH_VIEW');
            const [startIsNumber, endIsNumber] = checkValidityOfSourcing(
              start,
              end,
            props.route.params.originalReport!.content.length,
            );
          let sourcedLines: string[] = [];
          if (startIsNumber) {
            sourcedLines = getPartOfArray(
              parseInt(start),
              props.route.params.originalReport!.content,
              endIsNumber ? parseInt(end) : undefined,
              ).map(line => line.replace(/&&;\/.+/, '&&;/quote'));
          }

          const commentContent: string[] = [...lines,...sourcedLines]
          const isChangingState = props.route.params.originalReport!.closed !== done
          let action: "CLOSED" | "REOPENED" | null = isChangingState && done ? "CLOSED" : null
          action = isChangingState && !done ? "REOPENED" : action 
          console.log(isChangingState, action);
          
          const result = await actions.firebase.addCommentToReport(props.route.params.originalReport!, featuredTeam!,{
            content: commentContent,
            uuid: uuid.v4(),
            senderName: profile!.firstName + " " + profile!.lastName,
            senderUuid: profile!.uuid,
            date: new Date().toISOString(),
            action: action
          },isChangingState,
          profile!)
          props.navigation.navigate("DASH_VIEW");


        } else {
          props.route.params.setLines(lines);
          props.route.params.setContent!(props.route.params.content);
          props.navigation.navigate('DASH_CREATE');
        }
      })()
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
          {isUpdate && (
            <SourceReportBox lines={props.route.params.originalReport!.content} />
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
              {isUpdate && (
                <>
                  <Text style={styles.subtitleStyle}>Comment Tools</Text>
                  <Text>Quote source</Text>
                  <SourceQuuteBox
                    start={start}
                    end={end}
                    setStart={setStart}
                    setEnd={setEnd}
                  />
                  {(isUpdate || props.route.params.type === 'UPDATE') && (
                    <>
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
                    </>
                  )}
                </>
              )}
            </ScrollView>
          </FormWrapper>
        </ScrollView>
      </ScreenComponent>
    </>
  );
};

//Returns [boolean,boolean] after checking sourcing validity [startIsNumber, endIsNumber]
const checkValidityOfSourcing = (
  start: string,
  end: string,
  length: number,
): [boolean, boolean] => {
  if (!isNaN(parseInt(start))) {
    const startNumber = parseInt(start);
    if (startNumber - 1 > length - 1 || startNumber - 1 < 0) {
      return [false, false];
    }
    if (!isNaN(parseInt(end))) {
      const endNumber = parseInt(end);
      if (
        endNumber - 1 > length - 1 ||
        endNumber - 1 < 0 ||
        endNumber < startNumber
      ) {
        return [true, false];
      } else {
        return [true, true];
      }
    } else {
      return [true, false];
    }
  }
  return [false, false];
};

const getPartOfArray = (start: number, array: string[], end?: number) => {
  const finalEndNumber: number = end !== undefined ? end : array.length;
  return array.slice(start - 1, finalEndNumber);
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
