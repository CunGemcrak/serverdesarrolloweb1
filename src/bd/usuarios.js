const bcrypt = require('bcryptjs'); // Para encriptar las contraseñas
const { Usuario } = require('./models'); // Asegúrate de importar correctamente tu modelo

const crearUsuarios = async () => {
  try {
    // Crear contraseñas encriptadas
    const hashedPasswordAdmin = await bcrypt.hash('admin123', 10); // Contraseña del administrador
    const hashedPasswordUser1 = await bcrypt.hash('user1234', 10);
    const hashedPasswordUser2 = await bcrypt.hash('user5678', 10);

    // Datos de los usuarios
    const usuarios = [
      {
        tdocumento: 'CC',
        idusuario: 'admin001',
        imagen: 'admin.jpg',
        nombre: 'Admin',
        papellido: 'Principal',
        sapellido: 'Administrador',
        celular: '3001234567',
        email: 'admin@example.com',
        passwords: hashedPasswordAdmin,
        role_id: '1',
      },
      {
        tdocumento: 'TI',
        idusuario: 'user002',
        imagen: 'user1.jpg',
        nombre: 'John',
        papellido: 'Doe',
        sapellido: 'Smith',
        celular: '3007654321',
        email: 'john.doe@example.com',
        passwords: hashedPasswordUser1,
        role_id: '2',
      },
      {
        tdocumento: 'CC',
        idusuario: 'user003',
        imagen: 'user2.jpg',
        nombre: 'Jane',
        papellido: 'Roe',
        sapellido: 'Williams',
        celular: '3009876543',
        email: 'jane.roe@example.com',
        passwords: hashedPasswordUser2,
        role_id: '3',
      },
    ];

    // Guardar usuarios en la base de datos
    for (const usuario of usuarios) {
      await Usuario.create(usuario);
    }

    console.log('Usuarios creados exitosamente.');
  } catch (error) {
    console.error('Error al crear los usuarios:', error.message);
  }
};

// Exportar la función
module.exports = crearUsuarios;
