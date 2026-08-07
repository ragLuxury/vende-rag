/**
 * Contract clauses for the consignment contract. Verbatim legal text — do not
 * paraphrase; any change here must mirror the source of truth in front-rag.
 */
export const CONTRACT_CLAUSES: readonly string[] = [
  'El Seller entregará a El Consignatario los productos aprobados en en Panel del Seller, los cuáles estarán visibles en su Perfil.',
  'La consignación tendrá una duración mínima de 2 meses, comenzando en la fecha de entrega de cada producto. En caso de que El Seller quiera retirar la mercancía antes del tiempo establecido en el contrato, se cobrará una penalización de $1,000 pesos por producto.',
  'El precio de venta al público se describe en el Panel del Seller, y está negociado por ambas partes y aceptado a la entrega del producto. En caso de que el producto presente daños, defectos o detalles adicionales a los mencionados en el formulario, se avisará a El Seller para confirmar un ajuste de precio, o para coordinar la devolución del mismo si los daños no cumplen con nuestros lineamientos de calidad.',
  'En caso de que un producto no pase los filtros de autenticidad, se cobrará una penalización de $1,500 pesos, y El Seller se hará cargo de la devolución del mismo. Si se desconoce la procedencia del producto, puedes solicitar una autenticación anticipada por un costo de $1,000.',
  'Los precios pagados por los productos vendidos a través de la mediación de El Consignatario, son recibidos por ellos y les son transferidos a El Seller deduciendo el monto de una comisión. Las comisiones serán: 25% en productos con un valor de venta menor a $24,999, 20% en productos con un valor de venta de entre $25,000 y $49,999, y 18% en los productos con un valor de venta mayor a $50,000.',
  'El Consignatario se compromete a realizar los pagos correspondientes a El Seller por el importe establecido el martes de la semana próxima de la venta. En caso de ser un apartado, el pago se hará por un 30% del costo, y el restante 70% se liquidará el martes próximo al mes. En caso de que El Seller tenga alguna cantidad a deber por algún Servicio Adicional (bolería, guía de envío, penalización…), se deducirá del primer pago que se le realice.',
  'Todos los pagos se realizan por transferencia bancaria a la cuenta bancaria ingresada en la cuenta del Panel del Seller, y será su responsabilidad actualizarla en caso de ser necesario.',
  'El Consignatario se compromete a devolver a El Seller todos los productos que no hayan sido vendidos al término del plazo de consignación. En caso de así quererlo, se puede agregar un descuento al precio antes acordado para incentivar su venta. Todas las devoluciones corren por cuenta de El Seller.',
  'Durante el periodo de vigencia de este contrato, o mientras el producto esté en posesión de El Consignatario, éste no podrá ser vendido por otro medio.',
  'Todos los gastos de transporte para envíos y/o devoluciones, correrán por cuenta de El Seller, quien también puede venir a alguno de los domicilios de RAG a dejar su producto.',
  'El Consignatario no será responsable por el incumplimiento de sus obligaciones bajo este contrato si dicho incumplimiento se debe a eventos de fuerza mayor, caso fortuito o vicio inherente.',
  'Ambas partes se comprometen a mantener la confidencialidad de toda la información comercial y técnica intercambiada en virtud del presente contrato.',
  'El presente contrato se regirá e interpretará de acuerdo con las leyes de los Estados Unidos Mexicanos y en particular del Estado de Jalisco. Para todas las controversias que se deriven de este contrato, las partes se someten a la jurisdicción de los tribunales competentes de la Ciudad de Guadalajara, Jalisco.',
];

/** Number of clauses shown on page 1 of the contract. */
export const PAGE_1_CLAUSE_COUNT = 6;
