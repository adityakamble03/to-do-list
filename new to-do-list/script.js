showTask();

function addTask(){
  let array = JSON.parse(localStorage.getItem("task"));

  if(array === null){
    array = [];
  }
  const incomplete = 'incomplete';
  const task = document.querySelector('.enter-task').value;
  const category = document.querySelector('.enter-category').value;
  const tags = document.querySelector('.enter-tags').value;
  const date = document.querySelector('.enter-date').value;
  const priority = document.querySelector('.enter-priority').value;

  document.querySelector('.enter-task').value='';
  document.querySelector('.enter-category').value='';
  document.querySelector('.enter-tags').value='';
  document.querySelector('.enter-date').value='';
  document.querySelector('.enter-priority').value='';

  const taskObject = {
    incomplete, task, category, tags, date, priority};

  console.log(taskObject);
  array.push(taskObject);
  let taskString = JSON.stringify(array);
  localStorage.setItem("task", taskString);
    showTask();
}

function searchTask(){
  const array = JSON.parse(localStorage.getItem("task"));
  
  const search = document.querySelector('.search-task').value;

  for(let i=0 ; i<array.length ; i++){
    const percentage = calculateStringSimilarity(array[i].task, search);

    if(percentage > 70){
        
    }
  }
}

function levenshteinDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j],    
          dp[i][j - 1],    
          dp[i - 1][j - 1]
        ) + 1;
      }
    }
  }

  return dp[m][n];
}

