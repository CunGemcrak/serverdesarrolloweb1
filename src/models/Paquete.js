const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
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
        type: DataTypes.TEXT,
        allowNull: false,
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      tipoPrecio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagenHabitacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      alimentacion: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Sin alimentación',
      },
      actividades: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      adicionales: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: 'Paquete',
    }
  );

  // Hook para insertar los paquetes predeterminados después de sincronizar
  Paquete.afterSync(async () => {
    const existingPackages = await Paquete.count();
    if (existingPackages === 0) {
      // Paquetes predeterminados
      const defaultPackages = [
        {
          nombre: 'Paquete Aventura Mario Kart',
          descripcion: 'Vive una experiencia emocionante con tours guiados y carreras de karts.',
          precio: 700.0,
          value: 'paqueteAventura',
          tipoPrecio: 'individual',
          imagenHabitacion: 'https://res.cloudinary.com/dss2hdisa/image/upload/78683d87f12356c571e4541b2ef649e3bd608285139704087c552171f715e399_f5kooa.avif',
          alimentacion: 'Incluye desayuno y almuerzo.',
          actividades: 'Carreras de karts, tours temáticos.',
          adicionales: 'Acceso prioritario a zonas exclusivas.',
        },
        {
          nombre: 'Paquete Lujo Champiñón',
          descripcion: 'Relájate en nuestras suites temáticas con todas las comodidades.',
          precio: 1000.0,
          value: 'paqueteLujo',
          tipoPrecio: 'individual',
          imagenHabitacion: 'https://res.cloudinary.com/dss2hdisa/image/upload/super-mario-pelicula-reino-champinon-2887850_yeqbbq.webp',
          alimentacion: 'Incluye todas las comidas.',
          actividades: 'Acceso al spa, actividades recreativas exclusivas.',
          adicionales: 'Mini bar incluido, amenities premium.',
        },
        {
          nombre: 'Paquete Relax en el Spa',
          descripcion: 'Disfruta de un día completo de relajación en nuestro exclusivo spa con masajes y acceso a todas las instalaciones.',
          precio: 350.0,
          value: 'paqueteRelaxSpa',
          tipoPrecio: 'individual',
          imagenHabitacion: 'https://res.cloudinary.com/dss2hdisa/image/upload/images_xaiibe.jpg',
          alimentacion: 'Incluye almuerzo ligero.',
          actividades: 'Acceso al spa, masajes relajantes.',
          adicionales: 'Kit de spa personalizado.',
        },
        {
          nombre: 'Paquete Aventura en la Naturaleza',
          descripcion: 'Embárcate en una aventura de senderismo, pesca y campamento en las montañas cercanas.',
          precio: 600.0,
          value: 'paqueteAventuraNaturaleza',
          tipoPrecio: 'individual',
          imagenHabitacion: 'https://res.cloudinary.com/dss2hdisa/image/upload/illustration-video-games-water-nature-Super-Mario-world-844105-wallhere.com_zujlij.jpg',
          alimentacion: 'Incluye alimentos para campamento.',
          actividades: 'Senderismo, pesca, campamento.',
          adicionales: 'Guías especializados, equipo de campamento.',
        },
        {
          nombre: 'Paquete Kids Club',
          descripcion: 'Diversión asegurada para los más pequeños, con actividades diarias, talleres y acceso exclusivo a la zona de juegos.',
          precio: 400.0,
          value: 'paqueteKidsClub',
          tipoPrecio: 'individual',
          imagenHabitacion: 'https://res.cloudinary.com/dss2hdisa/image/upload/arton55899_ingvz5.jpg',
          alimentacion: 'Incluye todas las comidas para niños.',
          actividades: 'Talleres creativos, juegos supervisados.',
          adicionales: 'Regalo sorpresa para cada niño.',
        },
        {
          nombre: 'Paquete VIP Executive',
          descripcion: 'Una experiencia exclusiva con acceso a nuestras suites VIP, transporte privado y cenas gourmet.',
          precio: 2000.0,
          value: 'paqueteVIPExecutive',
          tipoPrecio: 'individual',
          imagenHabitacion: 'https://res.cloudinary.com/dss2hdisa/image/upload/maxresdefault_gtogrg.jpg',
          alimentacion: 'Incluye todas las comidas y bebidas premium.',
          actividades: 'Transporte privado, cenas gourmet.',
          adicionales: 'Acceso VIP a todas las áreas.',
        },
        {
          nombre: 'Paquete Fin de Semana Gastronómico',
          descripcion: 'Un fin de semana dedicado a los amantes de la gastronomía con clases de cocina y cenas temáticas.',
          precio: 800.0,
          value: 'paqueteGastronomico',
          tipoPrecio: 'individual',
          imagenHabitacion: 'https://res.cloudinary.com/dss2hdisa/image/upload/FOTO-LR-2024-04-13T095740.476_ybwnpn.webp',
          alimentacion: 'Incluye todas las comidas y bebidas.',
          actividades: 'Clases de cocina, cenas temáticas.',
          adicionales: 'Libro de recetas exclusivas.',
        },
      ];

      // Inserta los paquetes predeterminados en la base de datos
      await Paquete.bulkCreate(defaultPackages);
      console.log('Paquetes predeterminados creados exitosamente.');
    }
  });

  return Paquete;
};
