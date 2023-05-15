import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaangeOrderComponent } from './maange-order.component';

describe('MaangeOrderComponent', () => {
  let component: MaangeOrderComponent;
  let fixture: ComponentFixture<MaangeOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaangeOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaangeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
