# API

## Create booking
**POST** `/api/booking/new`

### Content-Type
`application/json`

### Payload (JSON)
| Field | Type | Required | Notes |
|------|------|----------|------|
| `SalonID` | number | yes | Integer 1–12 |
| `KundeFornavn` | string | yes | Non-empty |
| `KundeEfternavn` | string | yes | Non-empty |
| `KundeTelefon` | string | yes | Digits only, min 8 digits |
| `KundeEmail` | string | yes | Valid email format |
| `BestillingDato` | string | yes | ISO-like local datetime: `YYYY-MM-DDTHH:mm` (optional `:ss`) |

### Example request