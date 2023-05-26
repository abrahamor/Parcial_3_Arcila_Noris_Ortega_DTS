
import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import { db } from '../../firebase';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import useForm from '../../hooks/useForm';
import { ProductContextData, initialState } from '../../resources/product';
  
export default function AddProduct({navigation}:any) {
  const [products, handleChange] = useForm(initialState);
  const {name,sale_price,purchase_price,units_in_inventory} = products


  const contextData:ProductContextData={
    data: products,
    handleChange,
  }
    const addProduct = async () => {
      try {
        const docRef = await addDoc(collection(db, 'products'), {
          name: name,
          sale_price: sale_price,
          purchase_price: purchase_price,
          units_in_inventory:units_in_inventory
        });        
        navigation.goBack();
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }

    function validateProduct(){   

      if(parseInt(sale_price) < parseInt(purchase_price) || name == "" || sale_price == "" || purchase_price == "" ){
        var msg = ""
        name == "" ? msg += "El Nombre esta vacio " : msg += ""; 
        sale_price == "" ? msg += "El precio de venta esta vacio " : msg += ""; 
        purchase_price == "" ? msg += "El precio de compra esta vacio " : msg += ""; 
        parseInt(sale_price) < parseInt(purchase_price) ? msg += "El precio de compra es mayor al de venta " : msg += "";

        alert(msg)
      }else{
        addProduct();
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
                placeholder='Sale price'
                value={sale_price}
                onChangeText={(value: string) => handleChange('sale_price', value)}
              />
            <Text style={styles.textLabel}>Purchase price</Text>
            <TextInput
                style={styles.input}
                placeholder='Purchase price'
                value={purchase_price}
                onChangeText={(value: string) => handleChange('purchase_price', value)}
              />
            <Text style={styles.textLabel}>Units in inventory</Text>

              <TextInput
                style={styles.input}
                placeholder='Units in inventory'
                value={units_in_inventory}
                onChangeText={(value: string) => handleChange('units_in_inventory', value)}
              />
            <TouchableOpacity onPress={validateProduct} style={styles.button}>
              <Text style={styles.buttonText}>Crear Producto</Text>
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