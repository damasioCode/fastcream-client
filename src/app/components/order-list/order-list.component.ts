import { Component, OnInit } from '@angular/core';
import { OrderListService } from './order-list.service';
import { CommonModule } from '@angular/common';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { UserData } from '../../interfaces/order.interface';

@Component({
  selector: "app-order-list",
  standalone: true,
  imports: [CommonModule,OrderModalComponent],
  templateUrl: "./order-list.component.html",
  styleUrl: "./order-list.component.scss",
})
export class OrderListComponent implements OnInit {
  
  public orderList: any;  
  public userDataValue: UserData = {} as UserData;
  public modalControl: boolean = false;

  constructor(private orderListService: OrderListService) {}

  ngOnInit(): void {
    this.getOrderList()  
  }

  public getOrderList() {
    this.orderListService.getOrderList().subscribe({
      next: (response: any) => {
        this.orderList = response;
        console.log(response);
      },
      error: (error) => {},
      complete: () => {
        console.log("terminou a request");
      },
    });
  }

  public openModal(item: any): void {
    if (item) {
      this.userDataValue = {
        order_id: item.id,
        status: item.status,
        name: item.user.name,
      }
      this.modalControl = true;
    }
  } 
}
