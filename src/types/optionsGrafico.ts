export interface OptionsBar {
  chart: {
    type: string;
    height: string;
    toolbar: {
      show: boolean;
    };
  };
  plotOptions: {
    bar: {
      horizontal: boolean;
      columnWidth: string;
      borderRadius: number;
    };
  };
  dataLabels: {
    enabled: boolean;
  };
  stroke: {
    show: boolean;
    width: number;
    colors: string[];
  };
  xaxis: {
    categories: string[];
  };
  yaxis: {
    title: {
      text: string;
    };
  };
  fill: {
    opacity: number;
  };
  tooltip: {
    y: {
      formatter: (val: number) => string;
    };
  };
}

export interface OptionsDonut {
  chart: {
    type: string;
    height: string;
    toolbar: {
      show: boolean;
    };
  };
  labels: string[];
  colors: string[];
  legend: {
    position: string;
  };
  stroke: {
    show: boolean;
  };
  responsive: {
    breakpoint: number;
    options: {
      chart: {
        width: number;
      };
      legend: {
        position: string;
      };
    };
  }[];
}

export interface OptionsLine {
  chart: {
    type: string;
    height: string;
    toolbar: {
      show: boolean;
    };
    zoom: {
      enabled: boolean;
    };
  };
  dataLabels: {
    enabled: boolean;
  };
  stroke: {
    curve: string;
  };
  xaxis: {
    type: 'datetime';
  };
}
