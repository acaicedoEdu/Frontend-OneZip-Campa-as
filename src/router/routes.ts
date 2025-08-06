import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/PagePrincipal.vue') },
      { path: 'campana', component: () => import('src/pages/PageCampana.vue') },
      { path: 'campana/:id', component: () => import('src/pages/PageMostrarIdCampana.vue') },
      { path: 'campana/nueva', component: () => import('src/pages/PageAgregarCampana.vue') },
      { path: 'plantilla', component: () => import('src/pages/PagePlantilla.vue') },
      { path: 'grupo', component: () => import('src/pages/PageGrupo.vue') },
      { path: 'configuracion', component: () => import('src/pages/PageConfiguracion.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
