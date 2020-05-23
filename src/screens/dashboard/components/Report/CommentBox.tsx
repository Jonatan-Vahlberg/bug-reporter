import * as React from 'react';
import Comment from 'src/models/Comment';
import {View, Text, StyleSheet} from 'react-native';
import ReportContentBox from './ReportContentBox';
import DropdownButton from './DropdownButton';
import {FormWrapper} from 'src/components/common';
import {formatDate} from 'src/static/functions';

const CommentBox: React.FC<{comment: Comment}> = ({comment}) => {
  const [opened, setOpened] = React.useState<boolean>(false);
  const linesLength = comment.content.length;
  let commentMaxLength = !opened
    ? linesLength > 10
      ? 10
      : linesLength
    : linesLength;
  console.log(commentMaxLength);

  return (
    <FormWrapper outerStyle={{marginVertical: 0}}>
      <View>
        <Text style={styles.nameStyle}>
          {comment.senderName} {formatDate(comment.date)}
        </Text>
      </View>
      <View style={{backgroundColor: '#fff'}}>
        <ReportContentBox
          lines={comment.content}
          onOutput={() => {}}
          editable={false}
          movable={false}
          maxLines={commentMaxLength}
        />
        {commentMaxLength >= 10 && (
          <DropdownButton opened={opened} setOpened={setOpened} />
        )}
      </View>
    </FormWrapper>
  );
};

const styles = StyleSheet.create({
  nameStyle: {
    fontSize: 16.5,
    fontWeight: '800',
    paddingVertical: 5,
  },
  subtitleStyle: {
    fontSize: 15,
    paddingVertical: 5,
    fontStyle: 'italic',
  },
});

export default CommentBox;
