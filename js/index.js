///<reference types="../@types/jquery" />




function openSideNav(){
  $(".side-nav-menu").animate({left:"0px"},500)
    $(".open-close-icon").removeClass("fa-align-justify")
    $(".open-close-icon").addClass("fa-x")
     $(".links li").animate({top:300},500)
   
     for(let i=0;i<5;i++){
      $(".links li").eq(i).animate({top:0},
        (i+5)*100)
     }
}

function closeSideNav(){

  $(".side-nav-menu").animate({left:"-265px"},500)

  $(".open-close-icon").addClass("fa-align-justify")

  $(".open-close-icon").removeClass("fa-x")

  $(".links li").animate({top:300},500)

}


closeSideNav()
 $(".open-close-icon").on("click",function(){
  if(  $(".side-nav-menu").css("left")=="0px"){    
    closeSideNav()    
  }else{
    openSideNav()
  }

})




let siteNameInput = document.getElementById("name")

let submitBtn;
let rowData = document.getElementById('rowData')
let searchData=document.querySelector("#searchData")
let loading=document.querySelector(".loading")
let allMeals = []

async function getmeal() {
     loading.classList.replace("d-none","d-flex")
  let response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")

  let data = await response.json();

  allMeals = data.meals

  displayMeals()
  loading.classList.replace("d-flex","d-none")

  console.log(allMeals);
}
getmeal("")

function displayMeals() {
  let cartona = ``
  for (let i = 0; i < allMeals.length; i++) {
    cartona += `
      <div class="col-md-3">
          <div onclick="getMealDetails('${allMeals[i].idMeal}')" class="image rounded-2 cursor-pointer">
            <img src="${allMeals[i].strMealThumb}" alt="" class='w-100 ' />
            <div class="layer d-flex align-items-center">
              <h2 class="text-black text-start ps-3">${allMeals[i].strMeal}</h2>
            </div>  
          </div>
        </div>`
  }
  rowData.innerHTML = cartona
}



async function getCategeries() {
  loading.classList.replace("d-none","d-flex")
  let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")

  let data = await response.json();

  allMeals = data.categories
   searchData.innerHTML=""
  displayCategeries()
  closeSideNav()

  loading.classList.replace("d-flex","d-none")

  console.log(allMeals);
}


function displayCategeries() {

  let cartona = ``
  for (let i = 0; i < allMeals.length; i++) {
    cartona += `
      <div class="col-md-3">
          <div onclick="getCategoryMeals('${allMeals[i].strCategory}')" class="image rounded-2 cursor-pointer">
            <img src="${allMeals[i].strCategoryThumb}" alt="" class='w-100 ' />
            <div class="layer">
              <h2 class="text-black text-center ps-3">${allMeals[i].strCategory}</h2>
              <p class="text-black text-center">${allMeals[i].strCategoryDescription.split(" ").slice(0, 12).join(" ")}<p>
            </div>  
          </div>
        </div>`
  }
  rowData.innerHTML = cartona
}


async function getArea() {
  loading.classList.replace("d-none","d-flex")

  let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")

  let data = await response.json();

  allMeals = data.meals
  searchData.innerHTML=""
  displayArea()
  closeSideNav()

  loading.classList.replace("d-flex","d-none")

  console.log(allMeals);

}

function displayArea() {
  let cartona = ``
  for (let i = 0; i < allMeals.length; i++) {
    cartona += `
          <div class="col-md-3 ">
          <div onclick="getAreaMeals('${allMeals[i].strArea}')" class="text-center cursor-pointer">
              <i class="fa-solid fa-house-laptop fa-4x"></i>
              <h3>${allMeals[i].strArea}</h3>
              </div>
            </div>`
  }
  rowData.innerHTML = cartona
}


async function getIngredients() {
  loading.classList.replace("d-none","d-flex")

  let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")

  let data = await response.json();

  allMeals = data.meals.slice(0, 20)
  searchData.innerHTML=""
  displayIngredients()
  closeSideNav()

  loading.classList.replace("d-flex","d-none")

  console.log(allMeals);

}

function displayIngredients() {
  let cartona = ``
  for (let i = 0; i < allMeals.length; i++) {
    cartona += `
              <div class="col-md-3 ">
              <div onclick="getIngredientsMeals('${allMeals[i].strIngredient}')" class="text-center cursor-pointer">
                 <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                  <h3>${allMeals[i].strIngredient}</h3>
                  <p>${allMeals[i].strDescription.split(" ").slice(0, 25).join(" ")}</p>
                  </div>
                </div>`
  }
  rowData.innerHTML = cartona
}


async function getCategoryMeals(category) {
  searchData.innerHTML=""
  loading.classList.replace("d-none","d-flex")

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  let data = await response.json()

  allMeals = data.meals.slice(0, 20)
  displayCategoryMeals(category)
  closeSideNav()

  loading.classList.replace("d-flex","d-none")

  console.log(allMeals);



}

