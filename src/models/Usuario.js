const { DataTypes } = require('sequelize');
// Necesario para encriptar la contraseña

module.exports = async (sequelize) => {
  const Usuario = sequelize.define(
    'Usuario',
    {
      cont: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tdocumento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idusuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      papellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sapellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      celular: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      passwords: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user', // 'user' por defecto, puede ser 'admin' para el admin
      },
    },
    {
      timestamps: false,
      tableName: 'Usuarios', // Asegúrate de que la tabla se llame 'Usuarios'
    }
  );

  // Hook para insertar los usuarios después de sincronizar
  Usuario.afterSync(async () => {
    const existingUsers = await Usuario.count();
    if (existingUsers === 0) {
      // Hash de contraseñas de ejemplo
      const passwordHash = 'Geminis123*'//await //bcrypt.hash('Geminis123*', 10);

      // Usuarios predeterminados
      const defaultUsers = [
        {
          tdocumento: 'Cedula',
          idusuario: '123456789',
          imagen: 'https://res.cloudinary.com/dss2hdisa/image/upload/Super_Mario_Maker_for_Nintendo_3DS__JP_website_open_footage_commercials_more_xrnxvc.jpg',
          nombre: 'Admin',
          papellido: 'Perez',
          sapellido: 'Garcia',
          celular: '1234567890',
          email: 'labc.1021@gmail.com',
          passwords: passwordHash,
          role_id: '1',
        },
        {
          tdocumento: 'Pasaporte',
          idusuario: '1234567890',
          imagen: 'https://res.cloudinary.com/dss2hdisa/image/upload/9e46d2905d70d779a552ff036d5e5b1e_leirjn.jpg',
          nombre: 'User',
          papellido: 'Lopez',
          sapellido: 'Martinez',
          celular: '9876543210',
          email: 'gemcrak@gmail.com',
          passwords: passwordHash,
          role_id: '2',
        },
        {
          tdocumento: 'DNI',
          idusuario: '103698741',
          imagen: 'https://res.cloudinary.com/dss2hdisa/image/upload/png-clipart-new-super-mario-bros-2-bowser-mario-heroes-super-mario-bros_zrdq18.png',
          nombre: 'Manager',
          papellido: 'Rodriguez',
          sapellido: 'Torres',
          celular: '1231231234',
          email: 'geminis@gmail.com',
          passwords: passwordHash,
          role_id: '0',
        },
      ];

      // Inserta usuarios en la base de datos
      await Usuario.bulkCreate(defaultUsers);
      console.log('Usuarios predeterminados creados exitosamente.');
    }
  });

  return Usuario;
};
