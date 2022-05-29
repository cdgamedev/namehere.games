// get the team profile's json data
fetch('./team-profiles.json')
    .then(response => response.json())
    .then(json => parseTeamMembers(json));

// declare sites in global scope
var sites;

// parse the data for the team memebrs
async function parseTeamMembers(json) {
    // read the json
    let profiles = json.profiles;
    sites = json.sites;

    // find the profiles element and clear it
    element = document.getElementById("profiles");
    element.innerHTML = "";
    
    // for each member, create the base layout of their profile container
    for (let i = 0; i < profiles.length; i++) {
        let p = profiles[i];
        let name = `${p.forename} ${p.surname}`;
        let profile = `
<div class="profile" id="${p.key}">
    <div class="info">
        <h3>${name}</h3>
        <p>(${p.pronouns})</p>
        <img src="./img/team/${p.key}.png" alt="${name} Profile Image">
        <p>${p.role}</p>
        <span class="social-links">
            ${getSocials(p)}
        </span>
    </div>
</div>
        `
        // add the profile to the element
        element.innerHTML += profile;
    }
}

// get the socials for each profile
function getSocials(profile) {
    // get the socials and forename
    let socials = profile.socials;
    let name = profile.forename;

    // create a blank string
    let socialLinks = "";

    // for each social, generate a social link
    for(let key in socials) {
        let social = socials[key];
        socialLinks += generateSocialLink(key, name, social);
    }

    return socialLinks;
}

// generate the social links based on the site and the user's information
function generateSocialLink(site, name, username) {
    // if there is no username, return blank
    if (username == "") {
        return "";
    }

    // get the url of the user's page - by replacing the substring '[USERNAME]'
    let URL = sites[site].URL;
    URL = URL.replace('[USERNAME]', username);
    
    // create the element for the social link
    let html = `
<a href="${URL}">
    <i class="${sites[site].icon}" title="${name}'s ${site}"></i>
</a>
`
    // return the element
    return html;
}