import { defineStore } from 'pinia';
import { axios } from 'boot/axios';
import type { Grupo } from 'src/types/grupo';
interface GrupoState {
  grupos: Grupo[];
  loading: boolean;
  lastFetch: number | null;
}

export const useGrupoStore = defineStore('grupos', {
  state: (): GrupoState => ({
    grupos: [],
    loading: false,
    lastFetch: null,
  }),

  getters: {
    getGrupoById: (state) => (id: number) => {
      return state.grupos.find((grupo) => grupo.IdGrupo === id);
    },
    hasData: (state) => state.grupos.length > 0,
  },

  actions: {
    async fetchGrupos(forceRefresh = false) {
      if (this.hasData && !forceRefresh) {
        console.log('Usando contactos cacheados.');
        return;
      }

      this.loading = true;
      try {
        const response = await axios.get<Grupo[]>('/grupos');
        this.grupos = response.data;
        this.lastFetch = Date.now();
        console.log('Contactos cargados desde la API.');
      } catch (error) {
        console.error('Error al obtener los contactos:', error);
      } finally {
        this.loading = false;
      }
    },

    async addGrupo(newGrupoData: Omit<Grupo, 'id'>) {
      try {
        const response = await axios.post<Grupo>('/grupos', newGrupoData);
        this.grupos.push(response.data);
      } catch (error) {
        console.error('Error al crear el contacto:', error);
        throw error;
      }
    },
  },
});
