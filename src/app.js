const express = require('express');
const cors = require('cors');
require('dotenv').config();


const db = require('./utils/database');
const Users = require('./models/usersmodels');
Users;
const PORT= process.env.PORT ?? 8000;

db.authenticate() 
.then(() => console.log('Autenticación exitosa base de datos users'))

.catch(error => console.log( error));

db.sync()//devuelve una promesa// SI NO EXISTE la tabla, LA CREA
.then(() => console.log('BASE DE DATOS SINCRONIZADA'))

const app = express();
app.use(express.json());
app.use(cors());

//----------CRUD --------
//  create 
//Users.create({
    //   email: 'kathy@example.com',
    //   password: '1234'
    //});

    app.post('/users', async(req, res) => {//manejo de excepciones
      try{
       //obtener la información del body
       const newUser = req.body;// *{ email, password }
       //mandar a crear la info obtenida
       const user= await Users.create(newUser);//User es un objeto 
       //responder que se ha realizado la acción
       res.status(201).send(user);
      }catch (error) {
      res.status(400).json(error);
      }
    });
 // si alguien crea un POST en esa ruta, yo debo de crear a un usuario

           //SELECT id, name, lastname, email, FROM users 
//select.findAll()
app.get('/users', async (req, res) => {
  try{
     //TODO mandar a buscar todos los usuarios
     const users = await Users.findAll({
     attributes: //['id', 'name', 'lastname', 'email'],
     {exclude: ["password"],},
     }) ;  
      //TODO responder a cliente
     res.json(users);
    }

    catch (error) {
      res.status(400).json(error);
    }
});

//Encontrar a un usuario por su id
//path params -> parámetros de ruta
app.get('/users/:id', async (req, res) => {

  try{
const {id} = req.params;

//TODO realizar la consuta a la bd 
const user = await Users.findByPk(id);
res.json(user);
  }
  catch (error) {
  res.status(400).json(error);
  }
})

// UPDATE a un usuario
app.put('/users/:id', async (req, res) => {

  try{
    //only modificate name and lastname
  //TODO  obtener IP del ususario
  //TODO obtener el body con la informacion 
  const {id} = req.params;
  const {name, lastname} = req.body;
   
  //TODO realizar la consuta para actualizar
  //* Responde un numero las cantidad de filas afectadas
  const user = await Users.update({name,lastname},{
    where: {id}//---> shorthand where: {id: id}
    });
    res.status(201).send(user);
  } catch (error) {
  res.status(400).json(error);
  }
});

//----------------------Delete------------------------------------

//! ********************** DELETE
app.delete("/users/:id", async (req, res) => {
  try {
    // todo obtener el id de la ruta
    const { id } = req.params;
    // todo eliminar en la base de datos
    await Users.destroy({
      where: { id }, // -> {id: id}
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});



 //----------CRUD --------

app.get('/', (req, res) => {
    res.status(200).json({message: 'Bienvenido al servidor'});
});

{/*db2.authenticate() 
.then(() => console.log('Autenticación exitosa base de datos express'))

.catch(error => console.log( error));*/}


//metodo findAll = SELECT * FROM users => sql
// users.findAll()=> sequelize

//app.get('/api/v1/users', async (req, res) => {
   // try{
   //   const result= await Users.findAll();   
   //   res.status(200).json(result);
    //}catch (error) {
    // console.log(error);
  // }
//});

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto: ${PORT}`);
})

 