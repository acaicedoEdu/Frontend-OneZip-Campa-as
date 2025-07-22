import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

export const useNavegacionStore = defineStore('navegacion', () => {
  const isDrawerOpen: Ref<boolean> = ref(false);

  return {
    isDrawerOpen,
  };
});
