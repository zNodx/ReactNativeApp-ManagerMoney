import React from 'react';
import {AntDesign} from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native';
import { Container, Type, IconView, TypeText, ValueText } from './styles';

const Index = ({data, deleteItem}) => {

  return (
    <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
      <Container>
        <Type>
          <IconView type={data.type}>
            <AntDesign name={data.type === 'despesa'? 'arrowdown' : 'arrowup'} size={20} color="#fff" />
            <TypeText>{data.type}</TypeText>
          </IconView>
        </Type>
        <ValueText>
          R$ {data.value},00 - {data.date}
        </ValueText>
      </Container>
    </TouchableWithoutFeedback>
  );
}


export default Index;
