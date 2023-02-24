require ('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu, 
    pausa, 
    leerInput, 
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');


const main = async() => {
    
    let opt = '';
    const tareas = new Tareas();
    const tareasBD = leerDB();

    if (tareasBD) {
        tareas.cargarTareaFromArray(tareasBD);
    }

    do {
        // Imprimir el Menú
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1': // Crear Opcion
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
            break;

            case '2': // Listar Completados
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listarPendientesCompletadas();
            break;
                
            case '4': // Listar Pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '5': // Completado | Pendiente
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;

            case '6': // Borrar
                const id = await listadoTareasBorrar( tareas.listadoArr);
                if ( id !== '0') {
                    const ok = await confirmar('¿Estás Seguro?');
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('\n Tarea Borrada...');
                    }
                }
            break;
        }

        
        guardarDB( tareas.listadoArr );

        await pausa();

    } while(opt !== '0');


    

    
}


main();

