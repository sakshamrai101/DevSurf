const puppeteer = require('puppeteer');

describe('Project Page E2E Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/Project.html', { waitUntil: 'networkidle2', timeout: 60000 });
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should display the project list', async () => {
    await page.waitForSelector('#milestone-list');
    const milestoneListExists = await page.$('#milestone-list') !== null;
    expect(milestoneListExists).toBe(true);
  }, 10000); // Increase timeout to 10 seconds

  test('should add a new milestone to the list', async () => {
    // Ensure the milestone list and timeline elements are present
    await page.waitForSelector('#milestone-list');
    await page.waitForSelector('#timeline-elements');

    // Add a new milestone using the provided JavaScript function
    await page.evaluate(() => {
        addMilestone('Test Milestone');
    });

    // Wait for the new milestone to be added to the list
    await page.waitForFunction(
        () => {
            const milestones = document.querySelectorAll('#milestone-list li .milestone-name');
            return Array.from(milestones).some(el => el.textContent.includes('Test Milestone'));
        },
        { timeout: 60000 }
    );

    // Find the milestone with the specific text
    const milestoneText = await page.evaluate(() => {
        const milestones = document.querySelectorAll('#milestone-list li .milestone-name');
        const milestone = Array.from(milestones).find(el => el.textContent.includes('Test Milestone'));
        return milestone ? milestone.textContent : null;
    });
    expect(milestoneText).toBe('Test Milestone');

    // Verify the timeline element is also added
    const timelineText = await page.$eval('#timeline-elements li:nth-last-child(2) span', el => el.textContent);
    expect(timelineText).toBe('Test Milestone');
  }, 10000);

  test('should add a new task to a milestone', async () => {
    await page.evaluate(() => {
      addTask(document.querySelector('.add-task'), 1, 'Test Task');
    });

    await page.waitForSelector('#task-list1 li:last-child label');
    const taskText = await page.$eval('#task-list1 li:last-child label', el => el.textContent);
    expect(taskText).toBe('Test Task');
  }, 10000); // Increase timeout to 10 seconds

  test('should update progress on task completion', async () => {
    await page.evaluate(() => {
        const taskCheckbox = document.querySelector('#task-list1 input[type="checkbox"]');
        if (taskCheckbox) {
            taskCheckbox.checked = true;
            taskCheckbox.dispatchEvent(new Event('click'));
        }
    });

    await page.waitForFunction(() => document.querySelector('#progress1').style.width === '100%');
    const progressWidth = await page.$eval('#progress1', el => el.style.width);
    expect(progressWidth).toBe('100%');
  }, 30000);

  test('should delete a task', async () => {
    await page.evaluate(() => {
        const deleteButton = document.querySelector('#task-list1 .milestone-trash');
        if (deleteButton) {
            deleteButton.click();
        }
    });

    await page.waitForFunction(() => document.querySelectorAll('#task-list1 li').length === 0);
    const taskCount = await page.$$eval('#task-list1 li', tasks => tasks.length);
    expect(taskCount).toBe(0);
  }, 10000); 

  test('should delete a milestone', async () => {
    await page.evaluate(() => {
      const deleteButton = document.querySelector('#milestone-list .milestoneX');
      if (deleteButton) {
        deleteButton.click();
      }
    });

    await page.waitForFunction(() => document.querySelectorAll('#milestone-list li').length === 0);
    const milestoneCount = await page.$$eval('#milestone-list li', milestones => milestones.length);
    expect(milestoneCount).toBe(0);
  }, 10000); // Increase timeout to 10 seconds

  test('should save milestones to localStorage', async () => {
    await page.evaluate(() => {
      addMilestone('LocalStorage Test Milestone');
      saveMilestoneToStorage();
    });

    const milestones = await page.evaluate(() => localStorage.getItem('milestones'));
    expect(milestones).toContain('LocalStorage Test Milestone');
  }, 10000); // Increase timeout to 10 seconds

  test('should save tasks to localStorage', async () => {
    await page.evaluate(() => {
      addMilestone('Milestone 1');
      const addTaskButton = document.querySelector('.add-task');
      addTask(addTaskButton, 1, 'LocalStorage Test Task', false, '');
      saveTasksArrayToStorage();
    });

    const tasks = await page.evaluate(() => localStorage.getItem('tasks'));
    expect(tasks).toContain('LocalStorage Test Task');
  }, 10000);
});


describe('Project Page Notes and Entry functionality', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/project.html', { waitUntil: 'networkidle2', timeout: 60000 });
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should display placeholder text in the input box when empty', async () => {
    const placeholderText = await page.$eval('#notepad', el => el.getAttribute('placeholder'));
    expect(placeholderText).toBe('Write your notes here...');
  }, 10000);

  test('should load entries from localStorage and display them', async () => {
    await page.evaluate(() => {
        localStorage.setItem('entries', JSON.stringify([
            { title: 'Entry 1', content: 'Content of Entry 1', type: 'notes', images: [] },
            { title: 'Entry 2', content: 'Content of Entry 2', type: 'notes', images: [] }
        ]));
        location.reload();
    });

    await page.waitForSelector('.entry-tile');
    const entryCount = await page.$$eval('.entry-tile', entries => entries.length);
    expect(entryCount).toBe(2);
});

