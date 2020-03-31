import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  // Registra un usuario
  async registrar(nombre, email, password) {
    const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    ).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + errorMessage);
    });

    return await nuevoUsuario.user.updateProfile({
      displayName: nombre
    });
  }

  // Inicia sesión del usuario
  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  // Cierra la sesión del usuario
  async cerrarSesion() {
    await this.auth.signOut()
    .then(() => {
      console.log("Haz salido...");
    }).catch( error => {
      console.log("hay un error...");
    });
  }
}
const firebase = new Firebase();
export default firebase;