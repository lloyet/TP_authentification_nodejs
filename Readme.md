# Objectifs

## Etape 1

1. Créer une API d'authentification qui authorize et générer un JWT sur la route `/v2/login` avec des droits utilisateurs dans le scope
2. Créer une seconde API d'un service de votre choix qui contiendra une route avec un accès resteindre. Cette route sera uniquement accessible au request ayant un jwt avec un scope qui contient le droit à la lecture ou écriture de la ressource en question.

Exemple:

Api-Authentification -> /v2/login -> JWT avec scope "payments:rw"

Api-Payments -> /payments -> Autorise uniquement les JWT avec le scope "payments:rw" ou "payments:r"

## Etape 2

1. Rajouter une route avec méthode `POST` sur `/payments` pour créer dans un tableau (défini en global dans votre programme) la ressource `Payment`. L'utilisateur ne peut créer un `Payment` que si le JWT possede le scope `payments:rw`.
2. Rajouter une route avec méthode `DELETE` sur `/payments/:paymentid` pour supprimer du tableau (défini en global dans votre programme) la ressource `Payment` par id. L'utilisateur ne peut créer un `Payment` que si le JWT possede le scope `payments:rw`.
3. Modifier la route avec la methode `GET` sur `/payments/:paymentid` pour obtenir le payment par id uniquement si le JWT possède le scope `payment:r` ou `payment:rw`.

## Projet

**Objectifs**

1. Développer une API d'authentification qui va générer les tokens JWT

- Dans l'API d'authentification il faut qu'il y est au minimum 2 utilisateurs avec 2 rôles différents (role administrateur et role utilisateur)
- Il faut stocker les données utilisateurs et les roles en base de donnée `sqlite`
- L'API doit signé un token JWT et le renvoyer à l'utilisateur lors de son login

2. Développer une API de services sur le thème de votre choix (blog, banque, réseaux social).

- Elle doit comportée 4 routes différentes pour (lire, écrire, modifer et supprimer) la ressource de votre choix tout en respectant les droits requis.
- Chaque route doit autoriser ou restreindre l'accès à l'utilisateur en fonction des droits présent le token JWT qu'il transmet (ex: sur la route pour écrire une ressource le JWT doit contenir dans son scope `votreressource:rw`).
