
import { addDoc, collection } from 'firebase/firestore';
import React,{useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { db } from '../../firebase';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import useForm from '../../hooks/useForm';
import { ServiceContextData, ServiceContext, initialState } from '../../resources/service';
  
//abrahamortega99@gmail.com
export default function AddService({navigation}:any) {
  const [services, handleChange] = useForm(initialState);
  const {name,sale_price,cost_of_service} = services

  const contextData:ServiceContextData={
    data: services,
    handleChange,
  }

  const addService = async () => {
    try {
      const docRef = await addDoc(collection(db, 'services'), {
        name: name,
        sale_price: sale_price,
        cost_of_service: cost_of_service,
      });

      navigation.goBack();
    } catch (e) {
      console.error('Error editing document: ', e);
    }
  }
  function validateService(){   

    if(parseInt(sale_price) < parseInt(cost_of_service) || name == "" || sale_price == "" || cost_of_service == "" ){
      var msg = ""
      name == "" ? msg += "El Nombre esta vacio " : msg += ""; 
      sale_price == "" ? msg += "El precio de venta esta vacio " : msg += ""; 
      cost_of_service == "" ? msg += "El precio de compra esta vacio " : msg += ""; 
      parseInt(sale_price) < parseInt(cost_of_service) ? msg += "El precio de compra es mayor al costo del servicio " : msg += "";

      alert(msg)
    }else{
      addService();
    }
  }
    return(
        <>
          <Text style={styles.textLabel}>Name</Text>
          <TextInput
              style={styles.input}
              placeholder='Name'
              value={name}
              onChangeText={(value: string) => handleChange('name', value)}
            />
            <Text style={styles.textLabel}>Sale price</Text>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                placeholder='Sale price'
                value={sale_price}
                onChangeText={(value: string) => handleChange('sale_price', value)}
              />
            <Text style={styles.textLabel}>Cost of service</Text>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                placeholder='Cost of service'
                value={cost_of_service}
                onChangeText={(value: string) => handleChange('cost_of_service', value)}
              />
            <TouchableOpacity onPress={validateService} style={styles.button}>
              <Text style={styles.buttonText}>Crear Servicio</Text>
            </TouchableOpacity>

        </>

    )
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
      color: '#DE4726',
      fontWeight: '700',
      fontSize: 16,
    },
    button: {
      position: 'absolute',
      backgroundColor:'white',
      alignSelf:'center',
      padding:10,
      bottom: 35,
      borderRadius:20,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    textLabel:{
      paddingLeft: 10,
    }
  });