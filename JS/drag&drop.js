function allowDrop(ev){
ev.preventDefault();
}

var isWhiteTurn = true;

function drag(ev){
ev.dataTransfer.setData("Text",ev.target.id);
ev.dataTransfer.setData("Position",ev.target.parentNode.id);
//console.log(ev.target.parentNode);
var el = ev.target;
	if ((el.id[0]==="w" && isWhiteTurn===false) || (el.id[0]==="b" && isWhiteTurn===true))  {		//daca prima literea din id e "w"(pentru alb) sau "b" (pentru negru)
	alert("Not your turn!!")
	return;
 	};
}

function drop(ev){
ev.preventDefault();
var piece = ev.dataTransfer.getData("Text");               //variabila piesei de sah
var position = ev.dataTransfer.getData("Position");	       //variabila pozitiei initiale
								
if ((ev.target.firstChild) && (ev.target.id.charAt(0)===piece[0])) {			//daca are copil si daca e de aceeasi culoare
	return;
}
/*console.log(ev.target.firstChild);
console.log(ev.target.id);*/

if(!ev.target.firstChild){
	if (isValidMove(ev.target,piece,position) === true){
		ev.target.appendChild(document.getElementById(piece));
		isWhiteTurn = !isWhiteTurn;	

	}												
}

else if ((ev.target.firstChild) && (ev.target.id.charAt(0)!==piece[0])) {
console.log("Ataca");		
	if (isValidMove(ev.target.parentNode,piece,position) === true){
	ev.target.parentNode.appendChild(document.getElementById(piece));
	isWhiteTurn = !isWhiteTurn;													// odata alb, odata negru
	ev.target.parentNode.removeChild(ev.target);			// daca are deja continut pe parinte se da remove la primul copil
	}
}
}

function isValidMove(target,piece,position){
	switch (piece[1]) {
		case "P": 
				 return movePawn(target,piece,position);
			break;
		case "R": 
				return moveRock(target,piece,position);
			break;
		case "N": 
				return moveKnight(target,piece,position);
			break;
		case "B": 
				return moveBishop(target,piece,position);
			break;
		case "Q": 
				return moveQueen(target,piece,position);
			break;
		case "K": 
				return moveKing(target,piece,position);
			break;

	};
	return false;
}

function movePawn(target,piece,position){

var x = position[1];
var xi = x.charCodeAt(0);
var xx = target.id[1];
var xf = xx.charCodeAt(0);
var xd = xf - xi;

var y = position[0];
var yi = y.charCodeAt(0);
var yy = target.id[0];
var yf = yy.charCodeAt(0);
var yd = Math.abs(yf - yi);
var z = target.childNodes.length; //daca pozitia finala are piesa z=1 daca nu z=0

// console.log(piece[0]);
// console.log(x);
// console.log(yd);
// console.log(xd);
// console.log(target.childNodes.length);

//daca piesa e alba si daca e pe randul 2 sa mearga inainte cu una sau 2 patratele
if((piece[0]==="w")&&(z==0)&&((x==2)&&(xd==2)||(xd==1))&&(yd==0)){
	console.log("Pawn" + " from " + position +" to " + target.id);
		return true;	
}else if ((piece[0]==="w")&&(z==1)&&(yd==1)&&(xd==1)) {
	console.log("Pawn" + " from " + position +" to " + target.id);
		return true;
};

//daca piesa e neagra si daca e pe randul 2 sa mearga inainte cu una sau 2 patratele
if((piece[0]==="b")&&(z==0)&&((x==7)&&(xd==-2)||(xd==-1))&&(yd==0)){
	console.log("Pawn" + " from " + position +" to " + target.id);
		return true;	
}else if ((piece[0]==="b")&&(z==1)&&(yd==1)&&(xd==-1)) {
	console.log("Pawn" + " from " + position +" to " + target.id);
		return true;
return false;

}
}






function moveRock(target,piece,position){
var yi = +position[1];
var xi = position[0];
var xci = xi.charCodeAt(0);
var yf = +target.id[1];
var xf = target.id[0];
var xcf = xf.charCodeAt(0); 

var sxci = String.fromCharCode(xci);
var sxcf = String.fromCharCode(xcf);

if ((xi != xf) && (yi != yf)) {
	return false;
}
if (xi === xf) {
	var i = yf>yi ? yi+1 : yf+1;
	var l = yf>yi ? yf : yi;
	var domEl = null;
// console.log(xi);
// console.log(xf);
// console.log(i,l);
// console.log(domEl);

	for (i; i<l; i++) {
		// selecteaza el din dom
		domEl = document.querySelector('#' + xi + i);
		console.log(domEl);

		if (domEl.childNodes.length) {
			return false;
		}	
	}
}else if (yi === yf) {
	var i = xcf>xci ? xci+1 : xcf+1;
	var l = xcf>xci ? xcf : xci;
	var domEl = null;
	var si = String.fromCharCode(i);
	var sl = String.fromCharCode(l);
	var domEl = null;

// console.log(yi);
// console.log(xi,xf);
// console.log(xci,xcf);
// console.log(sxci,sxcf);
// console.log(i,l);
// console.log(si,sl);
// console.log(domEl);

	for(i; i<l; i++) {
		var si = String.fromCharCode(i);
		domEl = document.querySelector('#' + si + yi);
		
/*console.log (si + yi);
console.log (sl + yi);
console.log(i,l);
console.log ("merge");
console.log(domEl);*/
		
		if (domEl.childNodes.length) {
			return false;
		}
	}
}

console.log("Rock" + " from " + position +" to " + target.id);
return true;
}






