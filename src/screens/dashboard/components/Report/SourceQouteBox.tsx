import React from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';

const SourceQuoteBox: React.FC<{start: string; setStart: React.Dispatch<React.SetStateAction<string>>; setEnd: React.Dispatch<React.SetStateAction<string>>; end?: string; }> = ({
  start,
  end,
  setStart,
  setEnd
}) => {
  return (
    <View style={{flexDirection: "row", justifyContent: "space-evenly",alignItems: 'center',}}>
      <TextInput onChangeText={setStart} placeholder="From..." style={{width: 100, height: 30}} value={start} keyboardType="number-pad" />
      <TextInput onChangeText={setEnd} placeholder="To..." style={{width: 100, height: 30}} value={end?.toString()} keyboardType="number-pad" />
    </View>
  );
};

export default SourceQuoteBox
