
import React,{useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import { collection, getDocs, query, onSnapshot } from "firebase/firestore";
import {db} from '../../firebase';
import { ListItem } from '@react-native-material/core';
import FontAwesome  from '@expo/vector-icons/FontAwesome';
import { ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';


interface HomeNavigation {
  navigation: NavigationScreenProp<any, any>;
}

export default function HomeScreen({navigation}: HomeNavigation) {
  const [listProduct, setList]: any = useState([]);
  const isFocused = useIsFocused();
  const q = query(collection(db, 'sales'));

  const getProducts = async () => {
    const querySnapshot = await getDocs(q);
    const list: { id: string; }[] = [];
    querySnapshot.forEach((doc) => {
      list.push({ ...doc.data(), id: doc.id });
    });
    setList(list);
  };

  useEffect(() => {
    if (isFocused) {
      getProducts();
      const unsubscribe = onSnapshot(q, () => {
        getProducts();
      });

      return () => {
        unsubscribe();
      };
    }
  }, [isFocused]);

  return (
    <>
      <ScrollView>
      
          {listProduct && listProduct.map((item: any) => (
              <ListItem
                
                key={item.id}
                title={`Date: ${item.createdAt?.toDate()} - Total: ${item.totalCost}`}
                trailing={ 
                  <FontAwesome name="eye" size={25} color={'#DE4726'} onPress={() => {
                    navigation.navigate("Sale", item.id)
                  }}/>
                }
              />
            ))}
  
      </ScrollView>
      <View style={styles.view}></View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  view: {
    flexDirection: 'column',
    flex: 1,
  },
});