test('should add a new entry', async () => {
    await page.click('#notepad');
    await page.type('#notepad', 'New Entry Content');
    await page.click('#addEntryButton');

    await page.waitForSelector('.entry-tile:last-child h3');
    const entryTitle = await page.$eval('.entry-tile:last-child h3', el => el.textContent);
    const entryContent = await page.$eval('.entry-tile:last-child p', el => el.textContent);
    expect(entryTitle).toBe('Entry 3');
    expect(entryContent).toBe('New Entry Content');
});

test('should edit an existing entry', async () => {
  await page.hover('.entry-tile:last-child');
  await page.click('.entry-tile:last-child .edit-icon');
  await page.click('#notepad');
  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');
  await page.type('#notepad', 'Edited Entry Content');
  await page.click('#addEntryButton');

  const entryContent = await page.$eval('.entry-tile:last-child p', el => el.textContent);
  expect(entryContent).toBe('Edited Entry Content');
});

test('should delete an entry', async () => {
    await page.hover('.entry-tile:last-child');
    const trashIcon = await page.$('.entry-tile:last-child .trash-icon');
    await trashIcon.click();
    await page.waitForFunction(() => document.querySelectorAll('.entry-tile').length === 2);
    const entryCount = await page.$$eval('.entry-tile', entries => entries.length);
    expect(entryCount).toBe(2);
});

test('should display entry details', async () => {
    await page.click('.entry-tile:first-child');

    await page.waitForSelector('#dynamicIsland');
    const islandTitle = await page.$eval('#islandTitle', el => el.textContent);
    const islandContent = await page.$eval('#islandContent p', el => el.textContent);
    expect(islandTitle).toBe('Entry 1');
    expect(islandContent).toBe('Content of Entry 1');
});

test('should close', async () => {
    await page.click('#closeIsland');

    await page.waitForFunction(() => document.getElementById('dynamicIsland').style.display === 'none');
    const islandDisplay = await page.$eval('#dynamicIsland', el => window.getComputedStyle(el).display);
    expect(islandDisplay).toBe('none');
});

test('adding multiple entries', async () => {
  for (let i = 0; i < 5; i++) {
    await page.click('#notepad');
    await page.type('#notepad', 'New Entry Content');
    await page.click('#addEntryButton');

    await page.waitForSelector('.entry-tile:last-child h3');
  } 
  const entryTitle = await page.$eval('.entry-tile:last-child h3', el => el.textContent);
  const entryContent = await page.$eval('.entry-tile:last-child p', el => el.textContent);
  const entryCount = await page.$$eval('.entry-tile', entries => entries.length);
  expect(entryCount).toBe(7);
  expect(entryTitle).toBe('Entry 7');
  expect(entryContent).toBe('New Entry Content');
});

test('deleting multiple entries', async () => {
  for (let i = 0; i < 5; i++) {
    await page.hover('.entry-tile:first-child');
    const trashIcon = await page.$('.entry-tile:first-child .trash-icon');
    await trashIcon.click();
}
const entryCount = await page.$$eval('.entry-tile', entries => entries.length);
expect(entryCount).toBe(7-5);
}, 15000);

test('notepad textbox changes when markdown button is clicked', async () => {
  await page.click('.note-type-button[data-type="markdown"]');
    const placeholderText = await page.$eval('#markdown', el => el.getAttribute('placeholder'));
    expect(placeholderText).toBe('Write your markdown here...');
}, 10000);


test('log out button goes to sign-in page', async () => {
  await page.waitForSelector('.logout-button');
  await page.hover('.logout-button');
  await page.click('.logout-button');
  
  const url = page.url();
  expect(url).toContain('index.html');
});

test('home button goes to home page', async () => {
  await page.goto('http://localhost:3000/project.html');
  await page.waitForSelector('.home-button');
  await page.hover('.home-button');
  await page.click('.home-button');
  
  const url = page.url();
  expect(url).toContain('home.html');
});


test('should render markdown note with clickable link', async () => {
  await page.goto('http://localhost:3000/project.html');
  await page.click('.note-type-button[data-type="markdown"]');
  const markdownContent = '[Youtube](https://www.youtube.com)';
  await page.type('#markdown', markdownContent);
  await page.click('#addEntryButton');
  await page.waitForSelector('.entry-tile:last-child');
  await page.click('.entry-tile:last-child');
  await page.waitForSelector('#dynamicIsland .markdown-view a');
  const linkHref = await page.$eval('#dynamicIsland .markdown-view a', el => el.href);
  expect(linkHref).toBe('https://www.youtube.com/');
  const linkText = await page.$eval('#dynamicIsland .markdown-view a', el => el.textContent);
  expect(linkText).toBe('Youtube');
}, 15000);


});

