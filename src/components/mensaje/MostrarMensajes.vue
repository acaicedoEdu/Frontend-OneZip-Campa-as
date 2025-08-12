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
        v-model="searchText"
        placeholder="Buscar por nombre o teléfono..."
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
        v-model="statusFilter"
        :options="statusOptions"
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
              <q-item-label><div v-html="opt.label"></div></q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>

  <q-table
    :rows="filteredMessages"
    :columns="columns"
    row-key="IdMensaje"
    flat
    bordered
    :hide-bottom="true"
    :table-header-style="{ fontWeight: 'normal' }"
  >
    <template v-slot:body-cell-recipient="props">
      <q-td :props="props">
        <div class="text-weight-bold">{{ props.row.name }}</div>
        <div class="text-caption text-grey-7">{{ props.row.phone }}</div>
      </q-td>
    </template>

    <template v-slot:body-cell-status="props">
      <q-td :props="props">
        <q-chip
          rounde
          class="text-weight-medium"
          size="12px"
          :color="`${statusMap[props.row.status as keyof typeof statusMap].color}-1`"
          :text-color="`${statusMap[props.row.status as keyof typeof statusMap].color}`"
          :icon="statusMap[props.row.status as keyof typeof statusMap].icon"
          :label="props.row.status"
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
  </q-table>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { type QTableProps } from 'quasar';

const searchText = ref('');
const statusFilter = ref([] as string[]);

const columns: QTableProps['columns'] = [
  { name: 'Telefono', label: 'Celular', field: 'Telefono', align: 'left' },
  { name: 'IdEstado', label: 'Estado', field: 'IdEstado', align: 'left' },
  { name: 'FechaEnvio', label: 'Enviado', field: 'FechaEnvio', align: 'left' },
  { name: 'FechaEntrega', label: 'Entregado', field: 'FechaEntrega', align: 'left' },
  { name: 'FechaLectura', label: 'Leído', field: 'rFechaLecturaead', align: 'left' },
  { name: 'FechaCreacion', label: 'Error', field: 'FechaCreacion', align: 'left' },
  { name: 'Intentos', label: 'Intentos', field: 'Intentos', align: 'left' },
];

const statusMap = {
  Leído: { color: 'purple', icon: 'fa-solid fa-eye' },
  Entregado: { color: 'green', icon: 'fa-solid fa-check' },
  Enviado: { color: 'blue', icon: 'fa-solid fa-paper-plane' },
  Fallido: { color: 'red', icon: 'fa-solid fa-xmark' },
};

const statusOptions = Object.keys(statusMap).map((status) => ({
  label: `${status}`,
  value: status,
}));

const allMessages = ref([
  {
    id: 1,
    name: 'Juan Pérez',
    phone: '+34 600 123 456',
    status: 'Leído',
    sent: '2024-01-15 10:32:15',
    delivered: '2024-01-15 10:32:18',
    read: '2024-01-15 10:45:22',
    error: null,
  },
  {
    id: 2,
    name: 'María García',
    phone: '+34 600 234 567',
    status: 'Entregado',
    sent: '2024-01-15 10:32:16',
    delivered: '2024-01-15 10:32:19',
    read: '-',
    error: null,
  },
  {
    id: 3,
    name: 'Carlos López',
    phone: '+34 600 345 678',
    status: 'Fallido',
    sent: '2024-01-15 10:32:17',
    delivered: '-',
    read: '-',
    error: 'Número inválido o fuera de servicio',
  },
  {
    id: 4,
    name: 'Ana Martín',
    phone: '+34 600 456 789',
    status: 'Leído',
    sent: '2024-01-15 10:32:18',
    delivered: '2024-01-15 10:32:21',
    read: '2024-01-15 11:15:33',
    error: null,
  },
  {
    id: 5,
    name: 'Luis Rodríguez',
    phone: '+34 600 567 890',
    status: 'Enviado',
    sent: '2024-01-15 10:32:19',
    delivered: '-',
    read: '-',
    error: null,
  },
]);

const filteredMessages = computed(() => {
  let messages = allMessages.value;

  if (statusFilter.value.length > 0) {
    messages = messages.filter((msg) => statusFilter.value.includes(msg.status));
  }

  if (searchText.value.trim()) {
    const search = searchText.value.toLowerCase().trim();
    messages = messages.filter(
      (msg) => msg.name.toLowerCase().includes(search) || msg.phone.includes(search),
    );
  }

  return messages;
});
</script>
