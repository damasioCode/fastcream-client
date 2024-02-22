import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { SideBarComponent } from '../../layout/side-bar/side-bar.component';

import { NgChartsModule } from "ng2-charts";

import DataLabelsPlugin from "chartjs-plugin-datalabels";

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { OrderListComponent } from '../../components/order-list/order-list.component';
import { DashboardService } from './dashboard.service';

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    HeaderComponent,
    SideBarComponent,
    NgChartsModule,
    OrderListComponent,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent implements OnInit {
  sevenDaysAgoList: string[] = [];

  public dashboardKPI: any;

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.generateSevenDaysAgoList();
    this.getDashboardKPI();
  }

  public getDashboardKPI() {
    this.dashboardService.getDashboardKPI().subscribe({
      next: (response: any) => {
        this.dashboardKPI = response;
        console.log(response)
      },
      error: (error) => {},
      complete: () => {},
    });
  }

  private generateSevenDaysAgoList() {
    const today = new Date();
    for (let index = 0; index < 7; index++) {
      const date = new Date(today);
      date.setDate(today.getDate() - index);
      const formattedDate = this.formatDate(date);
      this.sevenDaysAgoList.unshift(formattedDate);
    }
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration["options"] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: "end",
        align: "end",
      },
    },
  };
  public barChartType: ChartType = "bar";
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<"bar"> = {
    labels: this.sevenDaysAgoList,
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: "Número de Pedidos",
      },
    ],
  };
}
