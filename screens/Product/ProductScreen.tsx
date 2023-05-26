
import React,{useEffect, useState} from 'react';
import {StyleSheet, Alert, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import { collection, getDocs, query, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import {db} from '../../firebase';
import { ListItem } from '@react-native-material/core';
import FontAwesome  from '@expo/vector-icons/FontAwesome';
import { ScrollView } from 'react-native';


interface HomeNavigation {
  navigation: NavigationScreenProp<any, any>;
}

export default function ProductScreen({navigation}: HomeNavigation) {
  const [listProduct,setList]:any = useState([])
  
  const deleteProduct = ({id,name}:any) => {
    Alert.alert('Alert Title', `Do you want to delete the product ${name}?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteDoc(doc(db,'products',id))},
    ]);
  }
  const q = query(collection(db, "products"));

  const getProducts =  async () => {
    const querySnapshot = await getDocs(q);
    const list: { id: string; }[] = []
    querySnapshot.forEach((doc) => {
      list.push({...doc.data(), id:doc.id })
  });
  setList(list)
  }

useEffect(() => {
  getProducts();
  const unsubscribe = onSnapshot(q, () => {
    getProducts();
  });

  return () => {
    unsubscribe();
  };
}, []);

  return (
    <>
    <ScrollView>
     {
        listProduct.map(({ id, name,sale_price,purchase_price,units_in_inventory }:any) => 
          (
            <ListItem
              key={id}
              title={name}
              trailing={props => 
                <View style={{display:'flex',flexDirection: 'row'}}>
                  <FontAwesome name="edit" size={25} color={'#DE4726'}  onPress = {() => navigation.navigate("EditProduct", {id,name,sale_price,purchase_price,units_in_inventory})} />
                  <FontAwesome style={{paddingLeft:5}} name="trash" size={25} color={'#DE4726'}  onPress = {() => deleteProduct({id,name})} />
                </View>
              }
            />
          )
        )
      }

    </ScrollView>
    <View style={styles.view}>
      
    </View>
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

