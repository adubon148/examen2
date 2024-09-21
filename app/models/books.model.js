
module.exports = (sequelize, Sequelize) => {
	const libro = sequelize.define('libro', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  titulo: {
			type: Sequelize.STRING
	  },
	  idautor: {
			type: Sequelize.INTEGER
  	},
	  isbn: {
			type: Sequelize.STRING
	  },
	  editorial: {
			type: Sequelize.STRING
    },
	Año_publicacion: {
		type: Sequelize.INTEGER
},
direccion: {
		type: Sequelize.STRING
},
categoria: {
	type: Sequelize.STRING
},
Stock: {
	type: Sequelize.INTEGER
}, 
ubicacion: {
	type: Sequelize.STRING
}
	});
	
	return libro;
}