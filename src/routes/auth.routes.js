import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import SignIn from "../pages/SignIn";
import SingUp from "../pages/SignUp";

const AuthStack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SingUp"
        component={SingUp}
        options={{
          headerStyle: {
            backgroundColor: "#131313",
            borderBottomWidth: 1,
            borderBottomColor: "#00b94a",
          },
          headerTintColor: "#fff",
          headerBackTitleVisible: false,
          headerTitle: "Voltar",
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;

const styles = StyleSheet.create({});
