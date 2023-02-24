

const empleados = [
    {
        id: 1,
        nombre: 'Christian'
    },
    {
        id: 2,
        nombre: 'Fernando'
    },
    {
        id: 3,
        nombre: 'Linda'
    },
    {
        id: 4,
        nombre: 'María José'
    }
];

const salarios = [
    {
        id: 1,
        salario: 500
    },
    {
        id: 2,
        salario: 1000
    },
    {
        id: 3,
        salario: 1500
    }
];

const getEmpleado = (id) => {
    
    return new Promise(( resolve, reject ) => {

        const empleado = empleados.find(e => e.id === id)?.nombre;
        
        (empleado) 
           ? resolve(empleado)
           : reject(`No existe empleado con id ${id}`);
    });
}

const getSalario = (id) => {

    return new Promise((resolve, reject) => {
        
        const salario = salarios.find(s => s.id === id)?.salario;

        (salario)
            ? resolve(salario)
            : reject(`El salario no existe con el id ${id}`);
    });

}

// Es un término popular en las promesas

const getInfoUsuarios = async(id) => {
    
    try {
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);

        return `El salario del empleado: ${empleado} es de ${salario}`;

    } catch (error) {
        throw error;
    }
    
}


const id = 4;

function getUser(userId) {
    const userData = fetch(`http://localhost:9080/demoAPI/users`)
        .then(response => response.json())
        .then(data => console.log(data.firstname))
        .catch(error => console.log('Error al procesar', error))
        .finally(() => console.log('Final'));
}

getUser(1);

getInfoUsuarios(id)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));
