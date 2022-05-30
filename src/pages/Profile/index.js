import React, {useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import { Container, Name, NewLink, NewText, Logout, LogoutText } from './styles';

const Profile = () => {
  const navigation = useNavigation();
  const { user, signOut } = useContext(AuthContext)

  return (
    <Container>
      <Header/>
      <Name>{user && user.name}</Name>
      <NewLink onPress={() => navigation.navigate('New')}>
        <NewText>Registrar gastos</NewText>
      </NewLink>
      <Logout onPress={() => signOut()}>
        <LogoutText>Sair</LogoutText>
      </Logout>
    </Container>)
}

export default Profile;