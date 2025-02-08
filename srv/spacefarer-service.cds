using {sap.spacefarer as my} from '../db/schema';

service SpacefarerService @(path: '/browse') {

    @readonly
    entity Spacefarers as
        select from my.Spacefarers {
            *,
            department.name as department,
            position.title  as position
        }
        excluding {
            createdBy,
            modifiedBy
        };

    @requires: 'authenticated-user'

    action UpdateStardust(spacefarerID : Integer, newStardust : Integer);

    action ChangeSpaceSuitColor(spacefarerID : Integer, newColor : String(20));
    action CreateSpacefarer(name : String(100), stardust : Integer, wormholeSkill : Integer, originPlanet : String(50), spacesuitColor : String(20), email : String(100), department_ID : Integer, position_ID : Integer);

}
