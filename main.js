import { storage, doc, setDoc } from "./firebaseInit.js";

let newPersonBtn = document.querySelector("#nyPersonKnapp"); //TODO lag knapp
let registrationForm = document.querySelector(".dForm");
let sendFormBtn = document.querySelector("#dFormSend");
let statusText = document.querySelector(".registrationStatus");

newPersonBtn.addEventListener("click", () => { 
    let newDiv = document.createElement('div');
    newDiv.innerHTML += `
    <p class="personNumber">Person 1</p>
    <div class="inpCont">
        <div class="mb-4 relative mt-8 lg:mb-2">
            <input class="fornavn input block formInp w-full py-2 border-b w-full h-8 bg-gray-900" type="text" name="email" id="emailInp" required>
            <label class="block lg:text-sm" for="FornavnInp">Fornavn</label>
        </div>
        <div class="mb-4 relative mt-8 lg:mb-2">
            <input class="etternavn input block formInp w-full py-2 border-b w-full h-8 bg-gray-900" type="text" name="email" id="emailInp" required>
            <label class="block lg:text-sm" for="EtternavnInp">Etternavn</label>
        </div>
        <div class="mb-4 relative mt-8 lg:mb-2">
            <input class="tlf input block formInp w-full py-2 border-b w-full h-8 bg-gray-900" type="text" pattern="[0-9]{8}" name="email" id="emailInp" required>
            <label class="block lg:text-sm" for="TlfInp">Telefonummer (8 siffer)</label>
        </div>
        <div id="overnatting_cont" class="relative">
            <div class="overnatting-inner-cont">
                <input type="checkbox" name="overnatting" id="overnatting" class="overnatting">
                <label class="relative" for="overnatting">Trenger overnatting</label>   
            </div>       
            <button type="button" class="removeBtn"><svg fill="#000000" height="16px" width="16px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path> </g></svg></button>
        </div>
    </div>   `;
    registrationForm.append(newDiv);
})

let ob = new MutationObserver((changes) => {
    document.querySelectorAll(".removeBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.parentElement.parentElement.previousElementSibling.remove();
            btn.parentElement.parentElement.remove();
            persons--;
        })
    })

    document.querySelectorAll(".personNumber").forEach((title, i) => {
        title.innerHTML = "Person " + (i + 1).toString();
    })
})

ob.observe(registrationForm, {childList: true});

registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    registrationForm.querySelectorAll(".inpCont").forEach(async (person) => {
        let name = capitilizeFirstLetter(person.querySelector(".fornavn").value) + "_" + capitilizeFirstLetter(person.querySelector(".etternavn").value);
        let tlf = person.querySelector(".tlf").value;
        let overnatting = person.querySelector(".overnatting").checked;

        let objToDB = {
            tlf: tlf,
            overnatting: overnatting,
        }

        await setDoc(doc(storage, "deltakere", name), objToDB).then(() => {
            statusText.style.color = "green";
            statusText.style.display = "block";
            statusText.innerHTML = "Registrering velykket!"
        }).catch(() => {
            statusText.style.color = "red";
            statusText.style.display = "block";
            statusText.innerHTML = "Registreringen feilet. Om feilen vedvarer ta kontakt på +47 919 17 274"
        });
    });
    registrationForm.reset();
});

function capitilizeFirstLetter(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}


