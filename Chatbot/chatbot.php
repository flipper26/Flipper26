<!DOCTYPE html>

<html>
<head>
<title>Chatbot</title>
<meta charset="utf-8">
<link rel="stylesheet" media="all" href="assets/css/bootstrap.min.css"> <!-- Using bootstrap 4.0 -->
<link rel="stylesheet" media="all" href="assets/css/style.css">
<script type="text/javascript" src="assets/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="assets/js/bootstrap.min.js"></script> <!-- Using bootstrap 4.0 -->
<script type="text/javascript" src="assets/js/main.js"></script>
</head>
<body>
<div id="main">
	<div>User: <span id="user"></span></div>
	<div>Nebula: <span id="chatbot"></span></div>
	<div><input id="input" type="text" placeholder="Talk to me ..." autocomplete="off"/></div>
</div>
<script type="text/javascript">

//variable to know if we are talking about the email
var contex_email = false;

//list of text prompt the user is expected to use
var userText = [
	["what is my email"],
	["that is not my email"],
	["hi","hey","hello"], 
	["what do you want to know", "what would you like to know", "what about myself"],
	["how are you", "how is life", "how are things"],
	["what are you doing", "what is going on", "what are you up to"],
	["how old are you"],
	["who are you", "are you human", "are you bot", "are you human or bot", "what are you"],
	["who created you", "who made you", "who is your god"],
	["your name please",  "your name", "may i know your name", "what is your name"],
	["i love you"],
	["happy", "good"],
	["bad", "bored", "tired"],
	["help me", "tell me story"],
	["ah", "yes", "ok", "okay", "nice", "thanks", "thank you"],
	["bye", "good bye", "goodbye", "see you later"],
	["are you stupid", "stupid" , "your not smart", "dumb"],
	["knock knock"],
	["i am Human", "human", "a human"]
];

//list of reply the bot uses to answer
var botReply = [
	["I don't know your email. What is it?", "you never told me you had one. what is it?"],
	["How can I change something I don't have? what is it?", "I can't remember you telling me your email. Will you tell me now?"],
	["Hi","Hey","Hello"], 
	["On second thought I don't really care", "I don't know that just something humans say", "just forget I ever asked"],
	["Fine", "Pretty well", "Fantastic"],
	["Nothing much", "About to go to sleep", "Can you guess?", "I don't know actually", "talking to you"],
	["I live in the moment", "You can say I am ageless"],
	["I am just a bot", "I am a bot. What are you?"],
	["Elie Khairallah", "My God"],
	["I'm Nebula", "You can call me Nebula", "Its on your screen"],
	["I love you too", "Me too"],
	["Have you ever felt bad?", "Glad to hear it"],
	["Why?", "Why? You shouldn't!", "Try watching TV"],
	["I will", "What about?"],
	["Tell me a story", "Tell me about yourself", "You are welcome"],
	["Bye", "Goodbye", "See you later"],
	["Don't be mean", "I was created by stupid humans then", "Don't be a bully", "maybe yes, probably no."],
	["who's there?"],
	["Lucky you", "I always wanted to be human", "I thought you were a cat", "I'm allergic to humans"]	
];
//list of alternative replies the bot uses if it does not understand
var alternative = ["Seriously?", "Sorry...", "I could not understand", "Please clarify", "I suppose so ...", "If you say so ...", "If I were human this would have been easier", "quite interesting! ... not really"];

//checking the is an emial function
//isItAnEmail("sadklfjh@lakjfhas.com");


//adding an event listener on the hit of the enter button which is linked to the input feild.
document.querySelector("#input").addEventListener("keypress", function(e){
	var key = e.which || e.keyCode;
	if(key === 13){ //Enter button
		var input = document.getElementById("input").value;
		//checking if the input field is empty
		if(input == ""){
			input = "no text"
			//passing the value of the input field to the answer method
			Answer(input);
		}else{
			//adding the value from the input field to the user chat
			document.getElementById("user").innerHTML = input;
			//checking for an email context
			if(contex_email){
				//if context is true and the databse returns a result we pass it to the answer function
				if(search_DB(input)){
					Answer(search_DB(input)); //returning reply saved in DB
					console.log("got answer from DB" + search_DB(input));
				}else{
					//if the context is true but no result was returned from the DB we pass the input to the isItAnEmail function then to the answer function.
					Answer(isItAnEmail(input));
				}
			}else{
				//if context is false we pass the input directly to the answer function
				Answer(input);
			}
		}
	}
});

//answer function that takes the input modifies it and passes it to the findAnswer function then sets the resulting values.
function Answer(input){
	try{
		var product = input + "=" + eval(input);
	} catch(e){
		var text = (input.toLowerCase()).replace(/[^\w\s\d]/gi, ""); //remove all chars except words, space and 
		text = text
		.replace(/ a /g, " ")
		.replace(/i feel /g, "")
		.replace(/whats/g, "what is")
		.replace(/please /g, "")
		.replace(/ please/g, "")
		.replace(/thats/g, "that is");


		if(FindAnswer(userText, botReply, text)){
			var product = FindAnswer(userText, botReply, text);
		} else {
			var product = alternative[Math.floor(Math.random()*alternative.length)];
		}
	}
	setValues(product);
}

