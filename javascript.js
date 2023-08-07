//creer la matrice sur la page HTML
let nombreDeLigne = 25;
let nombreDeColonne = 20;
let main = document.getElementById("main");
let tableAdeuxDimentions = document.createElement("table");
let btnactu = document.createElement("button");
btnactu.id="bouttonmain";
btnactu.innerHTML= "Nouvelle partie";
tableAdeuxDimentions.id="matrice";
for(let i = 0; i<nombreDeLigne;i++){
    let ligneMatrice = document.createElement('tr');
    for(let j = 0; j<nombreDeColonne;j++){
        let celluleMatrice = document.createElement("td");
        let TexteDeLaCellule = document.createTextNode(0);
        celluleMatrice.className="mur";
        celluleMatrice.appendChild(TexteDeLaCellule);
        ligneMatrice.appendChild(celluleMatrice);
    }
    tableAdeuxDimentions.appendChild(ligneMatrice);
}
main.appendChild(tableAdeuxDimentions);
//---------------------------------------------------------------------------------------------------------------------------------
//creer les chemins du labyrinthe
let mat = document.getElementById("matrice");
let indexLigneDebut = Math.round(Math.random()*(nombreDeLigne-1));
let indexCelluleDebut = Math.round(Math.random()*(nombreDeColonne-1));
let indexLigneDeRecherche=indexLigneDebut;
let indexCelluleDeRecherche=indexCelluleDebut;
let indexLigneTresor;
let indexCelluleTresor;
let vies = document.getElementById("vies");
let tres = document.getElementById("tresores");
let x = indexLigneDebut;
let y = indexCelluleDebut;
let derniereCellule = nombreDeColonne-1;
let derniereLigne = nombreDeLigne-1;
tableAdeuxDimentions.rows[x].cells[y].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="chemin">';
tableAdeuxDimentions.rows[x].cells[y].className="chemin";
function DistanceAleatoireDroite(c){
    let distanceMaxDroite = derniereCellule - c;
    let distanceAleatoireDroite = 0; 
    if(distanceMaxDroite >=2){distanceAleatoireDroite= Math.floor(Math.random() * (distanceMaxDroite - 1)) + 2;return distanceAleatoireDroite;}
} 
function DistanceAleatoireGauche(c){
    let distanceMaxGuache = c;
    let distanceAleatoireGauche =0;  
    if (distanceMaxGuache>=2){distanceAleatoireGauche = Math.floor(Math.random() * (distanceMaxGuache - 1)) + 2;return distanceAleatoireGauche;}
  }
function DistanceAleatoireHaut(l){
    let distanceMaxHaut =  l ;
    let distanceAleatoireHaut =0; 
    if (distanceMaxHaut>=2){distanceAleatoireHaut = Math.floor(Math.random() * (distanceMaxHaut - 1)) + 2;return distanceAleatoireHaut;}}
