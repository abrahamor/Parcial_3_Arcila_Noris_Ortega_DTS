import React,{useEffect} from 'react'
import {View,Text,TextInput,StyleSheet, TouchableOpacity} from 'react-native'
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import useForm from '../../hooks/useForm';
import { ProductContext, ProductContextData, initialState } from '../../resources/product';


  
export default function EditProduct({navigation,route}:any) {
  
    const [products, handleChange] = useForm(initialState);
    const {name, sale_price,purchase_price,units_in_inventory,id } = products;

    const contextData:ProductContextData={
      data: products,
      handleChange,

    }
      useEffect(() => {
        handleChange('name', route.params.name);
        handleChange('sale_price', route.params.sale_price);
        handleChange('purchase_price', route.params.purchase_price);
        handleChange('units_in_inventory', route.params.units_in_inventory);
        handleChange('id', route.params.id);
      }, [route.params.name]);
    


    const db = getFirestore();

    const editProduct = async () => {
      await updateDoc(doc(db, 'products', id), {
        name: name,
        sale_price: sale_price,
        purchase_price: purchase_price,
        units_in_inventory:units_in_inventory
      });
      navigation.goBack();
    }

    function validateProduct(){   

      if(parseInt(sale_price) < parseInt(purchase_price) || name == "" || sale_price == "" || purchase_price == "" || units_in_inventory == ""){
        var msg = ""
        name == "" ? msg += "El Nombre esta vacio " : msg += ""; 
        sale_price == "" ? msg += "El precio de venta esta vacio " : msg += ""; 
        purchase_price == "" ? msg += "El precio de compra esta vacio " : msg += ""; 
        units_in_inventory == "" ? msg += "Las unidades en el inventario estan vacias " : msg += ""; 
        parseInt(sale_price) < parseInt(purchase_price) ? msg += "El precio de compra es mayor al de venta " : msg += "";

        alert(msg)
      }else{
        editProduct()
      }
    }
    return(
        <>
        <ProductContext.Provider value={contextData}>
        <View style={styles.container}>
          <Text style={styles.paragraph}>
            {route.params.name}
          </Text>
          <Text style={styles.textLabel}> Name</Text>
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
                value={sale_price.toString()}
                onChangeText={(value: string) => handleChange('sale_price', value)}
              />
            <Text style={styles.textLabel}>Purchase price</Text>
            <TextInput
                style={styles.input}
                placeholder='Purchase price'
                value={purchase_price.toString()}
                onChangeText={(value: string) => handleChange('purchase_price', value)}
              />
            <Text style={styles.textLabel}>Units in inventory</Text>
            <TextInput
                style={styles.input}
                placeholder='Units in inventory'
                value={units_in_inventory.toString()}
                onChangeText={(value: string) => handleChange('units_in_inventory', value)}
              />
          </View>
          <TouchableOpacity onPress={validateProduct} style={styles.button}>
              <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>
        </ProductContext.Provider>

        </>
    )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
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