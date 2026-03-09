const issuesContainer = document.getElementById("issues-container");

let allIssues = [];

const manageSpinner = (status) => {
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("issues-container").classList.add("hidden");
    }
    else{
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("issues-container").classList.remove("hidden");
    }
}

const fetchIssues = async () => {
    manageSpinner()
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await response.json();
    allIssues = data.data;

    totalCounts();
    
    displayIssues(allIssues);

}

const totalCounts = () => {

    const all = allIssues.length;

    const open = allIssues.filter(issue => issue.status === "open").length;
    const closed = allIssues.filter(issue => issue.status === "closed").length;

    document.getElementById("allCount").innerText = all
    document.getElementById("openCount").innerText = open
    document.getElementById("closedCount").innerText = closed

}

const displayIssues = (issues) => {

    issuesContainer.innerHTML = "";

    issues.forEach(issue => {
    const card = document.createElement("div");

    card.className = "bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition";

    if(issue.status === "open"){
        card.classList.add("border-t-4","border-green-500");
    }
    else{
        card.classList.add("border-t-4","border-purple-500");
    }

    card.innerHTML = `
        <img src="./assets/Open-Status.png" alt="">
        <h3 class="font-semibold text-lg mb-2">${issue.title}</h3>

        <p class="text-gray-500 text-sm mb-3"> ${issue.description.slice(0,80)}...</p>

        <div class="flex justify-between text-sm mb-2">
            <span class="text-gray-500"> ${issue.author} </span>

            <span class="px-2 py-1 rounded text-xs ${issue.status === "open"? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"}">${issue.status} </span>

        </div>

        <p class="text-xs text-gray-400"> ${issue.createdAt} </p>
    `

    card.onclick = () => showIssue(issue.id)

    issuesContainer.appendChild(card)

    })

}

const tabChange = (event,status) => {

    document.querySelectorAll(".btn-tab").forEach(btn => {
        btn.classList.remove("bg-indigo-600","text-white");
        btn.classList.add("bg-gray-200");
    })

    event.target.classList.remove("bg-gray-200");
    event.target.classList.add("bg-indigo-600","text-white");

    if(status === "all"){
        displayIssues(allIssues) 
        return;
    }

    const filtered = allIssues.filter(issue => issue.status === status)

    displayIssues(filtered);

}

fetchIssues();

const searchIssue = async () => {

    const text = document.getElementById("searchInput").value;
    manageSpinner();
    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);
    const data = await response.json();

    displayIssues(data.data)

}

    document.getElementById("searchInput").addEventListener("keyup", ku => {
    
        if(ku.key === "Enter"){

    searchIssue()
    }

})
