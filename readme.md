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

- Node.js e npm (o Yarn)
- React Native CLI
- Ambiente di sviluppo React Native
- Emulatore o dispositivo mobile

## Installazione
Clona il repository
```sh
git clone https://github.com/Andrea9530/ricettario.git
```
Copia i file sorgente nella directory di un progetto react native e naviga nella directory

# Installazione dipendenze
Installazione di React Navigation e safe area content
```sh
npm install
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
```

# Linking (solo per Android)
```sh
npx react-native link
```
# Avvio
```sh
npm start
```

# Generazione APK(Android)
L'APK è disponibile nella sezione [Releases], oppure è possibile compilare da codice sorgente:
```sh
cd android
./gradlew clean && ./gradlew AssembleRelease
```

Il file APK verrà generato in `android/app/build/outputs/apk/release`