function DistanceAleatoireBas(l){
    let distanceMaxBas = derniereLigne -l;
    let distanceAleatoireBas =0; 
    if (distanceMaxBas>=2){distanceAleatoireBas = Math.floor(Math.random() * (distanceMaxBas - 1)) + 2;return distanceAleatoireBas;}
}
function GenererLab(m){
    for(let i=0;i<m;i++){
        let selectionDeDirection = Math.floor(Math.random()*4);
        
        if (selectionDeDirection == 0){Droite(y);}
        if (selectionDeDirection == 1){Haut(x);}
        if (selectionDeDirection == 2){Gauche(y);}
        if (selectionDeDirection == 3){Bas(x);}
    }
}
function Droite(c){
    for(let i = 0 ; i < DistanceAleatoireDroite(c) ; i++){
        y++;
        tableAdeuxDimentions.rows[x].cells[y].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
        tableAdeuxDimentions.rows[x].cells[y].className="chemin";
    }
    tableAdeuxDimentions.rows[x].cells[y].innerHTML='3<img src="images/tresores.png" alt="monstre" id="tresorimg">';
    tableAdeuxDimentions.rows[x].cells[y].className="tresor";
    document.getElementById("tresorimg").classList.add('tresorimg');
}
function Gauche(c){
    for(let i = 0 ; i < DistanceAleatoireGauche(c) ; i++){
        y--;
        tableAdeuxDimentions.rows[x].cells[y].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
        tableAdeuxDimentions.rows[x].cells[y].className="chemin";
    }
    tableAdeuxDimentions.rows[x].cells[y].textContent=4;
    tableAdeuxDimentions.rows[x].cells[y].className="monstre";
    tableAdeuxDimentions.rows[x].cells[y].innerHTML='4<img src="images/monstre1.png" alt="monstre" id="monstreImg">';
}
function Haut(l){
    for(let i = 0 ; i < DistanceAleatoireHaut(l) ; i++){
        x--;
        tableAdeuxDimentions.rows[x].cells[y].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
        tableAdeuxDimentions.rows[x].cells[y].className="chemin";
    }
}
function Bas(l){
    for(let i = 0 ; i <DistanceAleatoireBas(l) ; i++){
        x++;
        tableAdeuxDimentions.rows[x].cells[y].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
        tableAdeuxDimentions.rows[x].cells[y].className="chemin";
    }
}
GenererLab(100); 
//-----------------------------------------------------------------------------------------------------------------------------   
//Intégré le joueur d'une maniére aléatoire
let indexJoueurLigne = x;
let indexJoueurCellule = y;
tableAdeuxDimentions.rows[indexJoueurLigne].cells[indexJoueurCellule].innerHTML='2<img src="images/pirate.png" alt="Joueur" id="jou">';
tableAdeuxDimentions.rows[indexJoueurLigne].cells[indexJoueurCellule].className="joueur";
EntreeDuJoueur();
function EntreeDuJoueur(){
document.getElementById("jou").classList.add('joueurEntre');
setTimeout(() => {
    document.getElementById("jou").classList.remove('joueurEntre');
  }, 2000);}
//-----------------------------------------------------------------------------------------------------------------------------
//compter les tresores et le nombres de vie disponible dans la barre 
let barre = document.querySelector("nav");
let nombreDeTresore = NombreDeTresor();
let nombreDeTresoreTrouver=0;
let nombreDeVie = 3;
tres.innerHTML ='<img src="images/tresores.png" alt="tresore" id = "imgtr">Nombre De trésore trouvé : '+ nombreDeTresoreTrouver +" / "+ nombreDeTresore;
vies.innerText ="Nombre De vie restant : "+nombreDeVie+" /3 ";
function NombreDeTresor(){
    let nbrTresore = 0;
    for (let i =0 ; i<nombreDeLigne;i++){
        for(let j =0; j<nombreDeColonne;j++){
            if(tableAdeuxDimentions.rows[i].cells[j].textContent==3){
                nbrTresore++;
            }
        }
    }
    return nbrTresore;
}
barre.appendChild(btnactu);
btnactu.addEventListener("click",function(){
    location.reload();
});

