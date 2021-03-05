import React, { useState, useEffect}  from 'react';
import { StyleSheet, Image, View, ScrollView, ActivityIndicator} from 'react-native';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Cotizacion from './components/Cotizacion'
import axios from 'axios';


const App = () => {

  const [ moneda, guardarMoneda ] = useState('');
  const [ criptomoneda, guardarcriptomoneda ] = useState('');
  const [ consultarAPI, guardarConsultarAPI] = useState(false);
  const [ resultado, guardarResultdo] = useState({});
  const [ cargando, guardarCargando] = useState(false);


  useEffect(()=>{
    const cotizarCriptomoneda = async ()=>{

      if(consultarAPI){
        //Consultamos a la Api para obtener la cotizacion (cambiar signo dolar por el €)
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const resultado = await axios.get(url);

        guardarCargando(true);

        //Ocultamos el spiner y mostramos el resultado
        setTimeout(() => {
            guardarResultdo(resultado.data.DISPLAY[criptomoneda][moneda]);
            guardarConsultarAPI(false);
            guardarCargando(false)
        },3000);
      }
    }
    cotizarCriptomoneda();
  }, [consultarAPI]);

  // mostrar el spinner o el resultado
  const componente = cargando ? <ActivityIndicator size="large" color="#5E49E2" /> : <Cotizacion resultado={resultado} />

  return (
    <>

    <ScrollView>
        <Header />

        <Image
          style={styles.imagen}
          source={ require('./assets/img/cryptomonedas.png')}
        />
        <View style={styles.contenido}>
            <Formulario
              moneda={moneda}
              criptomoneda={criptomoneda}
              guardarMoneda={guardarMoneda}
              guardarcriptomoneda={guardarcriptomoneda}
              guardarConsultarAPI={guardarConsultarAPI}

            />
        </View>
        <View style={{marginTop: 40 }}>
        {componente}
        </View>
        </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido:{
    marginHorizontal:'2.5%'
  }
});

export default App;
