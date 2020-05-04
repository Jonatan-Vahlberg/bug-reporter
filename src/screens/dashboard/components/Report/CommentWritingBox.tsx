import * as React from 'react';
import {
  TextInput,
  ScrollView,
  Image,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import Profile from 'src/models/Profile';
import metrics from 'src/static/metrics';
import colors from 'src/static/colors';
import {Button} from 'src/components/common';

export interface CommentWritingBoxProps {}

const CommentWritingBox: React.FC<CommentWritingBoxProps> = (
  props: CommentWritingBoxProps,
) => {
  const {root, imgBox, img, commentBox, commentTextStyle} = styles;
  return (
    <View style={root}>
      <View style={imgBox}>
        <Image style={img} source={{uri: ''}} resizeMode="contain" />
      </View>
      <View style={commentBox}>
        <Button>
          <Text>Leave Comment</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: metrics.screenWidth * 0.9,
    flexDirection: 'row',
    minHeight: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  imgBox: {
    width: 53,
    aspectRatio: 1,
    borderWidth: 1.5,
    borderColor: '#000',
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 50,
    height: 50,
  },
  commentBox: {
    flexDirection: 'row',
    width: metrics.screenWidth * 0.9 - 70,
    marginLeft: 5,
    borderColor: '#000',
    borderWidth: 1.5,
    minHeight: 53,
    backgroundColor: colors.backGroundColor,
  },
  commentTextStyle: {
    paddingLeft: 10,
  },
});

export default CommentWritingBox;
