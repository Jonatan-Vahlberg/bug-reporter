import React, {useState} from 'react';
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

type ModalProps = {
  navigation: StackNavigationProp<DashboardParamList>;
  route: RouteProp<DashboardParamList, 'CONTENT_MODAL'>;
};

const ContentCreationModalScreen: React.FC<ModalProps> = props => {
  const [content, setContent] = useState<string>('');
  const [lines, setLines] = useState<ReportLine[]>(props.route.params.lines);
  const [advancedCollapsed, setAdvancedCollapsed] = useState<boolean>(true);
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
        props.route.params.setContent(content);
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
        title="Report Content"
        rightItem={RightItem}
      />
      <ScreenComponent>
        <ScrollView>
          <FormWrapper>
            <Text style={styles.subtitleStyle}>Content</Text>
            <ScrollInput
              value={content}
              onChangeText={value => {
                setContent(value);
                let newLines: ReportLine[] = value
                  .split('\n')
                  .map((line, index) => {
                    let newLine: ReportLine = {line, status: 'hashtag'};
                    if (value === '') {
                      return {line: '', status: 'hashtag'};
                    }
                    if (lines.length === index) {
                      return newLine;
                    } else if (lines[index].line === line) {
                      return lines[index];
                    } else {
                      return newLine;
                    }
                  });
                setLines(newLines);
                setAdvancedCollapsed(true);
              }}
              numberOfLines={8}
              multiline
              textAlignVertical="top"
              placeholder="Content"
              style={{
                ...styles.textInput,
                minWidth: metrics.screenWidth - 50,
              }}
              selectTextOnFocus
            />
          </FormWrapper>
          <FormWrapper>
            <Text style={styles.subtitleStyle}>Advanced Tools</Text>
            <View style={{margin: 5}}>
              <TouchableOpacity
                onPress={() => setAdvancedCollapsed(!advancedCollapsed)}>
                <View style={styles.arrowContainer}>
                  <View style={styles.arrowSideContainer} />
                  <Icon
                    color={colors.severityColors.NONE}
                    style={{marginHorizontal: 5}}
                    name={advancedCollapsed ? 'arrow-down' : 'arrow-up'}
                    size={20}
                  />
                  <View style={styles.arrowSideContainer} />
                </View>
              </TouchableOpacity>
              <Collapsible collapsed={advancedCollapsed}>
                <Text>Content flagging</Text>
                <ScrollView>
                  <ReportContentBox
                    onOutput={lines => setLines([...lines])}
                    editable
                    lines={lines}
                    maxLines={1000}
                    movable={true}
                  />
                </ScrollView>
              </Collapsible>
            </View>
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

export default ContentCreationModalScreen;
