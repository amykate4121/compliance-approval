import { UserProfile } from 'auth0-web/src/profile';
import { UnauthorisedAccessComponent } from './unauthorised-access.component';

// check unauthorised users are redirected
describe('UnauthorisedAccessComponent', () => {
  let component: UnauthorisedAccessComponent;

  beforeEach(() => {
    component = new UnauthorisedAccessComponent();
  });

  // check component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // check sign in is called if not authenticated, using a mock user
  it('should call signIn if not authenticated', () => {
    spyOn(component, 'signIn');
    component.ngOnInit();
    expect(component.signIn).toHaveBeenCalled();
  });

  // ensure that an apprentice is correctly identified by their account
  it('should be apprentice if @qmul.ac.uk', () => {
    spyOn(component, 'signIn');
    const user: UserProfile = {
      name: 'test@qmul.ac.uk',
      email: '',
      userId: '',
    };
    spyOn(component, 'getProfile').and.returnValue(user);
    component.ngOnInit();
    expect(component.apprentice).toBeTruthy();
  });

  // ensure that an approver is correctly identified by their account
  it('should be approver if NOT @qmul.ac.uk', () => {
    spyOn(component, 'signIn');
    const user: UserProfile = {
      name: 'test@gmail.com',
      email: '',
      userId: '',
    };
    spyOn(component, 'getProfile').and.returnValue(user);
    component.ngOnInit();
    expect(component.apprentice).toBeFalsy();
  });
});
