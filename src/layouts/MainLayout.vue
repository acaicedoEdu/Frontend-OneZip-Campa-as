<template>
  <q-layout view="lHh Lpr lFf" class="main-background">
    <q-header class="main-background">
      <div>
        <q-toolbar>
          <q-toolbar-title class="main-text text-h4 text-weight-medium">
            {{ tituloActual }}
          </q-toolbar-title>

          <div class="text-caption main-text">Quasar v{{ $q.version }}</div>
        </q-toolbar>
        <span class="text-subtitle1 secondary-text q-pl-sm">{{ descripcionActual }}</span>
      </div>
    </q-header>

    <q-drawer
      v-model="navigationStore.isDrawerOpen"
      :width="242"
      show-if-above
      class="main-background"
    >
      <q-list dense>
        <q-toolbar>
          <q-icon size="30px" :name="ICONO_APON" />
          <q-toolbar-title class="text-weight-medium">OneZip Campañas</q-toolbar-title>
        </q-toolbar>
        <q-separator />
        <q-item-section>
          <q-item-label header class="text-subtitle2">Navegación</q-item-label>
        </q-item-section>
        <NavegacionPrincipal
          v-for="link in NAVEGACION_PRINCIPAL"
          :key="link.titulo"
          v-bind="link"
          :active="rutaActual.path === link.link"
        />
        <q-separator />
        <q-item-section class="text-center">
          <q-item-label caption class="q-mt-md"> © {{ anoActual }} OneZip Campañas </q-item-label>
        </q-item-section>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NavegacionPrincipal from 'components/principal/NavegacionPrincipal.vue';
import { useNavegacionStore } from '../stores/navegacion';
import { NAVEGACION_PRINCIPAL, ICONO_APON } from '../constants/navegacion';

const navigationStore = useNavegacionStore();
const rutaActual = useRoute();

const anoActual = computed(() => new Date().getFullYear());
const navegacionActual = computed(() => {
  return NAVEGACION_PRINCIPAL.find((link) => link.link === rutaActual.path);
});

const tituloActual = computed(() => {
  return navegacionActual.value ? navegacionActual.value.titulo : 'Panel de Control';
});

const descripcionActual = computed(() => {
  return navegacionActual.value
    ? navegacionActual.value.descripcion
    : 'Resumen de tus campañas de WhatsApp Business';
});
</script>
