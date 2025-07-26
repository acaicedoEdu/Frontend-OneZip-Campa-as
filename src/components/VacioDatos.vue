<template>
  <div class="row flex-center q-pb-lg" style="background-color: #fdfdfd">
    <div class="text-center" style="max-width: 580px">
      <div class="q-mb-lg">
        <div class="row justify-center items-center q-gutter-md">
          <q-avatar size="64px" color="green-1" text-color="green-7" icon="fa-solid fa-folder-plus">
            <q-badge floating color="blue" rounded class="q-pa-sm">
              <q-icon name="fa-solid fa-user" size="10px" />
            </q-badge>
          </q-avatar>

          <div class="column q-gutter-y-sm">
            <q-avatar
              size="48px"
              color="purple-1"
              text-color="purple-7"
              icon="fa-solid fa-rocket"
            />
            <q-avatar
              size="48px"
              color="blue-1"
              text-color="blue-7"
              icon="fa-solid fa-file-invoice"
            />
          </div>

          <q-avatar size="64px" color="orange-1" text-color="orange-7" icon="fa-solid fa-message" />
        </div>
      </div>

      <div class="text-h4 text-weight-bold q-mb-lg">{{ datosVacioGrupo?.titulo }}</div>
      <p class="text-grey-8" style="font-size: 16px; line-height: 1.6">
        {{ datosVacioGrupo?.descripcion }}
      </p>

      <div class="q-mt-lg q-gutter-y-md">
        <div
          v-for="punto in datosVacioGrupo?.puntos"
          :key="punto.titulo"
          :class="`bg-${punto.color}-1`"
          class="row items-center q-pa-md text-left"
          style="border-radius: 12px"
        >
          <q-icon :name="punto.icono" :color="`${punto.color}-7`" size="md" class="q-mr-md" />
          <div>
            <div class="text-weight-bold text-grey-9">{{ punto.titulo }}</div>
            <div class="text-grey-8">{{ punto.descripcion }}</div>
          </div>
        </div>
      </div>

      <div class="q-mt-lg q-gutter-x-md">
        <q-btn
          v-for="boton in datosVacioGrupo?.botones"
          :key="boton.titulo"
          unelevated
          :outline="boton.color === 'white'"
          no-caps
          default
          :class="boton.color === 'white' ? 'bg-white soft-text' : 'verde-claro'"
          padding="10px 24px"
          @click="boton?.funcion?.()"
        >
          <q-icon :name="boton?.icono" size="15px" :class="boton.color === 'white' ? 'text-black' : 'text-white'"/>
          <span class="text-weight-bold q-ml-sm" :class="boton.color === 'white' ? 'text-black' : 'text-white'">{{ boton?.titulo }}</span>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VACIO_DATOS } from 'src/constants/vaciodatos';

const props = defineProps<{
  pagina: string;
}>();

const datosVacioGrupo = ref(VACIO_DATOS.find((d) => d.pagina === props.pagina));
</script>
