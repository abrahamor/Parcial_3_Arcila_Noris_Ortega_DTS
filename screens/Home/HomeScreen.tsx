
import React,{useEffect, useState,useReducer} from 'react';
import {Text, StyleSheet, TouchableOpacity, Alert, View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import { collection, getDocs, query, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import {db} from '../../firebase';
import { ListItem } from '@react-native-material/core';
import FontAwesome  from '@expo/vector-icons/FontAwesome';
import { ScrollView } from 'react-native';
import { ProductForm } from '../../resources/product';
import { useIsFocused } from '@react-navigation/native';


interface HomeNavigation {
  navigation: NavigationScreenProp<any, any>;
}

export default function HomeScreen({navigation}: HomeNavigation) {


  return (
    <>
      
    </>
  );
}