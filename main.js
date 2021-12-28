const heart=document.querySelector('.heart'),
bounceInLeft=document.querySelector('.bounceInLeft'),
start=document.querySelector('.Appp'),
date=document.querySelector('.date');
const dayss=document.getElementById('day');
const hours=document.getElementById('hours');
const minutes=document.getElementById('minutes');
const seconds=document.getElementById('seconds');
var i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;
var txt="Hello! Love ❤️❤️";
var speed=50;
var txt2="❤️❤️ Before the sensationalism begins, let's play a song as the background music! Abara Kadabara Some Music Please!! ❤️❤️";
var txt3="❤️❤️ Today is our First anniversary. From Dec 30, 2020 to the present, we have experienced many things together, There was laughter and quarrel, and we almost broke up because of some things, but we came over all of it. ❤️❤️";
var txt4="❤️❤️ It all started with the beautiful thing --- Yep thats Your Sketch. Our Chapter One started there , I was very shy as well as excited while we met,at times when we saw each other and sit together for the first time(Galaxyma, mamako unplanned thiyo so ma first bhet galaxy manxu) that cute smile which you gave just fluttered my heart, the more time we spend together after the first meetup, going to Huprachaur as I was not that talkative but I always kept searching for random topics to lengthen our conversation , to lengthen the time , the long it was the more my liking grew for you.❤️❤️";
var txt5="❤️❤️ Chapter Two - When we sit together for the first time ,That mesmerizing smell that came straight from your hair and the way you styled your hair all these things were just like a heavenly dream in which I was with a beautiful cute Barbie Doll. Our meetups, the most funnier part was the huprachaur where I was holding your hand to sing a song for you which was a challenge.. Yeah! The things we experienced in different places allowed us to see the true heart of each other and deepened our feelings. 'Years The more the moon passes, the more I feel in love❤️❤️ with you.'❤️❤️";
var txt6="❤️❤️ Chapter 3 - Galaxy Restaurant, Huprachaur our goto places,all these memories are always with me and whenever i see the captured moments , I crave for you and deeply miss you , our meetups, those moments with you all that just make me feel nostalgic.❤️❤️";
var txt7="❤️❤️ Chapter 4 - Period of my bad days ,where you always motivated me, this was the time when my love became more deeper , the best feeling which is there when you are with me.Even in the video calls your face and those beautiful eyes fluttered my heart and feelings just grew stronger and deeper just like our relationship.There were times when we fought , certain things disturbed us but we stayed together and overcome all of that.I feel special when you are there with me guiding me to the right path in every field and this makes my Love more stronger for you. Sharing each others problem,topics and difficulties makes the bond more strong.There are times when I made you sad , have done some mistakes,I regret those and will never repeat them again. All I just want is you to just be there with me Always.❤️❤️";
var txt8="❤️❤️ A year has flown by, and I didn't even realize it. Is the rest of our lives together going to run just as smoothly? I hope so. Wishing you a very happy anniversary ❤️❤️";
var txt9="❤️❤️ I'm not good at expressing words. When I write this webpage and say so many words, I just want to express the simple three words :- '❤️❤️I love you❤️❤️'. The sensational thing is: 'My heart is a single room, I want just you to be there!'❤️❤️";
var txt10="❤️❤️ Finally, I wish you our very Happy 1st Anniversary! with Lots of Love❤️❤️";
var txt11="Love you ❤️ Biju Aryal";
var txt12="❤️ With Lots of Love❤️";
var txt13="Dec 30, 2021";
heart.onclick=()=>
{
    bounceInLeft.classList.toggle('bounceOutRight');
    
    setTimeout(function(){
        start.classList.remove('active');
    },500);
    typeWriter();
    
    setTimeout(function(){
        date.classList.remove('oppa');
    },1200)
    setTimeout(() => {
        typeWriter2();
    }, 1700);
    setTimeout(() => {
        playAudio();
    }, 9000);
    setTimeout(() => {
        typeWriter3();
    }, 10000);
    setTimeout(() => {
        typeWriter4();
    }, 24000);
    setTimeout(() => {
        typeWriter5();
    }, 61200);
    setTimeout(() => {
        typeWriter6();
    }, 97500);
    setTimeout(() => {
        typeWriter7();
    }, 114000);
    setTimeout(() => {
        typeWriter8()
    }, 165500);
    setTimeout(() => {
        typeWriter9();
    }, 176500);
    setTimeout(() => {
        typeWriter10();
    }, 192500);
    setTimeout(() => {
        typeWriter11();
    }, 198000);
    setTimeout(() => {
        typeWriter12()
    }, 200000);
    setTimeout(() => {
        typeWriter13();
    }, 201000);
}


