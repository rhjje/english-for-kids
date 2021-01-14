/* eslint-disable no-param-reassign */
const statistics = {
  init() {
    fetch('./assets/json/cards.json')
      .then((result) => result.json())
      .then((result) => {
        const allWords = result.flat();
        const commonArray = [];
        allWords.forEach((item) => {
          const currentObj = {
            word: item.word,
            translation: item.translation,
            category: item.category,
            clicks: 0,
            correct: 0,
            wrong: 0,
            percent: 0,
          };
          commonArray.push(currentObj);
        });
        localStorage.setItem('english-for-kids', `${JSON.stringify(commonArray)}`);
      });
  },

  countingStatistics(word, category) {
    const stat = JSON.parse(localStorage.getItem('english-for-kids'));
    stat.forEach((item) => {
      if (item.word === word) {
        switch (category) {
          case 'clicks':
            item.clicks += 1;
            break;
          case 'correct':
            item.correct += 1;
            break;
          case 'wrong':
            item.wrong += 1;
            break;
          default:
            break;
        }
        if (item.wrong + item.correct > 0) {
          item.percent = (item.wrong * 100) / (item.wrong + item.correct);
        }
      }
    });
    localStorage.setItem('english-for-kids', `${JSON.stringify(stat)}`);
  },

  buildingTable(data) {
    const container = document.querySelector('.container .wrapper');
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const statContainer = document.createElement('div');
    statContainer.classList.add('stat-container');

    const buttons = document.createElement('div');
    buttons.classList.add('panel-buttons');

    const repeatButton = document.createElement('div');
    repeatButton.classList.add('repeat-button');
    const spanRepeat = document.createElement('span');
    spanRepeat.innerText = 'Repeat difficult words';
    repeatButton.appendChild(spanRepeat);

    const resetButton = document.createElement('div');
    resetButton.classList.add('reset-button');
    const spanReset = document.createElement('span');
    spanReset.innerText = 'Reset';
    resetButton.appendChild(spanReset);

    buttons.appendChild(repeatButton);
    buttons.appendChild(resetButton);

    const table = document.createElement('table');
    table.classList.add('table');

    // add elements to page
    statContainer.appendChild(buttons);
    statContainer.appendChild(table);
    container.appendChild(statContainer);

    resetButton.addEventListener('click', () => {
      this.resetLocalStorage();
    });

    repeatButton.addEventListener('click', () => {
      this.repeatWords();
    });

    // rendering table
    table.innerHTML = `<tr>
      <th>Word</th>
      <th>Translation</th>
      <th>Category</th>
      <th>Clicks</th>
      <th>Correct</th>
      <th>Wrong</th>
      <th>% errors</th>
    </tr>`;
    data.forEach((row) => {
      table.innerHTML += `<tr>
        <td>${row.word}</td>
        <td>${row.translation}</td>
        <td>${row.category}</td>
        <td>${row.clicks}</td>
        <td>${row.correct}</td>
        <td>${row.wrong}</td>
        <td>${row.percent.toFixed(1)}</td>
      </tr>`;
    });

    const tableHead = document.querySelectorAll('th');
    tableHead.forEach((heading) => {
      heading.addEventListener('click', () => {
        if (heading.innerText[0] === '↓') {
          this.sortColumn(heading.innerText.slice(2), false);
        } else if (heading.innerText[0] === '↑') {
          this.sortColumn(heading.innerText.slice(2), true);
        } else {
          this.sortColumn(heading.innerText, true);
        }
      });
    });
  },

  sortObject(obj, key = 'word') {
    obj.sort((a, b) => {
      if (a[`${key}`] > b[`${key}`]) {
        return 1;
      }
      if (a[`${key}`] < b[`${key}`]) {
        return -1;
      }
      return 0;
    });

    return obj;
  },

  sortColumn(key, directOrder) {
    const stat = JSON.parse(localStorage.getItem('english-for-kids'));
    if (key === '% errors') {
      key = 'percent';
    }
    const dataForTable = this.sortObject(stat, key.toLowerCase());

    let arrow;
    if (directOrder && key.match(/Word|Translation|Category/)) {
      arrow = '&darr;';
      this.buildingTable(dataForTable);
    } else if (key.match(/Word|Translation|Category/)) {
      arrow = '&uarr;';
      this.buildingTable(dataForTable.reverse());
    } else if (directOrder) {
      arrow = '&darr;';
      this.buildingTable(dataForTable.reverse());
    } else {
      arrow = '&uarr;';
      this.buildingTable(dataForTable);
    }

    let title;
    switch (key) {
      case 'Word':
        title = document.querySelector('th:first-child');
        break;
      case 'Translation':
        title = document.querySelector('th:nth-child(2)');
        break;
      case 'Category':
        title = document.querySelector('th:nth-child(3)');
        break;
      case 'Clicks':
        title = document.querySelector('th:nth-child(4)');
        break;
      case 'Correct':
        title = document.querySelector('th:nth-child(5)');
        break;
      case 'Wrong':
        title = document.querySelector('th:nth-child(6)');
        break;
      case 'percent':
        title = document.querySelector('th:last-child');
        break;
      default:
        break;
    }
    title.innerHTML = `${arrow} ${title.innerHTML}`;
  },
};

if (!localStorage.getItem('english-for-kids')) {
  statistics.init();
}

export default statistics;
