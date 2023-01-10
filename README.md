JavaSctipt quiz 

To begin I set up my HTML document with the outline of the quiz. 
I also set up my CSS page and linked it to the HTML. 
Lastly I linked my script page and linked it at the bottom of my HTML. 

HTML
With in my HTML document I created the standard header with my linked CSS file. 
In my body I created div sections to hold my timer, start screen, questions, and end screen which will capture the users initials and score. 
Next I began to fill in parts of the HTML such as the H1 element with a short paragraph after, setting up my quiz section was odd for me because it looks strange to have nothing written but I am trusting the process in that my javascript will fill in the rest. Lastly you will see my ending screen which tells the user that the quiz is over and invites the user to share their initials with their highscore. 

CSS
cut and dry 




Javascript 
My Javascript I split into 2 pages, one that is set up with my questions, my questions are a varriable and I used an array to store all the questions. My second page is used to run my page. I set my DOM elements at the top and quiz variables following that, after that I start my function using startquiz() which will unhide the first question as well as start the timer with the time displayed. My next function grabs the next question in the array, doing so updates the question being asked answers to be selected and added an event listener for each answer choice avaliable. Next I added a function to check whether the answer selected was correct or wrong displaying a message "correct" or "wrong" according the answer choosen. Next I added a quizEnd() function to stop the time and show the final score. I also have a clockTick function which keeps the clock up to date and if the time runs out ends the quiz automatically. My saveHighscore function allows a user to save their high score with their username. My last function saves the highscores when the user clicks the eneter button. 