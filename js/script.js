var siteNameTag = document.querySelector(".site-name input"),
siteUrlTag = document.querySelector(".site-url input"),
sbmtBtn = document.querySelector(".bookmark-input button");

var deleteBtns, visitBtns; // Global variables for delete and visit fnc

// Array to store sites in one session
var sites = [];

// Regex to validate input
var siteNameRegex = /.{3,}/,
siteUrlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/


function clearInputs() {
    siteNameTag.value = "";
    siteUrlTag.value = "";
}

function displaySites() {
    var innerText = ``;
    for (let i = 0; i < sites.length; i++) {
        innerText += `
            <tr>
                <td>${i}</td>
                <td>${sites[i].siteName}</td>
                <td>
                    <button class="btn visit-btn" data-index="0">
                        <i class="fa-solid fa-eye pe-2"></i>Visit
                    </button>
                </td>
                <td>
                    <button class="btn delete-btn pe-2" data-index="0">
                        <i class="fa-solid fa-trash-can"></i>
                        Delete
                    </button>
                </td>
            </tr>
        `;      
    }
    document.querySelector("table tbody").innerHTML = innerText;

    // add delete btn fnc
    deleteBtns = document.querySelectorAll("table tbody .delete-btn");
    for (let i = 0; i < deleteBtns.length; i++) {
        const deleteBtn = deleteBtns[i];
        deleteBtn.addEventListener("click", function() {
            deleteSite(i);
        });
    }

    // add visit btn fnc
    visitBtns = document.querySelectorAll("table tbody .visit-btn");
    for (let i = 0; i < visitBtns.length; i++) {
        const visitBtn = visitBtns[i];
        visitBtn.addEventListener("click", function() {
            visitSite(i);
        });
    }
}

function deleteSite(i){
    sites.splice(i, 1);
    localStorage.setItem("ourSites", JSON.stringify(sites));
    displaySites();
}

function visitSite(i) {
    var url;
    console.log(sites[i].siteUrl)
    if (sites[i].siteUrl.match(/^https?:\/\//)) {
        url = sites[i].siteUrl;
    } else {
        url = 'http://' + sites[i].siteUrl;
    }
    window.open(url, "_blank");
}


sbmtBtn.addEventListener("click", function() {
    if (siteNameRegex.test(siteNameTag.value) && siteUrlRegex.test(siteUrlTag.value)) {
        var oneSite = {
            siteName: siteNameTag.value,
            siteUrl: siteUrlTag.value
        }
        sites.push(oneSite);
        localStorage.setItem("ourSites", JSON.stringify(sites));
        displaySites();
        clearInputs();
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Please enter valid name and URL',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
});

siteNameTag.addEventListener("input", function() {
    if (siteNameRegex.test(siteNameTag.value)) {
        siteNameTag.classList.remove("is-invalid");
        siteNameTag.classList.add("is-valid");
    } else {
        siteNameTag.classList.remove("is-valid");
        siteNameTag.classList.add("is-invalid");
    }
})

siteUrlTag.addEventListener("input", function() {
    if (siteUrlRegex.test(siteUrlTag.value)) {
        siteUrlTag.classList.remove("is-invalid");
        siteUrlTag.classList.add("is-valid");
    } else {
        siteUrlTag.classList.remove("is-valid");
        siteUrlTag.classList.add("is-invalid");
    }
})


if (localStorage.getItem('ourSites') == null) {
    sites = [];
} else {
    sites = JSON.parse(localStorage.getItem('ourSites'));  // pull array from browser's local sotrage
    displaySites();
}