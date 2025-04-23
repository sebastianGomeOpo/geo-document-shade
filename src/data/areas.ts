
import { AreaType } from '@/types/document';

export const areaData: AreaType[] = [
  {
    id: "area-1",
    name: "Muelle B",
    color: "hsla(142, 71%, 45%, 0.5)",
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
    ],
    geometry: {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[[-73.45, -13.75], [-73.4, -13.75], [-73.4, -13.7], [-73.45, -13.7], [-73.45, -13.75]]]
      }
    },
    center: [-73.425, -13.725]
  },
  {
    id: "area-2",
    name: "Zona de Almacenamiento",
    color: "hsla(196, 80%, 45%, 0.5)",
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
    ],
    geometry: {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[[-73.55, -13.85], [-73.5, -13.85], [-73.5, -13.8], [-73.55, -13.8], [-73.55, -13.85]]]
      }
    },
    center: [-73.525, -13.825]
  },
  {
    id: "area-3",
    name: "Terminal de Carga",
    color: "hsla(37, 90%, 50%, 0.5)",
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
    ],
    geometry: {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[[-73.65, -13.95], [-73.6, -13.95], [-73.6, -13.9], [-73.65, -13.9], [-73.65, -13.95]]]
      }
    },
    center: [-73.625, -13.925]
  },
  {
    id: "area-4",
    name: "Zona Administrativa",
    color: "hsla(272, 70%, 60%, 0.5)",
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
    ],
    geometry: {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[[-73.75, -14.05], [-73.7, -14.05], [-73.7, -14], [-73.75, -14], [-73.75, -14.05]]]
      }
    },
    center: [-73.725, -14.025]
  }
];
