import React, { useState, useContext } from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert} from 'react-native';
import {format} from 'date-fns'
import { useNavigation } from '@react-navigation/native';
import firebase from '../../config/firebase';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import { Background, Input, SubmitButton, SubmitText} from './styles';
import Picker from '../../components/Picker';

export default function New() {
  const [value, setValue] = useState('');
  const [type, setType] = useState('receita');
  const { user:users } = useContext(AuthContext);
  const navigation = useNavigation();

  function handleSubmit(){
    Keyboard.dismiss()
    if(isNaN(parseFloat(value)) || type === null){
      alert('Valor ou tipo inválido')
      return
    }
    Alert.alert(
      'Confirmando dados',
      `Tipo: ${type} - Valor: ${parseFloat(value)}`,
    [{
      text: 'Cancelar',
      style: 'cancel'
    },{
      text: 'Confirmar',
      onPress: () => handleAdd()
    }
    ])  

  }

  async function handleAdd(){
    let uid = users.uid;
    let key = await firebase.database().ref('history').child(uid).push().key;
    await firebase.database().ref(`history`).child(uid).child(key).set({
      type: type,
      value: parseFloat(value),
      date:  format(new Date(), 'dd/MM/yy')
    })

    let user = firebase.database().ref('users').child(uid);
    await user.once('value').then((snapshot) => {
      let saldo = parseFloat(snapshot.val().saldo);
      if(type === 'receita'){
        saldo += parseFloat(value);
      }else{
        saldo -= parseFloat(value);
      }
      user.child('saldo').set(saldo);
    });
    setValue('');
    Keyboard.dismiss();
    navigation.navigate('Home');
  }

    return (
      <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
      <Background>
          <Header/>

          <SafeAreaView style={{ alignItems: 'center' }}>
            <Input
            placeholder="Valor desejado"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={ () => Keyboard.dismiss() }
            value={value}
            onChangeText={ (text) => setValue(text) }
            />
            
            <Picker onChange={setType} type={type} />

            <SubmitButton onPress={handleSubmit}>
              <SubmitText>Registrar</SubmitText>
            </SubmitButton>

          </SafeAreaView>

      </Background>
      </TouchableWithoutFeedback>
    );
}