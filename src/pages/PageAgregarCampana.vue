<template>
  <q-page>
    <div class="q-px-md q-pt-none">
      <div class="row items-center q-mb-md">
        <q-btn
          flat
          dense
          to="/campana"
          label="Volver a Campañas"
          class="secondary-text text-weight-regular"
          no-caps
          icon="fa-solid fa-arrow-left"
        />
        <div class="text-h4 q-ml-lg text-weight-medium column">
          Nueva Campaña:
          <span class="text-weight-regular text-subtitle1 text-grey-7">Configuración y Envio</span>
        </div>
      </div>

      <q-card flat bordered>
        <q-stepper v-model="step" header-nav ref="stepper" active-color="green-8" animated flat>
          <q-step
            :name="1"
            title="Plantilla"
            icon="fa-solid fa-file-invoice"
            done-icon="fa-solid fa-check"
            error-icon="fa-solid fa-file-invoice"
            active-icon="fa-solid fa-file-invoice"
            :done="step > 1"
            :disable="step < 1"
          >
            <span class="text-subtitle2">Nombre de la Campaña</span>
            <q-input
              outlined
              v-model="modelNombreCampana"
              class="q-mt-sm q-mb-lg"
              placeholder="Ej: Anuncio Promocional"
              dense
            />
            <div class="q-mt-lg row items-center justify-between">
              <span class="text-subtitle2">Seleccionar Plantilla</span>
              <q-btn
                unelevated
                outline
                padding="8px 24px"
                class="q-mr-sm bg-white soft-text"
                no-caps
              >
                <q-icon name="fa-solid fa-plus text-dark" size="13px" />
                <span class="q-ml-sm text-dark text-subtitle2">Nueva Plantilla</span>
              </q-btn>
            </div>
            <MostrarPlantilla
              class="q-mt-lg"
                header-text="Recordatorio"
                message-body="Hola [Nombre], te recordamos tu cita para el [Fecha] a las [Hora]. ¡Te esperamos!"
                footer-text="Gracias por tu confianza"
            />
          </q-step>

          <q-step
            :name="2"
            title="Destinatarios"
            icon="fa-solid fa-user-group"
            done-icon="fa-solid fa-check"
            error-icon="fa-solid fa-user-group"
            active-icon="fa-solid fa-user-group"
            :done="step > 2"
            :disable="step < 2"
          >
            <div class="text-h6 q-mb-md">Nueva Campaña: Selección de Destinatarios</div>
          </q-step>

          <q-step
            :name="3"
            title="Variables"
            icon="fa-solid fa-bars-progress"
            done-icon="fa-solid fa-check"
            error-icon="fa-solid fa-bars-progress"
            active-icon="fa-solid fa-bars-progress"
            :done="step > 3"
            :disable="step < 3"
          >
            <div class="text-h6 q-mb-md">Nueva Campaña: Variables y Programación</div>
          </q-step>

          <q-step
            :name="4"
            title="Confirmar"
            icon="fa-solid fa-check"
            done-icon="fa-solid fa-check"
            error-icon="fa-solid fa-check"
            active-icon="fa-solid fa-check"
            :done="step > 4"
            :disable="step < 4"
          >
            <div class="text-h6 q-mb-md">Resumen de la Campaña</div>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation class="text-right">
              <q-btn
                v-if="step > 1"
                unelevated
                outline
                @click="step--"
                padding="8px 24px"
                class="q-mr-sm bg-white soft-text"
                no-caps
              >
                <q-icon name="fa-solid fa-angle-left text-dark" size="13px" />
                <span class="q-ml-sm text-dark text-subtitle2">Anterior</span>
              </q-btn>
              <q-btn
                v-if="step < 4"
                unelevated
                no-caps
                class="verde-principal text-white"
                padding="8px 24px"
                @click="step++"
              >
                <span class="text-white text-subtitle2">Siguiente</span>
                <q-icon name="fa-solid fa-angle-right text-white" class="q-ml-sm" size="13px" />
              </q-btn>
              <q-btn
                v-if="step === 4"
                @click="launchCampaign"
                color="green-1"
                icon="fa-solid fa-rocket"
                label="Lanzar Campaña"
                no-caps
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MostrarPlantilla from 'src/components/plantilla/MostrarPlantilla.vue';

const step = ref(1);
const modelNombreCampana = ref('');

function launchCampaign() {
  console.log('Lanzando campaña...');
}
</script>
