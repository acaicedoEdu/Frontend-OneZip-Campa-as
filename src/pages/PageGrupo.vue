<template>
  <q-page>
    <div v-if="aplicacionStore.aplicaciones.length === 0">
      <div v-if="aplicacionStore.loading" class="flex flex-center" style="height: 80vh">
        <q-spinner-oval color="primary" size="4em" />
      </div>
      <VacioDatos v-else pagina="aplicacion" />
    </div>
    <div v-else class="row items-center justify-between q-pr-md">
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
            :label="
              grupoStore.grupos.length > 0 ? `Grupos (${grupoStore.grupos.length})` : 'Grupos'
            "
          />
          <q-tab
            name="contactos"
            icon="fa-solid fa-user"
            :label="
              contactoStore.contactos.length > 0
                ? `Contactos Individuales (${contactoStore.contactos.length})`
                : 'Contactos Individuales'
            "
          />
        </q-tabs>
      </div>
      <SeleccionAplicacion />
    </div>
    <q-tab-panels
      v-if="aplicacionStore.aplicaciones.length > 0"
      v-model="tab"
      class="q-ma-md"
      animated
      swipeable
    >
      <q-tab-panel name="grupos" class="bordered-panel q-pa-none">
        <MostrarGrupo />
      </q-tab-panel>
      <q-tab-panel name="contactos">
        <MostrarContactos />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { ref, watch } from 'vue';
import MostrarGrupo from 'src/components/grupo/MostrarGrupo.vue';
import MostrarContactos from 'src/components/contacto/MostrarContacto.vue';
import SeleccionAplicacion from 'src/components/configuracion/aplicacion/SeleccionAplicacion.vue';
import { useGrupoStore } from 'src/stores/grupo.store';
import { useAplicacionStore } from 'src/stores/aplicacion.store';
import { useContactoStore } from 'src/stores/contacto.store';
import VacioDatos from 'src/components/VacioDatos.vue';

const tab = ref('grupos');
const aplicacionStore = useAplicacionStore();
const grupoStore = useGrupoStore();
const contactoStore = useContactoStore();
const IdAplicacionEscogida: Ref<number> = ref(aplicacionStore.IdAplicacionEscogida);

watch(
  IdAplicacionEscogida,
  async (newAppId) => {
    if (newAppId) {
      await grupoStore.fetchGrupos();
      await contactoStore.fetchContactos();
    }
  },
  { immediate: true },
);
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
