<template>
  <q-dialog :model-value="modelValue" @hide="resetForm">
    <q-card style="min-width: 550px; border-radius: 12px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">Importar Contactos</div>
        <q-space />
        <q-btn icon="fa-solid fa-xmark" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-md">
        <q-file
          v-model="archivo"
          outlined
          dense
          label="Seleccionar archivo Excel (.xlsx)"
          accept=".xlsx"
          class="q-mt-md"
        >
          <template v-slot:prepend>
            <q-icon name="fa-solid fa-file-excel" size="20px" />
          </template>
        </q-file>

        <q-select
          v-model="nombreGrupoEscogido"
          :options="opcionesGrupo"
          label="Importar a:"
          options-dense
          dense
          outlined
          class="q-mt-md"
          dropdown-icon="fa-solid fa-angle-down"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No tienes grupos </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-banner rounded class="bg-blue-1 text-blue-9 q-mt-lg">
          <div class="text-weight-bold">Formato esperado:</div>
          El archivo debe tener las siguientes columnas:
          <div class="q-pa-sm bg-white" style="border-radius: 4px; margin-top: 4px">
            <code style="color: #444">telefono | Columnas adicionales</code>
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
          :disable="!archivo || !nombreGrupoEscogido"
          @click="importarContactos"
        >
          <q-icon name="fa-solid fa-arrow-up-from-bracket" size="13px" />
          <span class="text-weight-regular q-ml-sm">Importar</span>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGrupoStore } from 'src/stores/grupo.store';
import { useContactoStore } from 'src/stores/contacto.store';
import type { Grupo } from 'src/types/grupo';

const grupoStore = useGrupoStore();
const contactoStore = useContactoStore();
const modelValue = ref(computed(() => contactoStore.estadoImportarContacto));

const archivo = ref<File | null>(null);
const nombreGrupoEscogido = ref<string | null>(null);

const opcionesGrupo = computed<string[]>(() =>
  grupoStore.grupos.map((grupo: Grupo) => {
    return grupo.Nombre;
  }),
);

const importarContactos = async () => {
  const grupoEscogido =
    grupoStore.grupos.find((g: Grupo) => g.Nombre === nombreGrupoEscogido.value) || 0;
  if (archivo.value && grupoEscogido) {
    const formData = new FormData();
    formData.append('archivo', archivo.value);
    formData.append('IdGrupo', String(grupoEscogido.IdGrupo));
    contactoStore.estadoImportarContacto = false;
    await contactoStore.importarContacto(formData);
  }
};

const resetForm = () => {
  archivo.value = null;
  nombreGrupoEscogido.value = null;
};
</script>

<style scoped>
.q-btn-toggle--unelevated .q-btn {
  border: 1px solid #e0e0e0;
}
</style>
