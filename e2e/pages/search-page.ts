import {
  element,
  by,
  ElementFinder,
  ElementArrayFinder,
} from 'protractor';
 const testdata = require ('../testdata/person.json');
  

  export class SearchPage {

    searchTextBox: ElementFinder =  element(by.xpath('//*[@id="query"]'));
    btnSearch: ElementFinder =  element(by.xpath('//*[@type="submit"]'));
    btnPeople: ElementFinder = element(by.xpath('//*[@id="people"]'));
    btnPlanets: ElementFinder = element(by.id('planets'));
    heading: ElementFinder = element(by.css('div h1'));
    lblName: ElementFinder = element(by.css('div h6'));
    lblPersonResults: ElementArrayFinder = element.all(by.xpath('//app-character[not(@id) or not(@class)]')).
            all(by.className('card-body')).all(by.className('row'));
    lblPlanetResults: ElementArrayFinder = element.all(by.xpath('//app-planet[not(@id) or not(@class)]')).
            all(by.className('card-body')).all(by.className('row'));
    lblNotFound: ElementFinder = element(by.xpath('//*[text()="Not found."]'));
    lblNoSearchResult: ElementFinder = element(by.xpath('//app-character[not(@id) or not(@class)]'));
    

   /**
     *  Method to select People, enter character name in text box and click on Search button.
     *
     */
    async enterName(name:string) {
      await this.btnPeople.click();
      await this.searchTextBox.sendKeys(name);
      await this.btnSearch.click();
    }
    /**
     *  Method to select Planet, enter planet name in text box and click on Search button.
     *
     */
  async enterPlanet(planet: string) {
      await this.btnPlanets.click();
      await this.searchTextBox.sendKeys(planet);
      await this.btnSearch.click();
    }
  /**
   * Search page reasult details
   * @param results for search result
   */
  async getsearchPageResults(results: any) {
    const finalResult = [];
    for (let index = 0; index < results.length; index++) {
        const value = await results[index].getText();
        finalResult.push(value);
    }
    return finalResult;
}
/**
 * verify for person search result
 */
  async verifyPersonResults() {
    return await this.getsearchPageResults(await this.lblPersonResults);
}
/**
 * key pair value validation from search result
 * @param nameAttributes contains gender,birth year,eye color,skin color value
 */
async checkNamePresentInTD(nameAttributes: string) {
  let name: string, obj: any;
  testdata.forEach((data) => {
      if (data.hasOwnProperty(nameAttributes)) {
          [name, obj] = [nameAttributes, data[nameAttributes]];
      }
  });
  return [name, obj];
}
/**
 * verify "Not found." message in search result
 */
async verifyNotFoundMessage(){
  return this.lblNotFound.getText();
}
/**
 * method to clear search text box data
 */
async clearTextBox() {
  await this.searchTextBox.clear();
  
}
/**
 * verify for planet search result
 */
async verifyPlanetResults() {

  return await this.getsearchPageResults(await this.lblPlanetResults);
}

/**
 * verify after  clear text box and search returns empty result
 */
async verifyEmptyResult() {
  await this.lblPlanetResults.isDisplayed();

}
/**
 * method to click on search button
 */
async clickSearchButton() {
  await this.btnSearch.click();
}
/**
 * method to click on people readio button
 */
async selectPeopleRadioButton() {
  await this.btnPeople.click();
}

}