function typeWriter(){
    if (i < txt.length) {
        document.querySelector('h1').innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
}
function realDate(){
    var year=2020;
    var month=12;
    var day=30;
    var dateNow = new Date();
    var dateJNR = new Date(year, month - 1, day);
    var d = parseInt((dateNow - dateJNR) / (24 * 3600 * 1000));
    var hour = parseInt(((dateNow - dateJNR) / (3600 * 1000)) % 24);
    var minute = parseInt((dateNow - dateJNR) / (1000 * 60) % 60);
    var second = parseInt((dateNow - dateJNR) / 1000 % 60);
    dayss.innerHTML=d;
    hours.innerHTML=hour;
    minutes.innerHTML=minute;
    seconds.innerHTML=second;
}
var t=setInterval(realDate,1000);
function typeWriter2(){
    if (j < txt2.length) {
        document.querySelector('.first').innerHTML += txt2.charAt(j);
        j++;
        setTimeout(typeWriter2, speed);
      }
}
function playAudio(){
    myAudio = new Audio('audio/music2.mp3'); 
    if (typeof myAudio.loop == 'boolean')
    {
        myAudio.loop = true;
    }
    else
    {
        myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }
    myAudio.play();
}
function typeWriter3(){
    if (k < txt3.length) {
        document.querySelector('.second').innerHTML += txt3.charAt(k);
        k++;
        setTimeout(typeWriter3, speed);
      }
}
function typeWriter4(){
    if (l < txt4.length) {
        document.querySelector('.third').innerHTML += txt4.charAt(l);
        l++;
        setTimeout(typeWriter4, speed);
      }
}
function typeWriter5(){
    if (m < txt5.length) {
        document.querySelector('.fourth').innerHTML += txt5.charAt(m);
        m++;
        setTimeout(typeWriter5, speed);
      }
}
function typeWriter6(){
    if (n < txt6.length) {
        document.querySelector('.fifth').innerHTML += txt6.charAt(n);
        n++;
        setTimeout(typeWriter6, speed);
      }
}
function typeWriter7(){
    if (o < txt7.length) {
        document.querySelector('.sixth').innerHTML += txt7.charAt(o);
        o++;
        setTimeout(typeWriter7, speed);
      }
}







function typeWriter7(){
    if (o < txt7.length) {
        document.querySelector('.sixth').innerHTML += txt7.charAt(o);
        o++;
        setTimeout(typeWriter7, speed);
      }
}
function typeWriter8(){
    if (p < txt8.length) {
        document.querySelector('.seventh').innerHTML += txt8.charAt(p);
        p++;
        setTimeout(typeWriter8, speed);
      }
}
function typeWriter9(){
    if (q < txt9.length) {
        document.querySelector('.eighth').innerHTML += txt9.charAt(q);
        q++;
        setTimeout(typeWriter9, speed);
      }
}
function typeWriter10(){
    if (r < txt10.length) {
        document.querySelector('.ninth').innerHTML += txt10.charAt(r);
        r++;
        setTimeout(typeWriter10, speed);
      }
}
function typeWriter11(){
    if (s < txt11.length) {
        document.querySelector('.tenth').innerHTML += txt11.charAt(s);
        s++;
        setTimeout(typeWriter11, speed);
      }
}
function typeWriter12(){
    if (t < txt12.length) {
        document.querySelector('.eleven').innerHTML += txt12.charAt(t);
        t++;
        setTimeout(typeWriter12, speed);
      }
}
function typeWriter13(){
    if (u < txt13.length) {
        document.querySelector('.twelve').innerHTML += txt13.charAt(u);
        u++;
        setTimeout(typeWriter13, speed);
      }
}
