
import React, { Image, Pressable, ScrollView, StatusBar, TextInput } from 'react-native';
import {SafeAreaView, StyleSheet, Text, View, Button, Dimensions, TouchableOpacity, Keyboard} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ricettejson from './ricette.json'
import {Ricetta, Struttura_filtri, HomeScreenNavigationProp} from './interfaces'
import PaginaRicetta from './pagina_ricetta.tsx'
import { useState, useEffect } from 'react';

export default function menu_ordina_per(){


return(
<View style={styles.menu_filtri}>
    <Text style={{fontSize: 30, textAlign: 'center', width: '100%'}}>Ordina</Text>
    
    {/* Selezione metodo di ordinamento */}
    <View style={styles.menu_filtri_categorie_difficoltà}>
      <Text>Ordina per</Text>
      <Pressable style={styles.menu_filtri_pulsanti_portata} onPress={() => setOrdina_per('Nome')}>
        <Text>Nome</Text>
      </Pressable>
      <Pressable style={styles.menu_filtri_pulsanti_portata} onPress={() => setOrdina_per('Difficoltà')}>
        <Text>Difficoltà</Text>
      </Pressable>
      <Pressable style={styles.menu_filtri_pulsanti_portata} onPress={() => setOrdina_per('Tempo')}>
        <Text>Tempo</Text>
      </Pressable>
    </View>
    <View>
      {/* SE SI VUOLE CON UN BOTTONE TOGLIERE PARAMETRO E FARE UN TOGGLE IN BASE AL VALORE DELLO STATO */}
      <Pressable style={styles.menu_filtri_pulsanti_portata} onPress={() => aggiorna_ordine('Crescente')}>
        <Text>Crescente</Text>
      </Pressable>
      <Pressable style={styles.menu_filtri_pulsanti_portata} onPress={() => aggiorna_ordine('Decrescente')}>
        <Text>Decrescente</Text>
      </Pressable>
    </View>
    <View style={styles.pulsante_reset_filtri}>
    <Button onPress={() => reset_filtri()} title='Reset'/>
    </View>
  </View>


  </SafeAreaView>
  );
}

const styles = StyleSheet.create({menu_filtri: {
    position: 'absolute',
    right: 0,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: larghezza * 0.9,
    height: altezza * 0.7,
    marginTop: altezza * 0.12,
    marginRight: 20,
    padding: 20,
    backgroundColor: 'lightgray',
    borderRadius: 15,
    zIndex: 2
  },

  menu_filtri_categorie: {
    width: '50%',
    backgroundColor: 'blue'
  },

  menu_filtri_categorie_difficoltà: {
    height: '8%',
    width: '100%',
    display: 'flex',
    alignContent: 'space-between',
    flexDirection: 'row',
  },

  menu_filtri_pulsanti_difficoltà: {
    flex: 3,
    marginHorizontal: '1%',
    marginVertical: 7,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
  },

  menu_filtri_categorie_portata: {
    height: '10%',
    width: '100%',
    flexBasis: 'auto',
    flexWrap: 'nowrap',
    display: 'flex',
    alignContent: 'space-between',
    //backgroundColor: 'gray',
    flexDirection: 'row',
  },

  menu_filtri_pulsanti_portata: {
    height: '50%',
    width: '20%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: '1%',
    marginVertical: 5,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#06bf12',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    backgroundColor: 'transparent'
  },

  pulsante_reset_filtri: {
    

  }
})