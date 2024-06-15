const checkBoxList = document.querySelectorAll('.custom-checkbox');
const inputFeilds = document.querySelectorAll('.goal-input');
const progressBar = document.querySelector('.progress-bar');
const progressValue=document.querySelector('.progress-value');
const progressLabel=document.querySelector('.progress-label');

const quotes=[
    'Raise the bar by completing your goals!',
    ' Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D'

]


const allGoals=JSON.parse(localStorage.getItem('allGoals'))||{
    first:{
        name:'',
        completed:false
    },
    second:{
        name:'',
        completed:false
    },
    third:{
        name:'',
        completed:false
    }
};
let completedGoalsCount=Object.values(allGoals).filter((goal)=>goal.completed).length;
progressValue.style.width=`${completedGoalsCount/3*100}%`;
progressValue.firstElementChild.innerText=`${completedGoalsCount}/3completed`;

progressLabel.innerText=quotes[completedGoalsCount];

checkBoxList.forEach((checkBox) => {
  checkBox.addEventListener("click", () => {
    let allGoalsAdded = [...inputFeilds].every((inputField) => {
      return inputField.value;
    });
    if (allGoalsAdded) {
      checkBox.parentElement.classList.toggle('completed');
     
      const inputId=checkBox.nextElementSibling.id;
      allGoals[inputId].completed=!allGoals[inputId].completed;
      completedGoalsCount=Object.values(allGoals).filter((goal)=>goal.completed).length;
      progressLabel.innerText=quotes[completedGoalsCount];
       progressValue.style.width=`${completedGoalsCount/3*100}%`;
       progressValue.firstElementChild.textContent=`${completedGoalsCount}/3completed`;
      localStorage.setItem('allGoals',JSON.stringify(allGoals));

      
    } else {
      progressBar.classList.add('showError');
    }
  });
});

inputFeilds.forEach((inputFeild)=>{

  
    inputFeild.value=allGoals[inputFeild.id].name;
    if (allGoals[inputFeild.id].completed) {
        inputFeild.parentElement.classList.add('completed')
    
    }
  
    
    inputFeild.addEventListener('focus',()=>{
        progressBar.classList.remove('showError'); 
    })
    
    inputFeild.addEventListener('input',()=>{

        if (allGoals[inputFeild.id].completed){
            inputFeild.value=allGoals[inputFeild.id].name;
            return
        }

        allGoals[inputFeild.id]={
            name:inputFeild.value,
            completed:false
        }
        localStorage.setItem('allGoals',JSON.stringify(allGoals));
    })

})


