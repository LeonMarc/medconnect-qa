// Generated from: features\login.feature
import { test } from "playwright-bdd";

test.describe('Login en MedConnect', () => {

  test('A professional logs in with valid credentials', async ({ Given, When, Then, page }) => { 
    await Given('I am on the login page', null, { page }); 
    await When('I log in with email "dra.rivas@medconnect.test" and password "Salud2024!"', null, { page }); 
    await Then('I see the feed greeting', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I log in with email \"dra.rivas@medconnect.test\" and password \"Salud2024!\"","stepMatchArguments":[{"group":{"start":20,"value":"\"dra.rivas@medconnect.test\"","children":[{"start":21,"value":"dra.rivas@medconnect.test","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":61,"value":"\"Salud2024!\"","children":[{"start":62,"value":"Salud2024!","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I see the feed greeting","stepMatchArguments":[]}]},
]; // bdd-data-end