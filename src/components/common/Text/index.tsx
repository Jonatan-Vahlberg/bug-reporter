import * as React from 'react';

//import {TextStyle, Text, StyleSheet} from 'react-native';
import {TextStyle, StyleSheet, Platform} from 'react-native';
import {Text as TextBase} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from 'src/static/colors';
type DefaultTextProps = {style?: TextStyle};

const Title: React.FC<DefaultTextProps> = ({children, style}) => {
  return <TextBase style={[styles.title, style]}>{children}</TextBase>;
};

const LinkText: React.FC<DefaultTextProps & {
  onPress?: () => void | Function;
}> = ({style, onPress, children}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <TextBase numberOfLines={1} style={[styles.linkText, style]}>
        {children}
      </TextBase>
    </TouchableOpacity>
  );
};

const Caption: React.FC<DefaultTextProps> = ({children, style}) => {
  return <TextBase style={[styles.caption, style]}>{children}</TextBase>;
};

const Base: React.FC<DefaultTextProps> = ({children, style}) => {
  return <TextBase style={style}>{children}</TextBase>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: Platform.select({ios: '500', android: 'normal'}),
  },
  linkText: {
    color: Colors.darkerBasicBlue,
    textDecorationLine: 'underline',
  },
  caption: {
    color: Colors.greyDetail,
    fontWeight: '400',
  },
});
const Text = {
  Title,
  LinkText,
  Caption,
  Base,
};
export {Text};
