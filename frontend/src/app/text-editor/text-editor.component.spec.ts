import { UserProfile } from 'auth0-web/src/profile';
import { TextEditorApi } from './text-editor.api';
import { TextEditorComponent } from './text-editor.component';
import { AiReportComponent } from '../ai-report/ai-report.component';
import { AiReportApiService } from '../ai-report/ai-report-api.service';

// check the apprentice and successfully interact with the text editor
describe('TextEditorComponent', () => {
  let component: TextEditorComponent;
  let http: any;

  beforeEach(() => {
    http = jasmine.createSpyObj('HttpClient', ['post']);
    http.post.and.returnValue({ subscribe: () => {} });
    let textEditorApi = new TextEditorApi(http);

    let router = jasmine.createSpyObj('Router', ['navigate']);
    let requestApprovalService = jasmine.createSpyObj('RequestApprovalService', ['openPopup']);
    let requestDownloadService = jasmine.createSpyObj('RequestDownloadService', ['openPopup']);
    
    component = new TextEditorComponent(
        requestApprovalService,
        requestDownloadService,
        textEditorApi,
        router
    );

    const aiReportComponent = new AiReportComponent(new AiReportApiService(http));
    component.aiReportComponent = aiReportComponent;

    const drawer = jasmine.createSpyObj('mockDrawer', ['toggle']);
    component.drawer = drawer;
});

  // check api is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ensure approver cannot access this page
  it('should redirect if approver', () => {
    spyOn(component, 'signIn');
    const user: UserProfile = {
      name: 'test@gmail.com',
      email: '',
      userId: '',
    };
    spyOn(component, 'getProfile').and.returnValue(user);
    component.ngOnInit();
    expect(component.router.navigate).toHaveBeenCalled();
  });

  // close the ai report pop up
  it('should close ai report page', () => {
    spyOn(component.aiReportComponent, 'ngOnDestroy');
    component.close();
    expect(component.drawer.toggle).toHaveBeenCalled();
    expect(component.aiReportComponent.ngOnDestroy).toHaveBeenCalled();
  });

  // open pop up when apprentice wants to request approval
  it('should open request approval page', () => {
    component.requestApproval();
    expect(component.requestApprovalService.openPopup).toHaveBeenCalled();
  });

  // open pop to download as pdf 
  it('should open request changes page', () => {
    component.requestPDFDownload();
    expect(component.requestDownloadService.openPopup).toHaveBeenCalled();
  });
});
