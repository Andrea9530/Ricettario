# Ricettario

## Descrizione
L'applicazione permette di consultare diverse ricette, con varie funzioni di visualizzazione e personalizzazione.\
Le ricette sono gestite tramite file JSON, è possibile aggiungere o modificare ricette modificando il file [`ricette.json`](ricette.json)

## Funzionalità Principali
- Ricerca ricette per nome
- Filtro ricette in base al tipo di piatto e difficoltà
- Ordinamento delle ricette personalizzabile in base a nome, difficoltà, durata
- Dosi ingredienti personalizzabile in base alle pozioni necessarie

## Requisiti
<!-- Elenco dei requisiti necessari per eseguire il progetto -->

- Node.js e npm (o Yarn)
- React Native CLI
- Ambiente di sviluppo React Native
- Emulatore o dispositivo mobile

## Installazione
Clona il repository
```sh
git clone https://github.com/tuonome/ricettario.git
```
Naviga nella directory del progetto
```sh
cd ricettario
```

# Installazione dipendenze
## NPM
Installazione di React Navigation
```sh
npm install
npm install @react-navigation/native
npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```
## Yarn
Installazione di React Navigation
```sh
yarn install
yarn add @react-navigation/native
yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

# Linking (solo per Android)
npx react-native link

# Avvio
## NPM
```sh
npm start
```

## Yarn
```sh
yarn start
```
# Generazione APK(Android)
L'APK è disponibile nella sezione [Releases], oppure è possibile compilare da codice sorgente:
```sh
cd android
.gradlew clean && .gradlew AssembleRelease
```

Il file APK verrà generato in `android/app/build/outputs/apk`
