<template>
  <div class="row q-col-gutter-xl">
    <div class="col-12 col-lg-7">
      <div class="text-h6 q-mb-md">Personalización de Variables</div>
      <q-banner inline-actions rounded class="bg-blue-1 text-blue-8">
        <q-icon name="fa-solid fa-circle-info" class="q-mr-sm" />
        Las variables se aplicarán automáticamente usando los campos de los contactos individuales.
        Para contactos de grupos, usa los valores por defecto aquí.
      </q-banner>

      <div v-if="templateHasVariables" class="q-mt-lg">
        <div v-for="variable in selectedTemplate.variables" :key="variable.name" class="q-mb-md">
          <div class="text-caption text-grey-8">
            Variable {{ variable.tag }} - {{ variable.name }}
          </div>
          <q-input
            outlined
            rounded
            v-model="variableValues[variable.name]"
            :placeholder="`Valor por defecto para ${variable.name}`"
          />
        </div>
      </div>

      <div v-else class="q-mt-lg">
        <q-banner rounded class="bg-green-1 text-green-8">
          <template v-slot:avatar>
            <q-icon name="o_check_circle" />
          </template>
          ¡Perfecto! Esta plantilla no tiene variables para personalizar. Puedes continuar al
          siguiente paso.
        </q-banner>
      </div>

      <q-separator class="q-my-xl" />

      <div>
        <div class="text-h6 q-mb-md">Programación del Envío</div>
        <div class="row q-col-gutter-md align-center justify-between">
          <q-checkbox v-model="schedule.sendImmediately" label="Enviar inmediatamente" />

          <div v-if="!schedule.sendImmediately" class="q-pa-none">
            <q-input filled v-model="schedule.date" mask="####-##-## ##:##">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="schedule.date" mask="YYYY-MM-DD HH:mm">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="schedule.date" mask="YYYY-MM-DD HH:mm" format24h>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
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
import { reactive, computed } from 'vue';
// Reutilizamos nuestro fiel componente de vista previa
import MostrarMensajePlantilla from 'src/components/plantilla/MostrarMensajePlantilla.vue';

// --- DATOS (Esto vendría del estado de tu stepper) ---

// Simulamos la plantilla que el usuario seleccionó en el Paso 1
const selectedTemplate = reactive({
  nombre: 'Plantilla de Cita',
  body: 'Hola [Nombre], te recordamos tu cita para el [Fecha] a las [Hora]. ¡Te esperamos!',
  // Un array con las variables detectadas en la plantilla
  variables: [
    { tag: '{{1}}', name: 'Nombre' },
    { tag: '{{2}}', name: 'Fecha' },
    { tag: '{{3}}', name: 'Hora' },
  ],
  // Para probar el caso sin variables, usa esto en su lugar:
  // body: '¡Gran promoción de Black Friday! No te la pierdas.',
  // variables: []
});

// Objeto reactivo que almacenará los valores que el usuario ingrese
const variableValues = reactive({} as Record<string, string>);
// const sendImmediately = ref(true);

// --- LÓGICA DE LA VISTA PREVIA ---

// Propiedad computada para saber si hay variables o no
const templateHasVariables = computed(() => selectedTemplate.variables.length > 0);

const fechaActual = computed(() => new Date().toISOString().split('T')[0]);

const schedule = reactive({
  sendImmediately: true,
  date: `${fechaActual.value} 00:00`,
});

// ✨ La Magia de la Vista Previa Dinámica ✨
const previewMessage = computed(() => {
  let message = selectedTemplate.body;
  if (!templateHasVariables.value) {
    return message; // Si no hay variables, devuelve el texto original
  }

  // Si hay variables, recorremos cada una...
  for (const variable of selectedTemplate.variables) {
    // Obtenemos el valor que el usuario ha escrito. Si está vacío, usamos el placeholder original.
    const value = variableValues[variable.name] || `[${variable.name}]`;
    // Creamos una expresión regular para encontrar y reemplazar el placeholder en el texto
    const regex = new RegExp(`\\[${variable.name}\\]`, 'g');
    message = message.replace(regex, value);
  }
  return message;
});
</script>

<!-- <template>
  <div class="row q-col-gutter-xl">
    <div class="col-12 col-lg-7">
      <div class="text-h6 q-mb-md">Personalización de Variables</div>
      <div v-if="templateHasVariables" class="q-mt-lg"></div>
      <div v-else class="q-mt-lg"></div>

      <q-separator class="q-my-xl" />

      <div>
        <div class="text-h6 q-mb-md">Programación del Envío</div>
        <q-checkbox v-model="schedule.sendImmediately" label="Enviar inmediatamente" />

        <div v-if="!schedule.sendImmediately" class="row q-col-gutter-md q-mt-sm">
          <div class="col-12 col-sm-6">
            <q-input outlined rounded readonly v-model="schedule.date" label="Seleccionar fecha">
              <template v-slot:prepend>
                <q-icon name="o_event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="schedule.date" mask="YYYY-MM-DD">
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
            <q-input outlined rounded readonly v-model="schedule.time" label="Hora">
              <template v-slot:prepend>
                <q-icon name="o_schedule" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="schedule.time" mask="HH:mm" format24h>
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
      <WhatsAppPreview :message-body="previewMessage" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import WhatsAppPreview from 'src/components/WhatsAppPreview.vue';

// ... (toda la lógica de variables y vista previa se mantiene igual) ...
const selectedTemplate = reactive({
  /* ... */
});
const variableValues = reactive({});
const previewMessage = computed(() => {
  /* ... */
});
const templateHasVariables = computed(() => selectedTemplate.variables.length > 0);

// --- NOVEDAD: Objeto reactivo para la programación ---
const schedule = reactive({
  sendImmediately: true,
  date: '',
  time: '',
});
</script> -->
