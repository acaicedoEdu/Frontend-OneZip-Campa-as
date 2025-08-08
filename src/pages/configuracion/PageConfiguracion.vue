<template>
  <q-page class="q-px-md">
    <div class="q-pa-xs">
      <q-tabs
        v-model="tab"
        inline-label
        class="text-grey-8 custom-tabs"
        active-color="primary"
        active-bg-color="blue-1"
        indicator-color="transparent"
        no-caps
        dense
        align="left"
        swipeable
      >
        <q-tab
          name="whatsapp"
          icon="fa-brands fa-whatsapp"
          style="flex: 1"
          label="WhatsApp Business"
        />
        <!-- <q-tab
          style="flex: 1"
          name="company"
          icon="fa-solid fa-building"
          label="Datos de la Empresa"
        />
        <q-tab name="users" icon="fa-solid fa-users" label="Gestión de Usuarios" style="flex: 1" /> -->
      </q-tabs>
    </div>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="whatsapp">
        <MostrarAplicacion />
        <AgregarAplicacion />
      </q-tab-panel>

      <q-tab-panel name="company"> ... </q-tab-panel>
    </q-tab-panels>

    <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn rounded icon="fa-solid fa-save" color="dark" label="Guardar Cambios" />
    </q-page-sticky> -->
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MostrarAplicacion from 'src/components/configuracion/aplicacion/MostrarAplicacion.vue';
import AgregarAplicacion from 'src/components/configuracion/aplicacion/AgregarAplicacion.vue';

const tab = ref('whatsapp');
</script>
