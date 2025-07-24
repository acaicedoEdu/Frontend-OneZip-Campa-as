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

      <q-card-section>
        <div class="text-grey-9 q-mb-xs">Teléfono</div>
        <q-input outlined dense v-model="telefono" placeholder="+34 600 123 456" />

        <div v-for="(field, index) in dynamicFields" :key="field.key" class="q-mt-md">
          <div class="text-grey-9 q-mb-xs">{{ field.label }}</div>
          <q-input outlined dense v-model="field.value">
            <template v-slot:append>
              <q-btn
                round
                dense
                flat
                icon="fa-solid fa-xmark"
                color="grey-7"
                @click="removeField(index)"
                aria-label="Eliminar campo"
              />
            </template>
          </q-input>
        </div>

        <q-btn-dropdown
          v-if="availableFieldsToAdd.length > 0"
          split
          outline
          dropdown-icon="fa-solid fa-angle-down"
          no-caps
          color="primary"
          label="Añadir campo"
          class="q-mt-lg"
          @click="addField(availableFieldsToAdd[0] as DynamicField)"
        >
          <q-list dense>
            <q-item
              v-for="field in availableFieldsToAdd"
              :key="field.key"
              clickable
              v-close-popup
              @click="addField(field as DynamicField)"
            >
              <q-item-section>
                <q-item-label>{{ field.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn flat label="Cancelar" color="grey-8" no-caps v-close-popup />
        <q-btn
          unelevated
          class="verde-principal text-white flex items-center justify-center"
          no-caps
          default
          :disable="!telefono || dynamicFields.some((f) => !f.value)"
        >
          <q-icon name="fa-solid fa-user-plus" size="13px" />
          <span class="text-weight-regular q-ml-sm">Crear Grupo</span>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface DynamicField {
  key: string;
  label: string;
  value: string;
}

const telefono = ref('');
const dynamicFields = ref<DynamicField[]>([]);

const allPossibleFields = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'apellido', label: 'Apellido' },
  { key: 'email', label: 'Email (opcional)' },
];

const availableFieldsToAdd = computed(() => {
  const addedKeys = dynamicFields.value.map((f) => f.key);
  return allPossibleFields.filter((f) => !addedKeys.includes(f.key));
});

function addField(field: DynamicField) {
  dynamicFields.value.push({
    ...field,
    value: '',
  });
}

function removeField(index: number) {
  dynamicFields.value.splice(index, 1);
}

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
