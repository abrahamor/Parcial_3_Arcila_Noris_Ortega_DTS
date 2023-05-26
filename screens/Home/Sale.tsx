import React,{useEffect, useState} from 'react'
import {View,Text,StyleSheet, ScrollView} from 'react-native'
import { doc, getDoc  } from 'firebase/firestore';
import { db } from '../../firebase';


  
export default function Sale({navigation,route}:any) {
    
  const [sales,setSales] = useState();

  const fetchSalesDataById = async (salesId: string) => {
    try {
      const salesRef = doc(db, 'sales', salesId);
  
      const salesSnapshot = await getDoc(salesRef);
  
      if (salesSnapshot.exists()) {
        const salesData = salesSnapshot.data();
        setSales(salesData.items)
      } else {
        console.log('La venta con el ID proporcionado no existe');
      }
    } catch (error) {
      console.error('Error al obtener los datos de la venta:', error);
    }
  };
  
  // Llama a la función y pasa el ID de la venta que deseas buscar
  useEffect(() => {
    fetchSalesDataById(route.params);
  },[navigation])
        
    return(
        <>
        <View style={styles.container}>
            <ScrollView>

              {sales && (
                <View>
                  {sales.map((item: any, index: number) => (
                    <View  style={{borderWidth:2, borderColor:'black',margin:8}} key={index}>
                      <Text style={styles.text}>Nombre: {item.name}</Text>
                      {item.quantity && <Text style={styles.text}>Cantidad: {item.quantity}</Text>}
                      <Text style={styles.text}>Costo: {item.cost}</Text>
                    </View>
                  ))}
                </View>
              )}
          </ScrollView>

        </View>
        </>
    )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  text:{
    margin: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },


});