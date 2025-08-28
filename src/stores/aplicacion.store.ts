import { defineStore } from 'pinia';
import { axios } from 'boot/axios';
import type { Aplicacion } from 'src/types/aplicacion';
import { showErrorNotification } from 'src/components/notificacion/notificacion';

interface AplicacionState {
  aplicaciones: Aplicacion[];
  IdAplicacionEscogida: number;
  loading: boolean;
  lastFetch: number | null;
}

export const useAplicacionStore = defineStore('aplicaciones', {
  state: (): AplicacionState => ({
    aplicaciones: [],
    IdAplicacionEscogida: 0,
    loading: false,
    lastFetch: null,
  }),

  getters: {
    getAplicacionById:
      (state) =>
      (id: number): Aplicacion | undefined => {
        return state.aplicaciones.find((app) => app.IdAplicacion === id);
      },
    hasData: (state) => state.aplicaciones.length > 0,
  },

  actions: {
    async fetchAplicaciones(forceRefresh = false) {
      const now = Date.now();
      const cacheDuration = 5 * 60 * 1000;

      if (this.hasData && !forceRefresh && this.lastFetch && now - this.lastFetch < cacheDuration) {
        return;
      }

      this.loading = true;
      try {
        const response = await axios.get('/Aplicacion');
        const data = response.data;
        if (!data.IsExito) {
          showErrorNotification(data.Mensaje);
        }

        this.aplicaciones = data.Dato || [];
        this.lastFetch = Date.now();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.Mensaje) {
          showErrorNotification(error.response.data.Mensaje);
        } else {
          showErrorNotification('Algo salió mal al obtener las aplicaciones.');
        }

        console.error('Error al obtener las aplicaciones:', error);
      } finally {
        this.loading = false;
      }
    },

    setIdAplicacionEscogida(id: number) {
      this.IdAplicacionEscogida = id;
    },
  },
});
