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
