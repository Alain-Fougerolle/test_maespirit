## Task

Test visant à appeller et transformer des données de l'api https://ll.thespacedevs.com/2.2.0/launch/

Création d'une fonction 'retrieve' pour récupérer et transformer les données dans cette configuration :

{ ids, success, failure_canaveral_spacex, previousPage, nextPage } // Tous en suivant les tâches décrites dans le test.

Ajout d'options dans la fonction 'retrieve' pour la gestion des pages et des localisations.

Affichage du champ 'success' dans un tableau pour voir tous les lancements réussis sur les 10 lancements.

Ajout de deux boutons qui demandent la page suivante ou précendente pour voir plus de lancements réussis.

## Setup

You need node >= 10.

    > yarn #to install
    > yarn dev #to launch with HMR
