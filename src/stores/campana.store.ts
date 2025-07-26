import { defineStore } from 'pinia';
import { axios } from 'boot/axios';
import type { Campana } from 'src/types/campana';
import { showErrorNotification } from 'src/components/notificacion/notificacion';

interface CampanaState {
  campanas: Campana[];
  campanasXAplicacion: Campana[];
  tamano: number;
  totalPaginas: number;
  pagina: number;
  loading: boolean;
  lastFetch: number | null;
}

export const useCampanaStore = defineStore('campanas', {
  state: (): CampanaState => ({
    campanas: [],
    campanasXAplicacion: [],
    tamano: 0,
    totalPaginas: 0,
    pagina: 0,
    loading: false,
    lastFetch: null,
  }),

  getters: {
    getCampanaById:
      (state) =>
      (id: number): Campana | undefined => {
        return state.campanas.find((campana) => campana.IdCampana === id);
      },
    hasData: (state) => state.campanas.length > 0,
  },

  actions: {
    async fetchCampanas(forceRefresh = false) {
      const now = Date.now();
      const cacheDuration = 5 * 60 * 1000;

      if (this.hasData && !forceRefresh && this.lastFetch && now - this.lastFetch < cacheDuration) {
        return;
      }

      this.loading = true;
      try {
        const response = await axios.get('/campana');
        const data = response.data;

        if (!data.IsEstado) {
          showErrorNotification(data.Mensaje);
        }

        this.campanas = data.Dato || [];
        this.tamano = data.Tamano;
        this.totalPaginas = data.TotalPaginas;
        this.pagina = data.Pagina;
        this.lastFetch = Date.now();
      } catch (error) {
        showErrorNotification('Algo salió mal al obtener las campañas.');
        console.error('Error obteniendo las campañas:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchcampanasXAplicacion(
      idAplicacion: number,
      forceRefresh = false,
      pagina: number = 1,
      tamano: number = 10,
    ) {
      const now = Date.now();
      const cacheDuration = 5 * 60 * 1000;

      if (
        this.campanasXAplicacion.length > 0 &&
        !forceRefresh &&
        this.lastFetch &&
        now - this.lastFetch < cacheDuration
      ) {
        return;
      }

      this.loading = true;
      try {
        const response = await axios.get(
          `/campana/aplicacion/${idAplicacion}?pagina=${pagina}&tamano=${tamano}`,
        );
        const data = response.data;

        if (!data.IsEstado) {
          showErrorNotification(data.Mensaje);
        }

        this.campanasXAplicacion = data.Dato || [];
        this.lastFetch = Date.now();
      } catch (error) {
        showErrorNotification('Algo salió mal al obtener las campañas por grupo.');
        console.error('Error obteniendo las campañas por grupo:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
