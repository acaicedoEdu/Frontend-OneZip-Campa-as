<template>
  <q-item clickable v-ripple exact active-class="hover-background text-black" :to="link" class="secondary-text">
    <q-item-section v-if="icon" side>
      <q-icon :name="icon" size="xs" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string;
  link?: string;
  icon?: string;
}

withDefaults(defineProps<EssentialLinkProps>(), {
  link: '/',
  icon: '',
});
</script>
