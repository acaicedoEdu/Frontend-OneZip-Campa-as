import { defineStore } from 'pinia';
import { axios } from 'boot/axios';
import type { Plantilla } from 'src/types/plantilla';
import { showErrorNotification } from 'src/components/notificacion/notificacion';
import { useAplicacionStore } from './aplicacion.store';

interface PlantillaState {
  plantillas: Plantilla[];
  tamano: number;
  totalPaginas: number;
  pagina: number;
  loading: boolean;
  lastFetch: number | null;
}

export const usePlantillaStore = defineStore('plantillas', {
  state: (): PlantillaState => ({
    plantillas: [],
    tamano: 0,
    totalPaginas: 0,
    pagina: 0,
    loading: false,
    lastFetch: null,
  }),

  getters: {
    getPlantillaById:
      (state) =>
      (id: number): Plantilla | undefined => {
        return state.plantillas.find((plantilla) => plantilla.IdPlantilla === id);
      },
    hasData: (state) => state.plantillas.length > 0,
  },

  actions: {
    async fetchPlantillas(forceRefresh = false) {
      const now = Date.now();
      const cacheDuration = 5 * 60 * 1000;

      if (this.hasData && !forceRefresh && this.lastFetch && now - this.lastFetch < cacheDuration) {
        return;
      }

      this.loading = true;
      try {
        const response = await axios.get('/plantilla');
        const data = response.data;

        if (!data.IsExito) {
          showErrorNotification(data.Mensaje);
        }

        this.plantillas = data.Dato || [];
        this.tamano = data.Tamano;
        this.totalPaginas = data.TotalPaginas;
        this.pagina = data.Pagina;
        this.lastFetch = Date.now();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.Mensaje) {
          showErrorNotification(error.response.data.Mensaje);
        } else {
          showErrorNotification('Algo salió mal al obtener las plantillas.');
        }

        console.error('Error al obtener las plantillas:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchPlantillasXAplicacion(
      forceRefresh = false,
      pagina: number = 1,
      tamano: number = 10,
    ) {
      const now = Date.now();
      const cacheDuration = 5 * 60 * 1000;

      if (
        this.plantillas.length > 0 &&
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
          `/plantilla/aplicacion/${idAplicacion}?pagina=${pagina}&tamano=${tamano}`,
        );
        const data = response.data;

        if (!data.IsExito) {
          showErrorNotification(data.Mensaje);
        }

        this.plantillas = data.Dato || [];
        this.tamano = data.Tamano;
        this.totalPaginas = data.TotalPaginas;
        this.pagina = data.Pagina;
        this.lastFetch = Date.now();
      } catch (error) {
        showErrorNotification('Algo salió mal al obtener las plantillas.');
        console.error('Error obteniendo las plantillas:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
