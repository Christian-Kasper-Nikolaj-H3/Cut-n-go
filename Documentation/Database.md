```mermaid
erDiagram
    Users {
        int id PK
        
        varchar KundeFornavn
        varchar KundeEfternavn
        int KundeTelefon
        varchar KundeEmail
        varchar Password_hash
        
        datetime created_at
        datetime updated_at
    }
    Bestillinger {
        int id PK
        int SalonID
        
        varchar KundeFornavn
        varchar KundeEfternavn
        int KundeTelefon
        varchar KundeEmail
        datetime BestillingDato
        
        datetime created_at
        datetime updated_at
    }
    
    Users ||--o{ Bestillinger : "Har"
```