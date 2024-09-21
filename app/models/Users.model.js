
module.exports = (sequelize, Sequelize) => {
	const usuario = sequelize.define('usuario', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  nombre: {
			type: Sequelize.STRING
	  },
	  apellido: {
			type: Sequelize.STRING
  	},
	  email: {
			type: Sequelize.STRING
	  },
	  telefono: {
			type: Sequelize.INTEGER
    },
	direccion: {
		type: Sequelize.STRING
},
FechaRegistro: {
	type: Sequelize.STRING
},
Estado: {
	type: Sequelize.STRING
}
	});
	
	return usuario;
}