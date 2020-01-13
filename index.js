const inquirer = require("inquirer");
const genHtml = require("./generateHTML.js");
const convertFactory = require("electron-html-to");
const fs = require("fs");
const axios = require("axios");
let userInfo = "";

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
        choices: ["green", "blue", "pink", "red"],
        name: "color",
    }
];


init();

// function to use user input for axios call //
function init() {

    inquirer
        .prompt(questions)
        .then(function (answers) {
            const url = "https://api.github.com/users/" + answers.username;
            const repoUrl = "https://api.github.com/users/" + answers.username + "/repos";
            const color = answers.color;

            let profilePic;
            let name;
            let company;
            let locationLink;
            let profileURL;
            let blogLink;
            let bio;
            let reposNum;
            let followers;
            let stars;
            let following;


            console.log(url);

            // axios call to collect data for user
            axios.get(url)
                .then(function (response) {
                    profilePic = response.data.avatar_url;
                    name = response.data.name;
                    company = response.data.company;
                    locationLink = response.data.location;
                    profileURL = response.data.html_url;
                    blogLink = response.data.blog;
                    bio = response.data.bio;
                    reposNum = response.data.public_repos;
                    followers = response.data.followers;
                    stars = 0;
                    following = response.data.following;
                    // console.log(response);
                    console.log("Axios pull " + name);
                    console.log(bio, reposNum, followers, following, stars, company, profilePic);
                    console.log(locationLink, blogLink);
                })

                .catch(function(error) {
                    console.log(error);
                });

            // axios call to get repo stars
            axios.get(repoUrl)
                .then(function (response) {
                    console.log("Axios for stars " + response)

                    stars = 0;

                    for (let i = 0; i < response.data.length; i++) {
                        stars += response.data[i].stargazers_count;
                        console.log (`# of stars on ${response.name} are ${response.stargazers_count}`);
                    }

                    console.log("total stars = " + stars);

                    // Object created for user data to write to HTML file //
                    userInfo = {
                        profilePic: profilePic,
                        name: name,
                        company: company,
                        locationLink: locationLink,
                        profileURL: profileURL,
                        blogLink: blogLink,
                        bio: bio,
                        reposNum: reposNum,
                        followers: followers,
                        stars: stars,
                        following: following,
                        color: color,
                    };


                    let updatedHtml = genHtml.generateHTML(userInfo);
                    // console.log(updatedHtml);

                    CreateHtmlFile("index.html", updatedHtml);

                    // converting html to pdf document //

                    // let conversion = convertFactory({
                    //     converterPath: convertFactory.converters.PDF
                    // });

                    // conversion({ html: updatedHtml }, function (err, result) {
                    //     if (err) {
                    //         return console.error(err);
                    //     }
                    //     console.log("HELLLLOOOO PDF FILE " + result);
                    //     result.stream.pipe(fs.createWriteStream(`./${answers.name}.pdf`))
                    //     conversion.kill();
                    // });

                })

                .catch(error => {
                    console.log(error);
                });
            })

            function CreateHtmlFile(fileName, data) {
                fs.writeFile(fileName, data, 'utf8', function (err) {

                    if (err) {
                        return console.log(err);
                    }
                    console.log("create file Success!");
                });
            }


        }
    
