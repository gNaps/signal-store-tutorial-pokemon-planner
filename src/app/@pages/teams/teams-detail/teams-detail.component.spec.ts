import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsDetailComponent } from './teams-detail.component';

describe('TeamsDetailComponent', () => {
  let component: TeamsDetailComponent;
  let fixture: ComponentFixture<TeamsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
