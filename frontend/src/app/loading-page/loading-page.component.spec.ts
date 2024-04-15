import { LoadingPageComponent } from './loading-page.component';

// check redirect to login when first opening page
describe('LoadingPageComponent', () => {
  let component: LoadingPageComponent;

  beforeEach(() => {
    component = new LoadingPageComponent();
  });

  // check component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // check sign in is called if not authenticated
  it('should call signIn if not authenticated', () => {
    spyOn(component, 'signIn');
    component.ngOnInit();
    expect(component.signIn).toHaveBeenCalled();
  });
});