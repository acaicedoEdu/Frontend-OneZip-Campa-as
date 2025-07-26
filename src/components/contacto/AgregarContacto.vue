<template>
  <q-dialog
    :model-value="modelValue"
    @hide="resetForm"
    @before-hide="contactoStore.estadoAgregarContacto && contactoStore.toggleAgregarContacto()"
  >
    <q-card style="width: 500px; max-width: 90vw; border-radius: 12px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">Añadir Nuevo Contacto</div>
        <q-space />
        <q-btn icon="fa-solid fa-xmark" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pb-none">
        <div class="text-grey-9 q-mt-sm">Teléfono</div>
        <q-input
          outlined
          dense
          autofocus
          v-model="telefono"
          placeholder="Numero de Celular"
          mask="### ### ####"
          prefix="+57"
          no-error-icon
          :rules="[
            (val) => !!val || 'El numero es requerido',
            (val) => val.length === 12 || 'El numero debe tener 10 digitos',
          ]"
        />

        <div
          v-for="columna in camposPersonalizados"
          :key="columna.id || 0"
          class="row q-col-gutter-sm q-mb-sm items-center justify-center"
        >
          <div class="col">
            <q-input
              v-model="columna.nombre"
              outlined
              no-error-icon
              dense
              type="text"
              label="Nombre Columna"
              :rules="[(val) => !!val || 'El nombre es requerido']"
            />
          </div>

          <div class="col">
            <q-input
              v-model="columna.valor"
              outlined
              no-error-icon
              dense
              label="Valor"
              :rules="[(val) => !!val || 'El valor es requerido']"
            />
          </div>

          <div class="col-auto q-mb-md">
            <q-btn
              flat
              round
              dense
              color="negative"
              @click="eliminarCampoPersonalizado(columna.id || 0)"
            >
              <q-icon name="fa-solid fa-trash-can" size="15px" />
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="q-pa-md q-pt-none">
        <q-btn
          v-if="camposPersonalizados.length === 0"
          unelevated
          outline
          class="bg-white soft-text flex items-center justify-center"
          style="width: 150px"
          no-caps
          default
          @click="agregarCampoPersonalizado"
        >
          <q-icon name="fa-solid fa-plus" class="text-dark" size="13px" />
          <span class="text-weight-regular q-ml-sm text-dark">Agregar Atributo</span>
        </q-btn>
        <q-space />
        <q-btn flat label="Cancelar" color="grey-8" no-caps v-close-popup />
        <q-btn
          unelevated
          class="verde-principal text-white flex items-center justify-center"
          style="width: 150px"
          no-caps
          default
          :disable="!telefono || telefono.length !== 12"
          @click="agregarContacto"
        >
          <q-icon name="fa-solid fa-user-plus" size="13px" />
          <span class="text-weight-regular q-ml-sm">Crear Contacto</span>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, type ComputedRef, ref } from 'vue';
import { type CampoPersonalizadoContacto } from 'src/types/campopersonalizadocontacto';
import { type Contacto } from 'src/types/contacto';
import { useContactoStore } from 'src/stores/contacto.store';
import { useAplicacionStore } from 'src/stores/aplicacion.store';

const telefono = ref('');
const contactoStore = useContactoStore();
const IdAplicacion: ComputedRef<number> = computed(
  () => useAplicacionStore().IdAplicacionEscogida || 0,
);
const camposPersonalizados = ref<CampoPersonalizadoContacto[]>([]);

const props = defineProps<{
  idGrupo?: number;
}>();

if (props.idGrupo && props.idGrupo > 0) {
  camposPersonalizados.value =
    contactoStore.getContactoById(props.idGrupo)?.campoPersonalizado || [];
}

const modelValue = ref(computed(() => contactoStore.estadoAgregarContacto));

const agregarCampoPersonalizado = () => {
  const newRow: CampoPersonalizadoContacto = {
    id: Date.now(),
    nombre: '',
    valor: '',
  };
  camposPersonalizados.value.push(newRow);
};

const eliminarCampoPersonalizado = (columnaid: number) => {
  camposPersonalizados.value = camposPersonalizados.value.filter(
    (columna) => columna.id !== columnaid,
  );
};

const contacto: ComputedRef<Contacto> = computed(() => {
  return {
    telefono: telefono.value,
    campoPersonalizado: camposPersonalizados.value,
    idAplicacion: IdAplicacion.value,
    idGrupo: props.idGrupo || 0,
  };
});

const resetForm = () => {
  telefono.value = '';
  camposPersonalizados.value = [];
};

const agregarContacto = async () => {
  contactoStore.toggleAgregarContacto();
  await contactoStore.agregarContacto(contacto.value);
  resetForm();
};
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
