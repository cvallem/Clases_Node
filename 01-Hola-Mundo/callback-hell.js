

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

const getEmpleado = (id, callback) => {
    const empleado = empleados.find(e => e.id === id)?.nombre;

    if (empleado) {
        callback(null, empleado);
    } else {
        callback(`Empleado con id ${id} no existe`);
    }
}

const getSalario = (id, callback) => {
    const salario = salarios.find(s => s.id === id)?.salario;

    if (salario) {
        callback(null, salario);
    } else {
        callback(`Salario con id ${id} no existe`);
    }
}

// 
// console.log(getEmpleado(1));
// console.log(getEmpleado(2));
// console.log(getEmpleado(5));
// 

const id = 4;

getEmpleado(id, (err, empleado) => {

    if (err) {
        console.log('ERROR!!!');
        return console.log(err);
    }

    getSalario(id, (err, salario) => {
        if (err) {
            console.log('El emplado:', empleado, 'no tiene un salario');
            console.log('ERROR!!!');
            return console.log(err);
        }
    
        console.log('El emplado:', empleado, 'tiene un salario de:', salario);
    });

});

