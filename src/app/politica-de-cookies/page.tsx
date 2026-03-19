import type { Metadata } from 'next'
import LegalPageLayout from '@/components/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Politica de cookies | Track My Series',
  description: 'Informacion sobre el uso de cookies en Track My Series.'
}

export default function PoliticaCookiesPage () {
  return (
    <LegalPageLayout title="Politica de cookies" updatedAt="2026-03-19">
      <>
        <p>Esta politica explica el uso de cookies y tecnologias similares en <strong>Track My Series</strong>.</p>

        <ol>
          <li>
            <h2>Que son las cookies</h2>
            <p>
              Las cookies son pequenos archivos que se almacenan en el dispositivo de la persona usuaria y permiten recordar
              informacion sobre su visita, su sesion o determinadas preferencias.
            </p>
          </li>

          <li>
            <h2>Que cookies utiliza esta web</h2>
            <p>
              En la configuracion actual, esta web utiliza cookies y tecnologias similares estrictamente necesarias para el
              funcionamiento del inicio de sesion y la gestion de la sesion autenticada.
            </p>
            <ul>
              <li><p>Cookies tecnicas o necesarias para autenticar al usuario.</p></li>
              <li><p>Cookies de seguridad y mantenimiento de sesion asociadas al proveedor de login.</p></li>
            </ul>
          </li>

          <li>
            <h2>Cookies de terceros</h2>
            <p>
              El sistema de autenticacion de esta web se apoya en <strong>Clerk</strong>, que puede establecer cookies
              necesarias para prestar el servicio de identificacion y acceso seguro.
            </p>
          </li>

          <li>
            <h2>Cookies no esenciales</h2>
            <p>
              En este momento, la web no declara el uso de cookies publicitarias, de personalizacion avanzada o de analitica
              no necesaria. Si en el futuro se incorporan, esta politica y, en su caso, el mecanismo de consentimiento se
              actualizaran antes de su uso.
            </p>
          </li>

          <li>
            <h2>Como gestionar las cookies</h2>
            <p>
              Puedes permitir, bloquear o eliminar cookies desde la configuracion de tu navegador. Ten en cuenta que la
              desactivacion de cookies tecnicas puede impedir el funcionamiento correcto del login y de otras funciones
              esenciales de la cuenta.
            </p>
          </li>

          <li>
            <h2>Actualizaciones</h2>
            <p>
              Esta politica puede modificarse si cambian las cookies utilizadas o si lo exige la normativa aplicable. Se
              recomienda revisarla periodicamente.
            </p>
          </li>
        </ol>
      </>
    </LegalPageLayout>
  )
}
