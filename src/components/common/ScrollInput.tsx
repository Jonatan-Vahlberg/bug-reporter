import * as React from 'react';
import {TextInput} from 'react-native-paper';
import {ScrollView, TextInputProps, View} from 'react-native';

const ScrollInput: React.FC<TextInputProps> = (
  {style, value, onChangeText, multiline},
  ...rest
) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <ScrollView horizontal>
        <TextInput
          multiline={multiline}
          style={[{minWidth: '100%', flex: 1}, style]}
          value={value}
          onChangeText={value => onChangeText!(value)}
          {...rest}
        />
      </ScrollView>
    </View>
  );
};

export {ScrollInput};
