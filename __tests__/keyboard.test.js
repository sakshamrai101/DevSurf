/**
 * ALL TESTS COMMENTED OUT 
 * this test was more for proof of concept, it had a problem with each iteration the tests 
 * would need to be changed to match the current website layout so we decided to scrap it
 * but to show out work we left a basic gereric version in 
 */

describe('Keyboard Navigability for the Login Page', () => {
  it ('Placeholder', async () => {
    expect(true).toBe(true);
  });
  // beforeAll(async () => {
  //   // PLACEHOLDER WEBSITE LINK REPLACE WITH DEPLOYEMENT LINK
  //   await page.goto('http://localhost:3000/index.html', {waitUntil: 'networkidle0'});
  // });

  // //check login page navigability
  // it('Login Page Check', async () => {
  //   // Start by focusing and testing the Sign-Up form
  //   // Focus the first input for the name
  //   await page.keyboard.press('Tab');  // Assumes body or another element gets focus first
  //   const nameInputFocused = await page.evaluate(() => document.activeElement.placeholder === 'Name');
  //   expect(nameInputFocused).toBe(true);

  //   // Tab to the PIN code input field in the Sign-Up form
  //   await page.keyboard.press('Tab');
  //   const pinCodeFocused = await page.evaluate(() => document.activeElement.placeholder === 'Choose a 6-digit PIN Code');
  //   expect(pinCodeFocused).toBe(true);

  //   // Tab to the Sign Up button
  //   await page.keyboard.press('Tab');
  //   const signUpButtonFocused = await page.evaluate(() => document.activeElement.innerText.includes('Sign Up'));
  //   expect(signUpButtonFocused).toBe(true);

  //   // Assuming a button to toggle to Sign-In, simulate click (might need to adjust based on actual controls)
  //   await page.click('#login');  // adjust the selector for your toggle button

  //   // Now test the Sign-In form
  //   // Focus the first PIN input by assuming previous button blurs
  //   await page.keyboard.press('Tab');
  //   const firstPinFocused = await page.evaluate(() => document.activeElement.classList.contains('pin-input'));
  //   expect(firstPinFocused).toBe(true);

  //   // Simulate tabbing through all PIN inputs
  //   for (let i = 1; i < 6; i++) {
  //     await page.keyboard.press('Tab');
  //     const pinFocused = await page.evaluate((i) => {
  //       const focusedElement = document.activeElement;
  //       return focusedElement.classList.contains('pin-input') && parseInt(focusedElement.dataset.index) === i;
  //     }, i);
  //     expect(pinFocused).toBe(true);
  //   }

  //   // Tab to the Sign In button
  //   await page.keyboard.press('Tab');
  //   const signInButtonFocused = await page.evaluate(() => document.activeElement.textContent.includes('Sign In'));
  //   expect(signInButtonFocused).toBe(true);
  // });
});

describe('Keyboard Navigability for the Home Page', () => {
  it ('Placeholder', async () => {
    expect(true).toBe(true);
  });
  // beforeAll(async () => {
  //   // PLACEHOLDER WEBSITE LINK REPLACE WITH DEPLOYEMENT LINK
  //   await page.goto('http://localhost:3000/home.html', {waitUntil: 'networkidle0'});
  // });

  // // Checks for home page navigability_______________________________________________________________________________________
  // it('should allow keyboard navigation to the navbar', async () => {
  //   await page.keyboard.press('Tab');  // Assume the navbar is the first focusable element
  //   const navFocused = await page.evaluate(() => document.activeElement.tagName === 'NAVBAR-COMPONENT');
  //   expect(navFocused).toBe(true);
  // });

  // it('should allow keyboard navigation to the search input', async () => {
  //   await page.keyboard.press('Tab');  // Assuming one tab from navbar to search input
  //   const searchFocused = await page.evaluate(() => document.activeElement.classList.contains('search-input'));
  //   expect(searchFocused).toBe(true);
  // });

  // it('should allow keyboard navigation to the small add button', async () => {
  //   const isVisible = await page.evaluate(() => {
  //     const btn = document.getElementById('small-add-button');
  //     return getComputedStyle(btn).display !== 'none';
  //   });
  //   expect(isVisible).toBe(false); // Since it starts hidden
  // });

  // it('should allow keyboard navigation to the big add button', async () => {
  //   await page.keyboard.press('Tab');  // Tab order depends on previous elements
  //   const bigButtonFocused = await page.evaluate(() => document.activeElement.id === 'big-add-button');
  //   expect(bigButtonFocused).toBe(true);
  // });

  // it('should allow keyboard navigation to scroll buttons', async () => {
  //   await page.keyboard.press('Tab');  // Adjust based on actual focus order
  //   const scrollButtonFocused = await page.evaluate(() => {
  //     const elem = document.activeElement;
  //     return elem.tagName === 'SCROLL-BUTTON' && elem.getAttribute('direction') === 'left';
  //   });
  //   expect(scrollButtonFocused).toBe(true);

  //   // Want to test the right button as well
  //   await page.keyboard.press('Tab');  // Navigate to the right scroll button
  //   const rightScrollButtonFocused = await page.evaluate(() => {
  //     const elem = document.activeElement;
  //     return elem.tagName === 'SCROLL-BUTTON' && elem.getAttribute('direction') === 'right';
  //   });
  //   expect(rightScrollButtonFocused).toBe(true);
  // });
});

