using {sap.spacefarer as my} from '../db/schema';

service AdminService @(requires: 'authenticated-user') {
    entity Spacefarers as projection on my.Spacefarers;
    entity Departments as projection on my.Departments;
    entity Positions   as projection on my.Positions;
    action UpdateStardust(spacefarerID : Integer, newStardust : Integer);
    action ChangeSpaceSuitColor(spacefarerID : Integer, newColor : String(20));
    action CreateSpacefarer(name : String(100), stardust : Integer, wormholeSkill : Integer, originPlanet : String(50), spacesuitColor : String(20), email : String(100), department_ID : Integer, position_ID : Integer);

}
