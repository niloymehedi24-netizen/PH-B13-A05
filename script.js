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



