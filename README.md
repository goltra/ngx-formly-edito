# FORMLY EDITOR
Librería para angular 14 o superior, que permite crear formularios dinámicos, con validaciones y con la posibilidad de agregar componentes personalizados.

La idea de esta librería es poder disponer de un editor visual que te permita crear tu propio fomulario, guardarlo en json
y luego poder recuperarlo (tanto la configuración del formulario como los datos del mismo) para poder usarlo en otros componentes.

En las dependencias se usar formly y su variante bootstrap aunque en realidad no lo uso, se hace así porque no tengo claro 
como cargarlo si alguno de sus librerías de estilos.

## Como instalarlo en tu proyecto
En primer lugar hemos de decirle a ivy que respete los enlaces simbólicos. Esto lo conseguimos añadiendo al *angular.json* de nuestro proyecto
la opción *preserveSymlinks* con valor true en la sección *options*. (https://www.typescriptlang.org/tsconfig#preserveSymlinks)

En segundo lugar accedemos a la carpeta de la libería (projects/formly-editor) y ejecutamos el comando *npm link*. Esto creará un enlace simbólico

Lo siguiente es arrancar nuestra libería para que se genere el bundle. Para ello ejecutamos *ng build --watch*

Ahora, en nuestro proyecto, ejecutamos *npm link formly-editor* para que se cree un enlace simbólico a la libería.

Y por último instalamos la libería desde nuestro proyecto con npm i "..\ngx-formly-edito\dist\formly-editor"

Ahora instala la libería de formly con npm i @ngx-formly/core (recuerda que la versión de angular/forms debe ser 13 o superario).

