# Tripleten web_project_around

Onceavo proyecto:
POO avanzado y NPM

Descripción de la funcionalidad:
Este proyecto consiste en un blog con un perfil de usuario precargado, el cual puede ser editado para actualizar la información personal. El perfil incluye inicialmente seis imágenes predeterminadas.
En esta etapa se realizó una refactorización completa del código aplicando Programación Orientada a Objetos (POO). Esto permitió lograr una estructura más organizada, modular y reutilizable, facilitando el mantenimiento y la comprensión tanto para el desarrollador como para revisores del proyecto.

Clases y módulos principales

Se generaron nuevos archivos JavaScript que encapsulan funcionalidades específicas mediante clases:
	•	Card.js
Clase encargada de la creación, visualización y gestión de las tarjetas de imagen, incluyendo interacciones como “like”, eliminación y apertura de la imagen en un popup.
	•	Section.js
Clase responsable de gestionar y renderizar un conjunto de elementos en un contenedor de la página. Permite agregar elementos nuevos de forma dinámica al inicio o al final del contenedor.
	•	Popup.js
Clase base para manejar ventanas emergentes (pop-ups), con métodos para abrir, cerrar y cerrar con la tecla Esc.
	•	PopupWithForm.js
Clase hija de Popup que maneja formularios dentro del popup. Incluye métodos para recopilar los datos de los inputs, enviar el formulario y resetearlo al cerrar.
	•	PopupWithImage.js
Clase hija de Popup que abre una ventana emergente mostrando una imagen y su leyenda correspondiente.
	•	UserInfo.js
Clase encargada de almacenar, mostrar y actualizar la información del usuario en la página, permitiendo interactuar con los formularios de edición sin manipular directamente el DOM.
	•	FormValidator.js
Clase para validar todos los formularios de manera dinámica, activando o desactivando el botón de envío y mostrando errores en los campos correspondientes.

 
 Enlace a gitHub Pages:
  https://johanas.github.io/web_project_around/
