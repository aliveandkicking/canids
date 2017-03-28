import { BloodhoundPage } from './app.po';

describe('bloodhound App', () => {
  let page: BloodhoundPage;

  beforeEach(() => {
    page = new BloodhoundPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
