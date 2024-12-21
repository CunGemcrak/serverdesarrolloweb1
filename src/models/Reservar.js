const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs'); // Necesario para encriptar la contraseña

module.exports = (sequelize) => {
  const Reserva = sequelize.define('Reserva', {
    cont: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tidentificacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idusuario: {
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
      allowNull: true,
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paquete: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    canpersonas: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    costopaquete: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Pendiente', // Establece "Aceptado" como valor por defecto
      
    },
    
      
  }, { 
    timestamps: false,
    tableName: 'Reserva', // Asegúrate de que la tabla se llame 'Usuarios'
  });

}