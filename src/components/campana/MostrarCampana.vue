<template>
  <div v-if="campanas.length === 0">
    <div v-if="campanaStore.loading" class="flex flex-center" style="height: 80vh">
      <q-spinner-oval color="primary" size="4em" />
    </div>
    <VacioDatos v-else pagina="campana" />
  </div>
  <div
    v-else
    class="q-pa-md q-ma-md q-pa-lg-lg bg-white"
    style="border: 1px solid #e4e4e7; border-radius: 8px"
  >
    <div class="row items-center q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold">Todas las Campañas</div>
        <div class="text-grey-8 text-subtitle1" style="font-size: 14px">
          {{ campanaStore.total }} campañas masivas
        </div>
      </div>
      <q-space />
      <q-input
        outlined
        dense
        v-model="textoBuscar"
        placeholder="Buscar campañas..."
        style="width: 250px"
        class="bg-white"
      >
        <template v-slot:prepend
          ><q-icon name="fa-solid fa-magnifying-glass" size="18px"
        /></template>
      </q-input>
    </div>
    <q-table
      :rows="campanas"
      :columns="columnas"
      row-key="IdCampana"
      :loading="campanaStore.loading"
      :pagination="paginacion"
      :filter="textoBuscar"
      icon-next-page="fa-solid fa-angle-right"
      icon-prev-page="fa-solid fa-angle-left"
      flat
      :rows-per-page-options="[10]"
      @request="activarPaginado"
    >
      <template v-slot:body-cell-IdEstado="props">
        <q-td :props="props">
          <q-chip
            dense
            :color="`${colorEstado(props.row.IdEstado)}-2`"
            :text-color="`${colorEstado(props.row.IdEstado)}-8`"
            size="15px"
            class="text-weight-medium"
            :label="nombreEstado(props.row.IdEstado)"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-acciones="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn
            v-for="boton in botonesAccion.filter((d) => d.idEstado == props.row.IdEstado)"
            :key="boton.nombre"
            dense
            round
            flat
            color="grey-9"
            size="10px"
            :to="boton.to && `${boton.to}${props.row.IdCampana}`"
            :icon="boton.icono"
            @click="boton.accion && boton.accion(props.row)"
          >
            <q-tooltip>{{ boton.mensajeTooltip }}</q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template v-slot:no-data>
        <div class="full-width row flex-center text-grey-7 q-gutter-sm q-pa-xl">
          <q-icon size="2em" name="fa-solid fa-circle-info" />
          <span>No se encontraron resultados</span>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCampanaStore } from 'src/stores/campana.store';
import VacioDatos from 'src/components/VacioDatos.vue';
import type { QTableProps } from 'quasar';
import type { Paginacion, RequestProps } from 'src/types/paginacion';
import { botonesAccion } from 'src/constants/botonesAccionMostrarCampana';
import { formatearFecha } from 'src/composables/campana/formatearFecha';
import type { Campana } from 'src/types/campana';

const campanaStore = useCampanaStore();
const textoBuscar = ref('');

const campanas = computed<Campana[]>(() =>
  campanaStore.campanasXAplicacion.map((campana) => {
    const fechaInicioDate = campana.FechaInicio ? new Date(campana.FechaInicio) : null;
    const fechaFinDate = campana.FechaFin ? new Date(campana.FechaFin) : null;
    return {
      ...campana,
      FechaInicio: formatearFecha(fechaInicioDate),
      FechaFin: formatearFecha(fechaFinDate),
    };
  }),
);

const paginacion = computed<Paginacion>(() => ({
  page: campanaStore.pagina,
  rowsPerPage: campanaStore.tamano,
  sortBy: '',
  descending: false,
}));

const activarPaginado = async (props: RequestProps) => {
  if (textoBuscar.value.trim()) {
    // const busqueda = textoBuscar.value.toLowerCase().trim();
    // await mensajeStore.buscarMensajes(
    //   idCampanaNumero,
    //   busqueda,
    //   true,
    //   props.pagination.page,
    //   props.pagination.rowsPerPage,
    //   true,
    // );
  } else {
    await campanaStore.fetchCampanasXAplicacion(
      true,
      props.pagination.page,
      props.pagination.rowsPerPage,
    );
  }
};

const nombreEstado = (idEstado: number) => {
  return idEstado == 3
    ? 'Procesando'
    : idEstado == 6
      ? 'Programada'
      : idEstado == 7
        ? 'Pausada'
        : idEstado == 9
          ? 'Cancelada'
          : idEstado == 8
            ? 'Completada'
            : idEstado == 10
              ? 'Error'
              : '...';
};
const colorEstado = (idEstado: number) => {
  return idEstado == 3
    ? 'blue'
    : idEstado == 6
      ? 'yellow'
      : idEstado == 7
        ? 'orange'
        : idEstado == 9
          ? 'red'
          : idEstado == 8
            ? 'green'
            : idEstado == 10
              ? 'negative'
              : 'grey';
};

const columnas: QTableProps['columns'] = [
  {
    label: 'Nombre de Campaña',
    name: 'Nombre',
    field: 'Nombre',
    align: 'left',
    headerClasses: 'text-grey-7',
    headerStyle: 'font-size: 14px',
  },
  {
    label: 'Tipo de envio',
    name: 'TipoEnvio',
    field: 'TipoEnvio',
    align: 'left',
    headerClasses: 'text-grey-7',
    headerStyle: 'font-size: 14px',
  },
  {
    label: 'Plantilla',
    name: 'IdPlantilla',
    field: 'IdPlantilla',
    align: 'left',
    headerClasses: 'text-grey-7',
    headerStyle: 'font-size: 14px',
  },
  {
    label: 'Grupo',
    name: 'IdGrupo',
    field: 'IdGrupo',
    align: 'left',
    headerClasses: 'text-grey-7',
    headerStyle: 'font-size: 14px',
  },
  {
    label: 'Fecha de Ejecución',
    name: 'FechaInicio',
    field: 'FechaInicio',
    align: 'left',
    headerClasses: 'text-grey-7',
    headerStyle: 'font-size: 14px',
  },
  {
    label: 'Fecha de Fin',
    name: 'FechaFin',
    field: 'FechaFin',
    align: 'left',
    headerClasses: 'text-grey-7',
    headerStyle: 'font-size: 14px',
  },
  {
    label: 'Estado',
    name: 'IdEstado',
    field: 'IdEstado',
    align: 'left',
    headerClasses: 'text-grey-7',
    headerStyle: 'font-size: 14px',
  },
  {
    label: 'Acciones',
    name: 'acciones',
    field: 'acciones',
    align: 'center',
    headerClasses: 'text-grey-7',
    headerStyle: 'font-size: 14px',
  },
];
</script>
