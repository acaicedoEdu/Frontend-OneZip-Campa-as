<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="(value) => emit('update:modelValue', value)"
    @hide="resetForm"
  >
    <q-card style="width: 500px; max-width: 90vw; border-radius: 12px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">Crear Nuevo Grupo</div>
        <q-space />
        <q-btn icon="fa-solid fa-xmark" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="text-grey-9 q-mb-xs">Nombre del Grupo</div>
        <q-input outlined dense placeholder="Nombre del grupo" v-model="groupName">
          <template v-slot:prepend>
            <q-icon name="fa-regular fa-folder-open" size="18px" color="grey-7" />
          </template>
        </q-input>

        <div class="text-grey-9 q-mb-xs q-mt-md">Descripción</div>
        <q-input
          v-model="groupDescription"
          type="textarea"
          outlined
          dense
          placeholder="Descripción del grupo"
        />
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn flat label="Cancelar" color="grey-8" no-caps v-close-popup />
        <q-btn
          unelevated
          class="verde-principal text-white flex items-center justify-center"
          no-caps
          default
          :disable="!groupName || !groupDescription"
        >
          <q-icon name="fa-solid fa-folder-plus" size="13px" />
          <span class="text-weight-regular q-ml-sm">Crear Grupo</span>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const groupName = ref('');
const groupDescription = ref('');

defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const resetForm = () => {
  groupName.value = '';
  groupDescription.value = '';
};
</script>
