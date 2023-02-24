const { green } = require('colors');
const Tarea = require('./tarea');
require('colors');

/**
 * _listado:
 *          { 'uuid-1234-132454-21234 : { id:12, desc:descripcion, completadoEn: 12/02/2023} },
 */

class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ){

        if (this._listado[id] ) {
            delete this._listado[id];
        }
    }

    cargarTareaFromArray(tareas = []){
        
        tareas.forEach( tarea => {
            this._listado[ tarea.id ] = tarea;
        });

    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        
        console.log();

        this.listadoArr.map( (tarea, indice) => {
            console.log(`${ green(indice + 1) }. ${ tarea.desc } :: ${ tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red }`);
        });
    }

    listarPendientesCompletadas( completadas = true) {
        console.log();

        let idx = 0;
        this.listadoArr.map( (tarea) => {
            let completado = tarea.completadoEn ? true : false;
            idx += 1;

            if (completado === completadas) {
                console.log(`${ idx.toString().green }. ${ tarea.desc } :: ${ tarea.completadoEn ? tarea.completadoEn.green : 'Pendiente'.red }`);
            }
        });
    }

    toggleCompletadas( ids = [] ) {
        ids.forEach( id => {
            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}



module.exports = Tareas;