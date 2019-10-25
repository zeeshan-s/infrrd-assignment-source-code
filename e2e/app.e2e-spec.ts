import { BookmeetingroomPage } from './app.po';

describe('bookmeetingroom App', () => {
  let page: BookmeetingroomPage;

  beforeEach(() => {
    page = new BookmeetingroomPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
