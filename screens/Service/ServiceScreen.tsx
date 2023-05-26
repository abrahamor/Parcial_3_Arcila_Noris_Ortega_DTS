
import React,{useEffect, useState} from 'react';
import {StyleSheet, Alert, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import { collection, getDocs, query, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import {db} from '../../firebase';
import { ListItem } from '@react-native-material/core';
import FontAwesome  from '@expo/vector-icons/FontAwesome';


interface HomeNavigation {
  navigation: NavigationScreenProp<any, any>;
}

export default function ProductScreen({navigation}: HomeNavigation) {
  const [listService,setList]:any = useState([])
  
  const deleteService = ({id,name}:any) => {
    Alert.alert('Alert Title', `Do you want to delete the service ${name}?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteDoc(doc(db,'services',id))},
    ]);
  }
  const q = query(collection(db, "services"));

  const getServices =  async () => {
    const querySnapshot = await getDocs(q);
    const list: { id: string; }[] = []
    querySnapshot.forEach((doc) => {
      list.push({...doc.data(), id:doc.id })
  });
  
  setList(list)
}

useEffect(() => {
  getServices();

  const unsubscribe = onSnapshot(q, () => {
    getServices();
  });

  return () => {
    unsubscribe();
  };
}, []);

  return (
    <>
     {
        listService.map(({ id, name,sale_price,cost_of_service }:any) => 
          (
            <ListItem
              key={id}
              title={name}
              trailing={props => 
                <View style={{display:'flex',flexDirection: 'row'}}>
                  <FontAwesome name="edit" size={25} color={'#DE4726'}  onPress = {() => navigation.navigate("EditService", {id,name,sale_price,cost_of_service})} />
                  <FontAwesome style={{paddingLeft:5}} name="trash" size={25} color={'#DE4726'}  onPress = {() => deleteService({id,name})} />
                </View>
              }
            />
          )
        )
      }

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  view:{
    flexDirection: 'column',
    flex: 1
  },

});

