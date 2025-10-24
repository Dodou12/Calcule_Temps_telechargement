# Simulateur de téléchargement en temps réel

Ce projet est une **application web simple** permettant de **simuler le temps de téléchargement d’un fichier** en fonction de sa taille et du débit de connexion. Une **barre de progression animée** montre l’avancement du téléchargement de manière réaliste.

## Fonctionnalités

- Saisie de la **taille du fichier** à télécharger (Octets, Ko, Mo, Go).  
- Saisie du **débit de téléchargement** (en Kbps ou Mbps).  
- Calcul automatique du **temps estimé de téléchargement**.  
- Affichage du **temps en heures, minutes et secondes**.  
- Barre de progression qui **s’incrémente progressivement jusqu’à 100%**.  
- Message final indiquant que le téléchargement est **terminé**.

## Structure du projet
project-root/
│
├─ index.html # Page principale
├─ assets/
│ ├─ css/
│ │ └─ style.css # Styles pour le formulaire et la barre de progression
│ └─ js/
│ └─ script.js # Logique de calcul et animation
## Utilisation

1. Ouvrir `index.html` dans un navigateur.  
2. Entrer la taille du fichier et sélectionner l’unité correspondante.  
3. Entrer le débit de téléchargement et sélectionner l’unité (Kbps ou Mbps).  
4. Cliquer sur **Valider** pour lancer le calcul et voir la barre de progression s’animer.  
5. Le temps estimé de téléchargement s’affiche en haut de la barre.

## Remarques

- Les valeurs saisies doivent être **positives**.  
- Le calcul convertit automatiquement les tailles et débits en bits pour un calcul précis.  
- La barre de progression est simulée en pourcentage pour visualiser le téléchargement en temps réel.

## Auteur

- **Gabo Yann / Dodou12**
