# 📱 Easy Expenses — App de Finanzas Personales

**Easy Expenses** es una aplicación móvil desarrollada con **React Native + Expo**, orientada a la gestión de finanzas personales. Permite al usuario llevar un control detallado de sus ingresos, gastos, pagos recurrentes/no recurrentes, y visualizar reportes útiles para la toma de decisiones financieras.

Este proyecto forma parte de nuestro portafolio profesional y fue desarrollado como requerimiento del curso de **Computación Móvil**.

---

## 🚀 Tecnologías principales

- **React Native** (Expo SDK 52)
- **Expo Router** para navegación basada en archivos
- **Firebase** (Auth, Firestore)
- **EAS Build** para compilación y despliegue nativo
- **TypeScript** como lenguaje base
- **AsyncStorage** para persistencia local
- **Expo AuthSession + WebBrowser** para login con Google
- **react-native-svg** y **gifted-charts** para visualización de reportes
- UI adaptada con diseño responsive y animaciones suaves

---

## 🧩 Características destacadas

### ✅ Gestión de ingresos y gastos

- Clasificación por categorías fijas y personalizadas
- Etiquetado de transacciones
- Ingresos recurrentes y no recurrentes

### 📊 Reportes visuales

- Gráficas de ingresos y gastos por periodo
- Resumen por fuente de ingreso

### 🔐 Autenticación

- Registro/Login con correo y contraseña
- Inicio de sesión con **Google OAuth** (Firebase + Expo AuthSession)

### 🤝 Navegación

- Navegación mixta: `Drawer` + `Bottom Tabs`
- Navegación anidada (`NativeStack`) para pantallas de configuración y creación

### 🛠️ Extras técnicos

- Custom Hooks (`useAuth`) y contexto global (`AuthContext`)
- Componente personalizado `AppSelect` para selección sin dependencias nativas
- Modal animado desde el `headerRight` para acceso rápido a configuración/cierre de sesión
- Soporte para múltiples fuentes de ingreso (con chips interactivos)

---

## 🏗️ Estructura del proyecto

```
src/
├── app/                  # Rutas y navegación (Expo Router)
├── components/           # UI Components (AppSelect, ModalMenu, Typography, etc.)
├── constants/            # Paleta de colores, tipografías
├── context/              # Contextos globales como Auth
├── database/             # Configuración Firebase
├── screens/              # Pantallas agrupadas por dominio
├── navigation/           # Stack y Bottom Tabs
└── utils/                # Helpers generales y hooks
```

---

## 🛠️ Instalación local

```bash
git clone https://github.com/tu-usuario/easy-expenses.git
cd easy-expenses
npm install
npx expo start
```

> ⚠️ Requiere Node.js y Expo CLI instalados.

---

## 📦 Build nativo

Compilación con EAS:

```bash
eas build --platform android
```

---

## 🧠 Lecciones aprendidas

Durante el desarrollo de esta app enfrenté y solucioné varios desafíos técnicos:

- Compatibilidad con SDK 52 y manejo de errores de dependencias nativas
- Gestión eficiente del estado de autenticación usando `AsyncStorage`
- Implementación de componentes accesibles y funcionales sin dependencias nativas (`Picker`, `Modal`, etc.)

---

## 📲 Demo

Próximamente disponible en formato APK desde [Releases](https://github.com/juanfran24/easy-expenses/releases)

---

## 👩‍💻 Autores

Juan Esteban Franco Estacio — [LinkedIn](https://www.linkedin.com/in/juanfran24)
Arnol Meneses — [LinkedIn](https://www.linkedin.com/in/arnol-meneses-782374197)

---

## 🌐 Palabras clave

`react-native` `expo` `firebase` `auth` `typescript` `mobile-app` `finance` `portfolio` `expo-router` `eas-build`
