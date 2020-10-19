import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css'

import mapMarkerImg from '../img/map-marker.svg'
import mapIcon from '../utils/mapIcon'
import api from '../services/api';

import '../styles/pages/orphanages-map.css'

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  // 1 parametro do use efect é uma ação.
  // 2 parametro do use efect é quando a ação vai ser executada (quando o valor de uma das variaveis dentro do vetor mudar).
  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  }, []);

  return (
   <div id="page-map">
     <aside>
       <header>
         <img src={mapMarkerImg} alt="Happy"/>
         <h2>Escolha um orfanato no mapa</h2>
         <p>Muitas crianças estão esperando a sua visita :)</p>
       </header>

       <footer>
         <strong>Reriutaba</strong>
         <span>Ceará</span>
       </footer>
     </aside>

    <Map 
      center={[-3.6424899,-40.1159477]}
      zoom={7}
      style={{width: '100%', height: '100%'}}
    >
      <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

    { orphanages.map(orphanage => {
      return (
        <Marker 
          key = {orphanage.id}
          icon = {mapIcon}
          position = {[orphanage.latitude,orphanage.longitude]}
        > 
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup" >
            {orphanage.name}
            <Link to={`/orphanages/${orphanage.id}`}>
              <FiArrowRight size={20} color="#FFF" />
            </Link>
          </Popup>
        </Marker>
      )
    })}
    </Map>

    <Link to="/orphanages/create" className="creat-orphanage">
      <FiPlus size={32} color="#FFF" />
    </Link>

   </div> 
  );
}

export default OrphanagesMap;