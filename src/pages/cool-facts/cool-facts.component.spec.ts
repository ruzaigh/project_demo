import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolFactsComponent } from './cool-facts.component';

describe('CoolFactsComponent', () => {
  let component: CoolFactsComponent;
  let fixture: ComponentFixture<CoolFactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoolFactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoolFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
