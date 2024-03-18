import { ApexOptions } from "apexcharts";

export const TotalRevenueSeries = [
  {
    name: "Last Month",
    data: [183, 124, 115, 85, 143, 143, 96],
  },
  {
    name: "Running Month",
    data: [95, 84, 72, 44, 108, 108, 47],
  },
];

export const TotalRevenueOptions: ApexOptions = {
  chart: {
    type: "bar",
    toolbar: {
      show: false,
    },
  },
  colors: ["#475BE8", "#CFC8FF"],
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: "55%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: false,
  },
  stroke: {
    colors: ["transparent"],
    width: 4,
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  },
  yaxis: {
    title: {
      text: "Ks (Kyats)",
    },
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
  },
  tooltip: {
    y: {
      formatter(val: number) {
        return `$ ${val} thousands`;
      },
    },
  },
};


export const TotalIncomeSeries = [
    {
      name: "Income",
      data: [100, 414, 345, 551, 494, 624, 444, 931, 148],
    },
  ];
  export const CustomerParcelSeries = [
    {
      name: "Customers",
      data: [10, 41, 35, 55, 44, 662, 44, 93, 1444],
    },
    {
      name: "Parcels",
      data: [100, 414, 345, 551, 494, 624, 444, 931, 148],
    },
  ];

export const CustomerParcelOptions: ApexOptions = {
  chart: {
    type: "line",
    height: 400,
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  colors: ["#78C5FC","#1AC869"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  grid: {
    row: {
      colors: ["transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
    strokeDashArray: 7,
    padding: {
      left: 0,
      right: 0,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
  xaxis: {
    type: "category",
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  },
  yaxis: {
    tickAmount: 4,
    labels: {
      align: "left",
      offsetX: -12,
         },
  },
  legend: {
    show:false,
    position: 'top',
    horizontalAlign: 'left',
    offsetY:-4
  }
};

export const TotalEarningOptions: ApexOptions = {
  chart: {
    type: "area",
    height: 374,
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  colors: ["#FFB381"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
  grid:{
    show:false,
  },
  xaxis: {

    labels: {
      show: false, // Set to false to hide x-axis labels
    },
    axisBorder: {
      show: false,
  },
    axisTicks: {
      show: false,
  },
  },
  yaxis: {
    labels: {
      show: false, // Set to false to hide y-axis labels
    },
    
  },

};
export const TotalIncomeOptions: ApexOptions = {
  chart: {
    type: "line",
    height: 374,
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  colors: ["#FF6604"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  grid: {
    row: {
      colors: ["transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
    strokeDashArray: 7,
    padding: {
      left: 0,
      right: 0,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
  xaxis: {
    type: "category",
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  },
  yaxis: {
    tickAmount: 4,
    labels: {
      align: "left",
      offsetX: -12,
      formatter: (value: any) => {
        // Format the y-axis labels as '100 Ks', '414 Ks', etc.
        if (value >= 0) {
          return value.toFixed(0) + " Ks";
        }
        return value;
      },
    },
  },
};
export const ScannedParcelOptions: ApexOptions = {
  chart: {
    type: "line",
    height: 374,
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  colors: ["#FF6604"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  grid: {
    row: {
      colors: ["transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
    strokeDashArray: 7,
    padding: {
      left: 0,
      right: 0,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
  xaxis: {
    type: "category",
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  },
};
