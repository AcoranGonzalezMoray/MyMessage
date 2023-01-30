<h1 align="center"> MyMessage <img height="50" align="center" src="https://github.com/AcoranGonzalezMoray/MyMessage/blob/main/Components/icon.png"/></h1>



<p align="center"> 
<img src="https://img.shields.io/badge/Plataforma-IOS%2FAndroid-green"/> <img src="https://img.shields.io/badge/framework-react%20native-blue"/> 
<img src="https://img.shields.io/badge/React%20Native-0.70.4-green"/> 

<img src="https://img.shields.io/badge/Versi%C3%B3n-0.0.1-red"/> 
<img src="https://img.shields.io/badge/language-typescript%20%7C%20swift%20%7C%20java-lightblue"/>

</p>
<p>MyMessage es una app de mensajería con autenticación incrustada, el cual permite realizar algunas de las acciones que permiten las applicaciones modernas de este ambito, con las que se puede hablar instantáneamente con otros usuarios, además esta app habilita actualizaciones de estado</p>


## Contenido
<div>

  <h3>1.App</h3>
  <h3>2.Funciones</h3>
  <h3>3.Funciones</h3>
  <h3>4.Instalación</h3>
  <h3>5.Notas</h3>
 
</div>

## App
  ### Login:
  
  <p align="center">
    <img height="700" src="https://github.com/AcoranGonzalezMoray/MyMessage/blob/main/gif/LOGIN.gif"/> 
  </p>

  ### Use:
  
  <p align="center">
    <img height="700" src="https://github.com/AcoranGonzalezMoray/MyMessage/blob/main/gif/WORK.gif?raw=true"/> 
  </p>

## Framework y  base de datos de documentos NoSQL 
  <li><a href="https://reactnative.dev/" >React Native</a></li>
  <li><a href="https://firebase.google.com/docs/firestore?hl=es-419" >Firestore</a></li>
  
## Funciones
  <li>Función de logueo y registro</li>
  <li>Envio de mensajes en tiempo real (Actualizacion instantánea entre par de usuarios)</li>
  <li>Reportar o eliminar historial del chat entre par de usuarios</li>
  <li>Agregar/Eliminar a nuevos contactos</li>

## Instalación

### Pasos:

  #### Clonar Repositorio
  ```
  git clone https://github.com/AcoranGonzalezMoray/MyMessage.git
  ```

  #### Instalar dependencias del proyecto
  ```
  npm install (--legacy-peer-deps solo si npm ERR!)
  ```
 
 #### Ejecutar Aplicación
   ##### Android:
   ```
   npx react-native run-android
   ```
   ##### Ios:
   ```
   npx react-native run-ios
   ```
### Notas
<li>Si quiere que este proyecto funcione debe crear una cuenta en firestore e implementear la base de datos (RealTime DataBase) y activar la autenticación de su proyecto en firestore, 
a continuación se muestra  la forma en la que se representa la base de datos de este proyecto como guia: </li>

```
{
  "Users": {
    "user1@gmailcom": {
      "contacts": {
        "USER": {
          "id": 1675085419911,
          "message": {
            "noend": {
              "id": 1675085419911,
              "message": "ESTE ES EL COMIENZO DEL CHAT",
              "order": 0,
              "who": "user1@gmail.com"
            }
          },
          "nombre": "Usuario1"
        },
        "user2@gmailcom": {
          "id": 1675085537304,
          "message": {
            "noend": {
              "id": 1675085574256,
              "message": "ESTE ES EL COMIENZO DEL CHAT",
              "order": 0,
              "who": "user1@gmailcom"
            }
          },
          "nombre": "user2@gmailcom"
        }
      },
      "email": "user1@gmail.com",
      "name": "Usuario1",
      "uid": "ZCkyfzSspPSyldgGs1tdPNVyEpY2"
    },
    "user2@gmailcom": {
      "contacts": {
        "USER": {
          "id": 1675085420545,
          "message": {
            "noend": {
              "id": 1675085420545,
              "message": "ESTE ES EL COMIENZO DEL CHAT",
              "order": 0,
              "who": "user2@gmail.com"
            }
          },
          "nombre": "Usuario2"
        },
        "user1@gmailcom": {
          "id": 1675085537305,
          "message": {
            "noend": {
              "id": 1675085578631,
              "message": "ESTE ES EL COMIENZO DEL CHAT",
              "order": 0,
              "who": "user2@gmailcom"
            }
          },
          "nombre": "user1@gmailcom"
        }
      },
      "email": "user2@gmail.com",
      "name": "Usuario2",
      "uid": "zHHqgwtBFoc9TJcyaWJWDfXwiv83"
    }
  }
}
```
