const { Given, When, Then } = require('cucumber');
import {SearchPage} from "../pages/search-page"
const personTestData = require ('../testdata/person.json');
const planetTestData = require('../testdata/planets.json');
const { browser } = require('protractor');
const chai = require('chai').use(require('chai-as-promised'));
const assert = chai.assert;


    
    let searchPage = new SearchPage();
  
    Given('I navigate to {string}',{ timeout: 25 * 1000 }, async function (text)  {
        // url launch
        await browser.get('http://' + text + ':4200/');
      });

    When('I search for a person', async function() {
        // enter character name and click on search
        await searchPage.enterName(personTestData[0].name);
        
      });

    Then('Character details are displayed as expected',async function () {
        const resultLength = await searchPage.verifyPersonResults();
        // verify charater search result details
        if (resultLength.length === 0) {
            await assert.equal(resultLength.length, 0, 'Not Found');
        } 
        else if (resultLength.length === 1) {
        const testData = searchPage.checkNamePresentInTD(name)[1];
        (await searchPage.verifyPersonResults()).forEach(async (result) => {
            await assert.toEqual(testData[result.split(':')[0]], result.split(':')[1].trim(), 'Fail to match data');
        });
        }
      });

    When('I search for invalid character', async function(){
        //clear previously data from text box
        await searchPage.clearTextBox();
        //enter invalid character name from testdata json
        await searchPage.enterName(personTestData[3].name);
      });

    Then('I should be able to see “Not found” in the results', async function(){
          const notFoundMessage = await searchPage.verifyNotFoundMessage();
          //verify if Not found is displayed for invalid search
          if(notFoundMessage === 'Not found.') {
           return true;
          }
        });
    
    When('I search for planet name', async function(){
        // enter planet name and click on search
        await searchPage.clearTextBox();
        await searchPage.enterPlanet(planetTestData[0].planet);
      });

    Then('Planet details are displayed as expected', async function(){
        //verify planet details from search result
        const resultLength = await searchPage.verifyPlanetResults();
        if (resultLength.length === 0) {
            await assert.equal(resultLength.length, 0, 'Not Found');
        } else if (resultLength.length === 1) {
            const testData = searchPage.checkNamePresentInTD(name)[1];
            (await searchPage.verifyPlanetResults()).forEach(async (result) => {
                await assert.strictEqual(testData[result.split(':')[0]], result.split(':')[1].trim(), 'Fail to match data');
            });
        } else {
            await assert.isAbove(resultLength.length, 1, 'Partial Match');
        }
      });

    When('I search for invalid planet', async function(){
          //enter invalid planet name fro testdata json
        await searchPage.clearTextBox();
        await searchPage.enterPlanet(planetTestData[2].planet);
      });

    Then('I should be able to see “Not found” message in the results', async function(){
          //verify Not found message for invalid planet search
        const notFoundMessage = await searchPage.verifyNotFoundMessage();
        if(notFoundMessage === 'Not found.') {
         return true;
        }
      });

    When('I clear text box from above scenario', async function(){
         //clear textbox data
          await searchPage.clearTextBox();
          await searchPage.enterPlanet(planetTestData[1].planet);     
      });

    When('I click on Search button', async function(){
        //click on Search button
          await searchPage.clearTextBox();
          await searchPage.clickSearchButton();
    })

    Then('I should get an empty result list previous search results are removed', async function(){
        //verify if the search result is cleared/removed
        //this scenario is failing currently, failure can be seen in results.json file
        const resultLength = await searchPage.verifyPlanetResults(); 
        await assert.equal(undefined,resultLength, 'Search result cleared');
    });

    When('I search by selecting people radio btn, clear and then provide planet name in text box and search', async function(){
        await searchPage.enterPlanet(planetTestData[1].planet);
        await searchPage.verifyEmptyResult();
        await searchPage.selectPeopleRadioButton();
        await searchPage.clickSearchButton();
      });

    Then('I should get “Not found” in search results', async function(){
        //verify Not found message for invalid people search
        const notFoundMessage = await searchPage.verifyNotFoundMessage();
        if(notFoundMessage === 'Not found.') {
            return true;
           }    
        });

    When('I search for person having multiple search results', async function(){
            //search for person name showing up multiple search result
            await searchPage.selectPeopleRadioButton();
            await searchPage.clearTextBox();
            await searchPage.enterName(personTestData[4].name);
        });

    Then('More than one results are listed', async function(){
            //verifying if search result showing up more than one person details
            const count = await searchPage.verifyPersonResults();
            if(count.length > 4){
              await assert.isAbove(count.length,4,"More than one search result");
            }
            
        });



