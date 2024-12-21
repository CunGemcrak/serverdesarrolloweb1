const axios = require('axios');


require('dotenv').config();
const {
    URL_SERVIDORWEB
} = process.env;
const phpBaseUrl = URL_SERVIDORWEB; // URL base del servidor PHP

const usuarioPhpController = {
 
  crear: async (req, res) => {
    try {
      console.log("Ingreso");
  
      const {tdocumento, idusuario, nombre, papellido, sapellido, email, passwords, imagen, role_id, celular } = req.body;
   //   console.log(JSON.stringify(req.body))
      const response = await axios.post(`${phpBaseUrl}?action=crear`, 
        {
          tdocumento,
          idusuario, 
          nombre, 
          papellido, 
          sapellido, 
          email,
          passwords,
          imagen,
          celular,
          role_id},
        {
          headers: {
            'Content-Type': 'application/json'  // Asegura que los datos se envíen como JSON
          }
        });
  
      // Imprime solo la parte útil de la respuesta, como status y data.
    //  console.log("Respuesta de la creación de datos", response.status, response.data);
    console.log(JSON.stringify( response.data))
  
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error al comunicarse con PHP:', error.message);
      res.status(500).json({ message: 'Error al comunicarse con el servidor PHP.', error });
    }
  },
  

  leer: async (req, res) => {
    try {
      // Extraer parámetros desde req.query
      const { email, passwords } = req.query;
  
      // Validar entrada
      if (!email || !passwords) {
        return res.status(400).json({ message: 'Faltan parámetros requeridos: email y/o passwords.' });
      }
  
      console.log("Email recibido:", email);
      console.log("Password recibido:", passwords);
  
     
      const response = await axios.post(
        `${phpBaseUrl}?action=buscar`,{
          email,
          passwords
        },
        {
          headers: {
            'Content-Type': 'application/json'  // Asegura que los datos se envíen como JSON
          }
        });

     console.log("funciona" + JSON.stringify(response.data) )
  
      // Verificar y retornar la respuesta
      if (!response.data || response.data.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
  
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error al leer usuarios:', error.message);
      res.status(500).json({ message: 'Error al comunicarse con el servidor PHP.', error });
    }
  },
  
  

  actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const {tdocumento, idusuario, nombre, papellido, sapellido, email, passwords, imagen, role_id, celular }= req.body;
      const response = await axios.put(`${phpBaseUrl}?action=actualizar&id=${id}`, {
        tdocumento,
        idusuario,
        nombre,
        papellido,
        sapellido,
        email,
        passwords,
        imagen,
        celular,
        role_id
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
      console.log("ingreso sin problemas")
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error al actualizar usuario:', error.message);
      res.status(500).json({ message: 'Error al comunicarse con el servidor PHP.', error });
    }
  },

  eliminar: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await axios.delete(`${phpBaseUrl}?action=eliminar&id=${id}`);
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error al eliminar usuario:', error.message);
      res.status(500).json({ message: 'Error al comunicarse con el servidor PHP.', error });
    }
  },


  //!Vamos con la compra de paquetes 
  
  // Función para crear una reserva
  crearreserva: async (req, res) => {
    try {
      const { tidentificacion, idusuario, nombre, papellido, sapellido, celular, mail, paquete, canpersonas, costopaquete } = req.body;

      // Validar los datos requeridos
      if (!tidentificacion || !idusuario || !nombre || !papellido || !paquete) {
        return res.status(400).json({ message: 'Faltan datos obligatorios en la solicitud.' });
      }

      // Enviar la solicitud al servidor PHP para crear la reserva
      const response = await axios.post(`${phpBaseUrl}?action=crearreserva`, {
        tidentificacion,
        idusuario,
        nombre,
        papellido,
        sapellido,
        celular,
        mail,
        paquete,
        canpersonas,
        costopaquete
      }, {
        headers: {
          'Content-Type': 'application/json'  // Asegura que los datos se envíen como JSON
        }
      });

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error al crear la reserva:', error.message);
      res.status(500).json({ message: 'Error al crear la reserva.', error });
    }
  },

  // Función para ver las reservas de un usuario
  verreserva: async (req, res) => {
    try {
      const { idusuario } = req.query; // Obtener el idusuario desde la query

      if (!idusuario) {
        return res.status(400).json({ message: 'Falta el parámetro idusuario.' });
      }

      // Enviar la solicitud al servidor PHP para obtener las reservas del usuario
      const response = await axios.get(`${phpBaseUrl}?action=verreserva&id=${idusuario}`);

      if (!response.data || response.data.length === 0) {
        return res.status(404).json({ message: 'No se encontraron reservas para este usuario.' });
      }

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error al obtener las reservas:', error.message);
      res.status(500).json({ message: 'Error al obtener las reservas.', error });
    }
  },

// Función para actualizar una reserva
actualizarreserva: async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de la reserva a actualizar

    // Verifica que el ID esté presente
    if (!id) {
      return res.status(400).json({ message: 'ID de la reserva no proporcionado.' });
    }

    // Enviar la solicitud al servidor PHP para actualizar la reserva, pasando el ID como parámetro en la URL
    const response = await axios.put(`${phpBaseUrl}?action=actualizarreserva&id=${id}`);

    console.log('Ingreso al servidor PHP');

    // Responder con los datos que regresa el servidor PHP
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error al actualizar la reserva:', error.message);

    // Si la respuesta de error tiene un detalle, incluirlo en la respuesta
    const errorMessage = error.response?.data?.message || error.message;

    res.status(500).json({ message: 'Error al actualizar la reserva.', error: errorMessage });
  }
},

  // Función para eliminar una reserva
  eliminarreserva: async (req, res) => {
    try {
      const { id } = req.params; // Obtener el ID de la reserva a eliminar

      // Enviar la solicitud al servidor PHP para eliminar la reserva
      const response = await axios.delete(`${phpBaseUrl}?action=eliminarreserva&id=${id}`);

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error al eliminar la reserva:', error.message);
      res.status(500).json({ message: 'Error al eliminar la reserva.', error });
    }
  },

};

module.exports = usuarioPhpController;
