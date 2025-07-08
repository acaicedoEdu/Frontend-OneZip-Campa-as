import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/PageDashboard.vue') },
      { path: 'campaigns', component: () => import('src/pages/PageCampaigns.vue') },
      { path: 'templates', component: () => import('src/pages/PageTemplates.vue') },
      { path: 'contacts', component: () => import('src/pages/PageContacts.vue') },
      { path: 'settings', component: () => import('src/pages/PageSettings.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
