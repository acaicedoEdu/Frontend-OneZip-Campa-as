<template>
  <q-page>
    <div class="q-pa-md" style="width: 420px">
      <q-tabs
        v-model="tab"
        inline-label
        class="text-grey-8 custom-tabs"
        :active-color="tab === 'grupos' ? 'positive' : 'primary'"
        :active-bg-color="tab === 'grupos' ? 'green-1' : 'blue-1'"
        indicator-color="transparent"
        no-caps
        dense
        align="left"
        swipeable
      >
        <q-tab name="grupos" icon="fa-regular fa-folder-open" label="Grupos (4)" />
        <q-tab name="contactos" icon="fa-regular fa-user" label="Contactos Individuales (3)" />
      </q-tabs>
    </div>
    <q-tab-panels v-model="tab" animated swipeable>
      <q-tab-panel name="grupos">
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon name="fa-regular fa-folder-open" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Grupo 1</q-item-label>
              <q-item-label caption>Grupo 1</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
      <q-tab-panel name="contactos">
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon name="fa-regular fa-user" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Grupo 1</q-item-label>
              <q-item-label caption>Grupo 1</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('grupos');
</script>

<style scoped>
.custom-tabs {
  border: 1px solid #e0e0e0;
  border-radius: 11px;
  padding: 4px;
}

.q-tab {
  border-radius: 8px;
  margin: 0 2px;
  font-weight: 500;
}
</style>
