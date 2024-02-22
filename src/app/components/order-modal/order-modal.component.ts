import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UserData } from '../../interfaces/order.interface';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { OrderModalService } from './order-modal.service';
import { OrderListService } from '../order-list/order-list.service';

@Component({
  selector: "app-order-modal",
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: "./order-modal.component.html",
  styleUrl: "./order-modal.component.scss",
})
export class OrderModalComponent implements OnChanges {
  @Input() userData: UserData = {} as UserData;
  @Input() modalControl: boolean = false;

  @Output() modalEmitter = new EventEmitter();
  @Output() listEmitter = new EventEmitter();

  public faX = faX;

  public modalData: any = {};

  public total: number = 0;

  constructor(
    private orderModalService: OrderModalService,
    private orderListService: OrderListService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.modalControl) {
      this.getOrderItemsList();
    }
  }

  public closeModal() {
    this.modalControl = false;
    this.modalEmitter.emit(false);
  }

  public refreshList() {
    this.listEmitter.emit();
  }

  public getOrderItemsList() {
    if (this.userData) {
      this.orderModalService
        .getOrderItemsList(this.userData.order_id)
        .subscribe({
          next: (response: any) => {
            this.modalData = response;
            this.total = 0;
            console.log(response);
            response[0].order_items.forEach((element: any) => {
              this.total += element.quantity * element.ice_cream.price;
            });
          },
          error: (error) => {},
          complete: () => {
            console.log("terminou a request 2");
          },
        });
    }
  }

  public patchProcessingOrder(id: string) {
    const payload = {
      status: "processing",
    };

    this.patchStatusOrder(id, payload);
  }

  public patchCancelOrder(id: string) {
    const payload = {
      status: "cancelled",
    };

    this.patchStatusOrder(id, payload);
  }

  public patchDeliveredOrder(id: string) {
    const payload = {
      status: "delivered",
    };

    this.patchStatusOrder(id, payload);
  }

  public patchStatusOrder(id: string, payload: { status: string }) {
    this.orderModalService.patchOrder(id, payload).subscribe({
      next: () => {
        this.closeModal();
        this.refreshList();
      },
      error: (error) => {},
      complete: () => {},
    });
  }
}
