import { defineStore } from 'pinia';
import { axios } from 'boot/axios';
import type { Campana } from 'src/types/campana';
import type { IdCampana } from 'src/types/idCampana';
import {
  showErrorNotification,
  showSuccessNotification,
} from 'src/components/notificacion/notificacion';
import { useAplicacionStore } from './aplicacion.store';
import type { RespuestaPaginacion } from 'src/types/Respuesta';
import type { Respuesta } from 'src/types/Respuesta';

interface CampanaState {
  campanas: Campana[];
  campanasXAplicacion: Campana[];
  campana: IdCampana | null;
  tamano: number;
  totalPaginas: number;
  total: number;
  pagina: number;
  loading: boolean;
  lastFetch: number | null;
}

export const useCampanaStore = defineStore('campanas', {
  state: (): CampanaState => ({
    campanas: [],
    campanasXAplicacion: [],
    campana: null,
    tamano: 0,
    totalPaginas: 0,
    total: 0,
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
    getCampanaXAplicacionById:
      (state) =>
      (id: number): Campana | undefined => {
        return state.campanasXAplicacion.find((campana) => campana.IdCampana === id);
      },
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
        const response = await axios.get('/Campana');
        const data = response.data as RespuestaPaginacion<Campana[]>;

        if (!data.IsExito) {
          showErrorNotification(data.Mensaje);
        }

        this.campanas = data.Dato || [];
        this.tamano = data.Tamano;
        this.totalPaginas = data.TotalPaginas;
        this.pagina = data.Pagina;
        this.total = data.TotalDatos;
        this.lastFetch = Date.now();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.Mensaje) {
          showErrorNotification(error.response.data.Mensaje);
        } else {
          showErrorNotification('Algo salió mal al obtener las campañas.');
        }

        console.error('Error obteniendo las campañas:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchCampanasXAplicacion(forceRefresh = false, pagina: number = 1, tamano: number = 10) {
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
      const idAplicacion = useAplicacionStore().IdAplicacionEscogida;
      this.loading = true;
      try {
        const response = await axios.get(
          `/Campana/aplicacion/${idAplicacion}?pagina=${pagina}&tamano=${tamano}`,
        );
        const data = response.data as RespuestaPaginacion<Campana[]>;

        if (!data.IsExito) {
          showErrorNotification(data.Mensaje);
        }

        this.campanasXAplicacion = data.Dato || [];
        this.tamano = data.Tamano;
        this.total = data.TotalDatos;
        this.totalPaginas = data.TotalPaginas;
        this.pagina = data.Pagina;
        this.lastFetch = Date.now();
      } catch (error) {
        showErrorNotification('Algo salió mal al obtener las campañas por aplicacion.');
        console.error('Error obteniendo las campañas por aplicacion:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchIdCampana(forceRefresh = false, IdCampana: number) {
      if (this.campana?.Campana?.IdCampana == IdCampana && !forceRefresh) {
        return;
      }
      this.loading = true;
      try {
        const response = await axios.get(`/Campana/${IdCampana}`);
        const data = response.data;

        this.campana = data.Dato || {
          MensajeError: '',
        };

        if (this.campana) {
          this.campana.MensajeError = data.Mensaje;
          this.campana.Plantilla.Contenido = {
            textoEncabezado: '',
            mensajePrincipal: data.Dato.Plantilla.Contenido || '',
            textoFooter: '',
          };
        }
      } catch (error) {
        showErrorNotification('Algo salió mal al obtener la campaña.');
        console.error('Error obteniendo la campaña:', error);
      } finally {
        this.loading = false;
      }
    },

    async ejecutarCampana(nuevaCampana: object) {
      try {
        const response = await axios.post('/Campana', nuevaCampana);
        const data = response.data as Respuesta<Campana>;
        showErrorNotification(data.Mensaje);
      } catch (error) {
        showErrorNotification('Algo salió mal al ejecutar la campaña.');
        console.error('Error al ejecutar la campaña:', error);
      }
    },

    async pausarCampana(idCampana: number) {
      this.loading = true;
      try {
        const response = await axios.post(`/Campana/pausar/${idCampana}`);
        const data = response.data as Respuesta<Campana>;
        if (!data.IsExito) {
          showErrorNotification(data.Mensaje);
        } else {
          showSuccessNotification(data.Mensaje);
        }
      } catch (error) {
        showErrorNotification('Algo salió mal al pausar la campaña.');
        console.error('Error al pausar la campaña:', error);
      } finally {
        this.loading = true;
      }
    },

    async desPausarCampana(idCampana: number) {
      try {
        const response = await axios.post(`/Campana/despausar/${idCampana}`);
        const data = response.data as Respuesta<Campana>;
        if (!data.IsExito) {
          showErrorNotification(data.Mensaje);
        } else {
          showSuccessNotification(data.Mensaje);
        }
      } catch (error) {
        showErrorNotification('Algo salió mal al despausar la campaña.');
        console.error('Error al despausar la campaña:', error);
      }
    },

    async cancelarCampana(idCampana: number) {
      this.loading = true;
      try {
        const response = await axios.post(`/Campana/cancelar/${idCampana}`);
        const data = response.data as Respuesta<Campana>;
        if (!data.IsExito) {
          showErrorNotification(data.Mensaje);
        } else {
          showSuccessNotification(data.Mensaje);
        }
      } catch (error) {
        showErrorNotification('Algo salió mal al cancelar la campaña.');
        console.error('Error al cancelar la campaña:', error);
      } finally {
        this.loading = true;
      }
    },
  },
});
