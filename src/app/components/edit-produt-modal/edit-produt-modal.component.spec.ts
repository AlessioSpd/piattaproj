import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProdutModalComponent } from './edit-produt-modal.component';

describe('EditProdutModalComponent', () => {
  let component: EditProdutModalComponent;
  let fixture: ComponentFixture<EditProdutModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProdutModalComponent]
    });
    fixture = TestBed.createComponent(EditProdutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
