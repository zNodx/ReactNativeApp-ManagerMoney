import { StyleSheet, Text, View, Image, Platform, ActivityIndicator } from 'react-native'
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText } from './styles'
import { AuthContext } from '../../contexts/auth'
import { useNavigation } from '@react-navigation/native'
import React, {useState, useContext} from 'react'

const SignIn = () => {

  const navigation = useNavigation()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const { signIn, loadingAuth } = useContext(AuthContext)

  const handleLogin = () => {
    signIn(email, password) 
  }

  return (
    <Background>
      <Container 
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
      >
        <Logo source={require('../../assets/Logo.png')}/>
        <AreaInput>
          <Input 
            placeholder="E-mail"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) =>  setEmail(text)}
          />
        </AreaInput>
        <AreaInput>
          <Input 
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) =>  setPassword(text)}
          />
        </AreaInput>

        <SubmitButton onPress={handleLogin}>
          {
            loadingAuth ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <SubmitText>Acessar</SubmitText>
            )
          }
        </SubmitButton>
 
        <Link onPress={() => navigation.navigate('SingUp')}>
          <LinkText>Criar uma conta!</LinkText>
        </Link>
      </Container>
    </Background>
  )
}

export default SignIn

const styles = StyleSheet.create({})