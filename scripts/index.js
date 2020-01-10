const inquirer = require("inquirer");
const electronHtml = require("electron-html-to");
const fs = require("fs");
const axios = require("axios");

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

// function writeToFile(fileName, data) {

// }

function init() {
    inquirer
        .prompt(questions)
        .then(function (answers) {
            const userName = answers.username;
            const url = "https://api.github.com/users/" + answers.username;
            console.log(url);
            console.log(userName);

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
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        });
        fs.readFile("generateHTML.js", "utf8", function(err, data) {
            if (err) {
              throw err;
            }
    function generateHTML() {

    }
}

init();
