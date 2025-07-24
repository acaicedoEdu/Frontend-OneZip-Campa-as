<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="(value) => emit('update:modelValue', value)"
    @hide="resetForm"
  >
    <q-card style="width: 500px; max-width: 90vw; border-radius: 12px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">Añadir Nuevo Contacto</div>
        <q-space />
        <q-btn icon="fa-solid fa-xmark" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pb-none">
        <div class="text-grey-9 q-mt-sm">Teléfono</div>
        <q-input
          outlined
          dense
          v-model="telefono"
          placeholder="Numero de Celular"
          mask="### ### ####"
          prefix="+57"
          no-error-icon
          :rules="[
            (val) => !!val || 'El numero es requerido',
            (val) => val.length === 12 || 'El numero debe tener 10 digitos',
          ]"
        />

        <div
          v-for="row in dynamicRows"
          :key="row.id"
          class="row q-col-gutter-sm q-mb-sm items-center justify-center"
        >
          <div class="col">
            <q-input
              v-model="row.column"
              outlined
              no-error-icon
              dense
              label="Nombre Columna"
              :rules="[(val) => !!val || 'El nombre es requerido']"
            />
          </div>

          <div class="col">
            <q-input
              v-model="row.value"
              outlined
              no-error-icon
              dense
              label="Valor"
              :rules="[(val) => !!val || 'El valor es requerido']"
            />
          </div>

          <div class="col-auto">
            <q-btn flat round dense color="negative" @click="deleteRow(row.id)">
              <q-icon name="fa-solid fa-trash-can" size="15px" />
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="q-pa-md q-pt-none">
        <q-btn
          unelevated
          outline
          class="bg-white soft-text flex items-center justify-center"
          style="width: 150px"
          no-caps
          default
          @click="addRow"
        >
          <q-icon name="fa-solid fa-plus" size="13px" />
          <span class="text-weight-regular q-ml-sm">Agregar Atributo</span>
        </q-btn>
        <q-space />
        <q-btn flat label="Cancelar" color="grey-8" no-caps v-close-popup />
        <q-btn
          unelevated
          class="verde-principal text-white flex items-center justify-center"
          style="width: 150px"
          no-caps
          default
          :disable="!telefono || telefono.length !== 12"
        >
          <q-icon name="fa-solid fa-user-plus" size="13px" />
          <span class="text-weight-regular q-ml-sm">Crear Contacto</span>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface DynamicField {
  key: string;
  label: string;
  value: string;
}

const telefono = ref('');
const dynamicFields = ref<DynamicField[]>([]);

interface DynamicRow {
  id: number;
  column: string;
  value: string;
}

const dynamicRows = ref<DynamicRow[]>([]);

const addRow = () => {
  const newRow: DynamicRow = {
    id: Date.now(),
    column: '',
    value: '',
  };
  dynamicRows.value.push(newRow);
};

const deleteRow = (rowId: number) => {
  dynamicRows.value = dynamicRows.value.filter((row) => row.id !== rowId);
};

defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const resetForm = () => {
  telefono.value = '';
  dynamicFields.value = [];
};
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
