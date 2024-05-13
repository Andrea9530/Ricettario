import React, { Image, Pressable, ScrollView, TextInput, BackHandler, SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity, Keyboard } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ricettejson from './ricette.json'
import {Ricetta, Struttura_filtri, HomeScreenNavigationProp} from './interfaces'
import PaginaRicetta from './pagina_ricetta.tsx'
import { useState, useEffect } from 'react';

//Creazione stack di navigazione
const navStack = createNativeStackNavigator();
//definizione uri per immagini delle ricette
export const uriImmagini = 'https://sitositoso.altervista.org/immagini_app/';
//Definizione lunghezza ed altezza display
export const larghezza = Dimensions.get('screen').width;
export const altezza = Dimensions.get('screen').height;
//Assegnazione ricette da file JSON
export let listaRicette = ricettejson;




//inizio applicazione
export default function App(){

  return(
  //PAGINE E NAVIGAZIONE
  <NavigationContainer>
  <navStack.Navigator initialRouteName='Home'>
    {/* Pagina iniziale */}
    <navStack.Screen name='Home' component={Home}
      options={{headerShown: false}}
    />
    {/* Pagina ricetta */}
    <navStack.Screen name='Ricetta' component={PaginaRicetta}

    options={({navigation, route}) => ({
      //@ts-ignore
      title: route.params.ricetta.nome,
      headerStyle: {
        backgroundColor: '#8bb25b',
      },
      headerRight: () => (
        <Pressable onPress={() => {navigation.navigate('Home')}} >
          <Image source={require('./immagini/home.png')} style={{width: larghezza * 0.08, height: larghezza * 0.08}}/>
        </Pressable>
      ),
    })}
    />
  </navStack.Navigator>
  </NavigationContainer>
  )
}

//Applicazione filtri scelti dall'utente
function applica_filtri(element: Ricetta, filtri: Struttura_filtri){
  //filtro ricerca
  if( element.nome.toLowerCase().search(filtri.nome.toLowerCase()) != -1){
    //filtro difficoltà
    if(filtri.difficoltà.length == 0 || filtri.difficoltà.map(element => element.toLowerCase()).includes(element.difficoltà.toLowerCase())){
      //filtro portata
      if(filtri.portata.length == 0 || filtri.portata.map(element => element.toLowerCase()).includes(element.portata.toLowerCase())){
          return true;
        }
    }
  }
  return false;
}

//Mostra la lista delle ricette
function render_lista(filtri: Struttura_filtri){
  function ordina_per_nome(a: string, b: string): number{
    if(a > b){
      if(filtri.ordine == "Crescente" || filtri.ordina_per == "Nome")
        return 1;
      return -1;
    }else if(a < b){
      if(filtri.ordine == "Crescente" || filtri.ordina_per == "Nome")
        return -1;
      return 1;
    }else{
      return 0;
    }
  }
    const navigation = useNavigation<HomeScreenNavigationProp>();
    //@ts-ignore
    let ricette: Ricetta[] = ricettejson.filter((element: Ricetta) => applica_filtri(element, filtri));

    //impostare stato ordinamento con typescript e i vari casi di ordinamento con codice
    switch(filtri.ordina_per){
      case 'Nome':
        ricette = ricette.sort((a: Ricetta, b: Ricetta) => {
          return ordina_per_nome(a.nome, b.nome);
        })
      break

      case 'Difficoltà': 
        ricette = ricette.sort((a, b) => {
          //Assegnazione peso valori difficoltà
          const val_difficoltà: Record<string, number> = {
            'Facile': 1,
            'Media': 2,
            'Difficile': 3
          }
          if(val_difficoltà[a.difficoltà] > val_difficoltà[b.difficoltà]){
            return 1;
            
          }else if(val_difficoltà[a.difficoltà] < val_difficoltà[b.difficoltà]){
            return -1;
          }else{
            return ordina_per_nome(a.nome, b.nome);
          }
        })
      break

      case 'Tempo':
        ricette = ricette.sort((a, b) => {
          let tempo_a: number = parseInt(a.tempoCottura.split(' ')[0]) + parseInt(a.tempoPreparazione.split(' ')[0]);
          let tempo_b: number = parseInt(b.tempoCottura.split(' ')[0]) + parseInt(b.tempoPreparazione.split(' ')[0]);
          if(tempo_a > tempo_b){
            return 1;
          }else if(tempo_a < tempo_b){
            return -1;
          }else{
            return ordina_per_nome(a.nome, b.nome);
          }
        })
      break

    }
    //Controllo che ci siano ricette con i filtri selezionati
    if(ricette.length == 0){
      return(
        <Text style={styles.nessuna_ricetta}>Nessuna ricetta trovata</Text>
      );
    }
    //L'ordine viene cambiato se necessario
    if(filtri.ordine == 'Decrescente'){
      ricette = ricette.reverse();
    }

   //Creazione interfaccia per lista ricette
    const elementi = ricette.map((element)=> {
      return(
        <TouchableOpacity activeOpacity={1} onPress={() =>  {navigation.navigate('Ricetta', {ricetta: element})}} key={element.id} style={styles.elemento_lista}>
          <Image source={{uri: uriImmagini + element.id + '.png'}}
          style={styles.elemento_lista_immagine} />
          <Text style={styles.elemento_lista_testo}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>{element.nome}{'\n'}</Text>
            Preparazione: {element.tempoPreparazione}{'\n'}
            Cottura: {element.tempoCottura}{'\n'}
            Difficoltà: {element.difficoltà}{'\n'}
            Portata: {element.portata}{'\n'}
          </Text>
        </TouchableOpacity>
      );
    }
  )
  return elementi;
}


