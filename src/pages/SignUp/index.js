import { StyleSheet, Text, View, Image, Platform, ActivityIndicator } from "react-native";
import {
  Background,
  Container,
  Logo,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
} from "../SignIn/styles";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";

const SingUp = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSingUp() {
    signUp(email, password, name);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === "ios" ? "padding" : ""}>
        <Logo source={require("../../assets/Logo.png")} />
        <AreaInput>
          <Input
            placeholder="Nome"
            autoCorrect={false}
            autoCapitalize="none"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="E-mail"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </AreaInput>
        <AreaInput>
          <Input
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </AreaInput>

        <SubmitButton onPress={handleSingUp}>
         { loadingAuth ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <SubmitText>Cadastrar</SubmitText>
            )}
        </SubmitButton>
      </Container>
    </Background>
  );
};

export default SingUp;

const styles = StyleSheet.create({});