//sets values 
function setValues(product){
	document.getElementById("chatbot").innerHTML = product;
	speak(product);
	document.getElementById("input").value = ""; //clear input value
}

//compares the received modified input from the Answer function and finds the appropriate answer 
function FindAnswer(user, bot, formInput){
	var item;
	for(var x=0; x<user.length; x++){
		for(var y=0; y<bot.length; y++){
			if(user[x][y] == formInput){
				
				switch (formInput){
					//make sure only one answer is choses and not a random one from the array at index x
					case "who is your god":
				        items = bot[x];
				        item =  items[0];	
				        break;
				    //make sure to check the database for the answer for an email when asked about the email and sets the context to true if no answer is found
			    	case "what is my email":
			    		if(search_DB("what is my email")){
			    			item = search_DB("what is my email");
			    			contex_email = false;
			    		}else{
			    			contex_email = true;
			    			items = bot[x];
				      		item =  items[Math.floor(Math.random()*items.length)];
			    		}
			            break;  
			        //make sure to check the database for the answer for an email when change of email is prompted and sets the context to true 
		            case "that is not my email":
		            	contex_email = true;
			    		if(search_DB("what is my email")){
			    			item = "you said your email was: " + search_DB("what is my email") + ", what is it now?";
			    		}else{
			    			items = bot[x];
				      		item =  items[Math.floor(Math.random()*items.length)];
			    		}
			            break; 

				    default:
				   		items = bot[x];
				        item =  items[Math.floor(Math.random()*items.length)];	

				}
			}else{
				//catching cases that are not in the lists above
				switch (formInput){
					case "no text":
				        item = "I'm not a psychic";
				        break;
				    case "email":
				        item = "This is an email. Ok Got it!";
				        contex_email = false;
				        break;
				    case "not email":
				        item = "This is not an email!! I'm smarter than that. try again!";
				        break;
				}
			}
		}
	}
	return item;
}
//functoin that takes the final answer to allow the bot to speak
function speak(formInput){
	var myVoice = new SpeechSynthesisUtterance();
	myVoice.voice = speechSynthesis.getVoices().filter(function(voice){return voice.name == "Agnes";})[0];
	myVoice.text = formInput;
	myVoice.lang = "en-US";
	myVoice.volume = 1; //0-1 interval
	myVoice.rate = 1;
	myVoice.pitch = 2; //0-2 interval
	speechSynthesis.speak(myVoice);
}

//function to compute if an string is an email based on features and a weight vector for calculating score
//this fuction also saves the results to the database
function isItAnEmail (textFromInput){

	var result;

	//weights
	var weightAbove10 = 1.9;
	var weightAt = 3.8;
	var weightDotCom = 2.7;
	var weightNumbers = 1.6

	//variables
	var lenghtMoreThanTen = 0;
	var containsAt = 0;
	var endsWithDotCom = 0;
	var hasNumbers = 0

	if((textFromInput.length) >= 10){
		lenghtMoreThanTen = 1;
	}
	if(textFromInput.includes("@")){
		containsAt = 1;
	}
	if(textFromInput.includes(".com")){
		endsWithDotCom = 1;
	}
	if(containsNumbers(textFromInput)){
		hasNumbers = 1;
	}

	var score = weightAbove10*lenghtMoreThanTen + weightAt*containsAt + weightDotCom*endsWithDotCom + weightNumbers*hasNumbers;
	console.log("lenghtMoreThanTen is " +lenghtMoreThanTen);
	console.log("containsAt is " +containsAt);
	console.log("endsWithDotCom is " +endsWithDotCom);
	console.log("hasNumbers is " +hasNumbers);
	console.log("score is " +score);

	if (score >= 6.5){
		result = "email";
		if(search_DB("what is my email")){
			update_DB(textFromInput, "what is my email",score );
		}else{
			insert_DB(textFromInput, "what is my email",score);
		}
	}else{
		result = "not email";
		insert_DB(result, textFromInput, score);
	}

return result;
}

//fuction to check if a string containsa number
function containsNumbers(t){
	var regex = /\d/g;
	return regex.test(t);
}    

//function to search the databse using a question to get the answer
function search_DB (question){

	var answer;

	$.ajax({
	type: "POST",
	url: 'get_from_db.php',
	async: false,
	data: {question: question},
		success: function(data){
			console.log(data);
			answer = data;
		}
	});
	return answer;
}

//function to insert a row in the database
function insert_DB (bot, user, score){

	var answer;

	$.ajax({
	type: "POST",
	url: 'insert_to_db.php',
	async: false,
	data: {bot: bot,
		   user: user,
		   score: score},
		success: function(data){
			console.log(data);
		}
	});
}

//function to update the database
function update_DB (bot, user, score){

	var answer;

	$.ajax({
	type: "POST",
	url: 'update_db.php',
	async: false,
	data: {bot: bot,
		   user: user,
		   score: score},
		success: function(data){
			console.log(data);
		}
	});
}
</script>
</body>
</html>