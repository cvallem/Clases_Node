const fs = require('fs');

const axios = require('axios');



class Busquedas {

    historial = [];
        
    constructor() {
        this.leerDB();
    }

    get historialCapitalizado() {
        // Capitalizar cada palabra
        
        return this.historial.map( lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );

            return palabras.join(' ');
        });
    
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad( lugar = '' ) {

        try {
            // Petición HTTP
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();

            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch (error) {
            console.log(error);
            return [];
        }
        
    }

    get paramsWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

        
    async climaLugar( lat, lon ) {
        try {
            
            let request = {...this.paramsWeather, ...{
                'lat': lat,
                'lon': lon
            }};

            // Petición HTTP
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: request
            });

            // instance axios.create
            const resp = await instance.get();
            const { weather, main } = resp.data;

            // resp.data
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial ( lugar = '' ) {
        
        // Prevenir duplicados
        if ( this.historial.includes( lugar.toLocaleLowerCase() ) ) {
            return;
        }
        this.historial = this.historial.splice(6);

        this.historial.unshift( lugar.toLocaleLowerCase() );

        // Grabar en BD
        this.guardarDB();

    }

    guardarDB() {

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync( process.env.DB_PATH, JSON.stringify(payload));
    }

    leerDB() {
        // Debe de existir...
        if ( !fs.existsSync( process.env.DB_PATH ) ) {
            return [];
        }

        // Const info ... readFileSync ... path .... encoding
        const info = fs.readFileSync(process.env.DB_PATH, { encoding: 'utf-8'});
        const data = JSON.parse(info);

        this.historial = data.historial;
    }

}







module.exports = Busquedas;