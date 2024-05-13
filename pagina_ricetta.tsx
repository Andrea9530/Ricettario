import React, { Image, ScrollView, SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Ricetta } from './interfaces'
import { useState } from 'react';
import { uriImmagini } from './App';

//@ts-ignore
export default function PaginaRicetta({route}) {

    //Assegnazione valori ricetta
    const ricetta: Ricetta = route.params.ricetta;
    //Approssima il valore a .0 o .5
    function approssima_metà(num: number){
      return Math.max((Math.round(num*2)/2), 0.5);
    }
    //Quantità dosi
    const [persone, setPersone] = useState(ricetta.porzioni);
    const porzioni = ricetta.porzioni;
    function render_pagina(){

      return(
        <ScrollView  style={styles.container}>
        <Image source={{uri: uriImmagini + ricetta.id + '.png'}}
        style={styles.immagine}/>
        <View style={styles.parte_testo}>
          <Text style={styles.titolo}>{ricetta.nome}</Text>
          <View style={styles.lista_preparazione}>
            <Text style={styles.testo}>Tempo di preparazione: {ricetta.tempoPreparazione}</Text>
            <Text style={styles.testo}>Tempo di cottura: {ricetta.tempoCottura}</Text>
            <Text style={styles.testo}>Difficoltà: {ricetta.difficoltà}</Text>
            <Text style={styles.testo}>Portata: {ricetta.portata}</Text>
          </View>
          {/*Lista ingredienti */}
          <Text style={styles.sottotitolo}>Ingredienti</Text>
          <View style={styles.lista_ingredienti}>
            
            <View style={styles.menu_dose}>
              <Text style={styles.testo_dose}>Dose per:</Text>
              <TouchableOpacity onPress={() => {persone == 1? () => {}: setPersone(persone - 1)}} style={[styles.pulsanti_dose]}><Text style={{textAlign: 'center', fontSize: 45, marginTop: -19, color: 'white'}}>-</Text></TouchableOpacity>
              {/*<TextInput keyboardType='numeric' value={flag? porzioni.toString(): persone.toString()} placeholderTextColor={'black'} onChangeText={(text) =>  aggiorna_persone(text)} style={{color: 'black'}}></TextInput>*/}
              <Text style={styles.testo_dose}>{persone}</Text>
              <TouchableOpacity onPress={() => setPersone(persone + 1)} style={[styles.pulsanti_dose]}><Text style={{fontSize: 30, marginTop: -6, color: 'white'}}>+</Text></TouchableOpacity>
              <Text style={styles.testo_dose}>persone</Text>
          </View>
          
          {ricetta.ingredienti.map((element, i) => 
          <Text style={styles.testo} key={i.toString()}>{`\u2022 ${element[0] == null ? element[1]: approssima_metà((element[0]/porzioni)*persone) + element[1]}`}</Text>
          )
          }
          </View>
          <Text style={styles.sottotitolo}>Procedimento</Text>
          <View style={styles.lista_procedimento}>
            
            {ricetta.procedimento.map((element, i) => 
              <Text style={styles.testo} key={i.toString()}>{element + `\n`}</Text>
            )
            }
          </View>
        </View>
        </ScrollView>
          
      )
    }
    return (
    <SafeAreaView>
        {render_pagina()}
    </SafeAreaView>
    );
    }

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#abd27b',
        height: '100%'
      },

      immagine: {
        resizeMode: 'contain',
        
        height: Dimensions.get('screen').height * 0.2,
        width: Dimensions.get('screen').width,
      },


      parte_testo: {
        paddingHorizontal: 10,
      }, 

      titolo: {
        textAlign: 'center',
        fontSize: 30,
        marginTop: 10,
        color: 'black',
        fontWeight: 'bold',
      },

      lista_preparazione: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        padding: 15,
        borderRadius: 20,
        marginTop: 10,
      },

      sottotitolo: {
        fontSize: 22,
        color: 'black',
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
      },

      lista_ingredienti: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 20,
        padding: 15,
        marginTop: 10,
      },

      menu_dose: {
        height: 40,
        marginVertical: 10,
        marginHorizontal: 15,
        justifyContent: 'center',
        backgroundColor: '#ffb08a',
        borderColor: 'green',
        borderWidth: 0,
        borderRadius: 100,
        flexDirection: 'row',
      },

      testo_dose: {
        color: 'black',
        marginHorizontal: 5,
        alignSelf: 'center',
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      },
    
      pulsanti_dose: {
        alignSelf: 'center',
        height: 30,
        width: 40,
        borderRadius: 100,
        marginHorizontal: 5,
        fontSize: 20,
        borderWidth: 0,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'transparent',
      },

      testo: {
        textAlign: 'justify',
        color: 'black',
        fontSize: 16,
        fontWeight: '500'
      },

      lista_procedimento: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        padding: 15,
        paddingBottom: 0,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,
      }
});