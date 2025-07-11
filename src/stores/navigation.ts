import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('navigation', () => {
  const isDrawerOpen: Ref<boolean> = ref(false);

  return {
    isDrawerOpen,
  };
});