function calculateStringSimilarity(str1, str2){
  const distance = levenshteinDistance(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);
  const similarityPercentage = ((maxLength - distance) / maxLength) * 100;
  return similarityPercentage;
}
/*
function showTask(){
  let array = JSON.parse(localStorage.getItem("task"));
  
  let totalHtml = "";

  for(let i=0; i < array.length ; i++){
    let subArray = JSON.parse(localStorage.getItem(`subtask${i}`));

    let subhtml = '';
    if(subArray !== null){
      for(let j=0; j<subArray.length; j++){
        let html = `
        <div class="display-sub-task">
        <button class="complete-sub-button" onclick="completeSubTask(${i},${j})">
          ${subArray[j].incomplete}
        </button>
        <p>
        sub-Task ${j+1}
        </p>
        <p>
        ${subArray[j].subTask}
        </p>
        <button onclick="editSubTask(${i},${j});" class="subtask-edit-button">
        Edit
        </button>
        <button onclick="deleteSubTask(${i},${j});" class="subtask-delete-button">
        Delete
        </button>
        </div>
        `;
        subhtml += html;
      }
    }
    

    let innerHtml = `
    <div class="display-one-task"> 
      <button class="complete-button" onclick="completeTask(${i});">
        ${array[i].incomplete}
      </button>
      <p>
      Task ${i+1}
      <p> 
      <p>
      ${array[i].task}
      </p>
      <p>
      Due Date : ${array[i].date}
      </p>
      <p>
      Priority : ${array[i].priority}
      </p>
      ${subhtml}
      <button class="edit-button" onclick="editTask(${i});">
      Edit
      </button>
      <button class="delete-button" onclick="deleteTask(${i});">
      Delete
      </button>
    </div>
  `;  
    totalHtml += innerHtml;
  }
  document.querySelector('.display-to-do-list').innerHTML = totalHtml;    
}
*/
function showTask() {
  let array = JSON.parse(localStorage.getItem("task"));

  if (!Array.isArray(array)) {
    array = [];
  }

  let totalHtml = "";

  for (let i = 0; i < array.length; i++) {
    let subArray = JSON.parse(localStorage.getItem(`subtask${i}`));

    if (!Array.isArray(subArray)) {
      subArray = [];
    }

    let subhtml = '';
    for (let j = 0; j < subArray.length; j++) {
      let html = `
        <div class="display-sub-task">
          <button class="complete-sub-button" onclick="completeSubTask(${i},${j})">
            ${subArray[j].incomplete}
          </button>
          <p>
            sub-Task ${j + 1}
          </p>
          <p>
            ${subArray[j].subTask}
          </p>
          <button onclick="editSubTask(${i},${j});" class="subtask-edit-button">
            Edit
          </button>
          <button onclick="deleteSubTask(${i},${j});" class="subtask-delete-button">
            Delete
          </button>
        </div>
      `;
      subhtml += html;
    }

    let innerHtml = `
      <div class="display-one-task"> 
        <button class="complete-button" onclick="completeTask(${i});">
          ${array[i].incomplete}
        </button>
        <p>
          Task ${i + 1}
        </p> 
        <p>
          ${array[i].task}
        </p>
        <p>
          Due Date : ${array[i].date}
        </p>
        <p>
          Priority : ${array[i].priority}
        </p>
        ${subhtml}
        <button class="edit-button" onclick="editTask(${i});">
          Edit
        </button>
        <button class="delete-button" onclick="deleteTask(${i});">
          Delete
        </button>
      </div>
    `;

    totalHtml += innerHtml;
  }

  document.querySelector('.display-to-do-list').innerHTML = totalHtml;
}

 
function editTask(i){
  let array = JSON.parse(localStorage.getItem("task"));
  document.querySelectorAll('.display-one-task').forEach((value,index) =>{
    if(index === i){
      let temp = array[i].priority;
      let temp_low,temp_medium,temp_high;
      if(temp === 'low'){
        temp_low='selected';
        temp_medium='';
        temp_high='';
      }

      if(temp === 'low'){
        temp_low='';
        temp_medium='selected';
        temp_high='';
      }

      if(temp === 'low'){
        temp_low='';
        temp_medium='';
        temp_high='selected';
      }

      let subArray = JSON.parse(localStorage.getItem(`subtask${i}`));

      let subhtml = '';
      if(subArray !== null){
        for(let j=0;j<subArray.length;j++){
          let html = `<div class="display-sub-task">
          <button>
            ${subArray[j].incomplete}
          </button>
          <p>
          sub-Task ${j+1}
          </p>
          <p>
          ${subArray[j].subTask}
          </p>
          <button onclick="editSubTask(${i},${j});" class="subtask-edit-button">
          Edit
          </button>
          <button onclick="deleteSubTask(${i},${j});" class="subtask-delete-button">
          Delete
          </button>
          </div>`;
          subhtml += html;
        }
      }
      
      
      let innerHtml = `
      <div>
      <button class="complete-button" onclick="completeTask(${i});">
        ${array[i].incomplete}
      </button>
      <p>
      Task ${i+1}
      </p>
      <input class="enter-task-1" type = "text" value = "${array[i].task}">
      <input class="enter-category-1" type = "text" value = "${array[i].category}">
      <input class="enter-tags-1" type = "text" value = "${array[i].tags}">
      <input class="enter-date-1" type = "date" value = ${array[i].date}>
      <select class="enter-priority-1" name="priority">
          <option value="none"disabled hidden>select priority</option>
          <option value="low" ${temp_low}>low</option>
          <option value="medium" ${temp_medium}>medium</option>
          <option value="high" ${temp_high}>high</option>
      </select>
      <input class="enter-subtask" type="text" placeholder="enter subtask" data-task-index="${i}">
      <button onclick="addSubTask(${i});">
      Add
      </button>
      ${subhtml}
      <button onclick = "saveTask(${i});">
      Save
      </button>
      <button class="delete-button" onclick = "deleteTask(${i});">
      Delete
      </button>
      </div>
      `;
      value.innerHTML = innerHtml;
    }
  });
}

function saveTask(i){
  const task = document.querySelector('.enter-task-1').value;
  const category = document.querySelector('.enter-category-1').value;
  const tags = document.querySelector('.enter-tags-1').value;
  const date = document.querySelector('.enter-date-1').value;
  const priority = document.querySelector('.enter-priority-1').value;
  let array = JSON.parse(localStorage.getItem("task"));

  array[i].task=task;
  array[i].category=category;
  array[i].tags=tags
  array[i].date=date;
  array[i].priority=priority;

  let taskString = JSON.stringify(array);
  localStorage.setItem("task",taskString);

  showTask();
}

function deleteTask(i){
  let array = JSON.parse(localStorage.getItem("task"));

  array.splice(i,1);

  let taskString = JSON.stringify(array);
  localStorage.setItem("task",taskString);
  showTask();
}

