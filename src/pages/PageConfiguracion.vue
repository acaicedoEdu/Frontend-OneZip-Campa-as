<template>
  <q-page class="q-px-md">
    <div class="row">
      <q-tabs
        v-model="tab"
        align="left"
        class="text-grey-7"
        active-color="primary"
        active-bg-color="blue-1"
        indicator-color="primary"
        no-caps
        style="flex: 1"
        inline-label
      >
        <q-tab
          name="whatsapp"
          icon="fa-brands fa-whatsapp"
          label="WhatsApp Business"
          style="border-radius: 8px; flex: 1"
        />
        <q-tab
          name="company"
          icon="fa-solid fa-building"
          label="Datos de la Empresa"
          style="border-radius: 8px; flex: 1"
        />
        <q-tab
          name="users"
          icon="fa-solid fa-users"
          label="Gestión de Usuarios"
          style="border-radius: 8px; flex: 1"
        />
      </q-tabs>
    </div>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="whatsapp">
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
                  <div class="text-weight-bold">{{ account.name }}</div>
                  <div class="row items-center q-gutter-sm q-my-sm">
                    <span class="text-grey-8">{{ account.phone }}</span>
                    <q-chip
                      v-for="status in account.statuses"
                      :key="status.label"
                      square
                      dense
                      :color="status.color"
                      text-color="white"
                      :label="status.label"
                    />
                  </div>
                  <div class="text-caption text-grey-7">Token de API</div>
                  <q-input dense outlined readonly :model-value="account.token" type="password" />
                  <div class="text-caption text-grey-7 q-mt-sm">
                    Conectada el: {{ account.connectedDate }}
                  </div>

                  <div class="q-mt-md q-gutter-sm">
                    <q-btn
                      flat
                      dense
                      no-caps
                      icon="fa-solid fa-gear"
                      label="Configurar"
                      color="primary"
                    />
                    <q-btn
                      flat
                      dense
                      no-caps
                      icon="fa-solid fa-eye"
                      label="Ver en Meta"
                      color="primary"
                    />
                    <q-btn
                      v-if="!account.isActive"
                      flat
                      dense
                      no-caps
                      icon="fa-solid fa-trash"
                      label="Eliminar"
                      color="negative"
                    />
                  </div>
                </div>

                <div class="col-12 col-md-7">
                  <div class="row items-center justify-between">
                    <div class="text-weight-bold">URL de Webhook</div>
                    <q-toggle v-model="account.webhook.active" />
                  </div>
                  <q-input
                    dense
                    outlined
                    :disable="!account.webhook.active"
                    :model-value="account.webhook.active ? account.webhook.url : 'No configurado'"
                  >
                    <template v-slot:prepend>
                      <q-icon name="fa-solid fa-eye" />
                    </template>
                  </q-input>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <q-card flat bordered>
          <q-card-section class="text-center q-pa-lg">
            <q-icon name="fa-solid fa-phone-android" size="xl" color="grey-6" />
            <div class="text-h6 q-mt-sm">¿Necesitas otra cuenta?</div>
            <p class="text-grey-7">
              Conecta múltiples números de WhatsApp Business para diferentes sucursales o
              departamentos
            </p>
            <q-btn
              unelevated
              color="positive"
              icon="fa-brands fa-whatsapp"
              label="Obtener en Meta Business"
              no-caps
              rounded
            />
          </q-card-section>
        </q-card>
      </q-tab-panel>

      <q-tab-panel name="company"> ... </q-tab-panel>
    </q-tab-panels>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn rounded icon="fa-solid fa-save" color="dark" label="Guardar Cambios" />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('whatsapp');

// Datos de ejemplo
const accounts = ref([
  {
    name: 'Mi Empresa Principal',
    phone: '+34 600 123 456',
    statuses: [
      { label: 'Conectada', color: 'positive' },
      { label: 'Verificada', color: 'grey-6' },
    ],
    token: '•••••••••••••••••••••',
    connectedDate: '2024-01-10',
    isActive: true,
    webhook: {
      active: true,
      url: 'https://midominio.com/webhook',
    },
  },
  {
    name: 'Sucursal Madrid',
    phone: '+34 600 234 567',
    statuses: [
      { label: 'Desconectada', color: 'orange' },
      { label: 'Pendiente', color: 'red-5' },
    ],
    token: '•••••••••••••••••••••',
    connectedDate: 'N/A',
    isActive: false,
    webhook: {
      active: false,
      url: '',
    },
  },
]);
</script>
