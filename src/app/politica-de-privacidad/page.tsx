import type { Metadata } from 'next'
import LegalPageLayout from '@/components/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Politica de privacidad | Track My Series',
  description: 'Informacion sobre el tratamiento de datos personales en Track My Series.'
}

export default function PoliticaPrivacidadPage () {
  return (
    <LegalPageLayout title="Politica de privacidad" updatedAt="2026-03-19">
      <>
        <p>
          Esta politica de privacidad explica como se tratan los datos personales en <strong>Track My Series</strong>.
        </p>

        <ol>
          <li>
            <h2>Responsable del tratamiento</h2>
            <ul>
              <li><p>Responsable: [Nombre y apellidos o razon social]</p></li>
              <li><p>Correo electronico: [Tu email de contacto]</p></li>
              <li><p>Domicilio: [Direccion completa o domicilio profesional, si procede]</p></li>
            </ul>
          </li>

          <li>
            <h2>Datos que se recogen</h2>
            <p>En esta web se recogen unicamente los datos necesarios para el acceso y la gestion de la cuenta de usuario.</p>
            <ul>
              <li><p>Datos de identificacion asociados al login, como nombre, email o identificador de usuario.</p></li>
              <li><p>Datos tecnicos necesarios para mantener la sesion y proteger el acceso.</p></li>
            </ul>
          </li>

          <li>
            <h2>Finalidad del tratamiento</h2>
            <ul>
              <li><p>Permitir el registro, inicio de sesion y gestion de la cuenta.</p></li>
              <li><p>Ofrecer funcionalidades personalizadas vinculadas al usuario autenticado.</p></li>
              <li><p>Prevenir accesos no autorizados y reforzar la seguridad del servicio.</p></li>
            </ul>
          </li>

          <li>
            <h2>Base juridica</h2>
            <p>
              La base juridica del tratamiento es la ejecucion de la relacion con la persona usuaria en lo necesario para
              permitir el acceso a la cuenta y la prestacion de las funcionalidades asociadas al login.
            </p>
          </li>

          <li>
            <h2>Proveedores y encargados del tratamiento</h2>
            <p>
              El servicio de autenticacion puede apoyarse en proveedores externos especializados. En la configuracion actual de
              la aplicacion se utiliza <strong>Clerk</strong> para la gestion del alta, inicio de sesion y sesion de usuario.
              Dichos terceros trataran datos por cuenta del responsable conforme a sus propias condiciones y acuerdos de
              tratamiento.
            </p>
          </li>

          <li>
            <h2>Conservacion de los datos</h2>
            <p>
              Los datos se conservaran durante el tiempo necesario para mantener la cuenta activa o mientras existan
              obligaciones legales que exijan su conservacion.
            </p>
          </li>

          <li>
            <h2>Derechos de las personas usuarias</h2>
            <p>
              Puedes solicitar el acceso, rectificacion, supresion, oposicion, limitacion del tratamiento y portabilidad de
              tus datos, cuando proceda, enviando una solicitud a <strong>[Tu email de contacto]</strong>. Si consideras que tu
              solicitud no ha sido atendida adecuadamente, puedes acudir a la autoridad de control competente.
            </p>
          </li>

          <li>
            <h2>Seguridad</h2>
            <p>
              Se adoptan medidas tecnicas y organizativas razonables para proteger la informacion personal frente a accesos no
              autorizados, perdida, alteracion o divulgacion indebida.
            </p>
          </li>

          <li>
            <h2>Cambios en esta politica</h2>
            <p>
              Esta politica puede actualizarse para reflejar cambios normativos o tecnicos. La version publicada en esta pagina
              sera la vigente en cada momento.
            </p>
          </li>
        </ol>
      </>
    </LegalPageLayout>
  )
}
