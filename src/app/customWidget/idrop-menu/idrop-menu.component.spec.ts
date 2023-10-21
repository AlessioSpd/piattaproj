import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IDropMenuComponent } from './idrop-menu.component';

describe('IDropMenuComponent', () => {
  let component: IDropMenuComponent;
  let fixture: ComponentFixture<IDropMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IDropMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IDropMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
