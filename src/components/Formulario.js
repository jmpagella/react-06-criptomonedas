import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import Error from './Error';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCripto}) => {

    // Monedas
    const MONEDAS = [
        { codigo: 'ARS', nombre: 'Peso Argentino'},
        { codigo: 'USD', nombre: 'Dolar Estados Unidos'},
        { codigo: 'EUR', nombre: 'Euro'}
    ];

    // State de listados de criptomonedas
    const [ listacripto, guardarCriptomonedas ] = useState([]);

    // State de errores
    const [ error, guardarError ] = useState(false);

    // Utilizar useMoneda
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu moneda', '', MONEDAS);

    // Utilizar useCriptomoneda
    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

    // Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
            const resultado = await axios.get(url);
            
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    // Cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();
        // Validar
        if(moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        // Pasar los datos al componente principal
        guardarMoneda(moneda);
        guardarCripto(criptomoneda);
    }

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {
                error
            ?
                <Error mensaje="Hay un error"></Error>
            :
                null
            }
            
            <SelectMonedas />

            <SelectCripto />
            
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    );
}
 
export default Formulario;