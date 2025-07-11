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
      <q-icon :name="icon" size="xs" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import type { NavigationLink } from '../../types/navigation';

 withDefaults(defineProps<NavigationLink & { active?: boolean }>(), {
  title: '',
  icon: '',
  link: '',
  active: false,
});
</script>
