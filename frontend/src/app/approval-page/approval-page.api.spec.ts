import { ApprovalPageApi } from "./approval-page.api";

// check the apprentice and successfully interact with the text editor
describe('ApprovalPageApi', () => {
  let api: ApprovalPageApi;

  beforeEach(() => {
    let http = jasmine.createSpyObj('HttpClient', ['post']);
    http.post.and.returnValue({ subscribe: () => {} });
    api = new ApprovalPageApi(http);
  });

  // check api is created
  it('should create', () => {
    expect(api).toBeTruthy();
  });

  // ensure that body of report is posted
  it('should send a POST request to the server', () => {
    const mockReport = { fullBody: 'Test Report' };
    api.saveBodyForAiReport(mockReport).subscribe();
    expect(api.http.post).toHaveBeenCalled();
  });
});
