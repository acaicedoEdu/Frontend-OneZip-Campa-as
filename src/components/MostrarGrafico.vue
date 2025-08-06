<template>
  <div>
    <apexchart
      :type="props.type"
      :height="props.height"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { type OptionsBar, type OptionsDonut, type OptionsLine } from 'src/types/optionsGrafico';
import { type Series, type SeriesTimeLine } from 'src/types/seriesGrafico';

const apexchart = VueApexCharts;

interface Props {
  type: string;
  height: string;
  options: OptionsBar | OptionsDonut | OptionsLine;
  series: Series[] | SeriesTimeLine[] | number[];
}

const props = defineProps<Props>();

const series = ref(props.series);

const chartOptions = ref(props.options);
</script>
