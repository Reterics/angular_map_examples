import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayersDialogComponent } from './layers-dialog.component';

describe('LayersDialogComponent', () => {
  let component: LayersDialogComponent;
  let fixture: ComponentFixture<LayersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayersDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
