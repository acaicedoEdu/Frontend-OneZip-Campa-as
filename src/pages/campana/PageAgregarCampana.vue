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
              :plantillasSeleccionada="plantillasSeleccionada"
              @update:plantillasSeleccionada="actualizarPlantillas"
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
            <PadreMostrarGrupo
              :componentePadre="'agregarCampana'"
              :contactoSeleccionado="contactoSeleccionado"
              @update:contactoSeleccionado="actualizarContactos"
            />
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
            <div>
              <div class="text-center q-mb-lg">
                <q-icon name="fa-solid fa-check-circle" color="positive" size="64px" />
                <div class="text-h5 text-weight-bold q-mt-sm">Resumen de la Campaña</div>
                <p class="text-grey-7">Revisa todos los detalles antes de lanzar</p>
              </div>

              <q-separator />

              <div class="row q-col-gutter-y-lg q-py-lg">
                <div class="col-12 col-sm-6">
                  <div class="text-caption text-grey-7">Nombre de la Campaña</div>
                  <div class="text-weight-bold">{{ modelNombreCampana }}</div>
                </div>
                <div class="col-12 col-sm-6">
                  <div class="text-caption text-grey-7">Plantilla</div>
                  <div class="text-weight-bold">{{ plantillasSeleccionada[0]?.Nombre }}</div>
                </div>

                <div class="col-12 col-sm-6">
                  <div class="text-caption text-grey-7">Total de Destinatarios</div>
                  <div class="text-positive text-weight-bold" style="font-size: 1.1rem">
                    {{
                      (obtenerContactosGrupo?.TotalContactos || 0) +
                      (contactoSeleccionado.contactosSeleccionados?.length || 0)
                    }}
                    contactos
                  </div>
                </div>
              </div>

              <q-separator />

              <div class="q-py-lg">
                <div class="text-caption text-grey-7">Destinatarios Seleccionados</div>

                <div class="q-mt-sm">
                  <div class="text-weight-medium q-mb-xs">
                    {{
                      contactoSeleccionado.idGrupo
                        ? 'Grupo '
                        : contactoSeleccionado.contactosSeleccionados &&
                            contactoSeleccionado.contactosSeleccionados?.length > 0
                          ? 'Contactos Individuales'
                          : ''
                    }}
                  </div>
                  <q-chip
                    v-if="contactoSeleccionado.idGrupo"
                    outline
                    color="primary"
                    :label="`${obtenerContactosGrupo?.Nombre} (${obtenerContactosGrupo?.TotalContactos})`"
                    class="q-mr-sm"
                  />
                  <q-chip
                    v-if="
                      contactoSeleccionado.contactosSeleccionados &&
                      contactoSeleccionado.contactosSeleccionados?.length > 0
                    "
                    outline
                    color="primary"
                    :label="`(${contactoSeleccionado.contactosSeleccionados?.length})`"
                  />
                </div>
              </div>

              <q-separator />

              <div class="q-py-lg">
                <div class="text-caption text-grey-7">
                  <MostrarMensajePlantilla
                    :nombre="plantillasSeleccionada[0]?.Nombre || ''"
                    :headerText="plantillasSeleccionada[0]?.Contenido.textoEncabezado || ''"
                    :messageBody="plantillasSeleccionada[0]?.Contenido.mensajePrincipal || ''"
                    :footerText="plantillasSeleccionada[0]?.Contenido.textoFooter || ''"
                  />
                </div>
              </div>
            </div>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation class="text-right">
              <q-btn
                v-if="step > 1"
                unelevated
                outline
                @click="step === 4 ? (step -= 2) : step--"
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
                :disable="disableBotonSiguiente"
                @click="step !== 2 ? step++ : (step += 2)"
              >
                <span class="text-white text-subtitle2">Siguiente</span>
                <q-icon name="fa-solid fa-angle-right text-white" class="q-ml-sm" size="13px" />
              </q-btn>
              <q-btn
                v-if="step === 4"
                unelevated
                no-caps
                class="verde-principal text-white"
                padding="8px 24px"
                @click="ejecutarCampana"
              >
                <q-icon name="fa-solid fa-rocket" size="13px" />
                <span class="text-white text-subtitle2 q-ml-sm">Lanzar Campaña</span>
              </q-btn>
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, type Ref, computed } from 'vue';
import MostrarPlantilla from 'src/components/plantilla/MostrarPlantilla.vue';
import PadreMostrarGrupo from 'src/components/grupo/PadreMostrarGrupo.vue';
import { type ContactosSeleccionados } from 'src/types/contactosSeleccionados';
import { type Plantilla } from 'src/types/plantilla';
import { useGrupoStore } from 'src/stores/grupo.store';
import MostrarMensajePlantilla from 'src/components/plantilla/MostrarMensajePlantilla.vue';
import { useAplicacionStore } from 'src/stores/aplicacion.store';
import { useCampanaStore } from 'src/stores/campana.store';
import { useRouter } from 'vue-router';

const grupoStore = useGrupoStore();
const aplicacionStore = useAplicacionStore();
const campanaStore = useCampanaStore();
const router = useRouter();

const step = ref(1);
const modelNombreCampana = ref('');
const plantillasSeleccionada: Ref<Plantilla[]> = ref([]);
const contactoSeleccionado: Ref<ContactosSeleccionados> = ref({});
const IdAplicacionEscogida = computed(() => aplicacionStore.IdAplicacionEscogida);

const actualizarPlantillas = (nuevasPlantillas: Plantilla[]) => {
  plantillasSeleccionada.value = nuevasPlantillas;
};

const actualizarContactos = (nuevosContactos: ContactosSeleccionados) => {
  contactoSeleccionado.value = nuevosContactos;
};

const disableBotonSiguiente = computed(() => {
  return step.value === 1 && (!modelNombreCampana.value || !plantillasSeleccionada.value.length);
});

const obtenerContactosGrupo = computed(() => {
  return contactoSeleccionado.value.idGrupo
    ? grupoStore.getGrupoById(contactoSeleccionado.value.idGrupo)
    : null;
});

const ejecutarCampana = async () => {
  let tipoEnvio: string;

  if (contactoSeleccionado.value.idGrupo && contactoSeleccionado.value.idGrupo > 0) {
    tipoEnvio = 'Masivo';
  } else {
    if (
      contactoSeleccionado.value.contactosSeleccionados &&
      contactoSeleccionado.value.contactosSeleccionados?.length == 1
    ) {
      tipoEnvio = 'Unico';
    } else {
      tipoEnvio = 'Masivo';
    }
  }

  const campanaEjecutar: object = {
    IdAplicacion: IdAplicacionEscogida.value,
    IdPlantilla: plantillasSeleccionada.value[0]?.idPlantilla || 0,
    IdGrupo: contactoSeleccionado.value.idGrupo,
    Contactos: contactoSeleccionado.value.contactosSeleccionados,
    TipoEnvio: tipoEnvio,
    Nombre: modelNombreCampana.value,
  };

  try {
    await router.push('/campana');
  } catch (error) {
    console.log('Error redirigiendo a campañas:', error);
  }

  await campanaStore.ejecutarCampana(campanaEjecutar);
};
</script>
