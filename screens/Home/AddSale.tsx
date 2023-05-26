import React from 'react';
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-navigation";
import { db } from "../../firebase";
import { FlatList,View,Text, TouchableOpacity, StyleSheet,TextInput, ScrollView } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { ServiceForm } from '../../resources/service';
import { ProductForm } from '../../resources/product';
import FontAwesome  from '@expo/vector-icons/FontAwesome';

export default function AddSale({ navigation }:any) {
  const [listProduct, setListProducts] = useState<any[]>([]);
  const [listService, setListServices] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [serviceData, setServiceData] = useState<ServiceForm>({
    name: "",
    cost_of_service: 0,
    sale_price: 0,
    id: ""
  });
  const [productData, setProductData] = useState<ProductForm>({
    name: "",
    purchase_price:0,
    sale_price:0,
    units_in_inventory:0,
    id:""
  });
  
  const [cartItems, setCartItems] = useState([]);
  const [quantityProduct, setQuantityProduct] = useState(0);
  const [quantityService, setQuantityService] = useState(0);

  const q_products = query(collection(db, "products"));
  const q_services = query(collection(db, "services"));

  const { name: serviceName, sale_price: serviceSalePrice } = serviceData;
  const { name: productName, sale_price: productSalePrice,units_in_inventory } = productData;
  const [isQuantityEdited, setIsQuantityEdited] = useState(false);
  const [isServiceQuantityEdited, setIsServiceQuantityEdited] = useState(false);

  const getProducts = async () => {
    const querySnapshot = await getDocs(q_products);
    const list: any[] = [];
    querySnapshot.forEach((doc) => {
      list.push({ ...doc.data(), id: doc.id });
    });
    setListProducts(list);
  };

  const getServices = async () => {
    const querySnapshot = await getDocs(q_services);
    const list: any[] = [];
    querySnapshot.forEach((doc) => {
      list.push({ ...doc.data(), id: doc.id });
    });
    setListServices(list);
  };

  useEffect(() => {
    getProducts();
    getServices();
  }, [navigation]);

  const getProductInfo = async () => {
    if (selectedProduct) {
      const docRef = doc(db, "products", selectedProduct);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const product: ProductForm = {
          name: docSnap.data().name,
          purchase_price: docSnap.data().purchase_price,
          sale_price: docSnap.data().sale_price,
          units_in_inventory: docSnap.data().units_in_inventory,
          id: docSnap.id
        };
        setProductData(product)
        console.log("Información del producto:", product);
      } else {
        console.log("El producto no existe");
      }
    }
  };

  const getServiceInfo = async () => {
    if (selectedService) {
      const docRef = doc(db, "services", selectedService);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const service: ServiceForm = {
          name: docSnap.data().name,
          cost_of_service: docSnap.data().cost_of_service,
          sale_price: docSnap.data().sale_price,
          id: docSnap.id
        };
        setServiceData(service);
        console.log("Información del servicio:", service);
      } else {
        console.log("El servicio no existe");
      }
    }
  };

  useEffect(() => {
    if (selectedService !== "" && selectedService !== undefined) {
      getServiceInfo();
    }
  }, [selectedService]);

  useEffect(() => {
    if (selectedProduct !== "" && selectedProduct !== undefined) {
      getProductInfo();
    }
  }, [selectedProduct]);

  const handleProductChange = (itemValue: React.SetStateAction<string>) => {
    setSelectedProduct(itemValue);
    setSelectedService('');
  };

  const handleServiceChange = (itemValue: React.SetStateAction<string>) => {
    setSelectedService(itemValue);
    setSelectedProduct('');
  };

  const handleAddToCart = () => {
    
  if (selectedProduct) {
    let quantityProd = !Number.isNaN(quantityProduct) ? quantityProduct : 0;
    if (isNaN(quantityProd)) {
      quantityProd = 0;
    }

    const product = listProduct.find((p) => p.id === selectedProduct);
    const existingItem = cartItems.find((item) => item.productId === selectedProduct);

    if (product && (product.units_in_inventory < quantityProd || (existingItem && (existingItem.quantity + quantityProd) > product.units_in_inventory))) {
      alert(`No se puede agregar el producto. La cantidad excede la disponibilidad (${product.units_in_inventory} unidades disponibles).`);
      return;
    }

    const item = {
      name: productName,
      cost: productSalePrice * quantityProd,
      quantity: quantityProd,
      productId: selectedProduct,
    };

    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) => {
          if (item.productId === selectedProduct) {
            const newQuantity = item.quantity + quantityProd;
            return {
              ...item,
              quantity: newQuantity,
              cost: productSalePrice * newQuantity,
            };
          }
          return item;
        })
      );
    } else {
      setCartItems((prevItems) => [...prevItems, item]);
    }

    setSelectedProduct('');
    setQuantityProduct(0);
    } else if (selectedService) {
      let quantityServ = !Number.isNaN(quantityService) ? quantityService : 0;
      if (isNaN(quantityServ)) {
        quantityServ = 0;
      }
      const existingItem = cartItems.find((item) => item.serviceId === selectedService);
    

      const item = {
        name: serviceName,
        cost: serviceSalePrice * quantityServ,
        quantity: quantityServ,
        serviceId: selectedService,
      };
    
      if (existingItem) {
        setCartItems((prevItems) =>
          prevItems.map((item) => {
            if (item.serviceId === selectedService) {
              const newQuantity = item.quantity + quantityServ;
              return {
                ...item,
                quantity: newQuantity,
                cost: serviceSalePrice * newQuantity,
              };
            }
            return item;
          })
        );
      } else {
        setCartItems((prevItems) => [...prevItems, item]);
      }
  
      setSelectedService('');
      setQuantityService(0);
    }
  };
  

  const handleRemoveFromCart = (index: number) => {
    setCartItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const handleSaveSale = async () => {
    // Verificar la disponibilidad de productos
    const unavailableProducts = cartItems.filter((item) => {
      const product = listProduct.find((p) => p.id === item.productId);
      return product && item.quantity > product.units_in_inventory;
    });
  
    if (unavailableProducts.length > 0) {
      console.log('No se puede guardar la venta. Los siguientes productos exceden la disponibilidad:');
      console.log(unavailableProducts);
      return;
    }
  
    const totalCost = cartItems.reduce((sum, item) => sum + item.cost, 0);
  
    if (totalCost === 0) {
      console.log('No se puede guardar la venta. No hay productos o servicios agregados.');
      return;
    }
  
    const saleData = {
      items: cartItems,
      totalCost,
      createdAt: serverTimestamp(),
    };
  
    try {
      const saleRef = await addDoc(collection(db, 'sales'), saleData);
      console.log('Venta guardada con ID:', saleRef.id);
  
      // Actualizar los inventarios de los productos seleccionados
      cartItems.forEach((item: any) => {
        const product = listProduct.find((p: any) => p.id === item.productId);
        if (product) {
          const newInventory = product.units_in_inventory - item.quantity;
          updateProductInventory(item.productId, newInventory);
        }
      });
      // Actualizar la lista de productos en el estado
      getProducts();
    
      // Reiniciar el estado y limpiar el carrito
      setSelectedProduct('');
      setSelectedService('');
      setQuantityProduct(0);
      setQuantityService(0);
      setCartItems([]);
      navigation.goBack()
    } catch (error) {
      console.error('Error al guardar la venta:', error);
    }
  };
  
  
  const updateProductInventory = async (productId: string, newInventory: number) => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, { units_in_inventory: newInventory });
      console.log(`Inventario actualizado para el producto ${productId}.`);
    } catch (error) {
      console.error(`Error al actualizar el inventario del producto ${productId}:`, error);
    }
  };

  const CartItemsList = ({ cartItems }:any) => {
    return (
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{display:'flex',flexWrap:'wrap',flexDirection: 'row',rowGap:20,columnGap:20,padding:10,borderWidth:2, borderColor:'black',margin:8}}>
            <Text style={styles.textCarrito} >{item.name}</Text>
            <Text style={styles.textCarrito}>Cantidad: {item.quantity}</Text>
            <Text style={styles.textCarrito}>Costo: ${item.cost}</Text>
            <FontAwesome style={{paddingLeft:15,paddingTop:2}} name="trash" size={25} color={'#DE4726'}  onPress = {() => handleRemoveFromCart(index)} />
          </View>
        )}
      />
    );
  };
  return (
    <SafeAreaView>
      <Picker
        selectedValue={selectedProduct}
        onValueChange={handleProductChange}
        enabled={!selectedService}
      >
        <Picker.Item label="Seleccione un producto" value="" />
        {listProduct.map(({ name, id }) => (
          <Picker.Item label={name} value={id} key={id} />
        ))}
      </Picker>

      <Picker
        selectedValue={selectedService}
        onValueChange={handleServiceChange}
        enabled={!selectedProduct}
      >
        <Picker.Item label="Seleccione un servicio" value="" />
        {listService.map(({ name, id }) => (
          <Picker.Item label={name} value={id} key={id} />
        ))}
      </Picker>

      {selectedProduct && productData && (
        <View style={{borderWidth:2, borderColor:'black',margin:8}}>
          <Text style={styles.text}>Producto seleccionado: {productName}</Text>
          <Text style={styles.text}>Precio: {productSalePrice}</Text>
          <Text style={styles.text}>Cantidad:</Text>
          <TextInput
            style={styles.input}
            value={isQuantityEdited ? quantityProduct.toString() : ""}
            onChangeText={(text) => {
              const parsedValue = parseInt(text, 10);
              if (!isNaN(parsedValue)) {
                setQuantityProduct(parsedValue);
                setIsQuantityEdited(true);
              } else {
                setQuantityProduct(0);
                setIsQuantityEdited(false);
              }
            }}
          />
        </View>
      )}

      {selectedService && serviceData && (
        <View  style={{borderWidth:2, borderColor:'black',margin:8}}>
          <Text style={styles.text}>Servicio seleccionado: {serviceName}</Text>
          <Text style={styles.text}>Precio: {serviceSalePrice}</Text>
          <Text style={styles.text}>Cantidad:</Text>
          <TextInput
            style={styles.input}
            value={isServiceQuantityEdited ? quantityService.toString() : ""}
            onChangeText={(text) => {
              const parsedValue = parseInt(text, 10);
              if (!isNaN(parsedValue)) {
                setQuantityService(parsedValue);
                setIsServiceQuantityEdited(true);
              } else {
                setQuantityService(0);
                setIsServiceQuantityEdited(false);
              }
            }}
          />
        </View>
      )}
      {selectedService && serviceData && (

        <TouchableOpacity style={styles.button}onPress={handleAddToCart} disabled={!selectedProduct && !selectedService}>
          <Text style={styles.buttonText}>Agregar al carrito</Text>
        </TouchableOpacity>
      )}
      {selectedProduct && productData && (

        <TouchableOpacity style={styles.button}onPress={handleAddToCart} disabled={!selectedProduct && !selectedService}>
          <Text style={styles.buttonText}>Agregar al carrito</Text>
        </TouchableOpacity>
      )}
        <CartItemsList cartItems={cartItems} />

      <Text style={styles.text}>Sumatoria de elementos:</Text>
      <Text style={styles.text} >{cartItems.reduce((sum, item) => sum + item.cost, 0)}</Text>
      <TouchableOpacity style={styles.buttonSales} onPress={handleSaveSale} disabled={cartItems.length === 0}>
        <Text style={styles.buttonText}>Guardar venta</Text>
      </TouchableOpacity>
      </SafeAreaView>
  );
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
  text:{
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textCarrito:{
    margin: 5,
    fontSize: 15,
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
    // position: 'absolute',
    backgroundColor:'white',
    alignSelf:'center',
    padding:10,
    // bottom: 35,
    borderRadius:20,
  },
  buttonSales: {
    position: 'absolute',
    backgroundColor:'white',
    alignSelf:'center',
    padding:10,
    bottom: -50,
    borderRadius:20,
  },

});