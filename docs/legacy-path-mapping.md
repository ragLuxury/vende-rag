# Mapeo de URLs de la app: Legacy (shop.rag) → Nuevo (vende-rag)

Equivalencias entre las **URLs que ve el usuario** en el sitio legacy PHP
(`https://shop.rag` / `https://vende.rag.mx`) y las del nuevo sitio Next.js.

> Notas de formato de URL:
>
> - **Legacy:** las secciones de cuenta cuelgan de `/cuenta/...` y los sub-modos
>   (ver vs. editar) se distinguen con query string `?action=edit`.
>   Ej: `/cuenta/perfil/metodos_de_pago?action=edit`.
> - **Nuevo:** rutas más planas; el modo edición es un **segmento de ruta propio**
>   (ej. `/perfil/metodo-pago`) en vez de `?action=edit`.
> - **Identificador de producto cambia:** el legacy usa el **`uuid`** (UUID v4) en la
>   URL; el nuevo usa el **`id` numérico** de `products`.
>   Legacy `…/producto?id=76aa174a-bb2e-4530-97fd-c5da9934321` →
>   Nuevo `/productos/18981?view=solicitudes`.
> - **Origen de navegación:** el `back=` del legacy se reemplaza por el query param
>   **`view`** en el nuevo (`view` ∈ `solicitudes` · `publicaciones` · `ventas` · `devoluciones`).

---

## Perfil y cuenta

| Legacy URL                                   | Nuevo URL                             | Descripción             |
| -------------------------------------------- | ------------------------------------- | ----------------------- |
| `/cuenta` (índice de cuenta)                 | `/perfil`                             | Base de cuenta          |
| `/cuenta/perfil` · `/cuenta/perfil/inicio`   | `/perfil`                             | Inicio del perfil       |
| _(edición inline del perfil)_                | `/perfil/editar`                      | Editar datos personales |
| `/cuenta/perfil/direcciones`                 | `/perfil` (sección dirección, inline) | Ver dirección(es)       |
| `/cuenta/perfil/direcciones?action=edit`     | `/perfil/direccion`                   | Editar dirección        |
| `/cuenta/perfil/metodos_de_pago`             | `/perfil` (sección pago, inline)      | Ver métodos de pago     |
| `/cuenta/perfil/metodos_de_pago?action=edit` | `/perfil/metodo-pago`                 | Editar método de pago   |
| `/cuenta/perfil/contrato`                    | (sección contrato en perfil)          | Contrato / consignación |

> **Nota — resumen inline en `/perfil`, detalle en ruta propia.**
> En el legacy, `direcciones`, `metodos_de_pago` (e `inicio`/`contrato`) son URLs propias
> bajo `/cuenta/perfil/...` para **visualizar** cada dato. En el nuevo sistema, el
> **resumen de cada dato se muestra inline dentro de `/perfil`** (secciones del
> `profile-screen`: método de pago, dirección, etc. se ven directo en la página). Al
> **entrar al detalle o editar** se navega a una **ruta propia**:
>
> - Método de pago → `/perfil/metodo-pago` (ver detalle / agregar / editar)
> - Dirección → `/perfil/direccion`
> - Datos personales → `/perfil/editar`
>
> Es decir: en `/perfil` ves el resumen de todo; el path cambia solo cuando abres el
> detalle de una sección. Por eso varias URLs legacy distintas colapsan en `/perfil`, y
> el detalle vive en su propio segmento.

## Productos del vendedor

Las listas de producto usan **una sola pantalla** (`ProductsScreen`) con distinto
valor de `view`; el detalle es `/productos/{id}?view={view}` (id **numérico**).

| Legacy URL                                 | Nuevo URL                               | Descripción                 |
| ------------------------------------------ | --------------------------------------- | --------------------------- |
| `/cuenta/mis_productos`                    | `/solicitudes` (`view=solicitudes`)     | Mis productos (solicitudes) |
| `/cuenta/mis_publicaciones`                | `/publicaciones` (`view=publicaciones`) | Mis publicaciones activas   |
| `/cuenta/mis_ventas`                       | `/mis-ventas` (`view=ventas`)           | Mis ventas                  |
| `/cuenta/mis_devoluciones`                 | `/devoluciones` (`view=devoluciones`)   | Mis devoluciones            |
| `/cuenta/producto?id={uuid}&back={origen}` | `/productos/{id}?view={origen}`         | Detalle de producto         |

## Vender

| Legacy URL     | Nuevo URL | Descripción                       |
| -------------- | --------- | --------------------------------- |
| `/vende` · `/` | `/`       | Landing / home del vendedor       |
| `/vender`      | `/vender` | Formulario para publicar producto |

## Autenticación

| Legacy URL                                | Nuevo URL          | Descripción             |
| ----------------------------------------- | ------------------ | ----------------------- |
| `/google.php` (OAuth Google, `btn_login`) | `/login`           | Iniciar sesión          |
| `/google.php` (mismo flujo crea cliente)  | `/signup`          | Registro                |
| `/google-out.php`                         | _(logout)_         | Cerrar sesión           |
| _(no existe)_                             | `/welcome`         | Onboarding / bienvenida |
| `/recupera`                               | `/forgot-password` | Recuperar contraseña    |
| `/reset-password`                         | `/reset-password`  | Restablecer contraseña  |

## Contenido / informativas

| Legacy URL                                          | Nuevo URL                          | Descripción                    |
| --------------------------------------------------- | ---------------------------------- | ------------------------------ |
| `/contacto`                                         | `/contacto`                        | Contacto                       |
| `/aviso`                                            | `/privacidad`                      | Aviso de privacidad            |
| `/terminos`                                         | `/terminos`                        | Términos y condiciones         |
| `/terminos_consignacion`                            | `/terminos` (sección consignación) | Términos de consignación       |
| `/#preguntas-frecuentes` (ancla dentro de `/vende`) | `/preguntas-frecuentes`            | Preguntas frecuentes           |
| _(no existe)_                                       | `/informacion`                     | Información de cuenta / ayuda  |
| `/disenadores`                                      | _(sin equivalente aún)_            | Catálogo de diseñadores/marcas |

> **Nota — FAQ:** en el legacy no es una página propia, es una sección con ancla
> `#preguntas-frecuentes` dentro del home `/vende` (aunque algunos correos ya enlazan a
> `/preguntas-frecuentes` como si fuera página). En el nuevo se promueve a ruta propia.

---

_Última actualización: 2026-07-13_
