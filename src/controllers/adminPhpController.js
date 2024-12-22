const axios = require('axios');
require('dotenv').config();

const { URL_SERVIDORWEB } = process.env;
const phpBaseUrl = URL_SERVIDORWEB; // URL base del servidor PHP

const adminPhpController = {
  // Crear un paquete
  crearpaquete: async (req, res) => {
    try {
      const {
        nombre,
        descripcion,
        precio,
        value,
        tipoPrecio,
        imagenHabitacion,
        alimentacion,
        actividades,
        adicionales,
      } = req.body;

      if (
        !nombre ||
        !descripcion ||
        !precio ||
        !value ||
        !tipoPrecio
      ) {
        return res.status(400).json({ message: 'Faltan datos obligatorios en la solicitud.' });
      }

      const response = await axios.post(
        `${phpBaseUrl}?action=crearpaquete`,
        {
          nombre,
          descripcion,
          precio,
          value,
          tipoPrecio,
          imagenHabitacion,
          alimentacion,
          actividades,
          adicionales,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error al crear el paquete:', error.message);
      res.status(500).json({ message: 'Error al crear el paquete.', error });
    }
  },

  // Ver paquetes
  verpaquetes: async (req, res) => {
    try {
      const response = await axios.get(`${phpBaseUrl}?action=verpaquetes`);

      if (!response.data || response.data.length === 0) {
        return res.status(404).json({ message: 'No se encontraron paquetes.' });
      }

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error al obtener los paquetes:', error.message);
      res.status(500).json({ message: 'Error al obtener los paquetes.', error });
    }
  },

// Leer todos los usuarios
leerusuariosAll: async (req, res) => {
  try {
    console.log('Entro al leerallUser'); // Cambiado alert por console.log
  
    const response = await axios.get(`${phpBaseUrl}?action=leerusuariosAll`);

    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ message: 'No se encontraron usuarios.' });
    }

    // Responder con los datos obtenidos
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error.message);
    res.status(500).json({
      message: 'Error al obtener los usuarios.',
      error: error.message,
    });
  }
},

  // Leer un usuario específico (por query)
  leerusuarios: async (req, res) => {
    try {
      const { email, passwords } = req.query;

      if (!email || !passwords) {
        return res.status(400).json({ message: 'Faltan parámetros requeridos: email y/o passwords.' });
      }

      const response = await axios.post(
        `${phpBaseUrl}?action=leerusuarios`,
        { email, passwords },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (!response.data || response.data.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error al obtener el usuario:', error.message);
      res.status(500).json({ message: 'Error al obtener el usuario.', error });
    }
  },

  // Ver todas las reservas
  verreservaAll: async (req, res) => {
    try {
      const response = await axios.get(`${phpBaseUrl}?action=verreservaAll`);

      if (!response.data || response.data.length === 0) {
        return res.status(404).json({ message: 'No se encontraron reservas.' });
      }

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error al obtener las reservas:', error.message);
      res.status(500).json({ message: 'Error al obtener las reservas.', error });
    }
  },

  eliminarpaquete: async (req, res) => {
    try {
      const { id } = req.params; // Este es el id que recibes en la URL, no en el cuerpo
  
      if (!id) {
        return res.status(400).json({ message: 'ID de la reserva no proporcionado.' });
      }
    
      // Si el backend está configurado para aceptar el id como parámetro de la ruta
      const response = await axios.delete(`${phpBaseUrl}?action=eliminarpaquete&id=${id}`);

      console.log("este es el" +id)
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error al eliminar la reserva:', error.message);
      res.status(500).json({ message: 'Error al eliminar el paquete.', error });
    }
  },  

  // Eliminar un usuario
  eliminarusuario: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'ID del usuario no proporcionado.' });
      }

      const response = await axios.delete(`${phpBaseUrl}?action=eliminarpaquete&id=${id}`);

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error.message);
      res.status(500).json({ message: 'Error al eliminar el usuario.', error });
    }
  },


  // Actualizar un paquete
  adminactualizarpaquete: async (req, res) => {
    try {
      const { id } = req.params; // Obtener ID del paquete desde los parámetros de la URL
      const {
        cont,
        nombre,
        descripcion,
        precio,
        value,
        tipoPrecio,
        imagenHabitacion,
        alimentacion,
        actividades,
        adicionales,
      } = req.body;
      console.log("el bodi es " + JSON.stringify(req.body)) 

      if (!id || !nombre || !descripcion || !precio || !value || !tipoPrecio) {
        return res.status(400).json({ message: 'Faltan datos obligatorios para actualizar el paquete.' });
      }

      const response = await axios.put(
        `${phpBaseUrl}?action=adminactualizarpaquete&id=${id}`,
        {
          cont,
          nombre,
          descripcion,
          precio,
          value,
          tipoPrecio,
          imagenHabitacion,
          alimentacion,
          actividades,
          adicionales,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error al actualizar el paquete:', error.message);
      res.status(500).json({ message: 'Error al actualizar el paquete.', error });
    }
  },

  administradoractualizarpaquete: async (req, res) => {
    try {
      const { id } = req.params; // Obtener el ID del paquete desde los parámetros de la URL
      const {
        nombre,
        descripcion,
        precio,
        value,
        tipoPrecio,
        imagenHabitacion,
        alimentacion,
        actividades,
        adicionales,
      } = req.body; // Obtener los datos del paquete desde el cuerpo de la solicitud
  
      // Validar que todos los campos necesarios estén presentes
      if (!id || !nombre || !descripcion || !precio || !value || !tipoPrecio) {
        return res.status(400).json({ message: 'Faltan datos obligatorios para actualizar el paquete.' });
      }
  
      // Enviar la solicitud PUT al servidor PHP para actualizar el paquete
      const response = await axios.put(
        `${phpBaseUrl}?action=adminactualizarpaquete&id=${id}`,
        {
          nombre,
          descripcion,
          precio,
          value,
          tipoPrecio,
          imagenHabitacion,
          alimentacion,
          actividades,
          adicionales,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      // Enviar la respuesta del servidor PHP de vuelta al cliente
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error al actualizar el paquete:', error.message);
      res.status(500).json({ message: 'Error al actualizar el paquete.', error });
    }
  },




  estadousuariobloquear: async (req, res) => {
    try {
      const { id } = req.params; // Obtener el ID del paquete desde los parámetros de la URL
  
      // Validar que todos los campos necesarios estén presentes
      if (!id ) {
        return res.status(400).json({ message: 'Faltan datos obligatorios para actualizar el paquete.' });
      }
  
      // Enviar la solicitud PUT al servidor PHP para actualizar el paquete
      const response = await axios.put(
        `${phpBaseUrl}?action=bloquearusuario&id=${id}`,
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      // Enviar la respuesta del servidor PHP de vuelta al cliente
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error al actualizar el paquete:', error.message);
      res.status(500).json({ message: 'Error al actualizar el paquete.', error });
    }
  },

  estadousuarioactivar: async (req, res) => {
    try {
      const { id } = req.params; // Obtener el ID del paquete desde los parámetros de la URL
  
      // Validar que todos los campos necesarios estén presentes
      if (!id ) {
        return res.status(400).json({ message: 'Faltan datos obligatorios para actualizar el paquete.' });
      }
  
      // Enviar la solicitud PUT al servidor PHP para actualizar el paquete
      const response = await axios.put(
        `${phpBaseUrl}?action=activarusuario&id=${id}`,
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      // Enviar la respuesta del servidor PHP de vuelta al cliente
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error al actualizar el paquete:', error.message);
      res.status(500).json({ message: 'Error al actualizar el paquete.', error });
    }
  },

  listareservasall: async (req, res) => {
    try {
      const response = await axios.get(`${phpBaseUrl}?action=listareservasall`);

      if (!response.data || response.data.length === 0) {
        return res.status(404).json({ message: 'No se encontraron reservas.' });
      }

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error al obtener las reservas:', error.message);
      res.status(500).json({ message: 'Error al obtener las reservas.', error });
    }
  },
  estadoreservas: async (req, res) => {
    try {
      const { cont, estado } = req.params; // Obtener los parámetros de la URL
  
      // Validar que todos los campos necesarios estén presentes
      if (!cont || !estado) {
        return res.status(400).json({ message: 'Faltan datos obligatorios para actualizar la reserva.' });
      }
  
      // Construir correctamente el endpoint para el servidor PHP
      const endpointPHP = `${phpBaseUrl}?action=adminactivarreservas&id=${cont}&estado=${estado}`;
  
      // Enviar la solicitud al servidor PHP
      const response = await axios.put(endpointPHP, {}, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Enviar la respuesta del servidor PHP de vuelta al cliente
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error al actualizar la reserva:', error.message);
  
      // Manejar el error y enviar una respuesta al cliente
      res.status(500).json({
        message: 'Error al actualizar la reserva.',
        error: error.message,
      });
    }
  }, 

};

module.exports = adminPhpController;
