import { word } from "../word";


export function getRandomWord(){
     // word function
     const randomIndex=Math.floor(Math.random() * word.length);
     return word[randomIndex]
}

export function getText (language)  {  
 const options=[
   `Farewell , ${language}`,
   `Adios , ${language}`,
   `R.I.P , ${language}`,
   `We'll miss you , ${language}`,
   `Oh no, not ${language}`,
   ` ${language} ,bites the dust`,
   `Gone but not forgotten ${language}`,
   `The end of ${language} as we know it `,
   `Off into the sunset , ${language}`,
   `${language} , its been real`,
   `${language}, your watch has ended`,
   `${language}, has left the building`
 ]

 const randomText=Math.floor(Math.random() * options.length);
 return options[randomText];
}

