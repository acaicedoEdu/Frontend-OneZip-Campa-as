<template>
  <q-card flat bordered>
    <q-card-section class="q-pb-none">
      <div class="text-h6">Detalles de la Campaña</div>
    </q-card-section>
    <q-card-section>
      <q-list>
        <q-item
          v-for="detalle in obtenerDatosCardDetallesCampana().filter((d) =>
            d.valor.some((v) => v !== ''),
          )"
          :key="detalle.titulo"
        >
          <q-item-section>
            <q-item-label class="text-subtitle1 text-grey-7">{{ detalle.titulo }}:</q-item-label>
          </q-item-section>
          <q-item-section class="items-end">
            <q-item-label
              class="text-subtitle1 text-weight-medium"
              v-for="valor in detalle.valor"
              :key="valor"
              ><span>{{ valor }}</span></q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { obtenerDatosCardDetallesCampana } from 'src/composables/campana/cardDetallesCampana';
</script>
