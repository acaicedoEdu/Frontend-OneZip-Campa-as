<template>
  <q-page class="q-px-md q-pt-none">
    <div class="row flex-center">
      <span>No existe el grupo</span>
    </div>
    <div>
      <div class="row items-center justify-between q-mb-md">
        <div class="row items-center">
          <q-btn
            flat
            dense
            to="/grupo"
            label="Volver a Grupos"
            class="secondary-text text-weight-regular"
            no-caps
            icon="fa-solid fa-arrow-left"
          />
          <div class="column item-start justify-center q-ml-sm">
            <div class="text-h4 text-weight-bold row q-gutter-sm">
              <span>Grupo</span>
            </div>
            <div class="text-grey-7">Grupo 3</div>
          </div>
        </div>
        <div class="q-gutter-x-sm row items-center justify-between">
          <q-btn unelevated no-caps padding="8px 16px" class="verde-principal text-white">
            <q-icon name="fa-solid fa-user-plus" size="13px" />
            <span class="text-subtitle2 text-white q-ml-md">Nuevo Contacto</span>
          </q-btn>
        </div>
      </div>
      <MostrarContacto :componentePadre="'PageMostrarIdGrupo'" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import MostrarContacto from 'src/components/contacto/MostrarContacto.vue';
</script>
