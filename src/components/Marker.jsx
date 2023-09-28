import { Circle, CircleMarker, Tooltip } from 'react-leaflet';

const Marker = ({ center, temperature }) => {
    const EventHandlers = {
        mouseover() {
            this.setRadius(10);
        },
        mouseout() {
            this.setRadius(0);
        },
    };

    return (
        <CircleMarker
            center={center}
            eventHandlers={EventHandlers}
            pathOptions={{ color: '#fff' }}
            fill={true}
            fillOpacity={1}
            radius={0}
        >
            <Tooltip>Температура: {temperature} &#8451;</Tooltip>
        </CircleMarker>
    );
};

export default Marker;
