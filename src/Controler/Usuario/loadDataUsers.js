const bcrypt = require('bcryptjs');
const Usuario = require('../../models/Usuario'); // Asegúrate de que la ruta sea correcta
const sequelize = require('../../../db'); // Conexión a la base de datos

// Función principal para cargar los datos
async function loadData() {
  try {
    // Sincroniza el modelo con la base de datos (ajusta según tus necesidades)
    await sequelize.sync();

    // Datos a insertar
    const usuarios = [
      {
        cont: 1,
        idusuario: '106758454',
        nombre: 'Luis Alberto',
        papellido: 'Buelvas',
        sapellido: 'Cogollo',
        celular: '3012282338',
        email: 'labc.1021@gmail.com',
        password: await bcrypt.hash('Geminis123*.', 10), // Contraseña cifrada
        imagen: 'https://res.cloudinary.com/dss2hdisa/image/upload/Super_Mario_Maker_for_Nintendo_3DS__JP_website_open_footage_commercials_more_xrnxvc.jpg',
        role: '1',
      },
      {
        cont: 2,
        idusuario: '10000004',
        nombre: 'Andres Javier',
        papellido: 'Peña',
        sapellido: 'Lopez',
        celular: '303123366',
        email: 'gemcrak@gmail.com',
        password: await bcrypt.hash('Geminis123*.', 10), // Contraseña cifrada
        imagen: 'https://res.cloudinary.com/dss2hdisa/image/upload/Imprimibles_Fiesta_u4izvk.jpg',
        role: '2',
      },
      {
        cont: 3,
        idusuario: '10000005',
        nombre: 'Angela Maria',
        papellido: 'Orozco',
        sapellido: 'Ramirez',
        celular: '3106748245',
        email: 'angelaorozco@gmail.com',
        password: await bcrypt.hash('Geminis123*.', 10), // Contraseña cifrada
        imagen: 'https://res.cloudinary.com/dss2hdisa/image/upload/games-where-you-can-play-princess-peach_brk3uo.avif',
        role: '2',
      },
    ];

    // Inserta los datos en la base de datos
    await Usuario.bulkCreate(usuarios);
    console.log('Usuarios cargados exitosamente.');
  } catch (error) {
    console.error('Error al cargar datos:', error);
  } finally {
    // Cierra la conexión a la base de datos
    await sequelize.close();
  }
}

// Ejecutar la función
loadData();
