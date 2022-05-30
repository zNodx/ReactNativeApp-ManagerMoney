import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, Text, View } from 'react-native'

import Home from "../pages/Home";
import New from "../pages/New";
import Profile from "../pages/Profile";

const AppDrawer = createDrawerNavigator();


const AppRoutes = () => {
  return (
    <AppDrawer.Navigator
      drawerStyle={{
        backgroundColor: "#171717"
      }}
      drawerContentOptions={{
        labelStyle:{
          fontWeight: "bold",
        },
        activeTintColor: "#fff",
        activeBackgroundColor: "#00b94a",
        inactiveTintColor: "#DDD",
        inactiveBackgroundColor: "#000",
        itemStyle:{
          marginVertical: 5,
        }
      }}
    >
      <AppDrawer.Screen name="Home" component={Home}/>
      <AppDrawer.Screen name="New" component={New}/>
      <AppDrawer.Screen name="Profile" component={Profile}/>
    </AppDrawer.Navigator>
  )
}

export default AppRoutes

const styles = StyleSheet.create({})