
import { AreaType } from '@/types/document';

export const areaData: AreaType[] = [
  {
    id: "area-1",
    name: "Muelle B",
    color: "hsla(142, 71%, 45%, 0.5)",
    center: [-76.72, -12.05],
    geometry: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-76.725, -12.055],
          [-76.718, -12.055],
          [-76.718, -12.045],
          [-76.725, -12.045],
          [-76.725, -12.055],
        ]]
      }
    },
    documents: [
      {
        id: "doc-1",
        title: "Informe de Operaciones Portuarias",
        description: "Reporte anual de operaciones del Muelle B, incluyendo estadísticas de carga y descarga.",
        type: "Informe",
        date: "15/03/2023"
      },
      {
        id: "doc-2",
        title: "Plan de Mantenimiento 2023",
        description: "Cronograma y presupuesto para el mantenimiento preventivo y correctivo del Muelle B.",
        type: "Plan",
        date: "22/01/2023"
      },
      {
        id: "doc-3",
        title: "Certificación de Seguridad",
        description: "Certificación internacional de seguridad portuaria para operaciones en el Muelle B.",
        type: "Certificado",
        date: "05/02/2023"
      },
    ]
  },
  {
    id: "area-2",
    name: "Zona de Almacenamiento",
    color: "hsla(196, 80%, 45%, 0.5)",
    center: [-76.73, -12.04],
    geometry: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-76.735, -12.045],
          [-76.728, -12.045],
          [-76.728, -12.035],
          [-76.735, -12.035],
          [-76.735, -12.045],
        ]]
      }
    },
    documents: [
      {
        id: "doc-4",
        title: "Inventario de Contenedores",
        description: "Estado actual y ubicación de los contenedores en la zona de almacenamiento.",
        type: "Inventario",
        date: "10/04/2023"
      },
      {
        id: "doc-5",
        title: "Protocolo de Seguridad",
        description: "Procedimientos y medidas de seguridad para la manipulación de carga peligrosa.",
        type: "Protocolo",
        date: "18/02/2023"
      }
    ]
  },
  {
    id: "area-3",
    name: "Terminal de Carga",
    color: "hsla(37, 90%, 50%, 0.5)",
    center: [-76.71, -12.04],
    geometry: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-76.715, -12.045],
          [-76.705, -12.045],
          [-76.705, -12.035],
          [-76.715, -12.035],
          [-76.715, -12.045],
        ]]
      }
    },
    documents: [
      {
        id: "doc-6",
        title: "Manual de Procedimientos",
        description: "Procedimientos estándar para la operación de la terminal de carga.",
        type: "Manual",
        date: "07/01/2023"
      },
      {
        id: "doc-7",
        title: "Licencia de Operación",
        description: "Autorización gubernamental para operar la terminal de carga.",
        type: "Licencia",
        date: "12/12/2022"
      },
      {
        id: "doc-8", 
        title: "Informe de Impacto Ambiental",
        description: "Evaluación del impacto ambiental de las operaciones de la terminal.",
        type: "Informe",
        date: "15/05/2022"
      }
    ]
  },
  {
    id: "area-4",
    name: "Zona Administrativa",
    color: "hsla(272, 70%, 60%, 0.5)",
    center: [-76.72, -12.03],
    geometry: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-76.725, -12.035],
          [-76.715, -12.035],
          [-76.715, -12.025],
          [-76.725, -12.025],
          [-76.725, -12.035],
        ]]
      }
    },
    documents: [
      {
        id: "doc-9",
        title: "Organigrama Institucional",
        description: "Estructura organizacional y responsabilidades del personal administrativo.",
        type: "Documento",
        date: "03/03/2023"
      },
      {
        id: "doc-10",
        title: "Plan Estratégico 2023-2025",
        description: "Objetivos, estrategias y metas a mediano plazo para la zona administrativa.",
        type: "Plan",
        date: "20/11/2022"
      }
    ]
  }
];
