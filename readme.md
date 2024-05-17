# Ricettario

## Descrizione
L'applicazione permette di consultare diverse ricette, con varie funzioni di visualizzazione e personalizzazione.\
Le ricette sono gestite tramite file JSON, è possibile aggiungere o modificare ricette modificando il file [`ricette.json`](ricette.json)

<p align="center">
  <img src="https://github.com/Andrea9530/Ricettario/assets/65161045/8e157d76-c74d-45a9-a18f-0b1bbe7d611d" alt="Pagina Home" width="320" />
  <img src="https://github.com/Andrea9530/Ricettario/assets/65161045/849bfc88-42c1-4cdc-8729-d93a208033ca" alt="Filtri ricerca" width="320" />
  <img src="https://github.com/Andrea9530/Ricettario/assets/65161045/989bd30d-bed1-4f14-af96-bf73635db5d7" alt="Pagina ricetta" width="320" />
</p>




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
L'APK è disponibile nella sezione [Releases](https://github.com/Andrea9530/Ricettario/releases/tag/Release), oppure è possibile compilare da codice sorgente:
```sh
cd android
./gradlew clean && ./gradlew AssembleRelease
```

Il file APK verrà generato in `android/app/build/outputs/apk/release`
