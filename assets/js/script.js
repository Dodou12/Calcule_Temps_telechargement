const tailleDebitInput = document.getElementById("taille-debit"); // champ de saisie du débit
const tailleFichierInput = document.getElementById("taille-fichier"); // champ de saisie de la taille du fichier
const selectUnite = document.querySelector("select.select-unit"); // sélection de l'unité du fichier
const selectDebit = document.querySelector("select.select-debit"); // sélection de l'unité du débit
const progressBarAffichage = document.querySelector("#progress-bar"); // barre de progression
const messageResultat = document.querySelector("#message"); // affichage du message de résultat
const btnValideCalcule = document.querySelector("button"); // bouton de validation

// Initialisation des variables avec les valeurs saisies
let valeurFichier = tailleFichierInput.value;
let valeurDebit = tailleDebitInput.value;
let valeurSelectDebit = selectDebit.value;
let valeurSelctUnite = selectUnite.value;
let conversionFichier = 0; // taille du fichier convertie en octets
let conversionDebit = 0; // débit converti en octets/s
let temps_telechargement = 0; // temps de téléchargement calculé
let unite = ["o", "ko", "Mo", "Go"]; // unités possibles pour la taille
let debit = ["kb", "Mb"]; // unités possibles pour le débit

// Conversion de la taille du fichier en octets
function convertirFichier() {
  if (selectUnite) {
    if (valeurSelctUnite === unite[0]) {
      conversionFichier = valeurFichier * 8; // o → bits
    }
    if (valeurSelctUnite === unite[1]) {
      conversionFichier = valeurFichier * 1024; // ko → octets
    }
    if (valeurSelctUnite === unite[2]) {
      conversionFichier = valeurFichier * 1024 * 1024; // Mo → octets
    }
    if (valeurSelctUnite === unite[3]) {
      conversionFichier = valeurFichier * 1024 * 1024 * 1024; // Go → octets
    }
  }
}

// Conversion du débit en octets/s
function convertirDebit() {
  if (selectDebit) {
    if (valeurSelectDebit === debit[0]) {
      conversionDebit = (valeurDebit * 1024) / 8; // kb/s → octets/s
    }
    if (valeurSelectDebit === debit[1]) {
      conversionDebit = (valeurDebit * 1024 * 1024) / 8; // Mb/s → octets/s
    }
  }
}

function afficherMessages() {} // fonction vide, réservée pour messages supplémentaires

// Calcul et affichage du temps de téléchargement
function calculerTempsTelechargement() {
  temps_telechargement = conversionFichier / conversionDebit; // temps en secondes
  let s, m, h;

  if (temps_telechargement >= 3600) {
    // si ≥ 1 heure
    h = Math.floor(temps_telechargement / 3600);
    m = Math.floor((temps_telechargement % 3600) / 60);
    s = Math.floor(temps_telechargement % 60);

    if (messageResultat) {
      messageResultat.textContent = `Le temps de telechargement est de ${h}h:${m}m:${s}s`;
    }
  } else if (temps_telechargement >= 60) {
    // si ≥ 1 minute
    m = Math.floor(temps_telechargement / 60);
    s = Math.floor(temps_telechargement % 60);
    if (messageResultat) {
      messageResultat.textContent = `Le temps de telechargement est de ${m}m:${s}s`;
    }
  } else {
    // moins d'une minute
    s = temps_telechargement;
    if (messageResultat) {
      setTimeout(() => {
        messageResultat.textContent = `Le temps de telechargement est de ${s}s`;
      }, 500);
    }
  }
}

// Animation de la barre de progression en %
function progressBar() {
  progressBarAffichage.value = 0; // départ à 0%
  const duree = temps_telechargement; // durée totale du téléchargement en secondes
  const increment = 100 / duree; // pourcentage à ajouter chaque seconde
  let pourcentage = 0;

  const intervalId = setInterval(() => {
    pourcentage += increment; // incrémentation du pourcentage
    if (pourcentage >= 100) {
      // fin de la simulation
      pourcentage = 100;
      clearInterval(intervalId);
      messageResultat.textContent = "✅Terminé"; // message final
    }
    progressBarAffichage.value = pourcentage; // mise à jour de la barre
  }, 1000); // intervalle d'une seconde
}

// Événement du clic sur le bouton de calcul
btnValideCalcule.addEventListener("click", () => {
  valeurFichier = parseFloat(tailleFichierInput.value); // récupération et conversion en nombre
  valeurDebit = parseFloat(tailleDebitInput.value);
  valeurSelectDebit = selectDebit.value;
  valeurSelctUnite = selectUnite.value;

  // vérification des valeurs
  if (valeurFichier <= 0 || valeurDebit <= 0) {
    messageResultat.textContent = "Les valeurs ne peuvent etre negatif ";
    return;
  }

  convertirFichier(); // conversion de la taille
  convertirDebit(); // conversion du débit
  calculerTempsTelechargement(); // calcul du temps
  progressBar(); // lancement de la barre de progression
});
