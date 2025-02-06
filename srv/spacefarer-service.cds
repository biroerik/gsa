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
    action submitOrder(spacefarer : Spacefarers:ID, quantity : Integer);
}