function completeTask(i){
  let array = JSON.parse(localStorage.getItem("task"));
  if(array[i].incomplete === 'incomplete'){
    array[i].incomplete = 'completed';
    document.querySelectorAll('.complete-button').forEach((value,index)=>{
      if(index === i){
        let html = `${array[i].incomplete}`;
        value.innerHTML=html;
      }
    });
  }
  else{
    array[i].incomplete = 'incomplete';
    document.querySelectorAll('.complete-button').forEach((value,index)=>{
      if(index === i){
        let html = `${array[i].incomplete}`;
        value.innerHTML=html;
      }
    });
  }
  
  let taskString = JSON.stringify(array);
  localStorage.setItem("task", taskString);
}

function dateFilter(){
  let array = JSON.parse(localStorage.getItem("task"));

  const date_1 = document.querySelector('.filter-date-1').value;
  const date_2 = document.querySelector('.filter-date-2').value;

  let totalhtml = '';
  for(let i=0;i<array.length;i++){
    const {date} = array[i];
    let html='';
    if(date_1 <= date && date_2 >= date){
      let html = `
      <div class="display-one-task">
        <button class="complete-button"onclick="completeTask(${i});">
          ${array[i].incomplete}
        </button>
        <p> 
        Task ${i+1}
        <p> 
        <p>
        ${array[i].task}
        </p>
        <p>
        Due Date : ${array[i].date}
        </p>
        <p>
        Priority : ${array[i].priority}
        </p>
        <button class="edit-button" onclick="editTask(${i});">
        Edit
        </button>
        <button class="delete-button" onclick="deleteTask(${i});">
        Delete
        </button>
      </div>
      `;
      totalhtml +=html;
    }
  }
  document.querySelector('.display-to-do-list').innerHTML = totalhtml;

}

function categoryFilter(){
  let array = JSON.parse(localStorage.getItem("task"));

  const category = document.querySelector('.filter-category-1').value;

  let totalhtml = '';
  for(let i=0;i<array.length;i++){
    let html = '';
    if(array[i].category === category){
      let html = `
      <div class="display-one-task">
        <button class="complete-button"onclick="completeTask(${i});">
          ${array[i].incomplete}
        </button>
        <p> 
        Task ${i+1}
        <p> 
        <p>
        ${array[i].task}
        </p>
        <p>
        Due Date : ${array[i].date}
        </p>
        <p>
        Priority : ${array[i].priority}
        </p>
        <button class="edit-button" onclick="editTask(${i});">
        Edit
        </button>
        <button class="delete-button" onclick="deleteTask(${i});">
        Delete
        </button>
      </div>
    `;
    totalhtml+=html;
    }
  }
  document.querySelector('.display-to-do-list').innerHTML = totalhtml;
}

function priorityFilter(){
  let array = JSON.parse(localStorage.getItem("task"));
  const priority = document.querySelector('.filter-priority-1').value;
  
  let totalhtml='';
  for(let i=0;i<array.length;i++){
    let html='';
    if(array[i].priority === priority){
      let html = `
      <div class="display-one-task">
        <button class="complete-button"onclick="completeTask(${i});">
          ${array[i].incomplete}
        </button>
        <p> 
        Task ${i+1}
        <p> 
        <p>
        ${array[i].task}
        </p>
        <p>
        Due Date : ${array[i].date}
        </p>
        <p>
        Priority : ${array[i].priority}
        </p>
        <button class="edit-button" onclick="editTask(${i});">
        Edit
        </button>
        <button class="delete-button" onclick="deleteTask(${i});">
        Delete
        </button>
      </div>
    `;
    totalhtml += html;
    }
  }
  document.querySelector('.display-to-do-list').innerHTML = totalhtml;
  
}

/*
function addSubTask(i){
  let array = JSON.parse(localStorage.getItem("task"));

  let subArray = JSON.parse(localStorage.getItem(`subtask${i}`));

  if(subArray === null){
    subArray = [];
  }

  let subTask = '';
  
  document.querySelectorAll('.enter-subtask').forEach((task,index)=>{
    if(index === i){
      subTask = task.value;
    }
  });
  /*
  const taskElements = document.querySelectorAll('.display-one-task');
  
  if (i < taskElements.length) {
    const subtaskElements = taskElements[i].querySelectorAll('.enter-subtask');
    
    if (j < subtaskElements.length) {
     subTask = subtaskElements[j];
    }
  } 

  const incomplete = 'incomplete';
  const subTaskObject = {incomplete , subTask};

  subArray.push(subTaskObject);
  const string = JSON.stringify(subArray);
  localStorage.setItem(`subtask${i}`,string);
}
*/
function addSubTask(i) {
  let array = JSON.parse(localStorage.getItem("task"));

  let subArray = JSON.parse(localStorage.getItem(`subtask${i}`));

  if (subArray === null) {
    subArray = [];
  }

  let subTask = '';

  const subtaskInput = document.querySelector(`.enter-subtask[data-task-index="${i}"]`);
  if (subtaskInput) {
    subTask = subtaskInput.value;
  }

  const incomplete = 'incomplete';
  const subTaskObject = { incomplete, subTask };

  subArray.push(subTaskObject);
  const string = JSON.stringify(subArray);
  localStorage.setItem(`subtask${i}`, string);
}

