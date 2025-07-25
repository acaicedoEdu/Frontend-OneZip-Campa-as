import { defineStore } from 'pinia';
import { axios } from 'boot/axios';
import type { Contacto } from 'src/types/contacto';
import { showErrorNotification } from 'src/components/notificacion/notificacion';

interface ContactoState {
  contactos: Contacto[];
  tamano: number;
  totalPaginas: number;
  pagina: number;
  loading: boolean;
  lastFetch: number | null;
}

export const useContactoStore = defineStore('contactos', {
  state: (): ContactoState => ({
    contactos: [],
    tamano: 0,
    totalPaginas: 0,
    pagina: 0,
    loading: false,
    lastFetch: null,
  }),

  getters: {
    getContactoById:
      (state) =>
      (id: number): Contacto | undefined => {
        return state.contactos.find((contacto) => contacto.id === id);
      },
    hasData: (state) => state.contactos.length > 0,
  },

  actions: {
    async fetchContactos(forceRefresh = false) {
      const now = Date.now();
      const cacheDuration = 5 * 60 * 1000;

      if (this.hasData && !forceRefresh && this.lastFetch && now - this.lastFetch < cacheDuration) {
        return;
      }

      this.loading = true;
      try {
        const response = await axios.get('/contacto');
        const data = response.data;

        if (!data.IsEstado) {
          showErrorNotification(data.Mensaje);
        }

        this.contactos = data.Dato || [];
        this.tamano = data.Tamano;
        this.totalPaginas = data.TotalPaginas;
        this.pagina = data.Pagina;
        this.lastFetch = Date.now();
      } catch (error) {
        showErrorNotification('Algo salió mal al obtener los contactos.');
        console.error('Error al obtener los contactos:', error);
      } finally {
        this.loading = false;
      }
    },

    async agregarContacto(contacto: Contacto) {
      try {
        const response = await axios.post('/contacto', contacto);
        const data = response.data;

        if (!data.IsEstado) {
          showErrorNotification(data.Mensaje);
          return;
        }

        this.contactos.push(data.Dato);
        showErrorNotification('Contacto agregado correctamente.');
      } catch (error) {
        showErrorNotification('Algo salió mal al agregar el contacto.');
        console.error('Error al agregar el contacto:', error);
      }
    },
  },
});