function displayCategoryMeals(category) {
  let cartona = ``
  for (let i = 0; i < allMeals.length; i++) {
    cartona += `
            <div class="col-md-3">
                <div onclick="getMealDetails('${allMeals[i].idMeal}')" class="image rounded-2 cursor-pointer">
                  <img src="${allMeals[i].strMealThumb}" alt="" class='w-100 ' />
                  <div class="layer d-flex align-items-center">
                    <h2 class="text-black text-start ps-3">${allMeals[i].strMeal}</h2>
                  </div>  
                </div>
              </div>`
  }
  rowData.innerHTML = cartona
}


async function getAreaMeals(Area) {
   searchData.innerHTML=""
   loading.classList.replace("d-none","d-flex")

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`)
  let data = await response.json()
  allMeals = data.meals.slice(0, 20)
  displayAreaMeals(Area)
  closeSideNav()

  loading.classList.replace("d-flex","d-none")

  console.log(allMeals);
}

function displayAreaMeals(Area) {
  let cartona = ``
  for (let i = 0; i < allMeals.length; i++) {
    cartona += `
           <div class="col-md-3">
               <div onclick="getMealDetails('${allMeals[i].idMeal}')" class="image rounded-2 cursor-pointer">
                 <img src="${allMeals[i].strMealThumb}" alt="" class='w-100 ' />
                 <div class="layer d-flex align-items-center">
                   <h2 class="text-black text-start ps-3">${allMeals[i].strMeal}</h2>
                 </div>  
               </div>
             </div>`
  }
  rowData.innerHTML = cartona
}

async function getIngredientsMeals(Ingredient) {
  loading.classList.replace("d-none","d-flex")

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`)
  let data = await response.json()

  allMeals = data.meals.slice(0, 20)
  displayIngredientsMeals(allMeals)
  closeSideNav()

  loading.classList.replace("d-flex","d-none")

  console.log(allMeals);
}

function displayIngredientsMeals(Ingredient) {
  let cartona = ``
  for (let i = 0; i < allMeals.length; i++) {
    cartona += `
         <div class="col-md-3">
             <div onclick="getMealDetails('${allMeals[i].idMeal}')" class="image rounded-2 cursor-pointer">
               <img src="${allMeals[i].strMealThumb}" alt="" class='w-100 ' />
               <div class="layer d-flex align-items-center">
                 <h2 class="text-black text-start ps-3">${allMeals[i].strMeal}</h2>
               </div>  
             </div>
           </div>`
  }
  rowData.innerHTML = cartona
}

async function getMealDetails(mealID) {
  loading.classList.replace("d-none","d-flex")

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  let data = await response.json()
  allMeals = data.meals.slice(0, 20)
  displayMealDetails(allMeals[0])
  closeSideNav()

  loading.classList.replace("d-flex","d-none")
  console.log(allMeals);
}


function displayMealDetails(meal) {

  let Ingredients = ``
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      Ingredients += `<li class="alert alert-info m-2 p-2">${meal[`strMeasure${i}`]} ${meal[`strIngredients${i}`]}</li>`
    }
  }


  let tags = meal.strTags?.split(",")
  if (!tags) tags = []

  let tagsStr = ``
  for (let i = 0; i < tags.length; i++) {
    tagsStr +=
      `<li class="alert alert-danger  m-2 p-2">${tags[i]}</li>`
  }


  let cartona = `
          <div class="col-md-4">
          <div class="div">
            <img src="${meal.strMealThumb}" class="w-100 rounded-3" alt="">
            <h2>${meal.strMeal}</h2>
          </div>
        </div>
        <div class="col-md-8">
          <div class="ps-2">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
            <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
            <h3>Recipes : </h3>
            <ul class="list-unstyled d-flex flex-wrap justify-content-center align-items-center">
             ${Ingredients}
            </ul>
            <h3>Tags : </h3>
            <ul class="list-unstyled d-flex flex-wrap justify-content-start align-items-center">
              ${tagsStr}
            </ul>
            <div>
              <a target="blank" href="${meal.strSource}" class="btn btn-success">Source</a>
              <a target="blank" href="${meal.strYoutube} " class="btn btn-danger">Youtube</a>
            </div>
          </div>
        </div> `
  rowData.innerHTML = cartona
}

