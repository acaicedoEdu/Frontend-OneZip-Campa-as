<template>
  <div v-if="aplicacionStore.aplicaciones.length === 0">
    <div
      v-if="aplicacionStore.loading"
      class="flex flex-center"
      :style="props.componentePadre === 'PageGrupo' ? 'height: 80vh' : 'height: 55vh'"
    >
      <q-spinner-oval color="primary" size="4em" />
    </div>
    <VacioDatos v-else pagina="aplicacion" />
  </div>
  <div v-else>
    <div
      v-if="props.componentePadre == 'agregarCampana'"
      class="row items-center justify-between q-mb-md"
    >
      <span class="text-h6 text-weight-medium">Seleccion de Destinatarios</span>
      <span class="text-subtitle2 text-grey-8">
        <q-icon name="fa-solid fa-user-group" size="12px" />
        {{ mostrarContactosSeleccionados }} destinatarios seleccionados
      </span>
    </div>
    <div
      :class="
        props.componentePadre === 'PageGrupo'
          ? 'row items-center justify-between q-pr-md'
          : 'row items-center justify-between'
      "
    >
      <div :class="props.componentePadre === 'PageGrupo' ? 'q-pa-md' : ''" style="flex: 1">
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
            style="flex: 1"
            :label="
              grupoStore.grupos.length > 0 ? `Grupos (${grupoStore.grupos.length})` : 'Grupos'
            "
          />
          <q-tab
            style="flex: 1"
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
      <SeleccionAplicacion v-if="props.componentePadre === 'PageGrupo'" />
    </div>
  </div>
  <q-tab-panels
    v-if="aplicacionStore.aplicaciones.length > 0"
    v-model="tab"
    :class="props.componentePadre === 'PageGrupo' ? 'q-ma-md' : 'q-mt-md'"
    animated
    swipeable
  >
    <q-tab-panel name="grupos" class="bordered-panel q-pa-none">
      <MostrarGrupo
        @update:contactoSeleccionado="actualizarContactos"
        :contactoSeleccionado="contactoSeleccionado"
        :componentePadre="props.componentePadre"
      />
    </q-tab-panel>
    <q-tab-panel name="contactos">
      <MostrarContactos
        @update:contactoSeleccionado="actualizarContactos"
        :contactoSeleccionado="contactoSeleccionado"
        :componentePadre="props.componentePadre"
      />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import MostrarGrupo from 'src/components/grupo/MostrarGrupo.vue';
import MostrarContactos from 'src/components/contacto/MostrarContacto.vue';
import SeleccionAplicacion from 'src/components/configuracion/aplicacion/SeleccionAplicacion.vue';
import { useGrupoStore } from 'src/stores/grupo.store';
import { useAplicacionStore } from 'src/stores/aplicacion.store';
import { useContactoStore } from 'src/stores/contacto.store';
import { type ContactosSeleccionados } from 'src/types/contactosSeleccionados';
import VacioDatos from 'src/components/VacioDatos.vue';

const grupoStore = useGrupoStore();

interface LocalContactoSeleccionado {
  componentePadre: string;
  contactoSeleccionado?: ContactosSeleccionados;
}

const props = defineProps<LocalContactoSeleccionado>();

const emit = defineEmits(['update:contactoSeleccionado']);

const contactoSeleccionado = ref<ContactosSeleccionados>(props.contactoSeleccionado || {});

const actualizarContactos = (nuevosContactos: ContactosSeleccionados) => {
  contactoSeleccionado.value = nuevosContactos;
  emit('update:contactoSeleccionado', nuevosContactos);
};

const obtenerContactosGrupo = computed(() => {
  return contactoSeleccionado.value.idGrupo
    ? grupoStore.getGrupoById(contactoSeleccionado.value.idGrupo)
    : null;
});

const mostrarContactosSeleccionados = computed(() => {
  return obtenerContactosGrupo.value
    ? obtenerContactosGrupo.value.TotalContactos
    : 0 + (contactoSeleccionado.value.contactosSeleccionados?.length || 0);
});

const tab = ref('grupos');
const aplicacionStore = useAplicacionStore();
const contactoStore = useContactoStore();
const IdAplicacionEscogida = computed(() => aplicacionStore.IdAplicacionEscogida);

onMounted(async () => {
  try {
    await aplicacionStore.fetchAplicaciones();
    if (aplicacionStore.aplicaciones.length > 0) {
      aplicacionStore.IdAplicacionEscogida = aplicacionStore.aplicaciones[0]!.IdAplicacion;
    }
  } catch (error) {
    console.error('Error al cargar aplicaciones', error);
  }
});

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
