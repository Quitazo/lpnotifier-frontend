import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterModule } from './footer.module';

describe('FooterComponent', () => {
  let component: FooterModule;
  let fixture: ComponentFixture<FooterModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
