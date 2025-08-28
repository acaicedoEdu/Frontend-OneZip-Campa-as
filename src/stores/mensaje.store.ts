import { defineStore } from 'pinia';
import { axios } from 'boot/axios';
import { type Mensaje } from 'src/types/Mensaje';
import { showErrorNotification } from 'src/components/notificacion/notificacion';

interface MensajeState {
  mensajes: Mensaje[];
  mensajesError: Mensaje[];
  tamano: number;
  totalPaginas: number;
  pagina: number;
  tamanoMensajesError: number;
  totalPaginasMensajesError: number;
  paginaMensajesError: number;
  totalMensajesError: number;
  loading: boolean;
  total: number;
  lastFetch: number | null;
  lastFetchMensajesError: number | null;
  cacheBusqueda: Record<string, Mensaje[]>;
}

export const useMensajeStore = defineStore('mensajes', {
  state: (): MensajeState => ({
    mensajes: [],
    mensajesError: [],
    tamano: 0,
    totalPaginas: 0,
    total: 0,
    tamanoMensajesError: 0,
    totalPaginasMensajesError: 0,
    paginaMensajesError: 0,
    totalMensajesError: 0,
    lastFetchMensajesError: null,
    pagina: 0,
    loading: false,
    lastFetch: null,
    cacheBusqueda: {},
  }),

  getters: {
    hasData: (state) => state.mensajes.length > 0,
    hasDataMensajesError: (state) => state.mensajesError.length > 0,
  },

  actions: {
    async fetchMensajes(id: number, forceRefresh = false, pagina: number = 1, tamano: number = 10) {
      const now = Date.now();
      const cacheDuration = 5 * 60 * 1000;

      if (this.hasData && !forceRefresh && this.lastFetch && now - this.lastFetch < cacheDuration) {
        return;
      }

      this.loading = true;
      try {
        const response = await axios.get(
          `/Mensaje/campana/${id}?pagina=${pagina}&tamano=${tamano}`,
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

    async buscarMensajes(
      id: number,
      busqueda: string,
      forceRefresh = false,
      pagina: number = 1,
      tamano: number = 10,
      existeMensajeError: boolean = false,
    ) {
      const now = Date.now();
      const cacheDuration = 5 * 60 * 1000;

      if (this.hasData && !forceRefresh && this.lastFetch && now - this.lastFetch < cacheDuration) {
        return;
      }

      if (this.cacheBusqueda[busqueda]) {
        this.mensajes = this.cacheBusqueda[busqueda];
        return;
      }

      this.loading = true;
      try {
        const response = await axios.get(
          `/Mensaje/campana/${id}/buscar/${busqueda}?mensajeError=${existeMensajeError}&pagina=${pagina}&tamano=${tamano}`,
        );
        const data = response.data;

        if (!data.IsExito) {
          showErrorNotification(data.Mensaje);
        }

        this.cacheBusqueda[busqueda] = data.Dato || [];
        if (existeMensajeError) {
          this.mensajesError = data.Dato || [];
          this.tamanoMensajesError = data.Tamano;
          this.totalPaginasMensajesError = data.TotalPaginas;
          this.paginaMensajesError = data.Pagina;
          this.totalMensajesError = data.TotalDatos;
          this.lastFetchMensajesError = Date.now();
        } else {
          this.mensajes = data.Dato || [];
          this.tamano = data.Tamano;
          this.totalPaginas = data.TotalPaginas;
          this.pagina = data.Pagina;
          this.total = data.TotalDatos;
          this.lastFetch = Date.now();
        }
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

    async filtroMensajes(
      id: number,
      filtro: string,
      forceRefresh = false,
      pagina: number = 1,
      tamano: number = 10,
    ) {
      const now = Date.now();
      const cacheDuration = 5 * 60 * 1000;

      if (this.hasData && !forceRefresh && this.lastFetch && now - this.lastFetch < cacheDuration) {
        return;
      }

      if (this.cacheBusqueda[filtro]) {
        this.mensajes = this.cacheBusqueda[filtro];
        return;
      }

      this.loading = true;
      try {
        const response = await axios.get(
          `/Mensaje/campana/${id}/filtro/${filtro}?pagina=${pagina}&tamano=${tamano}`,
        );
        const data = response.data;

        if (!data.IsExito) {
          showErrorNotification(data.Mensaje);
        }

        this.mensajes = data.Dato || [];
        this.cacheBusqueda[filtro] = data.Dato || [];
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

    async fetchMensajesError(
      id: number,
      forceRefresh = false,
      pagina: number = 1,
      tamano: number = 10,
    ) {
      const now = Date.now();
      const cacheDuration = 5 * 60 * 1000;

      if (
        this.hasDataMensajesError &&
        !forceRefresh &&
        this.lastFetchMensajesError &&
        now - this.lastFetchMensajesError < cacheDuration
      ) {
        return;
      }

      this.loading = true;
      try {
        const response = await axios.get(
          `/Mensaje/campana/${id}?mensajeError=true&pagina=${pagina}&tamano=${tamano}`,
        );
        const data = response.data;

        if (!data.IsExito) {
          showErrorNotification(data.Mensaje);
        }

        this.mensajesError = data.Dato || [];
        this.tamanoMensajesError = data.Tamano;
        this.totalPaginasMensajesError = data.TotalPaginas;
        this.paginaMensajesError = data.Pagina;
        this.totalMensajesError = data.TotalDatos;
        this.lastFetchMensajesError = Date.now();
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

    async exportarReporte(id: number) {
      try {
        await axios.get(`/Mensaje/exportar-reporte/campana/${id}`);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.Mensaje) {
          showErrorNotification(error.response.data.Mensaje);
        } else {
          showErrorNotification('Algo salió mal al exportar el reporte.');
        }

        console.error('Error exportando el reporte:', error);
      }
    },
  },
});
