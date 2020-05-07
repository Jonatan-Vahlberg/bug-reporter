import React, { useRef } from 'react';
import {View, Text, TextInput as Input} from 'react-native';
import {TextInput} from 'react-native-paper';

const SourceQuoteBox: React.FC<{start: string; setStart: React.Dispatch<React.SetStateAction<string>>; setEnd: React.Dispatch<React.SetStateAction<string>>; end?: string; }> = ({
  start,
  end,
  setStart,
  setEnd
}) => {
  const fromRef = useRef<Input>(null)
  const toRef = useRef<Input>(null)
  return (
    <View style={{flexDirection: "row", justifyContent: "space-evenly",alignItems: 'center',}}>
      <TextInput ref={fromRef} blurOnSubmit={false} onSubmitEditing={() => {
        toRef.current?.focus()
      }} contextMenuHidden onChangeText={setStart} placeholder="From..." style={{width: 100, height: 30}} value={start} keyboardType="number-pad" />
      <TextInput ref={toRef} contextMenuHidden onChangeText={setEnd} placeholder="To..." style={{width: 100, height: 30}} value={end?.toString()} keyboardType="number-pad" />
    </View>
  );
};

export default SourceQuoteBox
