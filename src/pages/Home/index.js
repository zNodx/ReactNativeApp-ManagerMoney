import { StyleSheet, Text, TouchableOpacity, Alert} from 'react-native'
import React,{useContext, useState, useEffect} from 'react'
import firebase from '../../config/firebase';
import { AuthContext } from '../../contexts/auth';
import { format, ifPast } from 'date-fns';
import DatePicker  from '../../components/DatePicker'
import { AntDesign } from '@expo/vector-icons';
import { Background, Container, Name, Saldo, Title, List, Area } from './styles';
import Header from '../../components/Header';
import HistoryList from '../../components/HistoryList';

const Home = () => {

  const { user, signOut } = useContext(AuthContext)

  const [history, setHistory] = useState([])
  const [newDate, setNewDate] = useState(new Date())
  const [show , setShow] = useState(false)
  const [saldo, setSaldo] = useState(0)

  const uid = user && user.uid

  useEffect(()=>{
    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value', (snapshot)=>{
        setSaldo(snapshot.val().saldo);
      });

      await firebase.database().ref('history')
      .child(uid)
      .orderByChild('date').equalTo(format(newDate, 'dd/MM/yy'))
      .limitToLast(10).on('value', (snapshot)=>{
        setHistory([]);
        snapshot.forEach((childItem) => {
          let list = {
            key: childItem.key,
            type: childItem.val().type,
            value: childItem.val().value,
            date: childItem.val().date,
          };
          
          setHistory(oldArray => [...oldArray, list].reverse());
        })
      })

    }

    loadList();
  }, [newDate]);

  

  function handleDelete(data){
   
    Alert.alert(
      'Excluir transação',
      'Deseja realmente excluir esta transação?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => handleDeleteSuccess(data),
        },
      ],
    )
  }

  async function handleDeleteSuccess(data){
    await firebase.database().ref('history').child(uid).child(data.key).remove()
      .then(async() => {
        let saldoAtual = saldo
        data.type === 'despesa' ? saldoAtual += parseFloat(data.value) : saldoAtual -= parseFloat(data.value);

        await firebase.database().ref('users').child(uid).child('saldo').set(saldoAtual)
      })
    Alert.alert('Sucesso', 'Transação excluida com sucesso')
  }

  function handleShowPicker(){
    setShow(true);
  }

  function handleClose(){
    setShow(false);
  }

  const onChange = (date) => {
    setShow(Platform.OS === 'ios');
    setNewDate(date);
    console.log(date);
  } 
  return (
    <Background>
      <Header/>
      <Container>
        <Name>{user && user.name}</Name>
        <Saldo>R$ {saldo && saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
      </Container>
      <Area>
        <TouchableOpacity onPress={handleShowPicker}>
          <AntDesign name="calendar" size={20} color="#fff"/>
        </TouchableOpacity>
        <Title>Ultimas movimentações</Title>
      </Area>
      <List 
        showVerticalScrollIndicator={false}
        data={history}
        keyExtractor={item => item.id}
        renderItem={({item}) => (<HistoryList data={item} deleteItem={handleDelete} />)}
      />
        {show && (
        <DatePicker
        onClose={handleClose}
        date={newDate}
        onChange={onChange}
        />
      )}
    </Background>
  )
}

export default Home

const styles = StyleSheet.create({

})