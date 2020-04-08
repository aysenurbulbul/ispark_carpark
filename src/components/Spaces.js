import React from 'react';
import axios from 'axios';
import {Container} from 'semantic-ui-react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from "ol/proj";
import Vector from 'ol/source/Vector'
import Vect from 'ol/layer/Vector'
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";

class Spaces extends React.Component{

    state = {
        spaces :[],
        empty : 0,
        capacity : 0,
        latitude : 0,
        longitude : 0,
        map : {},
        district :'',
        carpark : ''
    };

    componentDidMount() {
        let url = 'https://api.ibb.gov.tr/ispark/ParkDetay?id='+ this.props.match.params.name;
        //console.log(url);
        axios.get(url)
            .then((response) => {
                console.log(response.data);
                this.setState({empty:response.data.BosKapasite, capacity:response.data.Kapasitesi, latitude:response.data.Latitude, longitude:response.data.Longitude})
                this.setState({district: response.data.Ilce, carpark:response.data.ParkAdi})
                console.log(this.state);
                let map = new Map({
                    target: 'map',
                    layers: [
                        new TileLayer({
                            source: new OSM()
                        })
                    ],
                    view: new View({

                        center: fromLonLat([this.state.longitude, this.state.latitude]),
                        zoom: 10
                    })
                });
                this.setState({map:map})
                let layer = new Vect({
                    source: new Vector({
                        features: [
                            new Feature({
                                geometry: new Point(fromLonLat([this.state.longitude, this.state.latitude]))
                            })
                        ]
                    })
                });

                let iconStyle = new Style({
                    image: new Icon({
                        anchor: [0.5, 1],
                        src: '/marker-black.png'
                    })
                });

                layer.setStyle(iconStyle);
                map.addLayer(layer);



            })
            .catch((error) => {
                console.log(error.message)
            });
        console.log(this.state);



    }

    render() {
        return(
            <Container text>
                <b>District : </b>{this.state.district}
                <br/>
                <b>Car Park :</b> {this.state.carpark}
                <br/>
                <b>The number of total capacity :</b> {this.state.capacity}
                <br/>
                <b>The number of free spaces :</b> {this.state.empty}
                <br/>
                <b>The number of used spaces :</b>  {this.state.capacity - this.state.empty}
                <br/>
                <br/>
                <div id="map" className="map"></div>

            </Container>

        )
    }

}

export default Spaces;