import { storage, doc, setDoc } from "./firebaseInit.js";

let newPersonBtn = document.querySelector("#nyPersonKnapp"); //TODO lag knapp
let registrationForm = document.querySelector(".dForm");
let sendFormBtn = document.querySelector("#dFormSend");

newPersonBtn.addEventListener("click", () => { 
    registrationForm.innerHTML += `
    <p class="personNumber"></p>
    <div class="inpCont">
        <div class="mb-4 relative mt-10 lg:mb-2">
            <input class="fornavn input block formInp w-full py-2 border-b w-full h-8 bg-gray-900" type="text" name="email" id="emailInp" placeholder="Your Email adress" required>
            <label class="block lg:text-sm" for="FornavnInp">Fornavn</label>
        </div>
        <div class="mb-4 relative mt-10 lg:mb-2">
            <input class="etternavn input block formInp w-full py-2 border-b w-full h-8 bg-gray-900" type="text" name="email" id="emailInp" placeholder="Your Email adress" required>
            <label class="block lg:text-sm" for="EtternavnInp">Etternavn</label>
        </div>
        <div class="mb-4 relative mt-10 lg:mb-2">
            <input class="tlf input block formInp w-full py-2 border-b w-full h-8 bg-gray-900" type="number" format="xx xxx xx" name="email" id="emailInp" placeholder="Your Email adress" required>
            <label class="block lg:text-sm" for="TlfInp">Telefonummer</label>
        </div>
        <button type="button" class="removeBtn">Fjern</button>
        <div class="overnatting_cont relative">
            <input type="checkbox" name="overnatting" class="overnatting">
            <label class="block lg:text-sm" for="emailInp" style="top: 0%;">Jeg Trenger Overnatting</label>
        </div>
    </div>`;
})

let ob = new MutationObserver((changes) => {
    document.querySelectorAll(".removeBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.parentElement.previousElementSibling.remove();
            btn.parentElement.remove();
            persons--;
        })
    })

    document.querySelectorAll(".personNumber").forEach((title, i) => {
        title.innerHTML = "Person " + (i + 1).toString();
    })
})

ob.observe(registrationForm, {childList: true});

sendFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    registrationForm.querySelectorAll(".inpCont").forEach(async (person) => {
        let name = person.querySelector(".fornavn").value + " " + person.querySelector(".etternavn").value;
        name = name.replace(" ", "_");
        let tlf = person.querySelector(".tlf").value;
        let overnatting = person.querySelector(".overnatting").checked;

        let objToDB = {
            tlf: tlf,
            overnatting: overnatting,
        }

        console.log(objToDB)

        await setDoc(doc(storage, "deltakere", name), objToDB);
    })
})


