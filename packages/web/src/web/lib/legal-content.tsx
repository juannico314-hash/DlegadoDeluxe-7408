import { company as c } from "./company";

export type LegalDoc = { title: string; intro: string; body: React.ReactNode };

const Resp = () => (
  <ul>
    <li><strong>Razón social:</strong> {c.legalName}</li>
    <li><strong>NIT:</strong> {c.nit}</li>
    <li><strong>Marca comercial:</strong> {c.brand}</li>
    <li><strong>Domicilio:</strong> {c.address}</li>
    <li><strong>Correo:</strong> {c.email}</li>
    <li><strong>Teléfono:</strong> {c.phone}</li>
  </ul>
);

export const legalDocs: Record<string, LegalDoc> = {
  privacidad: {
    title: "Política de Privacidad y Tratamiento de Datos Personales",
    intro: "En cumplimiento de la Ley Estatutaria 1581 de 2012, el Decreto 1377 de 2013 (compilado en el Decreto Único 1074 de 2015) y demás normas concordantes de protección de datos personales en Colombia.",
    body: (
      <>
        <h2>1. Responsable del tratamiento</h2>
        <Resp />
        <h2>2. Datos que recolectamos</h2>
        <p>Recolectamos únicamente los datos necesarios para atender tu solicitud:</p>
        <ul>
          <li>Datos de identificación y contacto: nombre, empresa, NIT, correo electrónico, teléfono.</li>
          <li>Datos del pedido: productos, cantidades, personalización, fecha de entrega y dirección de envío.</li>
          <li>Datos de navegación: cookies y datos técnicos, según nuestra Política de Cookies.</li>
        </ul>
        <p>No recolectamos datos sensibles ni datos de niños, niñas y adolescentes.</p>
        <h2>3. Finalidades del tratamiento</h2>
        <ul>
          <li>Gestionar cotizaciones, pedidos, facturación, despachos y garantías.</li>
          <li>Contactarte para dar respuesta a solicitudes, peticiones, quejas y reclamos.</li>
          <li>Cumplir obligaciones legales, contables y tributarias.</li>
          <li>Enviar información comercial y promocional, solo si lo has autorizado expresamente. Puedes revocar esta autorización en cualquier momento.</li>
          <li>Realizar análisis estadísticos del uso del sitio web, de forma agregada.</li>
        </ul>
        <h2>4. Derechos del titular</h2>
        <p>Como titular de los datos tienes derecho a:</p>
        <ul>
          <li>Conocer, actualizar y rectificar tus datos personales.</li>
          <li>Solicitar prueba de la autorización otorgada.</li>
          <li>Ser informado sobre el uso que se ha dado a tus datos.</li>
          <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley.</li>
          <li>Revocar la autorización y/o solicitar la supresión de tus datos cuando no exista un deber legal o contractual de conservarlos.</li>
          <li>Acceder de forma gratuita a tus datos personales.</li>
        </ul>
        <h2>5. Procedimiento para consultas y reclamos</h2>
        <p>Puedes ejercer tus derechos escribiendo a <strong>{c.email}</strong>, indicando tu nombre, identificación, descripción de la solicitud y datos de contacto.</p>
        <ul>
          <li><strong>Consultas:</strong> se atenderán en un máximo de diez (10) días hábiles, prorrogables por cinco (5) días hábiles más, informando el motivo.</li>
          <li><strong>Reclamos:</strong> se atenderán en un máximo de quince (15) días hábiles, prorrogables por ocho (8) días hábiles más, informando el motivo.</li>
        </ul>
        <h2>6. Seguridad de la información</h2>
        <p>Adoptamos medidas técnicas, humanas y administrativas razonables para proteger tus datos contra adulteración, pérdida, consulta, uso o acceso no autorizado. El sitio utiliza conexión cifrada (HTTPS).</p>
        <h2>7. Transferencia y transmisión</h2>
        <p>Tus datos podrán ser compartidos con proveedores que nos apoyan en la operación (transporte, mensajería, alojamiento web, facturación electrónica), quienes actúan como encargados y están obligados a protegerlos. No vendemos ni cedemos tus datos a terceros con fines comerciales.</p>
        <h2>8. Vigencia</h2>
        <p>Esta política rige desde su publicación. Los datos se conservarán mientras sean necesarios para las finalidades descritas y para cumplir obligaciones legales. Cualquier cambio sustancial será informado en este sitio.</p>
      </>
    ),
  },

  cookies: {
    title: "Política de Cookies",
    intro: "Explicamos qué son las cookies, cuáles usamos en este sitio y cómo puedes gestionarlas.",
    body: (
      <>
        <h2>1. ¿Qué son las cookies?</h2>
        <p>Las cookies y tecnologías similares (como el almacenamiento local del navegador) son pequeños archivos que se guardan en tu dispositivo cuando visitas un sitio web y permiten recordar información sobre tu visita.</p>
        <h2>2. Cookies que utilizamos</h2>
        <h3>Necesarias (siempre activas)</h3>
        <ul>
          <li><strong>dd-cart-v1</strong> — almacenamiento local, guarda los productos de tu carrito. Duración: hasta que lo borres.</li>
          <li><strong>dd-cookie-consent</strong> — almacenamiento local, guarda tus preferencias de cookies. Duración: hasta que lo borres.</li>
        </ul>
        <h3>Analítica (solo con tu consentimiento)</h3>
        <p>Nos permiten medir de forma agregada las visitas y el uso del sitio para mejorarlo.</p>
        <h3>Marketing (solo con tu consentimiento)</h3>
        <p>Permiten mostrar publicidad relevante en otras plataformas. Actualmente no se activan sin tu autorización expresa.</p>
        <h2>3. Cómo gestionar tus preferencias</h2>
        <p>Puedes aceptar, rechazar o configurar las cookies desde el banner que aparece en tu primera visita o en cualquier momento desde el enlace «Configurar cookies» del pie de página. También puedes eliminarlas desde la configuración de tu navegador; si bloqueas las necesarias, el carrito podría no funcionar.</p>
        <h2>4. Base legal</h2>
        <p>El uso de cookies no necesarias se basa en tu autorización previa, conforme a la Ley 1581 de 2012. Para más información consulta nuestra Política de Tratamiento de Datos.</p>
      </>
    ),
  },

  terminos: {
    title: "Términos y Condiciones",
    intro: `Estos términos regulan el uso del sitio web de ${c.brand} y la solicitud de productos, de acuerdo con la Ley 1480 de 2011 (Estatuto del Consumidor) y la Ley 527 de 1999 (comercio electrónico).`,
    body: (
      <>
        <h2>1. Identificación del proveedor</h2>
        <Resp />
        <h2>2. Objeto</h2>
        <p>A través de este sitio ofrecemos café colombiano y combos de anchetas empresariales. El carrito permite armar una solicitud de cotización; el contrato se perfecciona cuando confirmamos por escrito la cotización, la disponibilidad y el medio de pago, y tú la aceptas.</p>
        <h2>3. Precios</h2>
        <p>Los precios se expresan en pesos colombianos (COP) e incluyen los impuestos aplicables, salvo que se indique lo contrario. El costo de envío se informa en la cotización antes de la aceptación. Nos reservamos el derecho de corregir errores evidentes de precio.</p>
        <h2>4. Pedidos corporativos</h2>
        <ul>
          <li>En pedidos superiores a 100 unidades, la caja incluye el logo de la empresa.</li>
          <li>Según la cantidad, es posible personalizar los productos adicionales o el café.</li>
          <li>El tiempo estimado de elaboración del pedido completo es de aproximadamente 30 días.</li>
          <li>Las imágenes son de referencia; colores y acabados pueden variar levemente.</li>
        </ul>
        <h2>5. Pagos</h2>
        <p>Los medios de pago disponibles se indican en la cotización. Para pedidos personalizados podrá solicitarse un anticipo antes de iniciar la producción.</p>
        <h2>6. Entregas</h2>
        <p>Los despachos se realizan a la dirección indicada por el cliente dentro de Colombia, en los plazos acordados en la cotización.</p>
        <h2>7. Propiedad intelectual</h2>
        <p>La marca {c.brand}, su logotipo, textos, imágenes y diseños de este sitio son de propiedad de {c.legalName} o se usan con autorización. Está prohibida su reproducción sin permiso previo y escrito. Los logos que nos entregues para personalizar productos deben ser de tu propiedad o contar con autorización de uso.</p>
        <h2>8. Responsabilidad</h2>
        <p>Hacemos nuestro mejor esfuerzo para que la información del sitio sea exacta y esté disponible, pero no garantizamos la ausencia de interrupciones o errores técnicos.</p>
        <h2>9. Ley aplicable</h2>
        <p>Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia podrá ser presentada ante la Superintendencia de Industria y Comercio o los jueces competentes.</p>
      </>
    ),
  },

  devoluciones: {
    title: "Derecho de Retracto, Devoluciones y Garantías",
    intro: "Conforme a los artículos 7 a 18, 47 y 51 de la Ley 1480 de 2011 (Estatuto del Consumidor).",
    body: (
      <>
        <h2>1. Derecho de retracto</h2>
        <p>En las ventas a distancia, el consumidor puede retractarse dentro de los <strong>cinco (5) días hábiles</strong> siguientes a la entrega del producto, devolviéndolo en el mismo estado en que lo recibió, sin uso y con su empaque. Los costos de transporte de la devolución corren por cuenta del consumidor. El dinero se reintegrará en un plazo máximo de treinta (30) días calendario.</p>
        <p>Según el artículo 47 de la Ley 1480, <strong>no aplica el retracto</strong> para:</p>
        <ul>
          <li>Bienes perecederos o de consumo, como el café, una vez abierto su empaque.</li>
          <li>Bienes confeccionados conforme a las especificaciones del consumidor o claramente personalizados (por ejemplo, cajas o mugs con el logo de tu empresa).</li>
        </ul>
        <h2>2. Reversión del pago</h2>
        <p>Si pagaste con tarjeta de crédito, débito u otro instrumento electrónico, puedes solicitar la reversión del pago dentro de los cinco (5) días hábiles siguientes a conocer la operación, en casos de fraude, operación no solicitada, producto no recibido, o producto que no corresponde a lo solicitado o es defectuoso (artículo 51, Ley 1480 y Decreto 587 de 2016). Debes informarnos y notificar al emisor del medio de pago.</p>
        <h2>3. Garantía legal</h2>
        <ul>
          <li><strong>Café:</strong> garantizamos su calidad e idoneidad hasta la fecha de consumo preferente indicada en el empaque, almacenado en lugar fresco y seco.</li>
          <li><strong>Accesorios</strong> (prensas, molinos, mugs, cucharas): garantía por defectos de fabricación según el término informado en la cotización o, en su defecto, el legal.</li>
        </ul>
        <p>Para hacer efectiva la garantía escríbenos a <strong>{c.email}</strong> con tu número de pedido, fotos y descripción del problema. Daremos respuesta en un máximo de quince (15) días hábiles, con reparación, cambio o devolución del dinero según corresponda.</p>
        <h2>4. Productos dañados en el transporte</h2>
        <p>Revisa tu pedido al recibirlo. Si llega dañado o incompleto, déjalo anotado en la guía de la transportadora y repórtalo dentro de las 48 horas siguientes.</p>
      </>
    ),
  },

  "aviso-legal": {
    title: "Aviso Legal",
    intro: "Información general sobre el titular y el uso de este sitio web.",
    body: (
      <>
        <h2>Titular del sitio</h2>
        <Resp />
        <h2>Uso del sitio</h2>
        <p>El acceso a este sitio es gratuito e implica la aceptación de los Términos y Condiciones, la Política de Privacidad y la Política de Cookies. El usuario se compromete a hacer un uso lícito del sitio y a no realizar acciones que dañen su funcionamiento.</p>
        <h2>Enlaces a terceros</h2>
        <p>Este sitio puede contener enlaces a otras páginas (por ejemplo, WhatsApp o la SIC). No somos responsables de su contenido ni de sus políticas de privacidad.</p>
        <h2>Autoridad de control</h2>
        <p>Superintendencia de Industria y Comercio — <a href="https://www.sic.gov.co" target="_blank" rel="noreferrer">www.sic.gov.co</a>.</p>
      </>
    ),
  },

  pqrs: {
    title: "Peticiones, Quejas, Reclamos y Sugerencias (PQRS)",
    intro: "Queremos escucharte. Así puedes comunicarte con nosotros.",
    body: (
      <>
        <h2>Canales de atención</h2>
        <ul>
          <li><strong>Correo:</strong> {c.email}</li>
          <li><strong>Teléfono / WhatsApp:</strong> {c.phone}</li>
          <li><strong>Dirección:</strong> {c.address}</li>
        </ul>
        <h2>Qué incluir</h2>
        <ul>
          <li>Nombre completo y documento o NIT.</li>
          <li>Número de pedido o cotización, si aplica.</li>
          <li>Descripción clara de la solicitud y soportes (fotos, facturas).</li>
          <li>Datos de contacto para responderte.</li>
        </ul>
        <h2>Tiempos de respuesta</h2>
        <p>Responderemos tu PQRS en un plazo máximo de quince (15) días hábiles. Si no recibes respuesta o no estás conforme, puedes acudir a la Superintendencia de Industria y Comercio en <a href="https://www.sic.gov.co" target="_blank" rel="noreferrer">www.sic.gov.co</a>.</p>
      </>
    ),
  },
};
