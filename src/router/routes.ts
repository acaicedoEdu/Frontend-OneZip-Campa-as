import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/principal/PagePrincipal.vue') },
      { path: 'campana', component: () => import('src/pages/campana/PageCampana.vue') },
      {
        path: 'campana/:id',
        component: () => import('src/pages/campana/PageMostrarIdCampana.vue'),
      },
      {
        path: 'campana/nueva',
        component: () => import('src/pages/campana/PageAgregarCampana.vue'),
      },
      { path: 'plantilla', component: () => import('src/pages/PagePlantilla.vue') },
      { path: 'grupo', component: () => import('src/pages/grupo/PageGrupo.vue') },
      {
        path: 'grupo/:id',
        component: () => import('src/pages/grupo/PageMostrarIdGrupo.vue'),
      },
      {
        path: 'configuracion',
        component: () => import('src/pages/configuracion/PageConfiguracion.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
