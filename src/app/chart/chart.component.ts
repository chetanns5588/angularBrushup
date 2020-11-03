import { Component, Input, OnInit } from '@angular/core';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() teen_age_count: number;
  @Input() middle_age_count: number;
  @Input() senior_age_count: number;

  ngOnInit() {
    this.pieChartBrowser();
  }
  pieChartBrowser() {
    HighCharts.chart('pieChart', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Users count by Age'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        type: undefined,
        data: [{
          name: 'Teen Age',
          y: this.teen_age_count
        }, {
          name: 'Middle age',
          y: this.middle_age_count
        }, {
          name: 'Senior Citizens',
          y: this.senior_age_count
        }]
      }]
    });
  }
}
