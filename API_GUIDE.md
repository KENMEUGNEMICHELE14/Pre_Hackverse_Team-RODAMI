# 🚀 Guide d'Intégration API — Anti-Procastination (Hackverse 3.0)

Ce document est conçu pour permettre au développeur Frontend d'intégrer le backend rapidement et sans friction.

## 📌 Informations Générales
- **Base URL** : `http://localhost:8080` (en développement)
- **Format** : Toutes les requêtes et réponses sont en **JSON**.
- **Swagger Interactif** : `http://localhost:8080/swagger-ui/index.html`

---

## 🔐 Authentification (JWT)

Le backend utilise des tokens JWT. Une fois connecté, vous devez envoyer le token dans le header de chaque requête.

**Header requis :**
`Authorization: Bearer <votre_token>`

### 1. Inscription
`POST /api/auth/register`
```json
{
  "username": "jean_dupont",
  "email": "jean@mail.com",
  "password": "Password123"
}
```

### 2. Connexion
`POST /api/auth/login`
```json
{
  "email": "jean@mail.com",
  "password": "Password123"
}
```
**Réponse (AuthResponse) :**
```json
{
  "token": "eyJhbGciOiJIUzM4...",
  "user": {
    "id": 1,
    "username": "jean_dupont",
    "totalPoints": 0,
    "level": 1,
    "levelTitle": "Novice du Focus",
    "badges": []
  }
}
```

---

## 🛠️ Gestion des Tâches

### Lister les tâches (paginé)
`GET /api/tasks?page=0&size=20`

### Obtenir les tâches suggérées (priorisées par l'algorithme)
`GET /api/tasks/prioritized`
*Utilisez cet endpoint pour la vue "Quelle tâche faire maintenant ?". Le tri est automatique.*

### Créer une tâche
`POST /api/tasks`
```json
{
  "title": "Finir le rapport",
  "description": "Rapport final pour le projet X",
  "priority": "HIGH", // LOW, MEDIUM, HIGH
  "plannedPomodoros": 4,
  "deadline": "2026-05-20T18:00:00"
}
```

---

## ⏳ Sessions de Focus

### Enregistrer une session terminée
`POST /api/sessions/save`
```json
{
  "taskId": 5,
  "startTime": "2026-04-22T10:00:00",
  "plannedDuration": 25, // minutes
  "actualDuration": 25   // minutes
}
```
**Réponse importante :**
Le backend renvoie les nouveaux points, le niveau et si l'utilisateur a "level up".
```json
{
  "pointsEarned": 100,
  "leveledUp": true,
  "newLevel": 2,
  "newLevelTitle": "Initié de la Productivité"
}
```

---

## 🏆 Statistiques et Gamification

### Dashboard complet
`GET /api/stats/me`
Renvoie : minutes totales, taux de complétion, série (streak) actuelle, niveau, etc.

### Classement (Leaderboard)
`GET /api/stats/leaderboard?limit=10`

---

## ⚠️ Gestion des Erreurs

Le backend renvoie toujours un format d'erreur uniforme :

```json
{
  "status": 403,
  "error": "Forbidden",
  "message": "Accès refusé.",
  "timestamp": "2026-04-22T01:14:23Z",
  "path": "/api/sessions/save"
}
```

- **401 Unauthorized** : Token manquant ou invalide.
- **403 Forbidden** : Tentative d'accès à une ressource (tâche/session) d'un autre utilisateur.
- **429 Too Many Requests** : Protection brute-force activée (15 min de blocage après 5 échecs).

---

## 💡 Conseils pour le Frontend
1. **Stockage** : Stockez le `token` dans le `localStorage` ou dans un store sécurisé.
2. **Refresh** : Si vous recevez une **401**, redirigez l'utilisateur vers la page de connexion.
3. **Optimisme** : Pour l'enregistrement des sessions, attendez la réponse 201 pour afficher les points bonus et les micro-animations de passage de niveau.
