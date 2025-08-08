<template>
  <div class="row items-center justify-between q-mb-md">
    <div>
      <div class="text-h6">Cuentas de WhatsApp Business</div>
      <div class="text-grey-7">Gestiona tus cuentas de WhatsApp Business API conectadas</div>
    </div>
  </div>

  <div v-for="account in accounts" :key="account.name" class="q-mb-lg">
    <q-card flat bordered>
      <q-card-section>
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-5">
            <div class="text-weight-bold text-h6">{{ account.name }}</div>
            <div class="row items-center q-gutter-sm q-my-sm">
              <span class="text-grey-8">{{ account.phone }}</span>
              <q-chip
                v-for="status in account.statuses"
                :key="status.label"
                square
                dense
                :color="`${status.color}-1`"
                :text-color="`${status.color}-8`"
                :label="status.label"
              />
            </div>
            <div class="text-caption text-grey-7">Token de API</div>
            <q-input dense outlined readonly :model-value="account.token" type="password" />
            <div class="text-caption text-grey-7 q-mt-sm">
              Conectada el: {{ account.connectedDate }}
            </div>
            <q-btn flat dense no-caps icon="fa-solid fa-eye" label="Ver en Meta" color="primary" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Datos de ejemplo
const accounts = ref([
  {
    name: 'Mi Empresa Principal',
    phone: '+34 600 123 456',
    statuses: [{ label: 'Conectada', color: 'green' }],
    token: '•••••••••••••••••••••',
    connectedDate: '2024-01-10',
    isActive: true,
  },
]);
</script>
