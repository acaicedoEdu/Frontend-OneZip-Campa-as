import { defineStore } from 'pinia';
import { axios } from 'boot/axios';
import type { Grupo } from 'src/types/grupo';
import { Notify } from 'quasar';

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
        const response = await axios.get('/grupo');
        let grupos: Grupo[] = [];
        grupos = response.data.Dato || [];
        this.grupos = grupos;
        this.lastFetch = Date.now();
      } catch (error) {
        Notify.create({
          message: 'Algo salió mal al obtener los grupos.',
          color: 'grey-9',
          position: 'bottom-right',
          timeout: 5000,
          icon: 'fa-solid fa-exclamation-triangle',
          actions: [
            {
              icon: 'fa-solid fa-xmark',
              color: 'white',
              round: true,
            },
          ],
        });
        console.error('Error al obtener los grupos:', error);
      } finally {
        this.loading = false;
      }
    },

    async addGrupo(newGrupoData: Omit<Grupo, 'id'>) {
      try {
        const response = await axios.post<Grupo>('/grupo', newGrupoData);
        this.grupos.push(response.data);
      } catch (error) {
        console.error('Error al crear el contacto:', error);
        throw error;
      }
    },
  },
});