//Afficher la page du résultat final
//----------------------------------------------------------------------------------------------------------------------------
let ResultatMessage = document.createElement("div");
ResultatMessage.className="resultatmessage";
main.appendChild(ResultatMessage);
let image1 = document.createElement("div");
image1.id="image1";
ResultatMessage.appendChild(image1);
let resultat = document.createElement("H1");
ResultatMessage.appendChild(resultat);
let image2 = document.createElement("div");
image2.id="image2";
ResultatMessage.appendChild(image2);
let bouttonRejouer = document.createElement("button");
ResultatMessage.appendChild(bouttonRejouer);
bouttonRejouer.innerText="Rejouer" ;
bouttonRejouer.addEventListener("click",function(){
    location.reload();
});
let imageloose1 = '<img src="images/loose1-transformed.png" alt="monstre content">'; 
let imageloose2 = '<img src="images/loose2-transformed.png" alt="monstre content">'; 
let imageWin1= '<img src="images/win1-transformed.png" alt="monstre pas content">';
let imageWin2= '<img src="images/win2-transformed.png" alt="monstre pas content">'; 
//----------------------------------------------------------------------------------------------------------------------------
//faire bouger le joueur
let i = x;
let j = y;
let creuserhaut = false;
let creuserbas=false;
let creuserdroite=false;
let creusergauche=false;
window.addEventListener("keydown",bougerLeJoueur);
function bougerLeJoueur(event){
    console.log("nombre de vie "+nombreDeVie);
    if(nombreDeTresoreTrouver<nombreDeTresore && nombreDeVie >0){
        if ((event.key === "ArrowRight")) {
            deplacerMonstre(); 
            if(j < nombreDeColonne-1){
                if(mat.rows[i].cells[j+1].textContent==1){
                    mat.rows[i].cells[j].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
                    mat.rows[i].cells[j].className="chemin";
                    j+=1;
                    mat.rows[i].cells[j].innerHTML='2<img src="images/pirate.png" alt="Joueur" id="jou">';
                    mat.rows[i].cells[j].className="joueur";
                    creuserhaut=false;
                    creuserbas=false;
                    creusergauche=false;
                }else if(mat.rows[i].cells[j+1].textContent==0){
                    creuserdroite = true;
                }else if(mat.rows[i].cells[j+1].textContent==3){
                    mat.rows[i].cells[j].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
                    mat.rows[i].cells[j].className="chemin";
                    j+=1;
                    mat.rows[i].cells[j].innerHTML='2<img src="images/pirate.png" alt="Joueur" id="jou">';
                    mat.rows[i].cells[j].className="joueur";
                    nombreDeTresoreTrouver ++;
                    tres.innerHTML ='<img src="images/tresores.png" alt="tresore" id = "imgtr">Nombre De trésore trouvé : '+ nombreDeTresoreTrouver +" / "+ nombreDeTresore;
                    if(nombreDeTresoreTrouver>=nombreDeTresore){
                        resultat.textContent = "Gagné!";
                        ResultatMessage.style.display="flex";
                        image1.innerHTML=imageWin1;
                        image2.innerHTML=imageWin2;
                    }        
                }else if(mat.rows[i].cells[j+1].textContent==4){
                    mat.rows[i].cells[j].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
                    mat.rows[i].cells[j].className="chemin";
                    j=indexJoueurCellule;
                    i=indexJoueurLigne;
                    mat.rows[i].cells[j].innerHTML='2<img src="images/pirate.png" alt="Joueur" id="jou">';
                    mat.rows[i].cells[j].className="joueur";
                    EntreeDuJoueur();
                    nombreDeVie--;
                    vies.innerText ="Nombre De vie restant : "+nombreDeVie+" /3 ";
                    if(nombreDeVie<=0){
                        resultat.textContent="Pérdu!";
                        ResultatMessage.style.display="flex";
                        image1.innerHTML=imageloose1;
                        image2.innerHTML=imageloose2;
                    }
                }
            }
        }else if (event.key === "ArrowLeft") {
            deplacerMonstre();
            if(j >0){
                if(mat.rows[i].cells[j-1].textContent==1){
                    mat.rows[i].cells[j].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
                    mat.rows[i].cells[j].className="chemin";
                    j-=1;
                    mat.rows[i].cells[j].innerHTML='2<img src="images/pirate.png" alt="Joueur" id="jou">';
                    mat.rows[i].cells[j].className="joueur";
                    console.log(j);
                    creuserhaut=false;
                    creuserbas=false;
                    creuserdroite=false;
                }else if(mat.rows[i].cells[j-1].textContent==0){
                    creusergauche = true;
                }else if(mat.rows[i].cells[j-1].textContent==3){
                    mat.rows[i].cells[j].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
                    mat.rows[i].cells[j].className="chemin";
                    j-=1;
                    mat.rows[i].cells[j].innerHTML='2<img src="images/pirate.png" alt="Joueur" id="jou">';
                    mat.rows[i].cells[j].className="joueur";
                    nombreDeTresoreTrouver ++;
                    tres.innerHTML ='<img src="images/tresores.png" alt="tresore" id = "imgtr">Nombre De trésore trouvé : '+ nombreDeTresoreTrouver +" / "+ nombreDeTresore;
                    if(nombreDeTresoreTrouver>=nombreDeTresore){
                        resultat.textContent = "Gagné!";
                        ResultatMessage.style.display="flex";
                        image1.innerHTML=imageWin1;
                        image2.innerHTML=imageWin2;
                    }    
                }else if(mat.rows[i].cells[j-1].textContent==4){
                    mat.rows[i].cells[j].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
                    mat.rows[i].cells[j].className="chemin";
                    j=indexJoueurCellule;
                    i=indexJoueurLigne;
                    mat.rows[i].cells[j].innerHTML='2<img src="images/pirate.png" alt="Joueur" id="jou">';
                    mat.rows[i].cells[j].className="joueur";
                    EntreeDuJoueur();
                    nombreDeVie--;
                    vies.innerText ="Nombre De vie restant : "+nombreDeVie+" /3 ";
                    if(nombreDeVie<=0){
                        resultat.textContent="Pérdu!";
                        ResultatMessage.style.display="flex";
                        image1.innerHTML=imageloose1;
                        image2.innerHTML=imageloose2;
                    }
                }
            }
        }else if (event.key === "ArrowDown") {
            deplacerMonstre();
            if(i <nombreDeLigne-1){
                if(mat.rows[i+1].cells[j].textContent==1){
                    mat.rows[i].cells[j].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
                    mat.rows[i].cells[j].className="chemin";
                    i+=1;
                    mat.rows[i].cells[j].innerHTML='2<img src="images/pirate.png" alt="Joueur" id="jou">';
                    mat.rows[i].cells[j].className="joueur";
                    console.log(i);
                    creuserhaut=false;
                    creuserdroite=false;
                    creusergauche=false;
                }else if(mat.rows[i+1].cells[j].textContent==0){
                    creuserbas = true;
                }else if(mat.rows[i+1].cells[j].textContent==3){
                    mat.rows[i].cells[j].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
                    mat.rows[i].cells[j].className="chemin";
                    i+=1;
                    mat.rows[i].cells[j].innerHTML='2<img src="images/pirate.png" alt="Joueur" id="jou">';
                    mat.rows[i].cells[j].className="joueur";
                    nombreDeTresoreTrouver ++;
                    tres.innerHTML ='<img src="images/tresores.png" alt="tresore" id = "imgtr">Nombre De trésore trouvé : '+ nombreDeTresoreTrouver +" / "+ nombreDeTresore;
                    if(nombreDeTresoreTrouver>=nombreDeTresore){
                        resultat.textContent = "Gagné!";
                        ResultatMessage.style.display="flex";
                        image1.innerHTML=imageWin1;
                        image2.innerHTML=imageWin2;
                    }   
                }else if(mat.rows[i+1].cells[j].textContent==4){
                    mat.rows[i].cells[j].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
                    mat.rows[i].cells[j].className="chemin";
                    j=indexJoueurCellule;
                    i=indexJoueurLigne;
                    mat.rows[i].cells[j].innerHTML='2<img src="images/pirate.png" alt="Joueur" id="jou">';
                    mat.rows[i].cells[j].className="joueur";
                    EntreeDuJoueur();
                    nombreDeVie--;
                    vies.innerText ="Nombre De vie restant : "+nombreDeVie+" /3 ";
                    if(nombreDeVie<=0){
                        resultat.textContent="Pérdu!";
                        ResultatMessage.style.display="flex";
                        image1.innerHTML=imageloose1;
                        image2.innerHTML=imageloose2;
                    }    
                }
            }
        }else if (event.key === "ArrowUp") {
            deplacerMonstre();
            if(i >0){
                if(mat.rows[i-1].cells[j].textContent==1){
                    mat.rows[i].cells[j].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
                    mat.rows[i].cells[j].className="chemin";
                    i-=1;
                    mat.rows[i].cells[j].innerHTML='2<img src="images/pirate.png" alt="Joueur" id="jou">';
                    mat.rows[i].cells[j].className="joueur";
                    console.log(i);
                    creuserbas=false;
                    creuserdroite=false;
                    creusergauche=false;
                }else if(mat.rows[i-1].cells[j].textContent==0){
                    creuserhaut = true;
                }else if(mat.rows[i-1].cells[j].textContent==3){
                    mat.rows[i].cells[j].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
                    mat.rows[i].cells[j].className="chemin";
                    i-=1;
                    mat.rows[i].cells[j].innerHTML='2<img src="images/pirate.png" alt="Joueur" id="jou">';
                    mat.rows[i].cells[j].className="joueur";
                    nombreDeTresoreTrouver ++;
                    tres.innerHTML ='<img src="images/tresores.png" alt="tresore" id = "imgtr">Nombre De trésore trouvé : '+ nombreDeTresoreTrouver +" / "+ nombreDeTresore;
                    if(nombreDeTresoreTrouver>=nombreDeTresore){
                        resultat.textContent = "Gagné!";
                        ResultatMessage.style.display="flex";
                        image1.innerHTML=imageWin1;
                        image2.innerHTML=imageWin2;
                    }
                    
                }
                else if(mat.rows[i-1].cells[j].textContent==4){
                    mat.rows[i].cells[j].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
                    mat.rows[i].cells[j].className="chemin";
                    j=indexJoueurCellule;
                    i=indexJoueurLigne;
                    mat.rows[i].cells[j].innerHTML='2<img src="images/pirate.png" alt="Joueur" id="jou">';
                    mat.rows[i].cells[j].className="joueur";
                    EntreeDuJoueur();
                    nombreDeVie--;
                    vies.innerText ="Nombre De vie restant : "+nombreDeVie+" /3 ";
                    if(nombreDeVie<=0){
                        resultat.textContent="Pérdu!";
                        ResultatMessage.style.display="flex";
                        image1.innerHTML=imageloose1;
                        image2.innerHTML=imageloose2;
                    }
                }
            }
        }else if (event.key === " " && creuserhaut) {
                if(i >0){
                    if(mat.rows[i-1].cells[j].textContent==0){
                        mat.rows[i-1].cells[j].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
                        mat.rows[i-1].cells[j].className="chemin";
                        console.log(i);
                        creuserhaut=false;
                    }
                }
        }else if (event.key === " " && creuserbas) {
            if(i <nombreDeLigne-1){
                if(mat.rows[i+1].cells[j].textContent==0){
                    mat.rows[i+1].cells[j].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
                    mat.rows[i+1].cells[j].className="chemin";
                    console.log(i);
                    creuserbas=false;
                }
            }
        }else if (event.key === " " && creuserdroite) {
            if(j < nombreDeColonne-1){
                if(mat.rows[i].cells[j+1].textContent==0){
                    mat.rows[i].cells[j+1].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
                    mat.rows[i].cells[j+1].className="chemin";
                    console.log(j);
                    creuserdroite=false;
                }
            }
        }else if (event.key === " " && creusergauche) {
            if(j >0){
                if(mat.rows[i].cells[j-1].textContent==0){
                    mat.rows[i].cells[j-1].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
                    mat.rows[i].cells[j-1].className="chemin";
                    console.log(j);
                    creusergauche=false;
                }
            }
        }else{
                return;
            }
    }else{ 
        
            
    }
}

