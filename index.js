const html = require("./generateHTML.js");
const inquirer = require("inquirer");
const electronHtml = require("electron-html-to");
const fs = require("fs");
const axios = require("axios");

// inquirer questions for user //

const questions = [
    {
        type: "input",
        message: "What is your Github user name?",
        name: "username",
    },
    {
        type: "list",
        message: "What is your favorite color?",
        choices: ["red", "blue", "purple", "green"],
        name: "color",
    }
];


// function to use user input for axios call //
function init() {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            const userName = answers.username;
            const url = "https://api.github.com/users/" + answers.username;
            console.log(url);
            console.log(userName);

            // axios call to collect data for user
            axios.get(url)
                .then(function (response) {
                    bio = response.data.bio;
                    reposNum = response.data.public_repos;
                    followers = response.data.followers;
                    following = response.data.following;
                    stars = response.data.starred_url;
                    name = response.data.name;
                    company = response.data.company;
                    locationLink = response.data.location;
                    blogLink = response.data.blog;
                    console.log(name);
                    console.log(bio, reposNum, followers, following, stars, company);
                    console.log(locationLink, blogLink);

                    // put user data into html 

                    // create html file
                    // fs.readFile("generateHTML.js", "utf8", function(err, data) {
                    html.generateHTML(response);

                    fs.writeFile("index.html", response)
                })
                .catch(error => {
                    console.log(error);
    
        })
        });
}

init();
