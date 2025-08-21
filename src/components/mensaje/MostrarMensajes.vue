<template>
  <div class="row items-center justify-between q-mb-md">
    <div>
      <div class="text-h5 text-weight-bold">Todos los Mensajes</div>
      <p class="text-grey-7">Lista detallada de cada mensaje enviado</p>
    </div>
    <div class="row q-gutter-md">
      <q-input
        outlined
        dense
        debounce="300"
        v-model="textoBuscar"
        placeholder="Buscar teléfono..."
        style="width: 250px"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-select
        multiple
        dense
        outlined
        v-model="estadoFiltro"
        :options="opcionesEstado"
        label="Filtrar por estado"
        style="width: 220px"
        emit-value
        map-options
      >
        <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
          <q-item v-bind="itemProps">
            <q-item-section side>
              <q-checkbox :model-value="selected" @update:model-value="toggleOption(opt.value)" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ opt.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>

  <q-table
    :rows="filtroMensajes"
    :columns="columns"
    row-key="idMensaje"
    flat
    :pagination="paginacion"
    :loading="mensajeStore.loading || loadingTimeout"
    bordered
    :table-header-style="{ fontWeight: 'normal' }"
    :rows-per-page-options="[10]"
    @request="activarPaginado"
  >
    <template v-slot:body-cell-telefono="props">
      <q-td :props="props">
        <div class="text-subtitle2 text-grey-9">{{ props.row.telefono }}</div>
      </q-td>
    </template>

    <template v-slot:body-cell-estado="props">
      <q-td :props="props">
        <q-chip
          rounded
          class="text-weight-medium"
          size="12px"
          :color="`${statusMap[props.row.estado as keyof typeof statusMap].color}-1`"
          :text-color="`${statusMap[props.row.estado as keyof typeof statusMap].color}`"
          :icon="statusMap[props.row.estado as keyof typeof statusMap].icon"
          :label="props.row.estado"
        />
      </q-td>
    </template>

    <template v-slot:body-cell-error="props">
      <q-td :props="props">
        <div v-if="props.row.error" class="row items-center text-negative no-wrap">
          <q-icon name="warning" class="q-mr-xs" size="xs" />
          <span>{{ props.row.error }}</span>
        </div>
        <span v-else class="text-grey-6">-</span>
      </q-td>
    </template>

    <template v-slot:no-data>
      <div class="full-width row flex-center text-grey-7 q-gutter-sm q-pa-xl">
        <q-icon size="2em" name="fa-solid fa-circle-info" />
        <span>No se encontraron resultados</span>
      </div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { RequestProps } from 'src/types/paginacion';
import { type Paginacion } from 'src/types/paginacion';
import { type QTableProps } from 'quasar';
import { useMensajeStore } from 'src/stores/mensaje.store';
import { formatearFecha } from 'src/composables/campana/formatearFecha';
import { useRoute } from 'vue-router';

const mensajeStore = useMensajeStore();
const textoBuscar = ref('');
const estadoFiltro = ref([] as string[]);
const route = useRoute();
let timeoutId: ReturnType<typeof setTimeout> | null = null;
const loadingTimeout = ref(false);

const paginacion = computed<Paginacion>(() => ({
  page: mensajeStore.pagina,
  rowsPerPage: mensajeStore.tamano,
  rowsNumber: mensajeStore.total,
  sortBy: '',
  descending: false,
}));

const activarPaginado = async (props: RequestProps) => {
  const idCampanaNumero = Number(route.params.id as string);
  if (estadoFiltro.value.length > 0) {
    const estado = String(estadoFiltro.value);
    await mensajeStore.filtroMensajes(
      idCampanaNumero,
      estado,
      true,
      props.pagination.page,
      props.pagination.rowsPerPage,
    );
  } else if (textoBuscar.value.trim()) {
    const busqueda = textoBuscar.value.toLowerCase().trim();
    await mensajeStore.buscarMensajes(
      idCampanaNumero,
      busqueda,
      true,
      props.pagination.page,
      props.pagination.rowsPerPage,
    );
  } else {
    await mensajeStore.fetchMensajes(
      idCampanaNumero,
      true,
      props.pagination.page,
      props.pagination.rowsPerPage,
    );
  }
};

