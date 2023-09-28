import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Polyline, LayersControl, LayerGroup, Popup } from 'react-leaflet';
import locationData from '../data/location.json';
import temperaturesData from '../data/temperatures.json';
import Marker from './Marker';
import { useMemo } from 'react';
import { transformData } from '../utils/helpers';

function App() {
    const markers = useMemo(() => transformData(locationData, temperaturesData), []);
    return (
        Object.keys(markers) !== 0 && (
            <MapContainer
                center={[59.13342986, 37.84600256]}
                minZoom={7}
                maxZoom={17}
                zoom={17}
                maxBounds={[75.63589, 184.902851]}
                bounds={[75.63589, 184.902851]}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <LayersControl position='topright'>
                    {/* В случае > 1 локомотивов можно пройти по массиву  */}
                    <LayersControl.Overlay
                        checked
                        name={markers.LocoType + ' ' + markers.LocoNumber}
                    >
                        <LayerGroup>
                            <Polyline pathOptions={{ color: '#000' }} positions={markers.points}>
                                <Popup>
                                    <div className='popup-container'>
                                        <span>Тип: {markers.LocoType}</span>
                                        <span>Номер: {markers.LocoNumber}</span>
                                    </div>
                                </Popup>
                            </Polyline>
                            {markers.points.map((point, index) => (
                                <Marker key={index} center={point} temperature={point[2]} />
                            ))}
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
            </MapContainer>
        )
    );
}

export default App;
