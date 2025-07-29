<template>
  <q-layout view="lHh Lpr lFf" class="main-background">
    <q-header class="main-background">
      <div class="row items-center justify-between q-pa-md">
        <div class="column items-start justify-center">
          <span class="main-text text-h4 text-weight-medium">
            {{ tituloActual }}
          </span>
          <span class="text-subtitle1 secondary-text q-pl-sm">{{ descripcionActual }}</span>
        </div>
        <div class="row items-center justify-center">
          <div v-for="boton in botonesActual" :key="boton.titulo">
            <div>
              <q-btn
                v-if="!boton.opciones"
                class="flex items-center justify-center"
                :class="boton.principal ? 'verde-principal q-ml-sm' : 'boton-importar'"
                unelevated
                :outline="!boton.principal"
                no-caps
                :to="boton.link"
                default
                @click="!boton.principal ? (importDialog = true) : null"
              >
                <q-icon
                  :name="boton.icono"
                  size="13px"
                  :class="boton.principal ? '' : 'secondary-text'"
                />
                <span
                  class="text-weight-regular q-ml-sm"
                  :class="boton.principal ? '' : 'secondary-text'"
                  >{{ boton.titulo }}</span
                >
              </q-btn>

              <q-btn-dropdown
                v-else
                class="flex items-center justify-center verde-principal q-ml-sm"
                unelevated
                no-caps
                default
                :label="boton.titulo"
                :dropdown-icon="boton.icono"
                content-class="shadow-1"
                :menu-offset="[0, 10]"
              >
                <q-list dense>
                  <q-item
                    v-for="opcion in boton.opciones"
                    :key="opcion.titulo"
                    clickable
                    v-close-popup
                    @click="
                      opcion.titulo === 'Nuevo Grupo'
                        ? useGrupoStore().toggleAgregarGrupo()
                        : (addContactDialog = true)
                    "
                  >
                    <q-item-section side>
                      <q-icon :name="opcion.icono" size="13px" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ opcion.titulo }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </div>
        </div>
      </div>
    </q-header>

    <q-drawer v-model="navigationStore" :width="242" show-if-above class="main-background">
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

  <ImportarContactos v-model="importDialog" />
  <AgregarGrupo />
  <AgregarContacto v-model="addContactDialog" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import NavegacionPrincipal from 'components/principal/NavegacionPrincipal.vue';
import { NAVEGACION_PRINCIPAL, ICONO_APON } from '../constants/navegacion';
import ImportarContactos from 'src/components/contacto/ImportarContactos.vue';
import AgregarGrupo from 'src/components/grupo/AgregarGrupo.vue';
import AgregarContacto from 'src/components/contacto/AgregarContacto.vue';
import { useGrupoStore } from 'src/stores/grupo.store';
// import { useContactoStore } from 'src/stores/contacto.store';
// import { useAplicacionStore } from 'src/stores/aplicacion.store';

const navigationStore = ref(true);
const importDialog = ref(false);
const addContactDialog = ref(false);
const rutaActual = useRoute();

const anoActual = computed(() => new Date().getFullYear());
const navegacionActual = computed(() => {
  return NAVEGACION_PRINCIPAL.find((link) => link.link === rutaActual.path);
});

const tituloActual = computed(() => {
  return navegacionActual.value?.titulo;
});

const descripcionActual = computed(() => {
  return navegacionActual.value?.descripcion;
});

const botonesActual = computed(() => {
  return navegacionActual.value?.botones;
});
</script>

<style>
.boton-importar {
  background-color: white !important;
  color: #e5e7eb !important;
}
.boton-importar:hover {
  background-color: #f4f4f5 !important;
}
</style>
