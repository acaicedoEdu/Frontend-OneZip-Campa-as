<template>
  <q-page class="q-px-md q-pt-none">
    <div class="row flex-center">
      <span>No existe el grupo</span>
    </div>
    <div>
      <span class="text-h1">Grupo</span>
      <div class="row items-center justify-between q-mb-md">
        <div class="row items-center">
          <q-btn
            flat
            dense
            to="/grupo"
            label="Volver a Grupos"
            class="secondary-text text-weight-regular"
            no-caps
            icon="fa-solid fa-arrow-left"
          />
          <div class="column item-start justify-center q-ml-sm">
            <div class="text-h5 text-weight-bold row q-gutter-sm">
              <span>Grupo</span>
            </div>
            <div class="text-grey-7"></div>
          </div>
        </div>
        <div class="q-gutter-x-sm row items-center justify-between">
          <q-btn unelevated no-caps padding="5px 8px" color="primary">
            <q-icon name="fa-solid fa-arrow-left" size="13px" />
            <span class="text-weight-regular text-subtitle2">Volver</span>
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>
