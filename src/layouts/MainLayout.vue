<template>
  <q-layout view="lHh Lpr lFf" class="main-background">
    <q-header class="main-background">
      <div>
      <q-toolbar>
        <q-toolbar-title class="main-text text-h4 text-weight-medium">
          {{ currentPageTitle }}
        </q-toolbar-title>

        <div class="text-caption main-text">Quasar v{{ $q.version }}</div>
      </q-toolbar>
        <span class="text-subtitle1 secondary-text q-pl-sm">Resumen de tus campañas de WhatsApp</span>
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
          <q-icon size="30px" :name="APP_ICON" />
          <q-toolbar-title class="text-weight-medium">OneZip Campañas</q-toolbar-title>
        </q-toolbar>
        <q-separator />
        <q-item-section>
          <q-item-label header class="text-subtitle2">Navegación</q-item-label>
        </q-item-section>
        <EssentialLink
          v-for="link in MAIN_NAVIGATION"
          :key="link.title"
          v-bind="link"
          :active="currentRoute.path === link.link"
        />
        <q-separator />
        <q-item-section class="text-center">
          <q-item-label caption class="q-mt-md">
            © {{ currentYear }} OneZip Campañas
          </q-item-label>
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
import EssentialLink from 'components/dashboard/EssentialLink.vue';
import { useNavigationStore } from '../stores/navigation';
import { MAIN_NAVIGATION, APP_ICON } from '../constants/navigation';

// Composables
const navigationStore = useNavigationStore();
const currentRoute = useRoute();

// Computed
const currentYear = computed(() => new Date().getFullYear());
const currentPageTitle = computed(() => {
  const currentLink = MAIN_NAVIGATION.find((link) => link.link === currentRoute.path);
  return currentLink?.title || 'Panel de Control';
});
</script>
