<template>
  <q-dialog v-model="dialog" persistent>
    <q-card style="width: 450px; max-width: 90vw; border-radius: 12px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">Añadir Contactos a Grupo</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="text-grey-9 q-mb-xs">Seleccionar Grupo</div>

        <q-select
          outlined
          rounded
          v-model="selectedGroup"
          :options="groupOptions"
          label="Elige un grupo"
        />

        <q-banner rounded inline-actions class="bg-green-1 text-green-8 q-mt-lg">
          <template v-slot:avatar>
            <q-icon name="o_info" color="green-8" />
          </template>
          {{ contactsToAdd }} contactos seleccionados para añadir
        </q-banner>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn flat label="Cancelar" color="grey-8" no-caps rounded v-close-popup />
        <q-btn
          unelevated
          icon="add"
          label="Añadir al Grupo"
          color="positive"
          no-caps
          rounded
          :disable="!selectedGroup || contactsToAdd === 0"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref(false);
const selectedGroup = ref(null);

const groupOptions = ref(['Clientes VIP', 'Madrid', 'Nuevos Clientes']);

const contactsToAdd = ref(3);
</script>
