<template>
  <q-item
    clickable
    v-ripple
    exact
    :active="active"
    :to="link"
    :class="{
      'verde-suave': active,
      'verde-texto': active,
      'text-weight-medium': active,
      'secondary-text': !active,
    }"
  >
    <q-item-section side :class="{ 'verde-texto': active }">
      <q-icon :name="icono" size="xs" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ titulo }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import type { LinkNavegacion } from '../../types/navegacion';

withDefaults(defineProps<LinkNavegacion & { active?: boolean }>(), {
  titulo: '',
  icono: '',
  link: '',
  active: false,
});
</script>
