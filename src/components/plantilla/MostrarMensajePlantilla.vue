<template>
  <q-card flat bordered style="border-radius: 12px">
    <q-card-section class="q-pb-sm row items-center justify-between">
      <div class="text-weight-medium text-h6 text-dark">
        {{ props.nombre }}:
        <span class="text-weight-regular text-subtitle1 text-green-5">Vista previa</span>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="whatsapp-container">
        <q-chat-message :text="[messageBody]" bg-color="white" text-color="black">
          <template v-slot:default>
            <div>
              <div v-if="headerText" class="text-weight-bold q-mb-sm">
                {{ headerText }}
              </div>

              <div class="message-body">
                <span v-for="(part, index) in messageParts" :key="index">
                  <span v-if="!part.isVariable">{{ part.text }}</span>
                  <span v-else class="text-blue-7">[ {{ part.text }} ]</span>
                </span>
              </div>

              <div v-if="footerText" class="text-caption text-grey-7 q-mt-xs">
                {{ footerText }}
              </div>
            </div>
          </template>
        </q-chat-message>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  nombre: String,
  headerText: String,
  messageBody: {
    type: String,
    required: true,
  },
  footerText: String,
});

const messageParts = computed(() => {
  const regex = /\[([^\]]+)\]/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(props.messageBody)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: props.messageBody.substring(lastIndex, match.index), isVariable: false });
    }
    parts.push({ text: match[1], isVariable: true });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < props.messageBody.length) {
    parts.push({ text: props.messageBody.substring(lastIndex), isVariable: false });
  }

  return parts;
});
</script>

<style scoped>
.whatsapp-container {
  background-color: #e5ddd5a2;
  padding: 16px;
  border-radius: 8px;
}
.message-body {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
