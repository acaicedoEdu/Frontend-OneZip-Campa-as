<template>
  <q-layout view="lHh Lpr lFf" class="main-background">
    <q-header class="main-background">
      <q-toolbar>
        <q-btn flat dense class="main-text" round icon="fa-solid fa-angle-left" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="main-text"> Panel de Control </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer :width="250" v-model="leftDrawerOpen" show-if-above class="main-background">
      <q-list dense>
        <q-toolbar>
          <q-icon size="30px" :name="iconOneZipCampanas" />
          <q-toolbar-title class="text-weight-medium">OneZip Campañas</q-toolbar-title>
        </q-toolbar>
        <q-separator />
        <q-item-section>
          <q-item-label header class="text-subtitle2">Navegación</q-item-label>
        </q-item-section>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
        <q-separator />
        <q-item-section class="text-center">
          <q-item-label caption class="q-mt-md"
            >© {{ new Date().getFullYear() }} OneZip Campañas</q-item-label
          >
        </q-item-section>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/dashboard/EssentialLink.vue';

const linksList: EssentialLinkProps[] = [
  {
    title: 'Panel de control',
    icon: 'fa-solid fa-chart-area',
    link: '/',
  },
  {
    title: 'Campañas',
    icon: 'fa-solid fa-rocket',
    link: '/campaigns',
  },
  {
    title: 'Plantillas',
    icon: 'fa-solid fa-file-invoice',
    link: '/templates',
  },
  {
    title: 'Contactos',
    icon: 'fa-solid fa-user-group',
    link: '/contacts',
  },
  {
    title: 'Configuración',
    icon: 'fa-solid fa-gear',
    link: '/settings',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const iconOneZipCampanas = `img:data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" color="rgb(22 163 74 / 1)"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
</script>
