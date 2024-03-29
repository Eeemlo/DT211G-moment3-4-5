"use strict";

import Chart from "chart.js/auto";

//Variabler för att lagra data
const url = `https://studenter.miun.se/~mallar/dt211g/`;
let data = [];

//Funktion för kurser
async function fetchCourses() {
  //Gör fetchanrop
  const response = await fetch(url);
  //Lagra svar i variabeln data
  data = await response.json();

  //Filtrera ut kurser från datan
  const courses = data.filter(function (types) {
    return types.type === "Kurs";
  });

  //Sortera data efter antal sökande
  courses.sort(function (a, b) {
    return b.applicantsTotal - a.applicantsTotal;
  });

  //Stapeldiagram

  const ctx1 = document.getElementById("myChart1");

  new Chart(ctx1, {
    type: "bar",
    data: {
      labels: [
        courses[0].name,
        courses[1].name,
        courses[2].name,
        courses[3].name,
        courses[4].name,
        courses[5].name,
      ],
      datasets: [
        {
          label: "Antal sökande",
          data: [
            courses[0].applicantsTotal,
            courses[1].applicantsTotal,
            courses[2].applicantsTotal,
            courses[3].applicantsTotal,
            courses[4].applicantsTotal,
            courses[5].applicantsTotal,
          ],
          backgroundColor: [
            'rgba(74, 98, 93)'
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
        indexAxis: "y",
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

fetchCourses();

//Funktion för program

async function fetchProgrammes() {
  //Gör fetchanrop
  const response = await fetch(url);
  //Lagra svar i variabeln data
  data = await response.json();

  //Filtrera ut kurser från datan
  const programmes = data.filter(function (types) {
    return types.type === "Program";
  });

  //Sortera data efter antal sökande
  programmes.sort(function (a, b) {
    return b.applicantsTotal - a.applicantsTotal;
  });

  //Cirkeldiagram

  const ctx2 = document.getElementById("myChart2");

  new Chart(ctx2, {
    type: "doughnut",
    data: {
      labels: [
        programmes[0].name,
        programmes[1].name,
        programmes[2].name,
        programmes[3].name,
        programmes[4].name,
      ],
      datasets: [
        {
          label: "Antal sökande",
          data: [
            programmes[0].applicantsTotal,
            programmes[1].applicantsTotal,
            programmes[2].applicantsTotal,
            programmes[3].applicantsTotal,
            programmes[4].applicantsTotal,
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

fetchProgrammes();
