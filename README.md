API REST complète en **Java 17 + Spring Boot 3.4.5 + PostgreSQL**.  
Base URL : `http://localhost:8080/api`  
Swagger UI : `http://localhost:8080/swagger-ui/index.html`  
Guide Intégration : [API_GUIDE.md](./API_GUIDE.md)

## Stack Technique

| Composant | Technologie |
|---|---|
| Framework | Spring Boot 3.4.5 |
| Langage | Java 17 |
| Base de données | PostgreSQL |
| Authentification | JWT (JJWT 0.12.6) — validité 24h |
| Sécurité | BCrypt (rounds=12), brute-force protection |
| Build | Maven 3.9+ |

---

## Prérequis

- Java 17+
- Maven 3.9+
- PostgreSQL 15+

---

## Installation et Lancement

### 1. Cloner et configurer l'environnement

```bash
git clone <repo-url>
cd antiproc-backend
cp .env.example .env
# Modifier .env avec vos valeurs (DATABASE_URL, JWT_SECRET, etc.)
```

### 2. Créer la base de données PostgreSQL

```bash
psql -U postgres -c "CREATE DATABASE antiproc_db;"
```

### 3. Lancer l'application

```bash
export DATABASE_URL=jdbc:postgresql://localhost:5432/antiproc_db
export DB_USERNAME=postgres
export DB_PASSWORD=postgres
export JWT_SECRET=your-secret-key-at-least-256-bits-long

./mvnw spring-boot:run
```

L'application démarre sur **http://localhost:8080**. Les tables JPA sont créées/mises à jour automatiquement (`ddl-auto: update`). Les 6 badges sont insérés au démarrage via `DataLoader`.

---

## Endpoints API

Toutes les routes (sauf auth) nécessitent le header : `Authorization: Bearer <token>`

### Authentification (`/api/auth`)
| Méthode | Endpoint | Description |
|---|---|---|
| POST | `/register` | Inscription (201 + token + user) |
| POST | `/login` | Connexion (200 + token + user) |

### Tâches (`/api/tasks`)
| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/tasks?page=0&size=20&sort=createdAt,desc` | Liste paginée |
| POST | `/tasks` | Créer une tâche (201) |
| PUT | `/tasks/{id}` | Modifier une tâche (200) |
| DELETE | `/tasks/{id}` | Supprimer (204) |
| GET | `/tasks/prioritized` | Liste triée par score de priorité |

### Sessions (`/api/sessions`)
| Méthode | Endpoint | Description |
|---|---|---|
| POST | `/sessions/save` | Sauvegarder session (201 + points + niveau) |
| GET | `/sessions/history?page=0&size=20` | Historique paginé |

### Statistiques (`/api/stats`)
| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/stats/me` | Statistiques personnelles |
| GET | `/stats/leaderboard?limit=10` | Classement général |

### Badges (`/api/achievements`)
| GET | `/achievements/me` | Badges obtenus |

### Profil (`/api/users`)
| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/users/me` | Profil (id, username, email, level, badges) |
| PUT | `/users/me` | Modifier profil / mot de passe |

---

## Sécurité

- **JWT** : 24h de validité, payload `{userId, email, level}`
- **BCrypt** : 12 rounds
- **Brute-force** : 5 tentatives échouées → compte bloqué 15 min → HTTP 429 + `Retry-After: 900`
- **Isolation** : chaque ressource vérifie l'appartenance à l'utilisateur authentifié → 403 sinon

## Logique Métier

- **Niveaux** : 1_Débutant(0-199), 2_Focalisé(200-499), 3_Productif(500-999), 4_Expert(1000-1999), 5_Maître(2000+)
- **Sessions** : complète → 50/120 pts, partielle (≥50%) → 50%, abandon → 0 pt
- **Streak** : 3+ sessions consécutives → +100 pts bonus
- **Priorisation** : Score = priorité(1-3) + urgence(délai) + investissement(sessions existantes)

---

## 🚀 Déploiement sur Render

Le projet inclut un `Dockerfile` pour un déploiement facile.

### Étapes recommandées :

1. **Base de données** : Créez une instance **Render PostgreSQL**. Copiez l'URL de connexion interne.
2. **Web Service** : Créez un nouveau "Web Service" sur Render à partir de votre dépôt.
3. **Configuration** :
   - **Runtime** : `Docker`
   - **Plan** : `Free` ou plus
4. **Variables d'environnement** :
   - `DATABASE_URL` : L'URL de votre DB Render (ex: `postgres://user:pass@host/db?sslmode=require`)
   - `DB_USERNAME` : Votre utilisateur DB
   - `DB_PASSWORD` : Votre mot de passe DB
   - `JWT_SECRET` : Une clé secrète longue et complexe
   - `ALLOWED_ORIGINS` : L'URL de votre frontend (ex: `https://votre-app.vercel.app`)

---

## 🏗️ Docker local (Optionnel)

Pour tester l'image localement :
```bash
docker build -t antiproc-backend .
docker run -p 8080:8080 --env-file .env antiproc-backend
```