function editSubTask(i,j){
  let subArray = JSON.parse(localStorage.getItem(`subtask${i}`));
  let subTask = '';
  const taskElements = document.querySelectorAll('.display-one-task');
  
  if (i < taskElements.length) {
    const subtaskElements = taskElements[i].querySelectorAll('.display-sub-task');
    
    if (j < subtaskElements.length) {
     subTask = subtaskElements[j];
    }
  } 
  
  let html = `
    <button>
      ${subArray[j].incomplete}
    </button>
    <p>
    sub-Task ${j+1}
    </p>
    <p>
    <input class="enter-sub-task" type="text" value="${subArray[j].subTask}">
    </p>
    <button onclick="saveSubTask(${i},${j});" class="subtask-save-button">
    Save
    </button>
    <button onclick="deleteSubTask(${i},${j});" class="subtask-delete-button">
    Delete
    </button>
  `;
  subTask.innerHTML = html;
}

function saveSubTask(i,j){
  let subArray = JSON.parse(localStorage.getItem(`subtask${i}`));
  const taskElements = document.querySelectorAll('.display-one-task');

  let subTask = '';
  if (i < taskElements.length) {
    const subtaskElements = taskElements[i].querySelectorAll('.enter-sub-task');
    
    if (j < subtaskElements.length) {
     subTask = subtaskElements[j].value;
    }
  } 
  subArray[j].subTask = subTask;
  let subDisplay='';
  if (i < taskElements.length) {
    const subtaskElements = taskElements[i].querySelectorAll('.display-sub-task');
    
    if (j < subtaskElements.length) {
     subDisplay = subtaskElements[j];
    }
  } 

  
  let html = `
    <button>
      ${subArray[j].incomplete}
    </button>
    <p>
    sub-Task ${j+1}
    </p>
    <p>
    ${subArray[j].subTask}
    </p>
    <button onclick="editSubTask(${i},${j});" class="subtask-edit-button">
    Edit
    </button>
    <button onclick="deleteSubTask(${i},${j});" class="subtask-delete-button">
    Delete
    </button>
  `;
  subDisplay.innerHTML = html;
  let string = JSON.stringify(subArray);
  localStorage.setItem(`subtask${i}`, string);
}

function deleteSubTask(i,j){
  let subArray = JSON.parse(localStorage.getItem(`subtask${i}`));

  subArray.splice(j,1);

  let string = JSON.stringify(subArray);
  localStorage.setItem(`subtask${i}`, string);
}

function completeSubTask(i,j){
  let subArray = JSON.parse(localStorage.getItem(`subtask${i}`));
  let subTask = '';
  const taskElements = document.querySelectorAll('.display-one-task');
  
  if (i < taskElements.length) {
    const subtaskElements = taskElements[i].querySelectorAll('.complete-sub-button');
    
    if (j < subtaskElements.length) {
     subTask = subtaskElements[j];
    }
  }
  
  if(subTask.innerHTML === 'incomplete'){
    subArray[j].incomplete = 'completed';
  }
  else{
    subArray[j].incomplete = 'incomplete';
    
  }
  subTask.innerHTML = `${subArray[j].incomplete}`;
  let string = JSON.stringify(subArray);
  localStorage.setItem(`subtask${i}`, string);
}

function sortingFilter(){
  let array = JSON.parse(localStorage.getItem("task"));
  
  const task = document.querySelector('.sorting-filter-1').value;
  
  if(task === 'Duedate'){
    dateSorting();
    console.log(array);
  }
}

function dateSorting(){
  let array = JSON.parse(localStorage.getItem("task"));
  array.sort((a, b) =>{
    return (a.date) - (b.date);
  });
}