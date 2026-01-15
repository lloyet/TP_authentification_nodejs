# Objectifs

1. Créer une API d'authentification qui authorize et générer un JWT sur la route `/v2/login` avec des droits utilisateurs dans le scope
2. Créer une seconde API d'un service de votre choix qui contiendra une route avec un accès resteindre. Cette route sera uniquement accessible au request ayant un jwt avec un scope qui contient le droit à la lecture ou écriture de la ressource en question.

Exemple:

Api-Authentification -> /v2/login -> JWT avec scope "payments:rw"

Api-Payments -> /payments -> Autorise uniquement les JWT avec le scope "payments:rw" ou "payments:r"
