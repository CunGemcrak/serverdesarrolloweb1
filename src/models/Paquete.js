const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Paquete = sequelize.define(
    'Paquete',
    {
      cont: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING, // Cambiado a TEXT para descripciones más largas
        allowNull: false,
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2), // Cambiado a DECIMAL para almacenar valores numéricos con precisión
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false, // Cambiado a `false` si se necesita como identificador único
      },
      tipoPrecio: {
        type: DataTypes.STRING, // ENUM restringe a valores específicos
        allowNull: false,
      },
      imagenHabitacion: {
        type: DataTypes.STRING, // URL o ruta de la imagen
        allowNull: true, // No siempre obligatorio
      },
      alimentacion: {
        type: DataTypes.STRING, // Booleano para indicar si incluye alimentación
        allowNull: false,
        defaultValue: false,
      },
      actividades: {
        type: DataTypes.STRING, // Texto largo para describir actividades
        allowNull: true,
      },
      adicionales: {
        type: DataTypes.STRING, // Texto largo para describir elementos adicionales
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: 'Paquete', // Nombre de la tabla
    }
  );

  return Paquete;
};
