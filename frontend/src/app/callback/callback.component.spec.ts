import { UserProfile } from 'auth0-web/src/profile';
import { CallbackComponent } from './callback.component';
import * as Auth0 from 'auth0-web';

// check redirect to login when first opening page
describe('Callback component', () => {
  let component: CallbackComponent;

  beforeEach(() => {
    let router = jasmine.createSpyObj('Router', ['navigate']);
    spyOn(Auth0, 'handleAuthCallback').and.callFake((callback: (err: any) => void) => {
      callback(null);
    });
    component = new CallbackComponent(router);
  });

  // check component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // apprentices need to access text editor
  it('should send apprentices to text editor', () => {
    const mockUserProfile: UserProfile = {
      name: 'test@qmul.ac.uk',
      email: '',
      userId: '',
    };
    spyOn(component, 'getProfile').and.returnValue(mockUserProfile);
    component.ngOnInit();
    expect(component.router.navigate).toHaveBeenCalledWith(['/text-editor']);
  });

  // approvers need to access approval page
  it('should send approvers to approval page', () => {
    const mockUserProfile: UserProfile = {
      name: 'test@gmail.com',
      email: '',
      userId: '',
    };
    spyOn(component, 'getProfile').and.returnValue(mockUserProfile);
    component.ngOnInit();
    expect(component.router.navigate).toHaveBeenCalledWith(['/approval-page']);
  });
});