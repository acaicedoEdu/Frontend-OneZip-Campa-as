<template>
  <q-page>
    <div class="q-px-md q-pt-none">
      <div class="row items-center q-mb-md">
        <q-btn
          flat
          dense
          to="/plantilla"
          label="Volver a Plantillas"
          class="secondary-text text-weight-regular"
          no-caps
          icon="fa-solid fa-arrow-left"
        />
        <div class="text-h4 q-ml-lg text-weight-medium column">
          Nueva Plantilla:
          <span class="text-weight-regular text-subtitle1 text-grey-7"
            >Configura tu plantilla y espera a que sea aprobada</span
          >
        </div>
      </div>

      <q-stepper v-model="step" ref="stepper" color="primary" animated flat bordered header-nav>
        <q-step :name="1" title="Configurar Plantilla" icon="settings" :done="step > 1">
          <div class="row q-col-gutter-xl">
            <div class="col-12 col-lg-7">
              <div class="text-h6 q-mb-md">Configura tu plantilla</div>
              <p class="text-grey-7">
                Elige la categoría que mejor describa tu plantilla de mensaje. Después, selecciona
                el tipo de mensaje que quieres enviar.
              </p>

              <q-btn-toggle
                v-model="template.category"
                style="border: 1px solid #ccc"
                no-caps
                class="full-width"
                rounded
                unelevated
                toggle-color="grey-4"
                toggle-text-color="grey-9"
                color="white"
                text-color="grey-9"
                :options="[
                  { label: 'Marketing', value: 'Marketing', icon: 'campaign', class: 'full-width' },
                  {
                    label: 'Servicio',
                    value: 'Servicio',
                    icon: 'support_agent',
                    class: 'full-width',
                  },
                  {
                    label: 'Autenticación',
                    value: 'Autenticación',
                    icon: 'verified_user',
                    class: 'full-width',
                  },
                ]"
              />

              <q-separator class="q-my-lg" />

              <q-banner rounded class="bg-blue-1 text-blue-8">
                <template v-slot:avatar>
                  <q-icon name="info" />
                </template>
                Actualmente solo se permite la creación de plantillas predeterminadas (texto,
                multimedia y botones).
              </q-banner>
            </div>

            <div class="col-12 col-lg-5">
              <MostrarMensajePlantilla
                :nombre="`Plantilla ${template.category}`"
                :header-text="template.header"
                :message-body="template.body"
                :footer-text="template.footer"
              />

              <q-card flat bordered class="q-mt-md">
                <q-card-section>
                  <div class="text-weight-bold">Esta plantilla sirve para</div>
                  <p class="text-grey-8 q-mb-none">
                    Mensajes de bienvenida, promociones, ofertas, cupones, newsletters, anuncios
                  </p>
                </q-card-section>
                <q-separator />
                <q-card-section>
                  <div class="text-weight-bold">Áreas de la plantilla que puedes personalizar</div>
                  <p class="text-grey-8 q-mb-none">
                    Contenido multimedia, encabezado, cuerpo, pie de página, botón
                  </p>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-step>

        <q-step :name="2" title="Editar Plantilla" icon="edit" :done="step > 2"> </q-step>

        <q-step :name="3" title="Enviar a Revisión" icon="send"> </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation class="text-right q-pt-none">
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="step--"
              label="Anterior"
              class="q-mr-sm"
            />
            <q-btn
              @click="step++"
              color="positive"
              :label="step === 3 ? 'Finalizar' : 'Siguiente'"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import MostrarMensajePlantilla from 'src/components/plantilla/MostrarMensajePlantilla.vue';

const step = ref(1);

const template = reactive({
  category: 'Marketing',
  header: '¡Hola!',
  body: '¡Echa un vistazo a nuestros comestibles frescos ahora!',
  footer: '¡Este es un pie de página!',
  buttons: [],
});
</script>
