
import { UserProfile } from "auth0-web/src/profile";
import { ApprovalPageComponent } from "./approval-page.component";
import { ApprovalPageApi } from "./approval-page.api";

// check approvers are able to give approval
describe('ApprovalPageComponent', () => {
  let component: ApprovalPageComponent;
  let http: any;

  beforeEach(() => {
    // mock the component
    let router = jasmine.createSpyObj('Router', ['navigate']);
    let approveService = jasmine.createSpyObj('ApproveService', ['openPopup']);
    let requestChangesService = jasmine.createSpyObj('RequestChangesService', ['openPopup']);
    
    http = jasmine.createSpyObj('HttpClient', ['post']);
    http.post.and.returnValue({ subscribe: () => {} });
    let approvalPageApi = new ApprovalPageApi(http);
    
    component = new ApprovalPageComponent(router, approveService, requestChangesService, approvalPageApi);
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
