<template>
  <div class="q-pa-lg">
    <div v-if="groups.length === 0">
      <VacioDatos pagina="grupo" />
    </div>
    <div v-else class="row items-center q-mb-lg">
      <div>
        <div class="text-h5 text-weight-bold">Grupos de Contactos</div>
        <div class="text-grey-8">{{ groups.length }} grupos disponibles</div>
      </div>

      <q-space />

      <q-input
        outlined
        dense
        v-model="searchText"
        placeholder="Buscar grupos..."
        class="q-mr-sm"
        style="width: 250px"
      >
        <template v-slot:prepend>
          <q-icon name="fa-solid fa-magnifying-glass" size="18px" />
        </template>
      </q-input>
    </div>

    <div class="row q-col-gutter-lg">
      <div v-for="group in groups" :key="group.nombre" class="col-12 col-md-6 col-lg-4">
        <q-card flat bordered class="full-height cursor-pointer card-grupo">
          <q-card-section class="q-pb-xs row items-center no-wrap">
            <q-icon name="fa-regular fa-folder-open" color="green-5" size="18px" class="q-mr-sm" />
            <div class="ellipsis text-h6">{{ group.nombre }}</div>
            <q-space />
            <q-btn-dropdown
              flat
              round
              dense
              no-icon-animation
              dropdown-icon="fa-solid fa-ellipsis-vertical"
              size="10px"
            >
              <q-list dense>
                <q-item clickable v-close-popup>
                  <q-item-section side>
                    <q-icon name="fa-solid fa-trash-can" size="13px" color="red" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-red">Eliminar</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-card-section>

          <q-card-section class="q-py-none">
            <q-chip
              dense
              color="grey-2"
              size="13px"
              text-color="grey-8"
              :label="group.totalContactos + ' contactos'"
            />
            <div class="q-pt-xs">{{ group.descripcion }}</div>
          </q-card-section>

          <q-card-section class="q-pt-xs text-caption text-grey">
            <div>
              Creado: {{ group.fechaCarga }}
              <q-spinner-tail v-if="!group.fechaCarga" color="blue-grey" />
            </div>
            <div v-if="group.fechaModificacion">Actualizado: {{ group.fechaModificacion }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGrupoStore } from 'src/stores/grupo.store';
import VacioDatos from 'src/components/VacioDatos.vue';

const searchText = ref('');
const grupoStore = useGrupoStore();

const groups = computed(() => {
  return grupoStore.grupos
    .filter((g) => g.Nombre.toLowerCase().includes(searchText.value.toLowerCase()))
    .map((g) => ({
      nombre: g.Nombre,
      totalContactos: g.TotalContactos ?? 0,
      descripcion: g.Descripcion,
      fechaCarga: g.FechaCarga,
      fechaModificacion: g.FechaModificacion,
    }));
});
</script>

<style>
.card-grupo:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  border-color: #86efac !important;
}
</style>
