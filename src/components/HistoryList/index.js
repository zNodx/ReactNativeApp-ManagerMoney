import React from 'react';
import {AntDesign} from '@expo/vector-icons'
import { Container, Type, IconView, TypeText, ValueText } from './styles';

const Index = ({data}) => {

  return (
    <Container>
      <Type>
        <IconView type={data.type}>
          <AntDesign name={data.type === 'despesa'? 'arrowdown' : 'arrowup'} size={20} color="#fff" />
          <TypeText>{data.type}</TypeText>
        </IconView>
      </Type>
      <ValueText>
        R$ {data.value},00
      </ValueText>
    </Container>
  );
}


export default Index;