let monstres = document.getElementsByClassName("monstre");

let nombreMonstre = monstres.length;


function deplacerMonstre() {
  Array.from(monstres).forEach(monstre => {
    let xk = monstre.parentElement.rowIndex;
    let yk = monstre.cellIndex;
    let aldeclancheur = Math.floor(Math.random()*4);
    if ((yk > 0 && yk < nombreDeColonne - 1)&&(xk > 0 && xk < nombreDeLigne - 1)) {
        if (aldeclancheur == 0) { DeplacementMonstreDroite(xk,yk);}
        if (aldeclancheur == 1) { DeplacementMonstreGauche(xk,yk);}
        if (aldeclancheur == 2) { DeplacementMonstreBas(xk,yk);}
        if (aldeclancheur == 3) {DeplacementMonstreHaut(xk,yk);}
    }
    if(yk == 0){
        if (aldeclancheur == 0) {DeplacementMonstreDroite(xk,yk);}
        if(aldeclancheur == 1) {DeplacementMonstreBas(xk,yk);}
        if (aldeclancheur == 2) {DeplacementMonstreHaut(xk,yk);}
    }
    if(yk == nombreDeColonne - 1){
        if (aldeclancheur == 0) {DeplacementMonstreGauche(xk,yk);}
        if (aldeclancheur == 1) {DeplacementMonstreBas(xk,yk);}
        if (aldeclancheur == 2) {DeplacementMonstreHaut(xk,yk);}
    }
    if(xk == 0){
        if (aldeclancheur == 0) {DeplacementMonstreDroite(xk,yk);}
        if (aldeclancheur == 1) {DeplacementMonstreGauche(xk,yk);}
        if (aldeclancheur == 2) {DeplacementMonstreBas(xk,yk);}
    }
    if(xk == nombreDeLigne - 1){
        if (aldeclancheur == 0) {DeplacementMonstreDroite(xk,yk);}
        if (aldeclancheur == 1) {DeplacementMonstreGauche(xk,yk);}
        if (aldeclancheur == 2) {DeplacementMonstreHaut(xk,yk);}
    }            
    if(xk == nombreDeLigne - 1 && yk == nombreDeColonne-1){
        if (aldeclancheur == 0) {DeplacementMonstreGauche(xk,yk);}
        if (aldeclancheur == 1) {DeplacementMonstreHaut(xk,yk);}
    }
    if(xk == nombreDeLigne - 1 && yk == 0){
        if (aldeclancheur == 0) {DeplacementMonstreDroite(xk,yk);}
        if (aldeclancheur == 1) {DeplacementMonstreHaut(xk,yk);}
    }
    if(xk == 0 && yk == 0){
        if (aldeclancheur == 0) {DeplacementMonstreDroite(xk,yk);}
        if (aldeclancheur == 1) {DeplacementMonstreBas(xk,yk);}
    }
    if(xk == 0 && yk == nombreDeColonne-1){
        if (aldeclancheur == 0) {DeplacementMonstreGauche(xk,yk);} 
        if (aldeclancheur == 1) {DeplacementMonstreBas(xk,yk);}
    }
  });

}


