import { Context } from "@netlify/edge-functions";

import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const dbAddress = Netlify.env.dbObj

const dbApp = initializeApp(dbAddress)
const database = getDatabase(dbApp)
const endorsementsInDb = ref(database, "endorsementList")

const listEl = document.getElementById("endorsements-list")

setupPage()
function setupPage() {
    const publishBtn = document.getElementById("publish-button")
    publishBtn.addEventListener("click", publishEndorsement)
}

onValue(endorsementsInDb, function(snapshot) {
    const endorsments = Object.entries(snapshot.val())
    listEl.innerHTML = "";
    for (let i = 0; i < endorsments.length; i++){
        addEndorsementToList(endorsments[i],)
    }

})

const endosementInputEl = document.getElementById("text-input")
function publishEndorsement() {
    const endosementValue = endosementInputEl.value
    const retVal = push(endorsementsInDb, endosementValue)
}

function addEndorsementToList(endorsementObject) {
    const newListItem = document.createElement("li")
    const endorsementID = endorsementObject[0]
  
    newListItem.textContent = endorsementObject[1]
    newListItem.addEventListener("click", function() {
        let exactLocationOfEndorsementInDB = ref(database, `endorsementList/${endorsementID}`)

        remove(exactLocationOfEndorsementInDB)
  
    })
    listEl.appendChild(newListItem)

}