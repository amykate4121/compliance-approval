
import { UserProfile } from "auth0-web/src/profile";
import { ApprovalPageComponent } from "./approval-page.component";

// check approvers are able to give approval
describe('ApprovalPageComponent', () => {
  let component: ApprovalPageComponent;

  beforeEach(() => {
    // mock the component
    let router = jasmine.createSpyObj('Router', ['navigate']);
    let approveService = jasmine.createSpyObj('ApproveService', ['openPopup']);
    let requestChangesService = jasmine.createSpyObj('RequestChangesService', ['openPopup']);
    component = new ApprovalPageComponent(router, approveService, requestChangesService);
  });

  // check component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ensure apprentice cannot access this page
  it('should redirect if apprentice', () => {
    spyOn(component, 'signIn');
    const user: UserProfile = {
      name: 'test@qmul.ac.uk',
      email: '',
      userId: '',
    };
    spyOn(component, 'getProfile').and.returnValue(user);
    component.ngOnInit();
    expect(component.router.navigate).toHaveBeenCalled();
  });

  // open pop up when approver wants to approve
  it('should open approval page', () => {
    component.approve();
    expect(component.approveService.openPopup).toHaveBeenCalled();
  });

  // open pop up when approver wants to request changes 
  it('should open request changes page', () => {
    component.requestChanges();
    expect(component.requestChangesService.openPopup).toHaveBeenCalled();
  });
});
