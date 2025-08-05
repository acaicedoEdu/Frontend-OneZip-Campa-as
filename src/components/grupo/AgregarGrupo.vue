<template>
  <q-dialog
    :model-value="modelValue"
    @hide="resetForm"
    @before-hide="grupoStore.estadoAgregarGrupo && grupoStore.toggleAgregarGrupo()"
  >
    <q-card style="width: 500px; max-width: 90vw; border-radius: 12px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">Crear Nuevo Grupo</div>
        <q-space />
        <q-btn icon="fa-solid fa-xmark" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="text-grey-9 q-mb-xs">Nombre del Grupo</div>
        <q-input
          outlined
          autofocus
          dense
          placeholder="Nombre del grupo"
          v-model="nombre"
          no-error-icon
          :rules="[(val) => !!val || 'El nombre es requerido']"
        >
          <template v-slot:prepend>
            <q-icon name="fa-regular fa-folder-open" size="18px" color="grey-7" />
          </template>
        </q-input>

        <div class="text-grey-9 q-mb-xs q-mt-md">Descripción</div>
        <q-input
          v-model="descripcion"
          type="textarea"
          outlined
          dense
          no-error-icon
          placeholder="Descripción del grupo"
          :rules="[(val) => !!val || 'La descripción es requerida']"
        />
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn flat label="Cancelar" color="grey-8" no-caps v-close-popup />
        <q-btn
          unelevated
          class="verde-principal text-white flex items-center justify-center"
          no-caps
          default
          :disable="!nombre || !descripcion"
          @click="addGrupo"
        >
          <q-icon name="fa-solid fa-folder-plus" size="13px" />
          <span class="text-weight-regular q-ml-sm">Crear Grupo</span>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, type ComputedRef, ref } from 'vue';
import { useGrupoStore } from 'src/stores/grupo.store';
import { type Grupo } from 'src/types/grupo';
import { useAplicacionStore } from 'src/stores/aplicacion.store';

const nombre = ref('');
const descripcion = ref('');
const grupoStore = useGrupoStore();
const IdAplicacion: ComputedRef<number> = computed(
  () => useAplicacionStore().IdAplicacionEscogida || 0,
);

const modelValue = ref(computed(() => grupoStore.estadoAgregarGrupo));

const resetForm = () => {
  nombre.value = '';
  descripcion.value = '';
};

const grupo: ComputedRef<Grupo> = computed(() => {
  return {
    Nombre: nombre.value,
    Descripcion: descripcion.value,
    IdAplicacion: IdAplicacion.value,
    TotalContactos: 0,
  };
});

const addGrupo = async () => {
  grupoStore.toggleAgregarGrupo();
  await grupoStore.addGrupo(grupo.value);
  resetForm();
};
</script>
