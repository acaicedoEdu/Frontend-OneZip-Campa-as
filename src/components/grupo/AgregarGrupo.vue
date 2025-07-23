<template>
  <div class="q-pa-md">
    <q-btn label="Abrir Modal de Creación" color="primary" @click="createGroupDialog = true" />
  </div>

  <q-dialog v-model="createGroupDialog" persistent>
    <q-card style="width: 500px; max-width: 90vw; border-radius: 12px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">Crear Nuevo Grupo</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="text-grey-9 q-mb-xs">Nombre del Grupo</div>
        <q-input outlined rounded v-model="groupName">
          <template v-slot:prepend>
            <q-icon name="o_label" color="grey-7" />
          </template>
        </q-input>

        <div class="text-grey-9 q-mb-xs q-mt-md">Descripción</div>
        <q-input
          v-model="groupDescription"
          type="textarea"
          outlined
          rounded
          placeholder="Descripción del grupo"
        />

        <div class="text-grey-9 q-mb-sm q-mt-md">Color del Grupo</div>
        <q-option-group v-model="selectedColor" :options="colorOptions" inline>
          <template v-slot:label="opt">
            <div class="row items-center no-wrap q-mr-md">
              <span
                class="q-mr-sm"
                :style="{
                  height: '14px',
                  width: '14px',
                  borderRadius: '50%',
                  backgroundColor: opt.hex,
                  border: '1px solid rgba(0,0,0,0.1)',
                }"
              ></span>
              <span>{{ opt.label }}</span>
            </div>
          </template>
        </q-option-group>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn flat label="Cancelar" color="grey-8" no-caps rounded v-close-popup />
        <q-btn unelevated icon="add" label="Crear Grupo" color="positive" no-caps rounded />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// --- Variables reactivas para el formulario ---

// Controla la visibilidad del diálogo
const createGroupDialog = ref(false);

// Almacena los datos del formulario
const groupName = ref('Clientes VIP');
const groupDescription = ref('');
const selectedColor = ref('blue'); // Valor por defecto

// Define las opciones de color con su etiqueta, valor y código hexadecimal
const colorOptions = ref([
  { label: 'Azul', value: 'blue', hex: '#3498db' },
  { label: 'Verde', value: 'green', hex: '#2ecc71' },
  { label: 'Púrpura', value: 'purple', hex: '#9b59b6' },
  { label: 'Naranja', value: 'orange', hex: '#e67e22' },
  { label: 'Rojo', value: 'red', hex: '#e74c3c' },
  { label: 'Amarillo', value: 'yellow', hex: '#f1c40f' },
]);
</script>