function moveBishop(target,piece,position){
//console.log(target);
var yi = +position[1];
var xi = position[0];
var xci = xi.charCodeAt(0);
var yf = +target.id[1];
var xf = target.id[0];
var xcf = xf.charCodeAt(0);

var xd = xcf-xci;
var mxd = Math.abs(xd);
var yd = yf-yi;
var myd = Math.abs(yd);

var sxci = String.fromCharCode(xci);
var sxcf = String.fromCharCode(xcf);


//console.log(xi,xf);
//console.log(xci,xcf);
//console.log(sxci,sxcf)
//console.log(yi,yf);
//console.log(xd,yd);
//console.log(mxd,myd);

if (mxd != myd) {
	return false;
}

if (xd === yd) {
	var i = yf>yi ? yi+1 : yf+1;
	var j = xcf>xci ? xci+1 : xcf+1; 
	var l = xcf>xci ? xcf : xci;
	
	console.log(i,j,l);
	var domEl = null;

	for(i,j; i,j<l; i++,j++) {
		var sj = String.fromCharCode(j);
		domEl = document.querySelector('#' + sj + i);

		console.log(sj,i);
		console.log(domEl);

		if (domEl.childNodes.length) {
			return false;
		}
	}
}else if (xd!==yd) {

	if (xcf>xci){
		var i = xci+1;
		var j = yi-1;
		var l = xcf;
		var domEl = null;
		console.log(i,j,l);
		
		for(i,j; i<l; i++,j--){
			var si = String.fromCharCode(i);
			console.log(si);
			domEl = document.querySelector('#' + si + j)
			console.log(domEl);

			if (domEl.childNodes.length) {
				return false;
			}
		}

	}else if (xcf<xci) {
		var i = xci-1;
		var j = yi+1;
		var l = xcf;
		var domEl = null;
		console.log(i,j,l);

		for(i,j; i<l; i--,j++){
			//AICICIACIACIACIACIACIAICACIACIACIAICACIACIAICAICAICAICAICAICAICAICAICAICIACIACIACIACIACIACIACIACI
			//ACACIACIACIACIACIACIACIACIACIACIACIAICAICAICAICAICAICIACIACIACIACI
		}

	} 
}


console.log("Bishop" + " from " + position +" to " + target.id);
return true;
}








function moveQueen(target,piece,position){
var x = position[1];
var xi = x.charCodeAt(0);
var xx = target.id[1];
var xf = xx.charCodeAt(0);
var xd = Math.abs(xf - xi);

var y = position[0];
var yi = y.charCodeAt(0);
var yy = target.id[0];
var yf = yy.charCodeAt(0);
var yd = Math.abs(yf - yi);

//console.log(xx,xd,yf,yd)
if ((xd != yd) && (xi!=xf)&&(yi!=yf)){
	return false;
}
console.log("Queen" + " from " + position +" to " + target.id);
return true;
}

function moveKing(target,piece,position){
var x = position[1];
var xi = x.charCodeAt(0);
var xx = target.id[1];
var xf = xx.charCodeAt(0);
var xd = Math.abs(xf - xi);

var y = position[0];
var yi = y.charCodeAt(0);
var yy = target.id[0];
var yf = yy.charCodeAt(0);
var yd = Math.abs(yf - yi);

if ((xd>1) || (yd>1)) {
	return false;
};
console.log("King" + " from " + position +" to " + target.id);
return true;
}

function moveKnight(target,piece,position){
var x = position[1];
var xi = x.charCodeAt(0);
var xx = target.id[1];
var xf = xx.charCodeAt(0);
var xd = Math.abs(xf - xi);

var y = position[0];
var yi = y.charCodeAt(0);
var yy = target.id[0];
var yf = yy.charCodeAt(0);
var yd = Math.abs(yf - yi);

if (((xd==2)&&(yd!=1)) || ((yd==2)&&(xd!=1)) ||((xd==1)&&(yd!=2)) || ((yd==1)&&(xd!=2)) || (xd>2) || (yd>2)) {
	return false;
}
console.log("Knight" + " from " + position +" to " + target.id);
return true;

};
