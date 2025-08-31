<template>
  <div class="row q-col-gutter-lg">
    <div v-for="stat in stats" :key="stat.titulo" class="col-12 col-sm-6 col-md-3">
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-start justify-between">
            <div class="text-grey-8">{{ stat.titulo }}</div>
            <q-avatar
              :icon="stat.icono"
              :color="`${stat.color}-1`"
              :text-color="`${stat.color}-7`"
              size="md"
            />
          </div>
          <NumberFlow
            class="text-h4 text-weight-bold q-mt-sm"
            :value="stat.valor"
            :duration="1000"
          />
          <div
            v-if="!stat.totalDestinatarios"
            :class="
              !stat.signoCambio
                ? `text-${stat.color}`
                : stat.signoCambio === '+'
                  ? 'text-positive'
                  : 'text-negative'
            "
          >
            {{ stat.signoCambio }}
            <NumberFlow
              locales="es-ES"
              :value="stat.cambio"
              :format="{
                style: stat.estiloCambio === 'percent' ? 'percent' : 'decimal',
                maximumFractionDigits: 0,
                notation: 'standard',
              }"
              :duration="1000"
            />
            {{ stat.labelCambio || 'desde ayer' }}
          </div>
          <div v-else>
            <span
              v-if="stat.totalDestinatarios"
              class="text-grey-7 text-weight-regular text-subtitle2"
              >de {{ stat.totalDestinatarios }} destinatarios</span
            >
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import NumberFlow from '@number-flow/vue';
import { type CardEstadisticas } from 'src/types/cardEstadisticas';

defineProps<{
  stats: CardEstadisticas[];
  componentePadre: string;
}>();
</script>
