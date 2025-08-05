import { defineStore } from 'pinia';
import { axios } from 'boot/axios';
import type { Grupo } from 'src/types/grupo';
import { showErrorNotification } from 'src/components/notificacion/notificacion';
import { useAplicacionStore } from './aplicacion.store';

interface GrupoState {
  grupos: Grupo[];
  estadoAgregarGrupo: boolean;
  tamano: number;
  totalPaginas: number;
  pagina: number;
  loading: boolean;
  lastFetch: number | null;
}

export const useGrupoStore = defineStore('grupos', {
  state: (): GrupoState => ({
    grupos: [],
    estadoAgregarGrupo: false,
    tamano: 0,
    totalPaginas: 0,
    pagina: 0,
    loading: false,
    lastFetch: null,
  }),

  getters: {
    getGrupoById:
      (state) =>
      (id: number): Grupo | undefined => {
        return state.grupos.find((grupo) => grupo.IdGrupo === id);
      },
    hasData: (state) => state.grupos.length > 0,
  },

  actions: {
    async fetchGrupos(forceRefresh = false) {
      const now = Date.now();
      const cacheDuration = 5 * 60 * 1000;

      if (this.hasData && !forceRefresh && this.lastFetch && now - this.lastFetch < cacheDuration) {
        return;
      }

      this.loading = true;
      try {
        const response = await axios.get('/grupo');
        const data = response.data;

        if (!data.IsExito) {
          showErrorNotification(data.Mensaje);
        }

        this.grupos = data.Dato || [];
        this.tamano = data.Tamano;
        this.totalPaginas = data.TotalPaginas;
        this.pagina = data.Pagina;
        this.lastFetch = Date.now();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.Mensaje) {
          showErrorNotification(error.response.data.Mensaje);
        } else {
          showErrorNotification('Algo salió mal al obtener los grupos.');
        }

        console.error('Error al obtener los grupos:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchGruposXAplicacion(forceRefresh = false, pagina: number = 1, tamano: number = 10) {
      const now = Date.now();
      const cacheDuration = 5 * 60 * 1000;

      if (
        this.grupos.length > 0 &&
        !forceRefresh &&
        this.lastFetch &&
        now - this.lastFetch < cacheDuration
      ) {
        return;
      }
      const idAplicacion = useAplicacionStore().IdAplicacionEscogida;
      this.loading = true;
      try {
        const response = await axios.get(
          `/grupo/aplicacion/${idAplicacion}?pagina=${pagina}&tamano=${tamano}`,
        );
        const data = response.data;

        if (!data.IsExito) {
          showErrorNotification(data.Mensaje);
        }

        this.grupos = data.Dato || [];
        this.tamano = data.Tamano;
        this.totalPaginas = data.TotalPaginas;
        this.pagina = data.Pagina;
        this.lastFetch = Date.now();
      } catch (error) {
        showErrorNotification('Algo salió mal al obtener los grupos.');
        console.error('Error obteniendo los grupos:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchGrupoById(id: number): Promise<Grupo | null> {
      const grupoLocal = this.getGrupoById(id);
      if (grupoLocal) {
        return grupoLocal;
      }

      this.loading = true;
      try {
        const response = await axios.get(`/grupo/${id}`);
        const data = response.data;

        if (!data.IsExito) {
          showErrorNotification(data.Mensaje);
          return null;
        }

        const fetchedGrupo = data.Dato as Grupo;
        if (fetchedGrupo && !this.getGrupoById(fetchedGrupo.IdGrupo!)) {
          this.grupos.push(fetchedGrupo);
        }

        return fetchedGrupo;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.Mensaje) {
          showErrorNotification(error.response.data.Mensaje);
        } else {
          showErrorNotification('Algo salió mal al obtener el grupo.');
        }

        console.error('Error al obtener el grupo:', error);
        return null;
      } finally {
        this.loading = false;
      }
    },

    async addGrupo(newGrupoData: Grupo) {
      const tempId = -Date.now();
      const tempGrupo = { ...newGrupoData, IdGrupo: tempId };
      this.grupos.unshift(tempGrupo);
      try {
        const response = await axios.post('/grupo', newGrupoData);
        const data = response.data;
        if (!data.IsExito) {
          showErrorNotification(data.Mensaje);
          this.grupos = this.grupos.filter((g) => g.IdGrupo !== tempId);
        } else {
          const savedGrupo = data.Dato as Grupo;
          const index = this.grupos.findIndex((g) => g.IdGrupo === tempId);
          if (index !== -1) {
            this.grupos.splice(index, 1);
            this.grupos.unshift(savedGrupo);
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.Mensaje) {
          showErrorNotification(error.response.data.Mensaje);
        } else {
          showErrorNotification('Algo salió mal al crear el grupo.');
        }

        console.error('Error al crear el grupo:', error);
        this.grupos = this.grupos.filter((g) => g.IdGrupo !== tempId);
      }
    },

    setGrupo(actualizarGrupo: Grupo) {
      const index = this.grupos.findIndex((g) => g.IdGrupo === actualizarGrupo.IdGrupo);
      if (index !== -1) {
        this.grupos[index] = actualizarGrupo;
      }
    },

    toggleAgregarGrupo() {
      this.estadoAgregarGrupo = !this.estadoAgregarGrupo;
    },
  },
});
