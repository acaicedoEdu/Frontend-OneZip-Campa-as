<template>
  <div class="row q-col-gutter-xl">
    <div class="col-12 col-lg-7">
      <div style="border-radius: 12px; border: 1px solid #0000001f" class="q-pa-md q-mb-md">
        <div class="row items-center q-mb-md q-gutter-sm">
          <div class="text-h6">Personalización de Variables</div>
        </div>
        <div v-if="templateHasVariables">
          <q-banner inline-actions rounded class="bg-blue-1 text-blue-8">
            <q-icon name="fa-solid fa-circle-info" class="q-mr-sm" />
            Las variables se aplicarán automáticamente si en sus contactos individuales o grupos,
            tienen campos personalizados.
          </q-banner>

          <div class="q-mt-lg">
            <div
              v-for="variable in selectedTemplate.variables"
              :key="variable.name"
              class="q-mb-md"
            >
              <div class="text-caption text-grey-8">
                Variable {{ variable.tag }} - {{ variable.name }}
              </div>
              <q-input
                outlined
                dense
                v-model="variableValues[variable.name]"
                :placeholder="`Valor por defecto para ${variable.name}`"
              />
            </div>
          </div>
        </div>
        <div v-else class="q-mt-lg">
          <q-banner rounded class="bg-green-1 text-green-8">
            <template v-slot:avatar>
              <q-icon name="check_circle" />
            </template>
            ¡Perfecto! Esta plantilla no tiene variables para personalizar. Puedes continuar al
            siguiente paso.
          </q-banner>
        </div>
      </div>

      <div style="border-radius: 12px; border: 1px solid #0000001f" class="q-pa-md">
        <div class="row items-center q-mb-md q-gutter-sm">
          <div>
            <div class="text-h6">Programación del Envío</div>
            <div class="text-grey-7">Configura cuándo se enviará tu mensaje</div>
          </div>
        </div>

        <q-card flat bordered>
          <q-card-section class="row items-center q-pa-sm">
            <q-icon name="task_alt" color="positive" size="md" class="q-mr-md" />
            <div class="col">
              <div class="text-weight-medium">Enviar inmediatamente</div>
              <div class="text-caption text-grey-7">
                El mensaje se enviará tan pronto como se active
              </div>
            </div>
            <q-toggle v-model="configuracionEnvioCampana.EnvioInmediato" color="green" size="lg" />
          </q-card-section>
        </q-card>

        <div v-if="!configuracionEnvioCampana.EnvioInmediato" class="row q-col-gutter-md q-mt-sm">
          <div class="col-12 col-sm-6">
            <q-input
              outlined
              dense
              mask="####-##-##"
              v-model="configuracionEnvioCampana.Fecha"
              label="Seleccionar fecha"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="configuracionEnvioCampana.Fecha" mask="YYYY-MM-DD">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Cerrar" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="col-12 col-sm-6">
            <q-input
              outlined
              dense
              mask="time"
              v-model="configuracionEnvioCampana.Hora"
              label="Hora"
              hint="Hora Militar"
            >
              <template v-slot:prepend>
                <q-icon name="schedule" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="configuracionEnvioCampana.Hora" mask="HH:mm" now-btn>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Cerrar" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 col-lg-5">
      <MostrarMensajePlantilla :nombre="selectedTemplate.nombre" :messageBody="previewMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref, watch } from 'vue';
import MostrarMensajePlantilla from 'src/components/plantilla/MostrarMensajePlantilla.vue';
import type { ConfiguracionEnvioCampanas } from 'src/types/configuracionEnvioCampanas';

interface Props {
  nombre: string;
  body: string;
  configuracionEnvioCampana: ConfiguracionEnvioCampanas;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:configuracionEnvioCampana']);

const selectedTemplate = reactive({
  nombre: props.nombre,
  body: props.body,
  variables: [
    { tag: '{{1}}', name: 'Nombre' },
    { tag: '{{2}}', name: 'Fecha' },
    { tag: '{{3}}', name: 'Hora' },
  ],
});

const variableValues = reactive({} as Record<string, string>);

const templateHasVariables = computed(() => selectedTemplate.variables.length > 0);

const configuracionEnvioCampana = ref(props.configuracionEnvioCampana);

const previewMessage = computed(() => {
  let message = selectedTemplate.body;
  if (!templateHasVariables.value) {
    return message;
  }

  for (const variable of selectedTemplate.variables) {
    const value = variableValues[variable.name] || `[${variable.name}]`;
    const regex = new RegExp(`\\[${variable.name}\\]`, 'g');
    if (message && message.includes(`[${variable.name}]`)) {
      message = message.replace(regex, value);
    }
  }
  return message;
});

watch(configuracionEnvioCampana, () => {
  emit('update:configuracionEnvioCampana', configuracionEnvioCampana.value);
});
</script>
