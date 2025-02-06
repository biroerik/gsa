using {sap.spacefarer as my} from '../db/schema';

service AdminService @(requires: 'authenticated-user') {
    entity Spacefarers as projection on my.Spacefarers;
    entity Departments as projection on my.Departments;
    entity Positions   as projection on my.Positions;

}
