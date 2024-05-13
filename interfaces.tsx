import { NativeStackNavigationProp } from "@react-navigation/native-stack";


//definizione struttura ricetta
export interface Ricetta {
    id: number,
    nome: string,
    tempoPreparazione: string,
    tempoCottura: string,
    difficoltà: string,
    portata: string,
    porzioni: number,
    ingredienti: [number | null, string][],
    procedimento: string[]
  }

//definizione struttura della lista dei filtri
export interface Struttura_filtri{
  nome: string,
  difficoltà: string[],
  portata: string[],
  ordine: 'Crescente' | 'Decrescente',
  ordina_per: 'Nome' | 'Difficoltà' | 'Tempo'
}

type RootStackParamList = {
  Ricerca: undefined;
  Ricetta: { ricetta: Ricetta };
};
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Ricerca'>;