import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario =  ({moneda, criptomoneda, guardarMoneda, guardarcriptomoneda, guardarConsultarAPI}) => {

    
    const [ criptomonedas, guardarcriptomonedas] = useState([]);

    useEffect(() =>{
        const consultarApi = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarcriptomonedas(resultado.data.Data);
        }
        consultarApi();
    }, [])

    //Aqui le decimos que la moneda que seleccionemos se quede guardada a la hora de seleccionar
    const obtenerMoneda = moneda =>{
        guardarMoneda(moneda)
    }
    const obtenerCriptomoneda = cripto =>{
        guardarcriptomoneda(cripto)
    }

    const cotizarPrecio = () =>{
        if(moneda.trim() === '' || criptomoneda.trim() === ''){
        mostrarAlerta();
        return;
    }
    //Cambiamos el estado de consultar la API
    guardarConsultarAPI(true)
}
    const mostrarAlerta = () =>{
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios',
            [
                {text: 'OK'}
            ]
        )
    }
    return (

        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={ moneda => obtenerMoneda(moneda) }
                itemStyle={{ height: 120 }}
            >
                <Picker.Item label="-Seleccione-" value=""/>
                <Picker.Item label="Euro" value="EUR"/>
                <Picker.Item label="Dolar Estado Unidos" value="USD"/>
                <Picker.Item label="Peso Mexicano" value="MXN"/>
                <Picker.Item label="Libra Esterlina" value="GBP"/>
            </Picker>

            <Text style={styles.label}>Criptomonedas</Text>
            <Picker
                selectedValue={criptomoneda}
                onValueChange={ cripto => obtenerCriptomoneda(cripto) }
                itemStyle={{ height: 120 }}
            >
                <Picker.Item label="-Seleccione-" value=""/>
                {criptomonedas.map( cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                ))}
            </Picker>
            <TouchableHighlight
            style={styles.btCotizar}
            onPress={ () => cotizarPrecio()}
            >
                <Text style={styles.textoCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20,
    },
    btCotizar: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20,
    },
    textoCotizar: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
});

export default Formulario