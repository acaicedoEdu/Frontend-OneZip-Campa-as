<template>
  <div>
    <apexchart type="bar" height="379" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const apexchart = VueApexCharts;

const series = ref([
  {
    name: 'Mensajes Enviados',
    data: [44, 55, 57, 56, 61, 58, 63],
  },
]);

const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 300,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  },
  yaxis: {
    title: {
      text: 'Nº de Mensajes',
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return val + ' mensajes';
      },
    },
  },
});
</script>
