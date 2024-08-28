import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbComponent } from './verb.component';

describe('VerbComponent', () => {
  let component: VerbComponent;
  let fixture: ComponentFixture<VerbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
