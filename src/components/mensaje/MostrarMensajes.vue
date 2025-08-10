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
        rounded
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
        rounded
        v-model="statusFilter"
        :options="statusOptions"
        label="Filtrar por estado"
        style="width: 220px"
        emit-value
        map-options
        options-cover
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
    row-key="id"
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
          square
          size="sm"
          :color="statusMap[props.row.status as keyof typeof statusMap].color"
          text-color="white"
          :icon="statusMap[props.row.status as keyof typeof statusMap].icon"
          :label="props.row.status"
        />
      </q-td>
    </template>

    <template v-slot:body-cell-error="props">
      <q-td :props="props">
        <div v-if="props.row.error" class="row items-center text-negative no-wrap">
          <q-icon name="o_warning" class="q-mr-xs" size="xs" />
          <span>{{ props.row.error }}</span>
        </div>
        <span v-else class="text-grey-6">-</span>
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { QTableProps } from 'quasar';

const searchText = ref('');
const statusFilter = ref([] as string[]);

const columns: QTableProps['columns'] = [
  { name: 'name', label: 'Destinatario', field: 'name', align: 'left' },
  { name: 'status', label: 'Estado', field: 'status', align: 'left' },
  { name: 'sent', label: 'Enviado', field: 'sent', align: 'left' },
  { name: 'delivered', label: 'Entregado', field: 'delivered', align: 'left' },
  { name: 'read', label: 'Leído', field: 'read', align: 'left' },
  { name: 'error', label: 'Error', field: 'error', align: 'left' },
];

const statusMap = {
  Leído: { color: 'purple-5', icon: 'o_visibility' },
  Entregado: { color: 'positive', icon: 'o_done_all' },
  Enviado: { color: 'primary', icon: 'o_send' },
  Fallido: { color: 'negative', icon: 'o_error_outline' },
};

const statusOptions = Object.keys(statusMap).map((status) => ({
  label: `<span class="row items-center"><i class='q-icon on-left ${statusMap[status as keyof typeof statusMap].icon} text-${statusMap[status as keyof typeof statusMap].color}'></i> ${status}</span>`,
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
