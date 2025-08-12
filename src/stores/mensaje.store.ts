import { defineStore } from 'pinia';
import { axios } from 'boot/axios';
import { type Mensaje } from 'src/types/Mensaje';
import { showErrorNotification } from 'src/components/notificacion/notificacion';

interface MensajeState {
  mensajes: Mensaje[];
  tamano: number;
  totalPaginas: number;
  pagina: number;
  loading: boolean;
  total: number;
  lastFetch: number | null;
}

export const useMensajeStore = defineStore('mensajes', {
  state: (): MensajeState => ({
    mensajes: [],
    tamano: 0,
    totalPaginas: 0,
    total: 0,
    pagina: 0,
    loading: false,
    lastFetch: null,
  }),

  getters: {
    hasData: (state) => state.mensajes.length > 0,
  },

  actions: {
    async fetchCampanas(id: number, forceRefresh = false, pagina: number = 1, tamano: number = 10) {
      const now = Date.now();
      const cacheDuration = 5 * 60 * 1000;

      if (this.hasData && !forceRefresh && this.lastFetch && now - this.lastFetch < cacheDuration) {
        return;
      }

      this.loading = true;
      try {
        const response = await axios.get(
          `/mensaje/campana/${id}?pagina=${pagina}&tamano=${tamano}`,
        );
        const data = response.data;

        if (!data.IsExito) {
          showErrorNotification(data.Mensaje);
        }

        this.mensajes = data.Dato || [];
        this.tamano = data.Tamano;
        this.totalPaginas = data.TotalPaginas;
        this.pagina = data.Pagina;
        this.total = data.TotalDatos;
        this.lastFetch = Date.now();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.Mensaje) {
          showErrorNotification(error.response.data.Mensaje);
        } else {
          showErrorNotification('Algo salió mal al obtener los mensajes.');
        }

        console.error('Error obteniendo los mensajes:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