//Pagina Iniziale
function Home() {

  const navigation = useNavigation();
  //stato pannello filtri
  const [menu_filtri, setMenu_filtri] = useState(false);
  //Valore di ricerca
  const [nome, setNome] = useState('');
  //stato filtri
  type tipoDifficoltà = 'Facile' | 'Media' | 'Difficile';
  const [difficoltà, setDifficoltà] = useState<tipoDifficoltà[]> ([]);
  const [preferiti, setPreferiti] = useState(false);
  const [portata, setPortata] = useState<string[]> ([]);
  //Ordine di visualizzazione
  const [ordine, setOrdine] = useState<'Crescente' | 'Decrescente'>('Crescente');
  const [ordina_per, setOrdina_per] = useState<'Nome' | 'Difficoltà' | 'Tempo'>('Nome');

  //Apertura/Chiusura pannello dei filtri
  function toggle_menu_filtri(){
    setMenu_filtri(!menu_filtri);
  }

  //funzione per chiudere il pannello dei filtri quando si preme il tasto indietro
  useEffect(() => {
    // Creazione listener quando cambia il menu filtri
    const backHandler = () => {
      if (menu_filtri) {
        // Chiude il menu e annulla il comando di andare indietro
        toggle_menu_filtri();
        return true;
      }
      // permette il comando indietro
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', backHandler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler);
    };
  }, [menu_filtri]);

  //resetta i filtri
  function reset_filtri(){
    setDifficoltà([]);
    setPreferiti(false);
    setPortata([]);
    setOrdina_per('Nome');
    setOrdine('Crescente');
    toggle_menu_filtri();
  }

  //Aggiorna il filtro difficoltà
  function aggiorna_difficoltà(valore: tipoDifficoltà){
    if(difficoltà.includes(valore)){
      setDifficoltà(difficoltà.filter(element => element != valore));
    }else{
      setDifficoltà([...difficoltà,  valore]);
    }
  }

  //Aggiorna filtro tipo di portata
  function aggiorna_portata(valore: string){
    if(portata.includes(valore)){
      setPortata(portata.filter(element => element != valore));
    }else{
      setPortata([...portata, valore]);
    }
  }

  //Aggiorna ordine di visualizzazione
  function aggiorna_ordine(impostazione: 'Crescente' | 'Decrescente'){
    setOrdine(impostazione);
  }

  //creazione assegnazione valori filtri
  const filtri: Struttura_filtri= {
    nome,
    difficoltà,
    portata,
    ordine,
    ordina_per,
  };  

  return (

<SafeAreaView style={styles.container}>
{menu_filtri &&
<View style={{backgroundColor: 'rgba(128, 128, 128, 0.5)', width: '100%', height: '100%', position: 'absolute', zIndex: 2, top: '7.5%'}}></View>
}
    
  {/* Barra di ricerca */}
    <View style={styles.barra_superiore}>
    <TextInput style={styles.casella_ricerca}
        editable
        onChangeText={text =>  setNome(text)}
        onFocus={()=> {setMenu_filtri(false)}}
        placeholder="Cerca ricetta"
        placeholderTextColor={'black'}
    />
    <TouchableOpacity style={styles.pulsante_filtri} onPress={() => {toggle_menu_filtri(); Keyboard.dismiss()}}>
      <Image source={menu_filtri ? require('./immagini/croce.png') :require('./immagini/filtro.png')} style={styles.pulsante_filtri}></Image>
    </TouchableOpacity>
    </View>


  <ScrollView style={styles.lista}>
      {render_lista(filtri)}
    
  </ScrollView>


  
  {menu_filtri &&  

  <View style={styles.menu_filtri}>
    
    <Text style={styles.menu_filtri_sottotitoli}>Difficoltà</Text>
    <View style={styles.menu_filtri_categorie_difficoltà}>
       
      <Pressable style={[styles.menu_filtri_pulsanti_difficoltà, difficoltà.includes('Facile') ? {backgroundColor: 'green', borderColor: 'green'} : {borderColor: 'green'}]} onPress={() => aggiorna_difficoltà('Facile') }>
        <Text style={styles.testo}>Facile</Text>
      </Pressable>
      <Pressable style={[styles.menu_filtri_pulsanti_difficoltà, difficoltà.includes('Media') ? {backgroundColor: '#e6d309', borderColor: '#e6d309'} : {borderColor: '#e6d309'}]} onPress={() => aggiorna_difficoltà('Media')}>
        <Text style={styles.testo}>Media</Text>
      </Pressable>
      <Pressable style={[styles.menu_filtri_pulsanti_difficoltà, difficoltà.includes('Difficile') ? {backgroundColor: '#e0461f', borderColor: '#e0461f'} : {borderColor: '#e0461f'}]} onPress={() => aggiorna_difficoltà('Difficile')}>
        <Text style={styles.testo}>Difficile</Text>
      </Pressable>
    </View>
    <Text style={styles.menu_filtri_sottotitoli}>Tipo di portata</Text>
    <View style={styles.menu_filtri_categorie_portata}>
      <Pressable style={filtri.portata.includes('Antipasto') ? styles.menu_filtri_pulsanti_portata_premuto : styles.menu_filtri_pulsanti_portata} onPress={() => aggiorna_portata('Antipasto')}>
        <Text style={styles.testo}>Antipasto</Text>
      </Pressable>
      <Pressable style={filtri.portata.includes('Primo') ? styles.menu_filtri_pulsanti_portata_premuto : styles.menu_filtri_pulsanti_portata} onPress={() => aggiorna_portata('Primo')}>
        <Text style={styles.testo}>Primo</Text>
      </Pressable>
      <Pressable style={filtri.portata.includes('Secondo') ? styles.menu_filtri_pulsanti_portata_premuto : styles.menu_filtri_pulsanti_portata} onPress={() => aggiorna_portata('Secondo')}>
        <Text style={styles.testo}>Secondo</Text>
      </Pressable>
      </View>

    <View style={styles.menu_filtri_categorie_portata}>
      <Pressable style={filtri.portata.includes('Contorno') ? styles.menu_filtri_pulsanti_portata_premuto : styles.menu_filtri_pulsanti_portata} onPress={() => aggiorna_portata('Contorno')}>
        <Text style={styles.testo}>Contorno</Text>
      </Pressable>
      <Pressable style={filtri.portata.includes('Dolce') ? styles.menu_filtri_pulsanti_portata_premuto : styles.menu_filtri_pulsanti_portata} onPress={() => aggiorna_portata('Dolce')}>
        <Text style={styles.testo}>Dolce</Text>
      </Pressable>
      <Pressable style={[styles.menu_filtri_pulsanti_portata, {backgroundColor: 'transparent', borderWidth: 0}]}>
      </Pressable>
    </View>
    {/* Selezione metodo di ordinamento */}
    <Text style={styles.menu_filtri_sottotitoli}>Ordina per</Text>
    <View style={styles.menu_filtri_categorie_difficoltà}>
      
      <Pressable style={filtri.ordina_per == 'Nome' ? styles.menu_filtri_pulsanti_portata_premuto : styles.menu_filtri_pulsanti_portata} onPress={() => setOrdina_per('Nome')}>
        <Text style={styles.testo}>Nome</Text>
      </Pressable>
      <Pressable style={filtri.ordina_per == 'Difficoltà' ? styles.menu_filtri_pulsanti_portata_premuto : styles.menu_filtri_pulsanti_portata} onPress={() => setOrdina_per('Difficoltà')}>
        <Text style={styles.testo}>Difficoltà</Text>
      </Pressable>
      <Pressable style={filtri.ordina_per == 'Tempo' ? styles.menu_filtri_pulsanti_portata_premuto : styles.menu_filtri_pulsanti_portata} onPress={() => setOrdina_per('Tempo')}>
        <Text style={styles.testo}>Tempo</Text>
      </Pressable>
    </View>
    <View style={styles.menu_filtri_categorie_difficoltà}>
      {/* SE SI VUOLE CON UN BOTTONE TOGLIERE PARAMETRO E FARE UN TOGGLE IN BASE AL VALORE DELLO STATO */}
      <Pressable style={filtri.ordine == 'Crescente' ? styles.menu_filtri_pulsanti_portata_premuto : styles.menu_filtri_pulsanti_portata} onPress={() => aggiorna_ordine('Crescente')}>
        <Text style={styles.testo}>Crescente</Text>
      </Pressable>
      <Pressable style={filtri.ordine == 'Decrescente' ? styles.menu_filtri_pulsanti_portata_premuto : styles.menu_filtri_pulsanti_portata} onPress={() => aggiorna_ordine('Decrescente')}>
        <Text style={styles.testo}>Decrescente</Text>
      </Pressable>
    </View>
    <TouchableOpacity onPress={() => toggle_menu_filtri()} style={styles.pulsante_applica_filtri}>
      <Text style={{fontSize: 20, fontWeight: '400', color: 'white'}}>Applica</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => reset_filtri()} style={styles.pulsante_reset_filtri}>
      <Text style={{fontSize: 20, fontWeight: '400', color: 'white'}}>Reset</Text>
    </TouchableOpacity>
  </View>
  
}

  </SafeAreaView>
  );
}