const columns: QTableProps['columns'] = [
  { name: 'telefono', label: 'Destinatario', field: 'telefono', align: 'left' },
  { name: 'estado', label: 'Estado', field: 'estado', align: 'left' },
  { name: 'envio', label: 'Enviado', field: 'envio', align: 'left' },
  { name: 'entrega', label: 'Entregado', field: 'entrega', align: 'left' },
  { name: 'lectura', label: 'Leído', field: 'lectura', align: 'left' },
  { name: 'error', label: 'Error', field: 'error', align: 'left' },
  { name: 'intentos', label: 'Intentos', field: 'intentos', align: 'left' },
];

const statusMap = {
  Leído: { color: 'purple', icon: 'fa-solid fa-eye', nombreColumna: '' },
  Entregado: { color: 'green', icon: 'fa-solid fa-check', nombreColumna: '' },
  Enviado: { color: 'blue', icon: 'fa-solid fa-paper-plane', nombreColumna: '' },
  Fallido: { color: 'red', icon: 'fa-solid fa-xmark', nombreColumna: '' },
};

const opcionesEstado = Object.keys(statusMap).map((status) => ({
  label: `${status}`,
  value: status,
}));

const Todosmensajes = computed(() => {
  const mensajesTrans = mensajeStore.mensajes.map((msj) => ({
    idMensaje: msj.IdMensaje,
    telefono: msj.Contacto.Telefono,
    estado:
      msj.MensajeError != null
        ? 'Fallido'
        : msj.FechaLectura != null
          ? 'Leído'
          : msj.FechaEntrega != null
            ? 'Entregado'
            : msj.FechaEnvio != null
              ? 'Enviado'
              : 'none',
    envio: formatearFecha(msj.FechaEnvio),
    entrega: formatearFecha(msj.FechaEntrega),
    lectura: formatearFecha(msj.FechaLectura),
    error: msj.MensajeError && '-',
    intentos: msj.Intentos <= 1 ? 1 : msj.Intentos,
  }));

  return mensajesTrans;
});

const filtroMensajes = computed(() => {
  let mensajes = Todosmensajes.value;

  if (estadoFiltro.value.length > 0) {
    if (mensajeStore.total <= 10) {
      mensajes = mensajes.filter((msg) => estadoFiltro.value.includes(msg.estado));
    }
  }

  if (textoBuscar.value.trim()) {
    if (mensajeStore.total <= 10) {
      const busqueda = textoBuscar.value.toLowerCase().trim();
      mensajes = mensajes.filter((msg) => msg.telefono.includes(busqueda));
    }
  }

  return mensajes;
});

watch(
  () => textoBuscar.value,
  () => {
    if (mensajeStore.total >= 10) {
      if (timeoutId) clearTimeout(timeoutId);
      loadingTimeout.value = true;
      timeoutId = setTimeout(() => {
        void (async () => {
          const idCampanaNumero = Number(route.params.id as string);
          const busqueda = textoBuscar.value.toLowerCase().trim();
          loadingTimeout.value = false;
          if (busqueda) {
            await mensajeStore.buscarMensajes(idCampanaNumero, busqueda, true);
          } else {
            await mensajeStore.fetchMensajes(idCampanaNumero, true);
          }
        })();
      }, 500);
    }
  },
);

watch(
  () => estadoFiltro.value,
  () => {
    if (mensajeStore.total >= 10) {
      if (timeoutId) clearTimeout(timeoutId);
      loadingTimeout.value = true;
      timeoutId = setTimeout(() => {
        void (async () => {
          const idCampanaNumero = Number(route.params.id as string);
          loadingTimeout.value = false;
          if (estadoFiltro.value.length > 0) {
            const estado = String(estadoFiltro.value);
            await mensajeStore.filtroMensajes(idCampanaNumero, estado, true);
          } else {
            await mensajeStore.fetchMensajes(idCampanaNumero, true);
          }
        })();
      }, 500);
    }
  },
);
</script>
