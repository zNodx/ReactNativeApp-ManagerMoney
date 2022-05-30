import { StyleSheet, Text, SafeAreaView, Button} from 'react-native'
import React,{useContext, useState, useEffect} from 'react'
import firebase from '../../config/firebase';
import { AuthContext } from '../../contexts/auth';
import { format } from 'date-fns';
import { Background, Container, Name, Saldo, Title, List } from './styles';
import Header from '../../components/Header';
import HistoryList from '../../components/HistoryList';

const Home = () => {

  const { user, signOut } = useContext(AuthContext)

  const [history, setHistory] = useState([])
  const [saldo, setSaldo] = useState(0)

  const uid = user && user.uid

  useEffect(() => {

    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo)
      })

      await firebase.database().ref('history').child(uid).orderByChild('date').equalTo(format(new Date, 'dd/MM/yy')).limitToLast(10).on('value', (snapshot) => {
        setHistory([])
        snapshot.forEach((child) => {
          let list = {
            key: uid,
            type: child.val().type,
            value: child.val().value,
          }
          setHistory(oldArray => [...oldArray, list].reverse())
        })
      })
  
    }



    loadList()

  }, [])

  return (
    <Background>
      <Header/>
      <Container>
        <Name>{user && user.name}</Name>
        <Saldo>R$ {saldo && saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
      </Container>
      <Title>Ultimas movimentaçōes</Title>
      <List 
        showVerticalScrollIndicator={false}
        data={history}
        keyExtractor={item => item.id}
        renderItem={({item}) => (<HistoryList data={item} />)}
      />
    </Background>
  )
}

export default Home

const styles = StyleSheet.create({

})