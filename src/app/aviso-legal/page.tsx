import type { Metadata } from 'next'
import LegalPageLayout from '@/components/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Aviso legal | Track My Series',
  description: 'Informacion legal del sitio web Track My Series.'
}

export default function AvisoLegalPage () {
  return (
    <LegalPageLayout title="Aviso legal" updatedAt="2026-03-19">
      <>
        <p>
          Este sitio web, <strong>Track My Series</strong>, es un proyecto web gratuito orientado al descubrimiento y
          seguimiento de series de television.
        </p>

        <ol>
          <li>
            <h2>Titular del sitio web</h2>
            <p>En cumplimiento del deber de informacion, se facilitan a continuacion los datos del responsable del sitio:</p>
            <ul>
              <li><p>Responsable: [Nombre y apellidos o razon social]</p></li>
              <li><p>NIF/CIF: [Tu NIF o CIF, si procede]</p></li>
              <li><p>Domicilio: [Direccion completa o domicilio profesional, si procede]</p></li>
              <li><p>Correo electronico de contacto: [Tu email de contacto]</p></li>
            </ul>
          </li>

          <li>
            <h2>Objeto</h2>
            <p>
              La finalidad de este sitio es ofrecer informacion sobre series de television y permitir a las personas usuarias
              registradas guardar y gestionar su seguimiento personal de contenidos.
            </p>
          </li>

          <li>
            <h2>Condiciones de uso</h2>
            <p>
              El acceso y uso del sitio atribuye la condicion de persona usuaria e implica la aceptacion de las condiciones de
              uso vigentes en cada momento. La persona usuaria se compromete a utilizar la web de forma licita, sin causar
              danos al sitio, a terceros o a sus sistemas.
            </p>
          </li>

          <li>
            <h2>Propiedad intelectual e industrial</h2>
            <p>
              Los textos, disenos, logotipos, codigo, estructura y demas elementos propios de la web son titularidad del
              responsable del sitio o se utilizan con la correspondiente legitimacion. Queda prohibida su reproduccion,
              distribucion o transformacion sin autorizacion previa, salvo cuando la ley lo permita.
            </p>
          </li>

          <li>
            <h2>Contenidos de terceros</h2>
            <p>
              Este sitio puede mostrar informacion, imagenes o metadatos procedentes de servicios de terceros relacionados con
              series de television. Dichos contenidos pertenecen a sus respectivos titulares y se muestran con finalidad
              informativa.
            </p>
          </li>

          <li>
            <h2>Responsabilidad</h2>
            <p>
              No se garantiza la ausencia de errores ni la disponibilidad permanente del sitio, aunque se adoptaran medidas
              razonables para evitar interrupciones y fallos tecnicos. El responsable no sera responsable de danos derivados
              del uso del sitio, salvo en los casos en que la ley lo imponga.
            </p>
          </li>

          <li>
            <h2>Enlaces externos</h2>
            <p>
              La web puede incluir enlaces a sitios de terceros. El responsable no controla ni asume responsabilidad por sus
              contenidos, politicas o practicas.
            </p>
          </li>

          <li>
            <h2>Legislacion aplicable y jurisdiccion</h2>
            <p>
              Este aviso legal se rige por la normativa espanola. En caso de conflicto, las partes se someteran a los juzgados
              y tribunales que correspondan conforme a la normativa aplicable.
            </p>
          </li>
        </ol>
      </>
    </LegalPageLayout>
  )
}