function getSearchInputs(){
  searchData.innerHTML=`
   <div class="search row py-4 ">
      <div class="col-md-6 ">
        <input onkeyup="searchByName(this.value)" type="text" class="form-control bg-transparent text-white"
         placeholder="Search By Name" />
      </div>
      <div class="col-md-6 ">
        <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" type="text" class="form-control bg-black text-white" 
        placeholder="Search By first letter"/>
      </div>
    </div> 
  `
  rowData.innerHTML=""
  closeSideNav()


}

 async function searchByName(term){
  loading.classList.replace("d-none","d-flex")
   let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term} `)
   response=await response.json()
   response.meals?displayMeals(response.meals) :displayMeals([])
    allMeals = response.meals
  //displayMeals(allMeals)
  allMeals? displayMeals(allMeals) : displayMeals([])
  loading.classList.replace("d-flex","d-none")
  console.log(allMeals);
    
       
 }

async function searchByFirstLetter(term){
  loading.classList.replace("d-none","d-flex")

  term== "" ? term="a" : "";

  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
  let data=await response.json()
  allMeals = data.meals

 //displayMeals(allMeals)

  data.meals? displayMeals (data.meals) :displayMeals([])
  loading.classList.replace("d-flex","d-none")
  closeSideNav()

 console.log(allMeals);
   
      
}

function getContacts(){
  rowData.innerHTML=`
   <div class="contact vh-100  d-flex justify-content-center align-items-center">
          <div class="container w-75 ">
             <div class="row py-4 g-3">
          <div class="col-md-6 ">
            <input onkeyup="inputsValidation()" id="nameInput" type="text" class="form-control" placeholder="Enter Your Name" />
          <div id="nameAlert"  class="alert alert-danger w-100 mt-2 d-none">Special characters and numbers not allowed</div>
          </div>
          <div class="col-md-6 ">
            <input onkeyup="inputsValidation()" id="emailInput" type="email" class="form-control" placeholder="Enter Your Email" />
            <div id="emailAlert"  class="alert alert-danger w-100 mt-2 d-none">Email not valid *exemple@yyy.zzz</div>
          </div>
          <div class="col-md-6 ">
            <input onkeyup="inputsValidation()" id="phoneInput"  type="number" class="form-control" placeholder="Enter Your Phone " />
            <div id="phoneAlert"  class="alert alert-danger w-100 mt-2 d-none">Enter valid Phone Number
            </div>
          </div>
          <div class="col-md-6 ">
            <input onkeyup="inputsValidation()" id="ageInput" type="number" class="form-control" placeholder="Enter Your Age " />
            <div id="ageAlert"  class="alert alert-danger w-100 mt-2 d-none">Enter valid age</div>
          </div>
          <div class="col-md-6 ">
            <input onkeyup="inputsValidation()" id="passwordInput" type="password" class="form-control" placeholder="Enter Your password " />
            <div id="passwordAlert"  class="alert alert-danger w-100 mt-2 d-none">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
          </div>
          <div class="col-md-6 ">
            <input onkeyup="inputsValidation()" id="repasswordInput" type="password" class="form-control" placeholder="Repassword " />
            <div id="repasswordAlert"  class="alert alert-danger w-100 mt-2 d-none">Enter valid repassword</div>
          </div>
          <div class="text-center">
            <button id="submitBtn" disabled class="btn btn-outline-danger">submit</button>
          </div>
        </div>
          </div>
        </div> 
  `
  closeSideNav()

      submitBtn=document.getElementById("submitBtn")

      document.getElementById("nameInput").addEventListener("focus",function(){
        nameInputTouched=true
      })
      document.getElementById("emailInput").addEventListener("focus",function(){
        emailInputTouched=true
      })
      document.getElementById("phoneInput").addEventListener("focus",function(){
        phoneInputTouched=true
      })
      document.getElementById("ageInput").addEventListener("focus",function(){
        ageInputTouched=true
      })
      document.getElementById("passwordInput").addEventListener("focus",function(){
        passwordInputTouched=true
      })
      document.getElementById("repasswordInput").addEventListener("focus",function(){
        repasswordInputTouched=true
      })
}
 
      let nameInputTouched=false
      let emailInputTouched=false
      let phoneInputTouched=false
      let ageInputTouched=false
      let passwordInputTouched=false
      let repasswordInputTouched=false


function inputsValidation(){
   
    if (nameInputTouched){
        if(nameValidation()){
        document.getElementById("nameAlert").classList.replace('d-block','d-none')
    }else{
    document.getElementById("nameAlert").classList.replace('d-none','d-block')

  }
}
  
   if (emailInputTouched){
  if(emailValidation()){
    document.getElementById("emailAlert").classList.replace('d-block','d-none')
  }else{
    document.getElementById("emailAlert").classList.replace('d-none','d-block')

  }
}
  

  if(phoneInputTouched){
  if(phoneValidation()){
    document.getElementById("phoneAlert").classList.replace('d-block','d-none')
  }else{
    document.getElementById("phoneAlert").classList.replace('d-none','d-block')
  }
  }
  
  if(ageInputTouched){
  if(ageValidation()){
    document.getElementById("ageAlert").classList.replace('d-block','d-none')
  }else{
    document.getElementById("ageAlert").classList.replace('d-none','d-block')
  }

  }
  

  if(passwordInputTouched){
  if(passwordValidation()){
    document.getElementById("passwordAlert").classList.replace('d-block','d-none')
  }else{
    document.getElementById("passwordAlert").classList.replace('d-none','d-block')

  }
  }
  

  if(repasswordInputTouched){
  if(repasswordValidation()){
    document.getElementById("repasswordAlert").classList.replace('d-block','d-none')
  }else{
    document.getElementById("repasswordAlert").classList.replace('d-none','d-block')
  }
  }




 if ( nameValidation() &&
  emailValidation() &&
  phoneValidation() &&
  ageValidation() &&
  passwordValidation()&&
  repasswordValidation()){
   
    submitBtn.removeAttribute("disabled")
  }else{
    submitBtn.setAttribute("disabled",true)
  }
  
 
  function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
}
