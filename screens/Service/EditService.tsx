import React,{useContext, useEffect} from 'react'
import {View,Text,TextInput,StyleSheet, TouchableOpacity} from 'react-native'


import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import useForm from '../../hooks/useForm';
import { ServiceContext, ServiceContextData, initialState } from '../../resources/service';


  
export default function EditService({navigation,route}:any) {
  
    const [services, handleChange] = useForm(initialState);
    const {name,sale_price,cost_of_service,id} = services;
  
    const db = getFirestore();

    const contextData:ServiceContextData={
      data: services,
      handleChange,

    }
      useEffect(() => {
        handleChange('name', route.params.name);
        handleChange('sale_price', route.params.sale_price);
        handleChange('cost_of_service', route.params.cost_of_service);
        handleChange('id', route.params.id);
      }, [route.params.name]);
    

    const editService = async () => {
      await updateDoc(doc(db, 'services', id), {
        name: name,
        sale_price: sale_price,
        cost_of_service: cost_of_service,
      });
    
      navigation.goBack();
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
        editService()
      }
    }
    return(
        <>
        <ServiceContext.Provider value={contextData}>
        <View style={styles.container}>
          <Text style={styles.paragraph}>
            {route.params.name}
          </Text>
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
                value={sale_price.toString()}
                onChangeText={(value: string) => handleChange('sale_price', value)}
              />
            <Text style={styles.textLabel}>Cost of service</Text>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                placeholder='Cost of service'
                value={cost_of_service.toString()}
                onChangeText={(value: string) => handleChange('cost_of_service', value)}
              />
          </View>
          <TouchableOpacity onPress={validateService} style={styles.button}>
              <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>
        </ServiceContext.Provider>

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
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textLabel:{
    paddingLeft: 10,
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

});