//STILI
const styles = StyleSheet.create({
  testo: {
    color: 'black',
    fontWeight: '500'
  },
  barra_superiore: {
    height: altezza * 0.075,
    justifyContent: 'center',
    backgroundColor: '#abd27b',
  },

  casella_ricerca: {
    height: altezza * 0.05,
    width: '80%',
    backgroundColor: '#e0e0e0',
    color: 'black',
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginTop: 5,
    marginHorizontal: 15,
    fontSize: 18,
  },

  cancella_ricerca: {
  },
  pulsante_filtri: {
    backgroundColor: '#abd27b',
    position: 'absolute',
    right: 7,
    top: 7,
    width: altezza * 0.045,
    height: altezza * 0.045,
    resizeMode: 'contain'
  },

  container: {
    flex: 10, //TENERE
  },

  lista: {
    width: '100%',
    backgroundColor: '#abd27b',
    flex: 10,
  },

  elemento_lista: {
    flex: 1,
    flexDirection: 'row',
    width: '98%',
    marginLeft: '1.2%',
    height: altezza * 0.18,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderBottomWidth: 3,
    borderTopWidth: 3,
    borderRadius: 15,
    borderColor: '#abd27b',
  },

  elemento_lista_immagine: {
      resizeMode: 'contain',
      height: '100%',
      width: '35%',
  },

  elemento_lista_testo: {
    width: '65%',
    height: '100%',
    fontSize: 15,
    paddingHorizontal: '2%',
    color: 'black',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  },
  nessuna_ricetta: {
      width: '100%',
      fontSize: 22,
      textAlign: 'center',
      color: 'black',
      marginTop: 5,
  },
  navbar_inferiore: {
    flexDirection: 'row',
    width: '100%',
    height: altezza * 0.08,
    backgroundColor: "#399E2B",
  },

  
  menu_filtri: {
    position: 'absolute',
    right: 0,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: larghezza * 0.9,
    height: altezza * 0.5,
    marginTop: altezza * 0.0727,
    marginRight: 20,
    padding: 10,
    backgroundColor: 'lightgray',
    borderWidth: 3,
    borderColor: 'green',
    borderRadius: 15,
    zIndex: 3
  },

  menu_filtri_sottotitoli: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    width: '100%'
  },

  menu_filtri_categorie_difficoltà: {
    width: '100%',
    alignContent: 'space-between',
    flexDirection: 'row',
  },

  menu_filtri_pulsanti_difficoltà: {
    height: altezza * 0.04,
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
    width: '100%',
    alignContent: 'space-between',
    flexDirection: 'row',
  },

  menu_filtri_pulsanti_portata: {
    height: altezza * 0.04, //UGUALE A DIFFICOLTÀ
    flex: 3,
    marginHorizontal: '1%',
    marginVertical: 5,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#4d9929',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    backgroundColor: 'transparent'
  },

  menu_filtri_pulsanti_portata_premuto: {
    height: altezza * 0.04, //UGUALE A DIFFICOLTÀ
    flex: 3,
    marginHorizontal: '1%',
    marginVertical: 5,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#4d9929',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    backgroundColor: '#4d9929'
  },

  pulsante_applica_filtri: {
    height: altezza * 0.04, //UGUALE A DIFFICOLTÀ
    width: '100%',
    marginTop: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    backgroundColor: 'green'

  },

  pulsante_reset_filtri: {
    height: altezza * 0.04, //UGUALE A DIFFICOLTÀ
    width: '100%',
    marginTop: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#c7310c',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    backgroundColor: '#c7310c'

  }

});
