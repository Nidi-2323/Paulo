import React, { useEffect, useState } from 'react';
import Componente1 from './Componente1';
const AirQualityScreen = () => {  

  const [city, setCity] = useState('Puebla');
  const [aqi, setAqi] = useState(0);
  const [source, setSource] = useState('SNICA');
  const [station, setStation] = useState('Conocida');
  const [co, setCo  ] = useState(0);
  const [dew, setDew] = useState(0);
  const [h, setH] = useState(0);
  const [no2, setNo2] = useState(0);
  const [o3, setO3] = useState(0);
  const [p, setP] = useState(0);
  const [pm10, setPm10] = useState(0);
  const [pm25, setPm25] = useState(0);
  const [so2, setSo2] = useState(0);
  const [t, setT] = useState(0);
  const [w, setW] = useState(0);
  const [wg, setWg] = useState(0);
  const [time, setTime] = useState('2024-05-17 00:00:00');
  const [scale, setScale] = useState(['primary','desconocida','Por determinar']);



    const token='d735699d24a8d8f860a7d6b9e21ba6a7084c711b';
    const getAQI = async () =>  {
        const url = `https://api.waqi.info/feed/here/?token=${ token }`;
        const response = await fetch(url);
        const data = await response.json();  
        console.log(data);
        setCity(data.data.city.name);
        setAqi(data.data.aqi);
        setSource(data.data.attributions[0]);
        setTime(data.data.time.s);
        setScale(getScale(data.data.aqi));
        
       
    }


    const getScale = (aqi) => {
      let color =""; 
      let nivel="";
      let mensaje="";
        switch (true) {
          case aqi>0 && aqi <=50:
            color =  "success"; // verde
            nivel ="Buena";
            mensaje="No se anticipan impactos a la salud cuando la calidad del aire se encuentra en este intervalo.";
            break;

            case aqi>=51 && aqi <=100:
            color =  "warning"; // amarillo
            nivel ="Moderada";
            mensaje="Las personas extraordinariamente sensitivas deben considerar limitación de los esfuerzos físicos excesivos y prolongados al aire libre.";
            break;

            case aqi>=101 && aqi <=150:
            color =  "orange"; // naranja
            nivel ="Dañina a la Salud de los Grupos Sensitivos";
            mensaje="Los niños y adultos activos, y personas con enfermedades respiratorias tales como el asma, deben evitar los esfuerzos físicos excesivos y prolongados al aire libre.";
            break;

            case aqi>=151 && aqi <=200:
            color =  "danger"; 
            nivel ="Dañina para la salud";
            mensaje="Los niños y adultos activos, y personas con enfermedades respiratorias tales como el asma, deben evitar los esfuerzos excesivos prolongados al aire libre; las demás personas, especialmente los niños, deben limitar los esfuerzos físicos excesivos y prolongados al aire libre.";
            break;
          
            case aqi>=201 && aqi <=300:
            color =  "purple"; 
            nivel ="Muy Dañina a la Salud";
            mensaje="Los niños y adultos activos, y personas con enfermedades respiratorias tales como el asma, deben evitar todos los esfuerzos excesivos al aire libre; las demás personas, especialmente los niños, deben limitar los esfuerzos físicos excesivos al aire libre.";
            break;
        
          default:
            color="maroon";
            nivel="Arriesgado";
            mensaje="Fin del mundo";
            break;
        }

        return [color,nivel,mensaje];
    }

    //useEffect para traer los datos
useEffect(() => {
    getAQI();
}, [])

    //

    

  return (
    <>
    <div> Aplicacion para la Calidad del aire <p> <a href={source.url} target='_blank' title='Ir al sitio'>  { source.name }  </a></p> </div>

    <div className='card card-info'>

        <div className='card-header'>
          <h4 className='card-title'> { city } </h4>
        </div>
        <div className='card-body'>

        <div className='row'>
          <div className='col-md-6 col-xs-12'>
            <Componente1 valor={aqi} text="AQI" icono="far fa-surprise" color={`bg-${scale[0]}`} descripcion={ scale[1]} />  
          </div>

          <div className='col-md-6 col-xs-12'>
            
            <p>
              Fecha y hora: { time }
            </p>
            <p>
              { scale[2] }
            </p>

          </div>


        </div>



          <div className='row'>
            <div className='col-lg-4 col-md-6 col-xs-12'>
                <Componente1 valor={10} text="CO" icono="far fa-paper-plane" color="bg-primary" />
            </div>
            <div className='col-lg-4 col-md-6 col-xs-12'>
                <Componente1 valor={5.7} text="CO" icono="far fa-surprise" color="bg-orange" />                
            </div>
            <div className='col-lg-4 col-md-6 col-xs-12'>
                <Componente1 valor={9} text="CO" icono="far fa-surprise" color="bg-warning" />                
            </div>
          </div>
        </div>
        <div className='card-footer'>
        <button className='btn btn-secondary'>Cancelar</button>
          <button className='btn btn-success float-right'>Aceptar</button>
        </div>
    </div>
    </>
  )
}
export default AirQualityScreen;