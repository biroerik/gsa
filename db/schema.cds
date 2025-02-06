using {managed, } from '@sap/cds/common';

namespace sap.spacefarer;

entity Spacefarers : managed {
    key ID             : Integer;
        name           : String(100);
        stardust       : Integer;
        wormholeSkill  : Integer;
        originPlanet   : String(50);
        spacesuitColor : String(20);
        email          : String(100);
        department     : Association to Departments;
        position       : Association to Positions;
}

entity Departments {
    key ID          : Integer;
        name        : String(100);
        description : String(500);
        spacefarers : Association to many Spacefarers
                          on spacefarers.department = $self;
}

entity Positions {
    key ID           : Integer;
        title        : String(100);
        requirements : String(500);
        spacefarers  : Association to many Spacefarers
                           on spacefarers.position = $self;
}
