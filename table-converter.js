var NL = "\n";
var textarea, button, result, processor;

function setup() {
  textarea = doc('pastebox');
  button = doc('convert');
  result = doc('result');
  processor = doc('processor');

  button.addEventListener('click', function() {
    convertTable();
  });
}

function doc(id) {
  return document.getElementById(id) || document.getElementsByTagName(id)[0];
}

function convertTable() {
  var content = textarea.value;
  processor.innerHTML = content.replace(/\s+/g, ' ');

  var tables = processor.getElementsByTagName('table');
  var markdownResults = '';
  if(tables) {
    for(let e of tables) {
      var markdownTable = convertTableElementToMarkdown(e);
      markdownResults += markdownTable + NL + NL;
    }
    reportResult(tables.length + ' tables found. ' + NL + NL + markdownResults);
  }
  else {
    reportResult('No table found');
  }
}

function reportResult(message) {
  result.innerHTML = message;
}

function convertTableElementToMarkdown(tableEl) {
  var rows = [];
  var trEls = tableEl.getElementsByTagName('tr');
  for(var i=0; i<trEls.length; i++) {
    var tableRow = trEls[i];
    var markdownRow = convertTableRowElementToMarkdown(tableRow, i);
    rows.push(markdownRow);
  }
  return rows.join(NL);
}

function convertTableRowElementToMarkdown(tableRowEl, rowNumber) {
  var cells = [];
  var cellEls = tableRowEl.children;
  for(var i=0; i<cellEls.length; i++) {
    var cell = cellEls[i];
    cells.push(cell.innerText + ' |');
  }
  var row = '| ' + cells.join(" ");

  if(rowNumber == 0) {
    row = row + NL + createMarkdownDividerRow(cellEls.length);
  }

  return row;
}

function createMarkdownDividerRow(cellCount) {
  var dividerCells = [];
  for(i = 0; i<cellCount; i++) {
    dividerCells.push('---' + ' |');
  }
  return '| ' + dividerCells.join(" ");
}

setup();
