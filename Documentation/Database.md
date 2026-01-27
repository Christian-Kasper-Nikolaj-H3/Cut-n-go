```mermaid
erDiagram
    Bestillinger {
        int id PK
        int SalonID
        
        int KundeID
        varchar KundeFornavn
        varchar KundeEfternavn
        int KundeTelefon
        varchar KundeEmail
        varchar KundeAdresse
        datetime BestillingDato
        
        datetime created_at
        datetime updated_at
    }
```