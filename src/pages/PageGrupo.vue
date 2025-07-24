<template>
  <q-page>
    <div class="q-pa-md" style="width: 420px">
      <q-tabs
        v-model="tab"
        inline-label
        class="text-grey-8 custom-tabs"
        :active-color="tab === 'grupos' ? 'positive' : 'primary'"
        :active-bg-color="tab === 'grupos' ? 'green-1' : 'blue-1'"
        indicator-color="transparent"
        no-caps
        dense
        align="left"
        swipeable
      >
        <q-tab
          name="grupos"
          icon="fa-regular fa-folder-open"
          :label="grupoStore.grupos.length > 0 ? `Grupos (${grupoStore.grupos.length})` : 'Grupos'"
        />
        <q-tab name="contactos" icon="fa-regular fa-user" :label="`Contactos Individuales (5)`" />
      </q-tabs>
    </div>
    <q-tab-panels v-model="tab" class="q-ma-md" animated swipeable>
      <q-tab-panel name="grupos" class="bordered-panel q-pa-none">
        <MostrarGrupo :grupos="grupoStore.grupos" />
      </q-tab-panel>
      <q-tab-panel name="contactos">
        <MostrarContactos />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MostrarGrupo from 'src/components/grupo/MostrarGrupo.vue';
import MostrarContactos from 'src/components/contacto/MostrarContacto.vue';
import { useGrupoStore } from 'src/stores/grupo.store';

const grupoStore = useGrupoStore();

onMounted(async () => {
  try {
    await grupoStore.fetchGrupos();
  } catch (e) {
    console.error('Error al cargar grupos', e);
  }
});
const tab = ref('grupos');
</script>

<style scoped>
.custom-tabs {
  border: 1px solid #e0e0e0;
  border-radius: calc(0.5rem - 2px);
  padding: 4px;
  background-color: white;
}

.q-tab {
  border-radius: calc(0.5rem - 6px);
  margin: 0 2px;
  font-weight: 500;
}

.bordered-panel {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}
</style>
