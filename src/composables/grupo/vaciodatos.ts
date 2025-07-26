import { useGrupoStore } from 'src/stores/grupo.store';

export const toggleAgregarGrupo = () => {
  const grupoStore = useGrupoStore();
  grupoStore.toggleAgregarGrupo();
};