describe('Keyboard Navigability for the Projects Page', () => {
  it ('Placeholder', async () => {
    expect(true).toBe(true);
  });
  // beforeAll(async () => {
  //   // PLACEHOLDER WEBSITE LINK REPLACE WITH DEPLOYEMENT LINK
  //   await page.goto('http://localhost:3000/Project.html', {waitUntil: 'networkidle0'});
  // });
  
  // // Checks for project page navigability_________________________________________________________________
  // it('should allow keyboard navigation to the navbar', async () => {
  //   await page.keyboard.press('Tab');  // Assuming navbar is the first focusable element
  //   const navFocused = await page.evaluate(() => document.activeElement.tagName === 'NAVBAR-COMPONENT');
  //   expect(navFocused).toBe(true);
  // });

  // it('should focus the textarea for notes', async () => {
  //   await page.keyboard.press('Tab');  // Depending on the number of focusable elements before textarea
  //   const textAreaFocused = await page.evaluate(() => document.activeElement.id === 'notepad');
  //   expect(textAreaFocused).toBe(true);
  // });

  // it('should verify accessibility of the file input via its label', async () => {
  //   await page.keyboard.press('Tab');  // Assuming one tab from textarea to the label of file input
  //   const fileInputFocused = await page.evaluate(() => {
  //     const fileInput = document.getElementById('fileInput');
  //     const label = document.querySelector('.code-snippets-button');
  //     return document.activeElement === label;
  //   });
  //   expect(fileInputFocused).toBe(true);
  // });

  // it('should focus the "Add Entry" button', async () => {
  //   await page.keyboard.press('Tab');  // Assuming one tab from label to button
  //   const addButtonFocused = await page.evaluate(() => document.activeElement.id === 'addEntryButton');
  //   expect(addButtonFocused).toBe(true);
  // });

  // it('should focus the "Add Milestone" button', async () => {
  //   await page.keyboard.press('Tab');  // Adjust based on actual focus order
  //   const addMilestoneFocused = await page.evaluate(() => document.activeElement.classList.contains('add-milestone'));
  //   expect(addMilestoneFocused).toBe(true);
  // });

  // it('should allow keyboard navigation to the project milestones', async () => {
  //   await page.keyboard.press('Tab');  // Assuming one tab from the "Add Milestone" button
  //   const milestoneListFocused = await page.evaluate(() => document.activeElement.classList.contains('milestone-list'));
  //   expect(milestoneListFocused).toBe(false); // Assuming <ul> is not focusable by default, adjust if needed
  // });

  // it('should test keyboard interaction with the timeline', async () => {
  //   await page.keyboard.press('Tab');  // Adjust based on actual focus order
  //   const timelineFocused = await page.evaluate(() => document.activeElement.id === 'timeline-elements');
  //   expect(timelineFocused).toBe(false); // Assuming <ul> is not focusable by default, adjust if needed
  // });
});