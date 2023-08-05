"use client"
import FirebaseConfig from "../FirebaseConfig/FirebaseConfig";
import { ref, set, get, update, remove, child} from "firebase/database";
import { useState } from "react";
import './style.css'

const database = FirebaseConfig();

function FirebaseCrud() {
    let [nombre, setNombre] = useState("");
    let [apellido, setApellido] = useState("");
    let [telefono, setTelefono] = useState("");
    let [email, setEmail] = useState("");

    let isNullOrWhiteSpace = (value) => {
        value = value.toString();
        return (value === null || value.replaceAll(" ", "").length < 1);
    }

    let insertarDatos = (e) => {
        const dbref = ref(database);
        e.preventDefault();
        if (isNullOrWhiteSpace(nombre)
            || isNullOrWhiteSpace(apellido)
            || isNullOrWhiteSpace(telefono)
            || isNullOrWhiteSpace(email)) {
            alert("Todos los campos son obligatorios");
            return;
        }

        get(child(dbref, `estudiante/${nombre}`)).then((snapshot) => {
            if (snapshot.exists()) {
                alert("El registro ya existe, intente con otro nombre diferente");
            } else {
                set(ref(database, 'estudiante/' + nombre), {
                    apellido: apellido,
                    telefono: telefono,
                    email: email
                }).then(() => {
                    alert("Registro insertado exitosamente");
                }).catch((error) => {
                    console.error(error);
                    alert("Error: el registro no se pudo insertar");
                });
            }
        }).catch((error) => {
            console.error(error);
            alert("Error al obtener los datos");
        });
    }



    let updateDatos = (e) => {
        const dbref = ref(database);
        e.preventDefault();
        if (isNullOrWhiteSpace(nombre)) {
            alert("el nombre de usuario está vacío, intente seleccionar un usuario primero, con el botón de selección");
            return;
        }

        get(child(dbref, `estudiante/${nombre}`)).then((snapshot) => {
            if (snapshot.exists()) {
                update(ref(database, 'estudiante/' + nombre), {
                    apellido: apellido,
                    telefono: telefono,
                    email: email
                }).then(() => {
                    alert("Registro actualizado exitosamente");
                }).catch((error) => {
                    console.error(error);
                    alert("Error: el registro no se pudo actualizar");
                });
            } else {

                alert("Error: El registro no existe");

            }
        }).catch((error) => {
            console.error(error);
            alert("Error al obtener los datos");
        });
    }

    let deleteDatos = () => {
        const dbref = ref(database);

        if (isNullOrWhiteSpace(nombre)) {
            alert("el nombre es requerido para eliminar el registro");
            return;
        }

        get(child(dbref, `estudiante/${nombre}`)).then((snapshot) => {
            if (snapshot.exists()) {
                remove(ref(database, 'estudiante/' + nombre))
                 .then(() => {
                    alert("Registro eliminado exitosamente");
                })
                .catch((error) => {
                    console.error(error);
                    alert("Error: el registro no se pudo eliminar");
                });
            } else {
                alert("Error: El registro no existe");
            }
        }).catch((error) => {
            console.error(error);
            alert("Erro: la recuperación de datos  no tuvo éxito");
        });
    }


    let seleccionarDatos = () => {
        const dbref = ref(database);

        if (isNullOrWhiteSpace(nombre)) {
            alert("se requiere nombre de usuario para recuperar los datos");
            return;
        }
        get(child(dbref, `estudiante/${nombre}`)).then((snapshot) => {
            if (snapshot.exists()) {
                alert("Datos recuperados exitosamente");
                setApellido(snapshot.val().apellido);
                setTelefono(snapshot.val().telefono);
                setEmail(snapshot.val().email);
            } else {
                alert("Datos no disponibles");
            }
        }).catch((error) => {
            console.error(error);
            alert("Error al obtener los datos");
        });
    }

    return (
        <div>
            <h1>CRUD</h1>
            <form>
                <label>Nombre</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} /><br />
                <label>Apellido</label>
                <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} /><br />
                <label>Telefono</label>
                <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} /><br />
                <label>Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br />

                <button onClick={insertarDatos}>Insertar Datos</button>
                <button onClick={updateDatos}>Actualizar Datos</button>
                <button onClick={deleteDatos}>Eliminar Datos</button>
                <button onClick={seleccionarDatos}>Seleccionar Datos</button>

            </form>
        </div>
    )
}

export default FirebaseCrud
