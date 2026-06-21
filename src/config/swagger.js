const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Fishing Competition System API',
            version: '1.0.0',
            description: `
                Fishing Competition System to aplikacja backendowa wspierająca organizację zawodów wędkarskich.

                Aplikacja została zaprojektowana w oparciu o architekturę warstwową.
                Walidacja danych, logika biznesowa, obsługa żądań HTTP oraz dostęp do bazy danych zostały rozdzielone pomiędzy dedykowane warstwy,
                co ułatwia utrzymanie i dalszy rozwój systemu.

                Funkcjonalności systemu:
                - Zarządzanie zawodami (Competition)
                - Zarządzanie zawodnikami (Competitor)
                - Zarządzanie drużynami (Team)
                - Zarządzanie składami drużyn (TeamMember)
                - Zarządzanie turami zawodów (Round)
                - Zarządzanie sektorami (Sector)
                - Rejestrowanie startów zawodników (Start)
                - Generowanie wyników zawodów (Result)
                - Autoryzacja JWT i kontrola uprawnień

                Role systemowe:
                ADMIN - pełny dostęp
                ORGANIZER - zarządzanie zawodami
                JUDGE - wprowadzanie i zatwierdzanie wyników
                USER - użytkownik aplikacji klienckiej

                Dokumentacja została przygotowana w standardzie OpenAPI 3.0.
                `
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Local API server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;