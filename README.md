Fishing Competition System

1. Opis projektu
Fishing Competition System to aplikacja backendowa wspierająca organizację zawodów wędkarskich. 
System umożliwia zarządzanie zawodami, zawodnikami, drużynami, turami, sektorami, startami oraz wynikami zawodów.

Projekt został wykonany jako REST API z wykorzystaniem technologii Node.js, Express, Prisma ORM oraz PostgreSQL. 
System wykorzystuje autoryzację JWT, dokumentację Swagger OpenAPI oraz konteneryzację Docker.

2. Technologie:
- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Docker
- Swagger OpenAPI
- Postman
  
3. Architektura
System wykorzystuje architekturę klient–serwer, natomiast backend został zaimplementowany zgodnie z architekturą warstwową.
Aplikacja rozdziela odpowiedzialności pomiędzy następujące warstwy:
- DTO – walidacja i mapowanie danych wejściowych,
- Controller – obsługa żądań HTTP,
- Service – logika biznesowa,
- Prisma ORM – komunikacja z bazą danych,
- PostgreSQL – przechowywanie danych.
Takie podejście zwiększa czytelność kodu, ułatwia rozwój aplikacji oraz upraszcza testowanie poszczególnych elementów systemu.

5. Funkcjonalności
System umożliwia:
- rejestrację i logowanie użytkowników,
- autoryzację z wykorzystaniem JWT,
- zarządzanie zawodami,
- zarządzanie zawodnikami,
- zarządzanie drużynami i składami drużyn,
- zarządzanie turami i sektorami zawodów,
- rejestrowanie startów zawodników,
- generowanie i obliczanie wyników sektorowych,
- kontrolę dostępu na podstawie ról użytkowników.
- Role użytkowników

6. W systemie dostępne są następujące role:
- ADMIN
- ORGANIZER
- JUDGE
- USER
Poszczególne endpointy posiadają ograniczenia dostępu zależne od roli użytkownika.

-----

Uruchomienie projektu

1. Wymagania
Do uruchomienia projektu wymagane są:
- Docker Desktop,
- Git.
  
2. Pobranie projektu
Sklonuj repozytorium:
git clone <adres_repozytorium>

Następnie przejdź do katalogu projektu:
cd fishing-competition-system

3. Konfiguracja
Utwórz plik .env.docker na podstawie przygotowanego szablonu.
Przykładowa konfiguracja:

PORT=3000
DATABASE_URL="postgresql://postgres@db:5432/fishing_db"
JWT_SECRET="your_jwt_secret"
JWT_EXPIRES_IN="2h"

4. Uruchomienie kontenerów

Uruchom aplikację oraz bazę danych:
docker compose up --build

Po uruchomieniu kontenerów wykonaj migracje:
docker exec -it fishing-api npx prisma migrate deploy

5. Dostęp do aplikacji
API:
http://localhost:3000/api

Dokumentacja Swagger:
http://localhost:3000/api-docs


6. Dokumentacja API
Dokumentacja endpointów została przygotowana w standardzie OpenAPI 3.0 z wykorzystaniem Swagger UI.

Jakub Rusek
