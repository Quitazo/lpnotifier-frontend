import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarModule } from './toolbar.module';

describe('ToolbarComponent', () => {
  let component: ToolbarModule;
  let fixture: ComponentFixture<ToolbarModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
