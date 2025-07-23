<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="(value) => emit('update:modelValue', value)"
    @hide="resetForm"
  >
    <q-card style="min-width: 550px; border-radius: 12px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">Importar Contactos</div>
        <q-space />
        <q-btn icon="fa-solid fa-xmark" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-md">
        <q-file
          v-model="selectedFile"
          filled
          label="Seleccionar archivo Excel (.xlsx)"
          accept=".xlsx"
          class="q-mt-md"
        >
          <template v-slot:prepend>
            <q-icon name="fa-solid fa-file-excel" size="20px" />
          </template>
        </q-file>

        <q-select
          v-model="importDestination"
          :options="destinationOptions"
          label="Importar a:"
          options-dense
          filled
          class="q-mt-md"
          dropdown-icon="fa-solid fa-angle-down"
        />

        <q-banner rounded class="bg-blue-1 text-blue-9 q-mt-lg">
          <div class="text-weight-bold">Formato esperado:</div>
          El archivo debe tener las siguientes columnas:
          <div class="q-pa-sm bg-white" style="border-radius: 4px; margin-top: 4px">
            <code style="color: #444">Telefono | Columnas adicionales</code>
          </div>
        </q-banner>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn flat label="Cancelar" color="grey-8" v-close-popup no-caps />
        <q-btn
          unelevated
          class="verde-principal text-white flex items-center justify-center"
          no-caps
          default
          :disable="!selectedFile || !importDestination"
          @click="handleImport"
        >
          <q-icon name="fa-solid fa-arrow-up-from-bracket" size="13px" />
          <span class="text-weight-regular q-ml-sm">Importar</span>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'import', payload: { file: File; destination: string }): void;
}>();

const selectedFile = ref<File | null>(null);
const importDestination = ref<string | null>(null);

const destinationOptions = [
  'Lista de Clientes Potenciales',
  'Grupo de Marketing Q3',
  'Base de Datos General',
];

const handleImport = () => {
  if (selectedFile.value && importDestination.value) {
    emit('import', {
      file: selectedFile.value,
      destination: importDestination.value,
    });
  }
};

const resetForm = () => {
  selectedFile.value = null;
  importDestination.value = null;
};
</script>

<style scoped>
.q-btn-toggle--unelevated .q-btn {
  border: 1px solid #e0e0e0;
}
</style>
