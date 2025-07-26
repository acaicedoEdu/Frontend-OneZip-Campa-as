import { useRouter } from 'vue-router';

export const dirigirAConfiguracion = () => {
  void useRouter().push('/configuracion');
};
