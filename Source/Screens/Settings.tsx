import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { FloatingLabelInput } from 'react-native-floating-label-input';
import FloatingTitleTextInputField from '../Component/FloatingTitleTextInputField';

const Settings = () => {
  const [firstName, setFirstName] = useState('');

  const _updateMasterState = (value:any) => {
    console.log("==value",value)
    setFirstName(value)
  }

  return (
    <View style={{flex:1,justifyContent:'center',padding:20}}>
    <View style={{backgroundColor: '#fff',height:50 }}>
      {/* <FloatingLabelInput
        label="Phone"
        value={phone}
        staticLabel
        hintTextColor={'#aaa'}
        mask="99 (99) 99999-9999"
        hint="55 (22) 98765-4321"
        containerStyles={{
          borderWidth: 2,
          paddingHorizontal: 10,
          backgroundColor: '#fff',
          borderColor: 'blue',
          borderRadius: 8,
        }}
        customLabelStyles={{
          colorFocused: 'red',
          fontSizeFocused: 12,
        }}
        labelStyles={{
          backgroundColor: '#fff',
          paddingHorizontal: 5,
        }}
        inputStyles={{
          color: 'blue',
          paddingHorizontal: 10,
        }}
        onChangeText={value => {
          setPhone(value);
        }}
      /> */}
      <FloatingTitleTextInputField
          attrName = 'firstName'
          title = 'First Name'
          value = {firstName}
          updateMasterState = {_updateMasterState}
          textInputStyles = {{ // here you can add additional TextInput styles
            color: 'green',
            fontSize: 15,
          }}
          otherTextInputProps = {{   // here you can add other TextInput props of your choice
            maxLength: 12,
          }}
        />
    </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})