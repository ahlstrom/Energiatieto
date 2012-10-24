Espoon Energiatieto
===================

h3. Backend APIs:

_/api/solarProfile_

Returns the potential _solar output profile_ in kWh for a given building, based on surface area in 5% increments.

**Parameters:**

_buildingId_

**Example:**

´´´
GET /api/solarProfile?buildingId=123456

{
    surfaceArea: 240,
    solarProfile: [ 120, 230, 310 ]
}
´´´