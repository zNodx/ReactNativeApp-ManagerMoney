import React, {createContext, useState, useEffect} from "react";
import firebase from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { View, Text } from 'react-native'

export const AuthContext = createContext({})

export default function AuthProvider({children}) {

  useEffect(() => {

    async function loadStorageData() { 
      const storageUser = await AsyncStorage.getItem("Auth_user");

      if (storageUser) {
        setUser(JSON.parse(storageUser))
        setLoading(false)
      }
      setLoading(false)
    }
    
    loadStorageData();
  }, [])

  const [loading, setLoading] = useState(true)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [user, setUser] = useState(null)

  async function signIn(email,password){
    setLoadingAuth(true);
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (res) => {
      let uid = res.user.uid
        await firebase.database().ref(`users`).child(uid).once('value')
        .then((res) => {
          let data ={
            uid: uid,
            name: res.val().name,
            email: res.val().email,
          }
          setUser(data)
          storageUser(data)
          setLoadingAuth(false)
        })
    })

  }

  async function signUp(email, password, name){
    setLoadingAuth(true);
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid
        await firebase.database().ref(`users`).child(uid).set({
          name: name,
          saldo: 0,
        })
          .then(() => {
            let data = {
              uid: uid,
              name: name,
              email: value.user.email
            }
            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
          })
      })
  }

  async function storageUser(data){
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data))
  }

  async function signOut(){
    await firebase.auth().signOut()
    await AsyncStorage.clear()
      .then(() => {
        setUser(null)
      })
  }

  return (
    <AuthContext.Provider value={{signed: !!user , user, signUp, signIn, signOut, loading, loadingAuth}}>
      {children}
    </AuthContext.Provider>
  )
}