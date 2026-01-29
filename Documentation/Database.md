```mermaid
erDiagram
    Orders {
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