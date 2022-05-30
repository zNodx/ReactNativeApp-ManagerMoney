import React from 'react';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { Container, ButtonMenu} from './styles';
import { useNavigation } from '@react-navigation/native';

const Header = () => {

  const navigation = useNavigation();

  return (
    <Container>
      <ButtonMenu onPress={()=> navigation.toggleDrawer()}>
        <AntDesign name="menuunfold" size={24} color="#fff" />
      </ButtonMenu>
    </Container>
  )
}

export default Header;