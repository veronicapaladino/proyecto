//creo un nuevo jugador , bado es 1 barco, 2 submarino

const { pool } = require(".");

function crearJugador(id_jugador, id_partida, bando) {
  return new Promise((resolve, reject) => {
    let sql =
      "insert into jugador (id_partida,bando,id_jugador) values (?,?,?)    ";
    pool.query(sql, [id_partida, bando, id_jugador], (err, result) => {
      if (err) {
        throw err;
      }
      //hay que ver con que verficar la insesion porque esta retornando undefined auqnque si inserta el user
      if (result.insertId === 0) {
        resolve(true);
      } else {
        reject(new Error ("error al crear jugador"));
      }
    });
  });
}

// obtener  jugador
function obtengoJugador(id_Partida,bando) {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT id_Jugador FROM jugador where id_partida = ? and bando =?";
    pool.query(sql, [id_Partida,bando], (err, result) => {
      if (err) {
        throw err;
      }
     // console.log("resultado",result);
      if (result !== 0) {
        resolve(result[0].id_Jugador);
      } else {
        reject(new Error ("error al obtener jugador"));
      }
    });
  });
}

//crear Submarino
function crearSubmarino(id_jugador) {
  return new Promise((resolve, reject) => {
    let sql =
      "insert into submarino (vida,profundidad,coordenadaX,coordenadaY,id_jugador) values (3,1,0,0,?)    ";
    pool.query(sql, id_jugador, (err, result) => {
      if (err) {
        throw err;
      }
      //hay que ver con que verficar la insesion porque esta retornando undefined auqnque si inserta el user
      if (result.insertId !== 0) {
        resolve(true);
      } else {
        reject(new Error ("error al crear partida"));
      }
    });
  });
}

//crear Destructor
function crearDestructor(id_jugador) {
  return new Promise((resolve, reject) => {
    let sql =
      "insert into destructor (vida,coordenadaX,coordenadaY,id_jugador) values (3,0,0,?)    ";
    pool.query(sql, id_jugador, (err, result) => {
      if (err) {
        throw err;
      }
      //hay que ver con que verficar la insesion porque esta retornando undefined auqnque si inserta el user
      if (result.insertId !== 0) {
        resolve(true);
      } else {
        reject(new Error ("error al crear destructor"));
      }
    });
  });
}

//guardar submarino
function guardarSubmarino(
  vida,
  profundidad,
  coordenadaX,
  coordenadaY,
  id_jugador,
  rotacion
) {
  return new Promise((resolve, reject) => {
    let sql =
      "update submarino set vida=?,profundidad=?,coordenadaX=?,coordenadaY=?, Rotacion=? where id_jugador like ?";
    pool.query(
      sql,
      [vida, profundidad, coordenadaX, coordenadaY,rotacion, id_jugador],
      (err, result) => {
        if (err) {
          throw err;
        }
        if (result.changedRows !==  0) {
          resolve(true);
        } else {
          reject(new Error ("error al crear submarino"));
        }
      }
    );
  });
}

//guardar destructor
function guardarDestructor(vida, coordenadaX, coordenadaY, id_jugador,rotacion) {
  return new Promise((resolve, reject) => {;
    let sql =
      "update destructor set vida=?,coordenadaX=?,coordenadaY=?, Rotacion=? where id_jugador like ?";
    pool.query(
      sql,
      [vida, coordenadaX, coordenadaY,rotacion, id_jugador],
      (err, result) => {
        if (err) {
          throw err;
        }
        if (result.changedRows !== 0) {
          resolve(true);
        } else {
        reject(new Error ("error al guardar destructor"));
        }
      }
    );
  });
}



// obtener  destructor
function obtengoDestructor(id_jugador) {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT * FROM Destructor where id_jugador = ?";
    pool.query(sql, [id_jugador], (err, result) => {
      if (err) {
        throw err;
      }
    //  console.log(result[0].Id_Destructor);
      if (result[0].Id_Destructor > 0) {
        resolve(result[0]);
      } else {
        reject(new Error ("error al obtener destrucor"));
      }
    });
  });
}


// obtener  submarino
function obtengoSubmarino(id_jugador) {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT * FROM Submarino where id_jugador = ?";
    pool.query(sql, [id_jugador], (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result[0]);
      if (result[0].Id_sub > 0) {
        resolve(result[0]);
      } else {
        reject(new Error ("error al obtener submarino"));
      }
    });
  });
}

module.exports = {
  crearJugador,
  obtengoJugador,
  crearSubmarino,
  crearDestructor,
  guardarSubmarino,
  guardarDestructor,
  obtengoDestructor,
  obtengoSubmarino,

};