function DeplacementMonstreDroite(xm,ym){
    if (tableAdeuxDimentions.rows[xm].cells[ym + 1].textContent == "1"){ 
        tableAdeuxDimentions.rows[xm].cells[ym].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
        tableAdeuxDimentions.rows[xm].cells[ym].className = "chemin";
        ym++;
        tableAdeuxDimentions.rows[xm].cells[ym].className = "monstre";
        tableAdeuxDimentions.rows[xm].cells[ym].innerHTML='4<img src="images/monstre1.png" alt="monstre">';
        console.log(tableAdeuxDimentions.rows[xm].cells[ym].textContent)
    }
}
function DeplacementMonstreGauche(xm,ym){
    if (tableAdeuxDimentions.rows[xm].cells[ym - 1].textContent == "1"){ 
        tableAdeuxDimentions.rows[xm].cells[ym].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
        tableAdeuxDimentions.rows[xm].cells[ym].className = "chemin";
        ym--;
        tableAdeuxDimentions.rows[xm].cells[ym].className = "monstre";
        tableAdeuxDimentions.rows[xm].cells[ym].innerHTML='4<img src="images/monstre1.png" alt="monstre">';
    }
}
function DeplacementMonstreHaut(xm,ym){
    if (tableAdeuxDimentions.rows[xm-1].cells[ym].textContent == "1") {
        tableAdeuxDimentions.rows[xm].cells[ym].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
        tableAdeuxDimentions.rows[xm].cells[ym].className = "chemin";
        xm--;
        tableAdeuxDimentions.rows[xm].cells[ym].textContent = "4";
        tableAdeuxDimentions.rows[xm].cells[ym].className = "monstre";
        tableAdeuxDimentions.rows[xm].cells[ym].innerHTML='4<img src="images/monstre1.png" alt="monstre">';
      }
}
function DeplacementMonstreBas(xm,ym){
    if (tableAdeuxDimentions.rows[xm+1].cells[ym].textContent == "1") {
        tableAdeuxDimentions.rows[xm].cells[ym].innerHTML='1<img src="images/Cartoon_green_texture_grass.jpg" alt="monstre">';
        tableAdeuxDimentions.rows[xm].cells[ym].className = "chemin";
        xm++;
        tableAdeuxDimentions.rows[xm].cells[ym].className = "monstre";
        tableAdeuxDimentions.rows[xm].cells[ym].innerHTML='4<img src="images/monstre1.png" alt="monstre">';
      }
}

































