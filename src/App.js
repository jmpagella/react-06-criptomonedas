import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [cripto, guardarCripto] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    // Consultar la api para obtener la cotizacion
    const cotizarCriptomoneda = async () => {
      // Evitamos la ejecucion la primera vez
      if(moneda === '') return;
      // Construccion de la url
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
      // Llamada a la api
      const resultado = await axios.get(url);
      
      //Muestra el spinner
      guardarCargando(true);

      // Resultado
      setTimeout(() => {
        // Guardamos resultado
        guardarResultado(resultado.data.DISPLAY[cripto][moneda]);
        // Ocultar el spinner
        guardarCargando(false);
      }, 1000);
    }
    cotizarCriptomoneda();

  }, [moneda, cripto]);

  // Mostrar spinner o resultado
  let componente;
  if (cargando) {
    componente = <Spinner />
  } else {
    componente = <Cotizacion resultado={resultado} />
  }

  return (
    <Contenedor>

      <div>
        <Imagen
          src={imagen}
          alt="Imagen Cripto"
        />
      </div>

      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>

        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCripto={guardarCripto}
        />

        {componente}
      </div>

    </Contenedor>
  );
}

export default App;
